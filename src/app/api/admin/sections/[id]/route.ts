import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Section from '@/models/Section';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();

        const section = await Section.findByIdAndUpdate(id, body, { new: true });
        if (!section) {
            return NextResponse.json({ error: 'Section not found' }, { status: 404 });
        }

        return NextResponse.json({ section });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;

        const section = await Section.findByIdAndDelete(id);
        if (!section) {
            return NextResponse.json({ error: 'Section not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Section deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
