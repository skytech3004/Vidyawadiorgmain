import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Page from '@/models/Page';

export async function GET() {
    try {
        await dbConnect();
        const pages = await Page.find({}).sort({ updatedAt: -1 });
        return NextResponse.json({ pages });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { title, slug } = body;

        const existing = await Page.findOne({ slug });
        if (existing) {
            return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
        }

        const page = await Page.create({
            title,
            slug,
            status: 'draft'
        });

        return NextResponse.json({ page });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
