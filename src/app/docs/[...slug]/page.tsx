import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { getMarkdownFile, generateStaticParams as getStaticParams } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

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
  
  // Default to 'index' if slug is empty
  const slugPath = slug.length > 0 ? slug.join('/') : 'index';

  const file = getMarkdownFile(slugPath);

  if (!file) {
    notFound();
  }

  const segments = slugPath.split('/').filter(Boolean);
  const folderLabel = segments.length > 1 ? segments.slice(0, -1).join(' / ') : 'Docs';
  const pageTitle = file.frontMatter.title || segments[segments.length - 1] || 'index';

  return (
    <>
      <div className="mb-4 pb-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">{folderLabel}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {pageTitle}
          </h1>
          {file.frontMatter.description && (
            <p className="mt-2 text-base text-muted-foreground">
              {file.frontMatter.description}
            </p>
          )}
        </header>
        <MarkdownRenderer content={file.content} />
      </article>
    </>
  );
}
