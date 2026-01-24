'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

interface AppLink {
  name: string;
  href: string | null;
  current?: boolean;
  comingSoon?: boolean;
}

const sisterApps: AppLink[] = [
  { name: '八字排盘', href: 'https://bazi.ax0x.ai' },
  { name: 'AI解梦', href: 'https://jiemeng.ax0x.ai', current: true },
  { name: '占星', href: null, comingSoon: true },
  { name: '六壬起卦', href: 'https://liuren.ax0x.ai' },
  { name: '人生K线', href: 'https://kxian.ax0x.ai' },
  { name: '对话式MBTI测试', href: 'https://mbti.ax0x.ai' },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-background to-secondary/20 py-8 mt-16">
      <div className="container mx-auto px-4">
        {/* Sister Apps Section */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
          {sisterApps.map((app) => (
            app.href ? (
              <Link
                key={app.name}
                href={app.href}
                target={app.current ? undefined : '_blank'}
                rel={app.current ? undefined : 'noopener noreferrer'}
                className={`
                  text-sm px-3 py-1.5 rounded-full transition-all
                  ${app.current
                    ? 'bg-primary/15 text-primary border border-primary/30 font-medium'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                  }
                `}
              >
                {app.name}
                {app.current && <span className="ml-1 text-xs opacity-70">(当前)</span>}
              </Link>
            ) : (
              <span
                key={app.name}
                className="text-sm px-3 py-1.5 rounded-full text-muted-foreground/50 cursor-not-allowed"
              >
                {app.name}
                {app.comingSoon && <span className="ml-1 text-xs">(即将上线)</span>}
              </span>
            )
          ))}
        </div>

        {/* Brand Section */}
        <div className="flex flex-col items-center gap-3">
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20 shadow-lg">
              <Image
                src="/panpanmao.png"
                alt="Panpan Mao Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                盘盘猫 Panpan Mao Entertainment
              </p>
            </div>
          </div>

          {/* Credit Line */}
          <p className="text-xs text-muted-foreground/70">
            Made by AX & Claude Code
          </p>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground/50 max-w-md text-center">
            解梦结果仅供参考娱乐，请理性看待
          </p>

          {/* WeChat Support */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70 mt-3">
            <MessageCircle className="w-3.5 h-3.5 text-green-500" />
            <span>客服微信: <span className="font-medium text-foreground">Panpanmao_001</span> 来加群</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
