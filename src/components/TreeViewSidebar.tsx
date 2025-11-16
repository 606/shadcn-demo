'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, File, Folder, FolderOpen, Search, ChevronLeft, ChevronDown } from 'lucide-react';
import { FileTree } from '@/lib/mdx';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

interface TreeNodeProps {
  node: FileTree;
  level: number;
  currentPath?: string;
  isCollapsed?: boolean;
}

function TreeNode({ node, level, currentPath, isCollapsed = false }: TreeNodeProps) {
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
          className="w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-all hover:bg-blue-50"
          style={{
            paddingLeft: `${paddingLeft}px`,
            color: '#4b5563',
          }}
        >
          <ChevronRight
            size={16}
            className="flex-shrink-0"
            style={{
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease-out',
              color: '#8b94a5',
            }}
          />
          {isOpen ? (
            <FolderOpen size={16} className="flex-shrink-0" style={{ color: '#5b8dee' }} />
          ) : (
            <Folder size={16} className="flex-shrink-0" style={{ color: '#a0a8b5' }} />
          )}
          {!isCollapsed && <span className="truncate font-medium text-sm">{node.name}</span>}
        </button>
        {isOpen && node.children && (
          <div>
            {node.children.map((child) => (
              <TreeNode
                key={`${child.type}-${child.path}`}
                node={child}
                level={level + 1}
                currentPath={currentPath}
                isCollapsed={isCollapsed}
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
          className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-all"
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
          {!isCollapsed && <span className="truncate">{node.name}</span>}
          {isActive && isCollapsed && (
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: '#1e40af' }}
            />
          )}
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256); // 16 * 16 = 256px
  const sidebarRef = useRef<HTMLDivElement>(null);
  const MIN_WIDTH = 64;
  const MAX_WIDTH = 400;

  // Handle resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      if (sidebarRef.current) {
        const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
        if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
          setSidebarWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <>
      <div
        ref={sidebarRef}
        className="relative bg-white border-r flex flex-col transition-all"
        style={{
          width: isCollapsed ? '64px' : `${sidebarWidth}px`,
          borderColor: '#e5e8f0',
          height: '100vh',
          minWidth: isCollapsed ? '64px' : `${MIN_WIDTH}px`,
        }}
      >
        {/* Header */}
        <div className="px-4 py-4 border-b flex items-center justify-between" style={{ borderColor: '#e5e8f0' }}>
          {!isCollapsed && (
            <h2 className="text-xs font-semibold tracking-widest text-gray-600 uppercase">Docs</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 mx-auto"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        {/* Search Bar */}
        {!isCollapsed && (
          <div className="px-3 py-3 border-b" style={{ borderColor: '#e5e8f0' }}>
            <div className="relative">
              <Search size={16} className="absolute left-2 top-2.5" style={{ color: '#8b94a5' }} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm rounded-md border"
                style={{
                  borderColor: '#e5e8f0',
                  backgroundColor: '#f8f9fb',
                }}
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {fileTree.map((node) => (
            <TreeNode
              key={`${node.type}-${node.path}`}
              node={node}
              level={0}
              currentPath={pathname}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>

        {/* Footer with Action Buttons */}
        {!isCollapsed && (
          <div className="p-3 border-t space-y-2" style={{ borderColor: '#e5e8f0' }}>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              GitHub
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => {/* TODO: Add theme toggle */}}
            >
              ⚙️ Settings
            </Button>
          </div>
        )}
      </div>

      {/* Resize Handle - Only show when not collapsed */}
      {!isCollapsed && (
        <div
          onMouseDown={handleResizeStart}
          className={`w-1 bg-transparent hover:bg-blue-400 transition-colors cursor-col-resize ${
            isDragging ? 'bg-blue-500' : ''
          }`}
          style={{
            height: '100vh',
            userSelect: 'none',
          }}
          title="Drag to resize sidebar"
        />
      )}
    </>
  );
}
