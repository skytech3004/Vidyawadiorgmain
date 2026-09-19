import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Inspiration from "@/models/Inspiration";
import { jwtVerify } from "jose";

async function verifyAuth(req: NextRequest) {
    const token = req.cookies.get("adminToken")?.value;
    if (!token) return null;
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch {
        return null;
    }
}

export async function GET(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        let record = await Inspiration.findOne({});
        if (!record) {
            record = await Inspiration.create({
                title: "Our Inspiration",
                name: "Smt. Subhadra ji Jain",
                description: "<p>Smt. Subhadraji Jain was the first Vyasthapika & teacher of Vidyawadi and a remarkable pillar in the institution’s growth journey. With unwavering dedication, commitment, and selfless service, she devoted her entire life to the development and progress of Vidyawadi.</p><p>Beginning her journey as a teacher, she went on to serve the institution as a Principal and Administrator, carrying every responsibility with sincerity and determination. Her vision, leadership, and tireless efforts played an important role in nurturing Vidyawadi and strengthening its educational foundation.</p><p>Her lifelong association with Vidyawadi reflects a deep commitment to education, investiture, and the empowerment of girls. In recognition of her distinguished contribution and dedicated service, she was honoured with numerous awards and accolades at the district, state, and national levels.</p><p>Her life and legacy continue to inspire generations and remain an integral part of the Vidyawadi journey.</p>",
                image: ""
            });
        }
        return NextResponse.json({ success: true, data: record });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const auth = await verifyAuth(req);
        if (!auth) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        const body = await req.json();
        
        let record = await Inspiration.findOne({});
        if (record) {
            record.title = body.title;
            record.name = body.name;
            record.description = body.description;
            record.image = body.image;
            await record.save();
        } else {
            record = await Inspiration.create(body);
        }

        return NextResponse.json({ success: true, data: record });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
    }
}
