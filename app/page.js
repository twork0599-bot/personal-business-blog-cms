'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Header, Footer, Masthead, StatStrip, AuthorCard, TopicsCard, MostReadCard, NewsletterCard } from '../components/SiteChrome';
import { CATEGORIES, SEED_POSTS } from '../lib/data';

function absolutePostUrl(slug) {
  if (typeof window === 'undefined') return `/post/${slug}`;
  return `${window.location.origin}/post/${slug}`;
}

function ShareButtons({ post }) {
  const [copied, setCopied] = useState(false);
  const url = absolutePostUrl(post.slug);
  const encoded = encodeURIComponent(url);
  const title = encodeURIComponent(post.title);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement('textarea');
      el.value = url; document.body.appendChild(el); el.select();
      document.execCommand('copy'); document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="card-actions">
      <button className="small-btn" onClick={copy}>{copied ? '✓ Copied!' : 'Copy Link'}</button>
      <a className="small-btn" href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noreferrer">Facebook</a>
      <a className="small-btn" href={`https://wa.me/?text=${title}%20${encoded}`} target="_blank" rel="noreferrer">WhatsApp</a>
      <a className="small-btn" href={`https://twitter.com/intent/tweet?text=${title}&url=${encoded}`} target="_blank" rel="noreferrer">X</a>
      <a className="small-btn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noreferrer">LinkedIn</a>
    </div>
  );
}

function PostRow({ post }) {
  return (
    <article className="post-row">
      <div className={`post-row-cover ${post.cover === 'gold' ? 'gold' : ''}`}>
        <span className="cat">{post.category}</span>
      </div>
      <div className="post-row-body">
        <h3><Link href={`/post/${post.slug}`}>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <div className="meta">{post.author} · {post.date} · {post.readTime}</div>
        <ShareButtons post={post} />
      </div>
    </article>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const posts = useMemo(() => {
    return SEED_POSTS.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);
  const featured = posts.find((p) => p.featured) || posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <Header />
      <Masthead query={query} onQueryChange={setQuery} />
      <StatStrip totalPosts={SEED_POSTS.length} totalViews="8,431" />

      <main className="container">
        <div className="layout-2col">
          <div>
            <div className="chips" role="tablist" aria-label="Browse by topic">
              {['All', ...CATEGORIES].map((c) => (
                <button key={c} className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
                  {c === 'All' ? 'All Posts' : c}
                </button>
              ))}
            </div>

            <div className="section-head" id="latest">
              <span className="eyebrow">Latest Posts</span>
              <h2>Fresh from the journal</h2>
              <div className="rule" />
              <p>Honest, practical notes — newest first.</p>
            </div>

            {posts.length === 0 ? (
              <p>No posts yet. Try a different search or topic.</p>
            ) : (
              <>
                {featured && (
                  <article className="lead-card">
                    <div className={`lead-cover ${featured.cover === 'gold' ? 'gold' : ''}`}>
                      <span className="cat">Featured · {featured.category}</span>
                    </div>
                    <div className="lead-body">
                      <h3><Link href={`/post/${featured.slug}`}>{featured.title}</Link></h3>
                      <p>{featured.excerpt}</p>
                      <div className="meta">{featured.author} · {featured.date} · {featured.readTime}</div>
                      <ShareButtons post={featured} />
                    </div>
                  </article>
                )}
                {rest.map((post) => <PostRow key={post.slug} post={post} />)}
              </>
            )}
          </div>

          <div className="sidebar">
            <AuthorCard />
            <TopicsCard categories={CATEGORIES} active={category} onSelect={setCategory} />
            <MostReadCard posts={SEED_POSTS} />
            <NewsletterCard />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
