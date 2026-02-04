import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Section from '@/models/Section';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const pageId = searchParams.get('pageId');

        if (!pageId) {
            return NextResponse.json({ error: 'pageId is required' }, { status: 400 });
        }

        const sections = await Section.find({ pageId }).sort({ order: 1 });
        return NextResponse.json({ sections });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { pageId, type, content, order } = body;

        if (!pageId || !type) {
            return NextResponse.json({ error: 'pageId and type are required' }, { status: 400 });
        }

        const section = await Section.create({
            pageId,
            type,
            content: content || {},
            order: order || 0,
            isVisible: true
        });

        return NextResponse.json({ section });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
