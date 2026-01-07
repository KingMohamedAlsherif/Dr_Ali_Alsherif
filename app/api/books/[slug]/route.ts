import { NextResponse } from 'next/server';
import { getBooks, getBookFilePath } from '@/lib/content';
import fs from 'fs';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const books = await getBooks('en');
  const book = books.find((item) => item.slug === params.slug);
  if (!book) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (book.access === 'gated') {
    const accessCode = process.env.BOOK_ACCESS_CODE;
    const provided = new URL(request.url).searchParams.get('code') ?? request.headers.get('x-access-code');
    if (!accessCode || provided !== accessCode) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
  }

  const filePath = getBookFilePath(book.fileRef);
  const stat = fs.statSync(filePath);
  const stream = fs.createReadStream(filePath);

  return new NextResponse(stream as never, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Length': stat.size.toString(),
      'Cache-Control': 'private, max-age=0, no-store'
    }
  });
}
