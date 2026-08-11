import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Institution from "@/models/Institution";
import { jwtVerify } from "jose";
import { revalidatePath } from "next/cache";

async function verifyAuth(req: NextRequest) {
    const token = req.cookies.get("adminToken")?.value;
    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}

const PUBLIC_PATHS: Record<string, string> = {
    marudhar: "/institutions/marudhar-balika-vidyapeeth",
    english: "/institutions/leeladevi-english-medium",
    primary: "/institutions/sushiladevi",
    college: "/institutions/leela-devi-college",
};

export async function GET(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const institutions = await Institution.find({});
        return NextResponse.json({ success: true, institutions });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const data = await req.json();

        if (!data.id) {
            return NextResponse.json({ success: false, error: "Missing Institution ID" }, { status: 400 });
        }

        // Strip Mongo metadata so findOneAndUpdate cannot fail on immutable _id / __v
        const {
            _id,
            __v,
            createdAt,
            updatedAt,
            ...safeData
        } = data;

        const institution = await Institution.findOneAndUpdate(
            { id: safeData.id },
            { $set: safeData },
            { upsert: true, new: true, runValidators: true }
        );

        // Bust public institution page cache after successful save
        revalidatePath(`/api/institutions/${safeData.id}`);
        const publicPath = PUBLIC_PATHS[safeData.id];
        if (publicPath) {
            revalidatePath(publicPath);
        }

        return NextResponse.json({ success: true, institution });
    } catch (error: any) {
        console.error("INSTITUTION_POST_ERROR:", error);
        return NextResponse.json(
            { success: false, error: error?.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
