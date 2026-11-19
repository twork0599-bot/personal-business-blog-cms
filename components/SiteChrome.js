'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_NAME } from '../lib/data';

export function Logo() {
  return (
    <span className="logo">
      <span className="logo-badge" aria-hidden="true">$</span>
      <span>
        <span className="logo-name">{SITE_NAME}</span>
        <br />
        <span className="logo-sub">Personal Business Blog</span>
      </span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const isActive = (href) => (pathname === href ? 'active' : '');
  return (
    <>
      <div className="top-rule" aria-hidden="true" />
      <header className="site-header">
        <div className="header-inner">
          <Link href="/"><Logo /></Link>
          <nav className="nav" aria-label="Main navigation">
            <Link href="/" className={isActive('/')}>Home</Link>
            <Link href="/about" className={isActive('/about')}>About</Link>
            <Link href="/contact" className={isActive('/contact')}>Contact</Link>
          </nav>
          <Link href="/#latest" className="btn">Start Reading</Link>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <Logo />
          <p style={{ maxWidth: 420, marginTop: 12 }}>
            Practical business, marketing and finance notes — written honestly, for builders.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <p><Link href="/">Home</Link></p>
          <p><Link href="/about">About</Link></p>
          <p><Link href="/contact">Contact</Link></p>
        </div>
        <div>
          <h3>Topics</h3>
          <p>Business</p>
          <p>Marketing</p>
          <p>Finance</p>
          <p>Personal</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '0 20px 24px', fontSize: 13, color: '#9db8ab' }}>
        © 2026 {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}

export function LightningHero({ totalPosts, totalViews }) {
  return (
    <section className="hero-panel">
      <div className="lightning-stage" aria-hidden="true">
        <div className="sky-flash" />
        <div className="cloud c1" />
        <div className="cloud c2" />
        <div className="bolt b1" />
        <div className="bolt b2" />
        <div className="bolt b3" />
      </div>
      <div style={{ position: 'relative' }}>
        <span className="eyebrow">Welcome to My Business Journal</span>
        <h1>My Business Journal.</h1>
        <p>
          Welcome! Honest notes on starting small, pricing with confidence,
          marketing without a big budget, and building a business you are proud of.
        </p>
        <div className="hero-stats">
          <div><b>{totalPosts}</b><span>Posts</span></div>
          <div><b>{totalViews}</b><span>Reads</span></div>
          <div><b>4</b><span>Topics</span></div>
        </div>
      </div>
    </section>
  );
}
