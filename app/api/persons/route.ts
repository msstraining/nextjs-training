"use server";

import { NextResponse} from "next/server";

//export function GET(request: NextRequest) {}
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const category = searchParams.get('category');
    //return new Response('Hello World 123', { status: 200 })
    return NextResponse.json({
        data: [
            {id: "1", name: "Müller"},
            {id: "2", name: "Hertz"}
        ],
        userId: userId, category: category
    }, { status: 201 });
}

// endpoint to upload a file to the bucket
/*
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const files = formData.getAll("file") as File[];

    const response = await Promise.all(
        files.map(async (file) => {
            // not sure why I have to override the types here
            //const Body = (await file.arrayBuffer()) as Buffer;
            //s3.send(new PutObjectCommand({ Bucket, Key: file.name, Body }));
        })
    );

    return NextResponse.json(response);
}*/
