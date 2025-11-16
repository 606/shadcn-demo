'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, File, Folder, FolderOpen } from 'lucide-react';
import { FileTree } from '@/lib/mdx';
import { usePathname } from 'next/navigation';

interface TreeNodeProps {
  node: FileTree;
  level: number;
  currentPath?: string;
}

function TreeNode({ node, level, currentPath }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDirectory = node.type === 'directory';
  const isFile = node.type === 'file';
  const isActive =
    isFile &&
    currentPath === `/docs/${node.slug}`;

  const paddingLeft = level * 12;

  if (isDirectory) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all"
          style={{
            paddingLeft: `${paddingLeft}px`,
            color: '#4b5563',
            backgroundColor: isOpen ? '#f0f4f8' : 'transparent',
          }}
          onMouseEnter={(e) => {
            if (!isOpen) {
              e.currentTarget.style.backgroundColor = '#f8f9fb';
            }
          }}
          onMouseLeave={(e) => {
            if (!isOpen) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <ChevronRight
            size={16}
            className="flex-shrink-0"
            style={{
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
              color: '#8b94a5',
            }}
          />
          {isOpen ? (
            <FolderOpen size={16} className="flex-shrink-0" style={{ color: '#5b8dee' }} />
          ) : (
            <Folder size={16} className="flex-shrink-0" style={{ color: '#a0a8b5' }} />
          )}
          <span className="truncate font-medium text-sm">{node.name}</span>
        </button>
        {isOpen && node.children && (
          <div>
            {node.children.map((child) => (
              <TreeNode
                key={`${child.type}-${child.path}`}
                node={child}
                level={level + 1}
                currentPath={currentPath}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (isFile) {
    return (
      <Link href={`/docs/${node.slug}`}>
        <div
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all"
          style={{
            paddingLeft: `calc(${paddingLeft}px - 3px)`,
            backgroundColor: isActive ? '#e8f0fe' : 'transparent',
            color: isActive ? '#1e40af' : '#4b5563',
            fontWeight: isActive ? '600' : '400',
            borderLeft: isActive ? '3px solid #1e40af' : '3px solid transparent',
          }}
          onMouseEnter={(e) => {
            if (!isActive) {
              e.currentTarget.style.backgroundColor = '#f8f9fb';
              e.currentTarget.style.color = '#2c3e50';
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#4b5563';
            }
          }}
        >
          <File size={14} className="flex-shrink-0" />
          <span className="truncate">{node.name}</span>
        </div>
      </Link>
    );
  }

  return null;
}

interface TreeViewSidebarProps {
  fileTree: FileTree[];
}

export function TreeViewSidebar({ fileTree }: TreeViewSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col" style={{ borderColor: '#e5e8f0' }}>
      <div className="px-4 py-6 border-b" style={{ borderColor: '#e5e8f0' }}>
        <h2 className="text-xs font-semibold tracking-widest text-gray-600 uppercase">Documentation</h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {fileTree.map((node) => (
          <TreeNode
            key={`${node.type}-${node.path}`}
            node={node}
            level={0}
            currentPath={pathname}
          />
        ))}
      </nav>
    </div>
  );
}
