import { TreeViewSidebar } from '@/components/TreeViewSidebar';
import { getFileTree } from '@/lib/mdx';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fileTree = getFileTree();

  return (
    <div className="flex h-screen bg-background">
      <TreeViewSidebar fileTree={fileTree} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
