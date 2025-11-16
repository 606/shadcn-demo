import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface FrontMatter {
  title: string;
  description?: string;
  date?: string;
  [key: string]: any;
}

export interface MarkdownFile {
  slug: string;
  frontMatter: FrontMatter;
  content: string;
  path: string;
}

export interface FileTree {
  name: string;
  type: 'file' | 'directory';
  path: string;
  children?: FileTree[];
  slug?: string;
  frontMatter?: FrontMatter;
}

export function getAllMarkdownFiles(dir: string = contentDirectory): MarkdownFile[] {
  const files: MarkdownFile[] = [];

  function traverse(currentPath: string, basePath: string = '') {
    const entries = fs.readdirSync(currentPath);

    entries.forEach((entry) => {
      if (entry.startsWith('.')) return;

      const fullPath = path.join(currentPath, entry);
      const relPath = path.join(basePath, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath, relPath);
      } else if (entry.endsWith('.md')) {
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const { data, content } = matter(fileContent);
        const slug = relPath.replace(/\.md$/, '').replace(/\\/g, '/');

        files.push({
          slug,
          frontMatter: data as FrontMatter,
          content,
          path: fullPath,
        });
      }
    });
  }

  traverse(dir);
  return files;
}

export function getFileTree(dir: string = contentDirectory): FileTree[] {
  const tree: FileTree[] = [];

  function traverse(currentPath: string, basePath: string = ''): FileTree[] {
    const entries = fs.readdirSync(currentPath).sort();
    const items: FileTree[] = [];

    entries.forEach((entry) => {
      if (entry.startsWith('.')) return;

      const fullPath = path.join(currentPath, entry);
      const relPath = path.join(basePath, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const children = traverse(fullPath, relPath);
        items.push({
          name: entry,
          type: 'directory',
          path: relPath,
          children: children.length > 0 ? children : undefined,
        });
      } else if (entry.endsWith('.md')) {
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const { data } = matter(fileContent);
        const slug = relPath.replace(/\.md$/, '').replace(/\\/g, '/');

        items.push({
          name: data.title || entry.replace(/\.md$/, ''),
          type: 'file',
          path: relPath,
          slug,
          frontMatter: data as FrontMatter,
        });
      }
    });

    return items;
  }

  return traverse(dir);
}

export function getMarkdownFile(slug: string): MarkdownFile | null {
  const filePath = path.join(contentDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    frontMatter: data as FrontMatter,
    content,
    path: filePath,
  };
}

export function generateStaticParams(): Array<{ slug: string[] }> {
  const files = getAllMarkdownFiles();
  
  // Ensure we have at least one param for static export
  const params = files.map((file) => ({
    slug: file.slug.split('/').filter(Boolean),
  }));
  
  // Add the root docs page (empty slug)
  params.unshift({ slug: [] });
  
  return params;
}
