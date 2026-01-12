'use client';

import { useEffect, useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

export default function BookReader({ slug, url, watermark }: { slug: string; url: string; watermark?: string }) {
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1.0);

  const storageKey = useMemo(() => `book-progress-${slug}`, [slug]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const storedPage = Number.parseInt(stored, 10);
      if (!Number.isNaN(storedPage)) {
        setPage(storedPage);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, String(page));
  }, [page, storageKey]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Prev
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.min(p + 1, numPages))}
        >
          Next
        </Button>
        <span className="text-xs text-muted-foreground">
          Page {page} / {numPages || '--'}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setScale((s) => Math.max(0.8, s - 0.1))}>
            -
          </Button>
          <Button variant="outline" size="sm" onClick={() => setScale((s) => Math.min(1.6, s + 0.1))}>
            +
          </Button>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-[26px] border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 shadow-soft">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="rotate-[-10deg] text-4xl font-semibold text-accent/20">
            {watermark ?? 'For reading on this site'}
          </p>
        </div>
        <Document file={url} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
          <Page
            pageNumber={page}
            scale={scale}
            className={cn('mx-auto')}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
}
