"use server";

import {NextResponse} from "next/server";

export async function GET(request: Request, { params } : {params: {id: string}}) {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const category = searchParams.get('category');
    return NextResponse.json({userId: userId, category: category, pId: id});
}

export async function POST(request: Request, { params } : {params: {id: string}}) {
    const { id } = await params;
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const category = searchParams.get('category');

    // This is where you'd talk to your database
    console.log(`id: ${id}, body: ${JSON.stringify(body)}, userId: ${userId}, category: ${category}`);

    return NextResponse.json({
        message: 'Data received!',
        received: body
    }, { status: 201 });
}

/*
const params = new URLSearchParams({
      userId: '42',
      category: 'tutorials'
    });

    const response = await fetch(`/api/posts?${params.toString()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: 'Learning Next.js is going well!',
        published: true
      }),
    });

    const data = await response.json();
 */