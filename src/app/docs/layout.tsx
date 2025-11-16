import { TreeViewSidebar } from '@/components/TreeViewSidebar';
import { Card } from '@/components/ui/card';
import { getFileTree } from '@/lib/mdx';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fileTree = getFileTree();

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden">
      <TreeViewSidebar fileTree={fileTree} />
      <main className="flex-1 overflow-y-auto w-full flex flex-col">
        {/* Content (breadcrumbs малюються всередині DocsPage) */}
        <div className="flex-1 overflow-y-auto w-full px-2 py-2">
          <Card className="shadow-sm h-full">
            <div className="p-3 h-full overflow-y-auto">
              {children}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
