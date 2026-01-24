import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: '服务条款 - AI 周公解梦',
  description: '使用本服务前请阅读服务条款',
};

// Simple markdown to HTML converter for basic formatting
// Note: Content is from our own static files, not user input
function markdownToHtml(markdown: string): string {
  let html = markdown
    // Escape HTML first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Restore HTML tags we want to keep (div, table, etc.)
    .replace(/&lt;div/g, '<div')
    .replace(/&lt;\/div&gt;/g, '</div>')
    // Restore blockquote tags with dark-mode compatible styling
    .replace(/&lt;blockquote/g, '<blockquote class="border-l-4 border-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/20 p-4 my-4 rounded-r-lg"')
    .replace(/&lt;\/blockquote&gt;/g, '</blockquote>')
    .replace(/style="([^"]*)"/g, 'style="$1"')
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-indigo-600 dark:text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Tables - basic support
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(Boolean).map(cell => cell.trim());
      if (cells.every(cell => cell.match(/^-+$/))) {
        return ''; // Skip separator row
      }
      const isHeader = cells.some(cell => cell.includes('---'));
      if (isHeader) return '';
      return `<tr class="border-b border-gray-200 dark:border-gray-700">${cells.map(cell =>
        `<td class="px-4 py-2 text-sm">${cell}</td>`
      ).join('')}</tr>`;
    })
    // Horizontal rule
    .replace(/^---$/gim, '<hr class="my-6 border-gray-200 dark:border-gray-700" />')
    // Line breaks
    .replace(/\n\n/g, '</p><p class="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">')
    // List items
    .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1 text-gray-600 dark:text-gray-300">$1</li>')
    // Numbered list items
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-1 text-gray-600 dark:text-gray-300 list-decimal">$1</li>');

  // Wrap in paragraph
  html = `<p class="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">${html}</p>`;

  return html;
}

export default async function TermsOfServicePage() {
  // Read markdown file at build time - this is our own static content, not user input
  const filePath = path.join(process.cwd(), 'public', 'legal', 'terms-of-service.md');
  let content = '';

  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error('Failed to read terms of service:', error);
    content = '# Terms of Service\n\nContent loading error. Please try again later.';
  }

  const htmlContent = markdownToHtml(content);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>返回</span>
          </Link>
        </div>
      </header>

      {/* Content - Safe: rendered from our own static markdown files */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article
          className="prose prose-gray dark:prose-invert max-w-none"
          // SECURITY: This is safe because we're rendering our own static markdown files
          // from the public/legal directory, not user-provided content
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="/legal/privacy-policy"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            隐私政策
          </Link>
        </div>
      </footer>
    </div>
  );
}
