import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import PageContent from '../../../../models/PageContent';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ page: string }> }
) {
    try {
        await dbConnect();
        const { page } = await context.params;

        const sections = await PageContent.find({ page });

        // Convert array to object map for easier frontend consumption
        // { hero: { title: ... }, banner: { ... } }
        const contentMap = sections.reduce((acc, curr) => {
            acc[curr.section] = curr.content;
            return acc;
        }, {} as Record<string, any>);

        return NextResponse.json(contentMap);
    } catch (error) {
        console.error("Error fetching content:", error);
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ page: string }> }
) {
    try {
        await dbConnect();
        const { page } = await context.params;
        const body = await request.json();
        const { section, content } = body;

        if (!section || !content) {
            return NextResponse.json({ error: 'Missing section or content' }, { status: 400 });
        }

        const updated = await PageContent.findOneAndUpdate(
            { page, section },
            { content, lastUpdated: new Date() },
            { upsert: true, new: true }
        );

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating content:", error);
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }
}
