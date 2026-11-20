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
          <Link href="/#latest" className="btn btn-gold">Start Reading</Link>
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

/* Full-bleed dark masthead — lightning lives ONLY inside this band. */
export function Masthead({ query, onQueryChange }) {
  return (
    <section className="masthead">
      <div className="lightning-stage" aria-hidden="true">
        <div className="sky-flash" />
        <div className="cloud c1" />
        <div className="cloud c2" />
        <div className="bolt b1" />
        <div className="bolt b2" />
        <div className="bolt b3" />
      </div>
      <div className="masthead-inner">
        <span className="eyebrow">Welcome to My Business Journal</span>
        <h1>My Business <em>Journal.</em></h1>
        <p>
          Welcome! Honest notes on starting small, pricing with confidence,
          marketing without a big budget, and building a business you are proud of.
        </p>
        <div className="masthead-search">
          <input
            type="search"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label="Search posts"
          />
          <a href="#latest" className="btn btn-gold">Search</a>
        </div>
      </div>
    </section>
  );
}

/* Stat cards, overlapping the masthead. */
export function StatStrip({ totalPosts, totalViews }) {
  return (
    <div className="container">
      <div className="stat-strip">
        <div className="stat-card"><span>Posts</span><b>{totalPosts}</b><small>Published stories</small></div>
        <div className="stat-card"><span>Reads</span><b>{totalViews}</b><small>Across all posts</small></div>
        <div className="stat-card"><span>Topics</span><b>4</b><small>Business · Finance · More</small></div>
        <div className="stat-card"><span>Author</span><b>Farhan</b><small>Writing since 2026</small></div>
      </div>
    </div>
  );
}

/* Backwards-compatible alias — the old hero was this masthead. */
export function LightningHero({ totalPosts, totalViews }) {
  return (
    <>
      <Masthead query="" onQueryChange={() => {}} />
      <StatStrip totalPosts={totalPosts} totalViews={totalViews} />
    </>
  );
}

/* Dark page band for inner pages (About / Contact / Post). */
export function PageBand({ eyebrow, title, sub }) {
  return (
    <section className="page-band">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
    </section>
  );
}

/* Sidebar cards for the new two-column home layout. */
export function AuthorCard() {
  return (
    <aside className="side-card dark">
      <span className="side-eyebrow">About the author</span>
      <h3>Farhan Islam</h3>
      <p>
        Builder, writer, and lifelong learner. This journal is where ideas are
        tested in public — one small post at a time.
      </p>
      <Link href="/about" className="btn btn-gold" style={{ marginTop: 6 }}>Read my story →</Link>
    </aside>
  );
}

export function TopicsCard({ categories, active, onSelect }) {
  return (
    <aside className="side-card">
      <span className="side-eyebrow">Browse topics</span>
      <h3>Topics</h3>
      <ul className="topic-list">
        {['All', ...categories].map((c) => (
          <li key={c}>
            <button type="button" className={active === c ? 'active' : ''} onClick={() => onSelect(c)}>
              <span>{c === 'All' ? 'All Posts' : c}</span>
              <span className="arrow">→</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function MostReadCard({ posts }) {
  return (
    <aside className="side-card">
      <span className="side-eyebrow">Most read</span>
      <h3>Top stories</h3>
      <ol className="num-list">
        {posts.slice(0, 3).map((p, i) => (
          <li key={p.slug}>
            <span className="num">0{i + 1}</span>
            <div>
              <Link href={`/post/${p.slug}`}>{p.title}</Link>
              <div className="meta">{p.category} · {p.readTime}</div>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}

export function NewsletterCard() {
  return (
    <aside className="side-card gold">
      <span className="side-eyebrow" style={{ color: '#5c4a08' }}>Never miss a post</span>
      <h3>Get the journal in your inbox</h3>
      <p>One honest business note a week. No spam, no hype.</p>
      <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! You are on the list.'); }}>
        <input type="email" placeholder="Your email address" required aria-label="Email address" />
        <button className="btn" type="submit">Subscribe</button>
      </form>
    </aside>
  );
}
