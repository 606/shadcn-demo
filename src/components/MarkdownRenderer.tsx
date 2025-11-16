'use client';

import { useMemo } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';

interface MarkdownRendererProps {
  content: string;
}

// Configure marked with highlighting
marked.setOptions({
  breaks: true,
  gfm: true,
});

const renderer = new marked.Renderer();

// Override code renderer
renderer.code = ({ text, lang, raw }: any) => {
  const highlighted = lang ? hljs.highlight(text, { language: lang }).value : hljs.highlightAuto(text).value;
  return `<div class="code-block-wrapper">
    <div class="code-block-header">
      <span class="code-lang">${lang || 'text'}</span>
      <button class="copy-btn" data-code="${encodeURIComponent(text)}">Copy</button>
    </div>
    <pre><code class="hljs language-${lang || 'plaintext'}">${highlighted}</code></pre>
  </div>`;
};

// Override heading renderer
renderer.heading = ({ text, depth }: any) => {
  const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  return `<h${depth} id="${id}" class="heading-anchor">
    <a href="#${id}" class="anchor-link">#</a>
    ${text}
  </h${depth}>`;
};

// Override table renderer
renderer.table = ({ header, body }: any) => {
  return `<div class="table-wrapper"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
};

// Override link renderer
renderer.link = ({ href, text, title }: any) => {
  return `<a href="${href}" ${title ? `title="${title}"` : ''} class="markdown-link">${text}</a>`;
};

marked.setOptions({ renderer });

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = useMemo(() => {
    return marked.parse(content) as string;
  }, [content]);

  return (
    <div className="markdown-content">
      <div
        className="prose-wrapper"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
