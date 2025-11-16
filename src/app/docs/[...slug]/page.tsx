import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { getMarkdownFile, generateStaticParams as getStaticParams } from '@/lib/mdx';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return getStaticParams();
}

interface DocsPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug } = await params;
  const slugPath = slug.join('/');

  const file = getMarkdownFile(slugPath);

  if (!file) {
    notFound();
  }

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {file.frontMatter.title || slugPath}
        </h1>
        {file.frontMatter.description && (
          <p className="mt-2 text-base text-muted-foreground">
            {file.frontMatter.description}
          </p>
        )}
      </header>
      <MarkdownRenderer content={file.content} />
    </article>
  );
}
