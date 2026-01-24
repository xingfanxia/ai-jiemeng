import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export const metadata: Metadata = {
  title: '隐私政策 - AI 周公解梦',
  description: '了解我们如何收集、使用和保护您的个人信息',
};

// Transform callout divs from inline styles to Tailwind classes
function transformCallouts(markdown: string): string {
  return markdown
    .replace(/<div style="background: #e8f5e9; border: 2px solid #4caf50; padding: 20px; border-radius: 12px; margin: 20px 0;">/g,
      '<div class="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-700 p-5 rounded-xl my-5">')
    .replace(/<div style="background: #e3f2fd; border: 1px solid #2196f3; padding: 16px; border-radius: 8px; margin: 16px 0;">/g,
      '<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-500 dark:border-blue-700 p-4 rounded-lg my-4">')
    .replace(/<div style="background: #fff8e1; border: 2px solid #ff9800; padding: 20px; border-radius: 12px; margin: 20px 0;">/g,
      '<div class="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-500 dark:border-amber-700 p-5 rounded-xl my-5">')
    .replace(/<div style="background: #fff3cd; border: 2px solid #ffc107; padding: 16px; border-radius: 8px; margin: 16px 0;">/g,
      '<div class="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-500 dark:border-amber-700 p-4 rounded-lg my-4">');
}

export default async function PrivacyPolicyPage() {
  // Read markdown file at build time - this is our own static content, not user input
  const filePath = path.join(process.cwd(), 'public', 'legal', 'privacy-policy.md');
  let content = '';

  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error('Failed to read privacy policy:', error);
    content = '# Privacy Policy\n\nContent loading error. Please try again later.';
  }

  // Transform inline styles to Tailwind classes
  const transformedContent = transformCallouts(content);

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

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="prose prose-gray dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {transformedContent}
          </ReactMarkdown>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="/legal/terms-of-service"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            服务条款
          </Link>
        </div>
      </footer>
    </div>
  );
}
