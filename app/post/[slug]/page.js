'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header, Footer, PageBand } from '../../../components/SiteChrome';
import { SEED_POSTS, SEED_COMMENTS, getPostBySlug } from '../../../lib/data';

export default function PostPage() {
  const params = useParams();
  const post = getPostBySlug(params.slug);
  const [comments, setComments] = useState(SEED_COMMENTS.filter((c) => c.postSlug === params.slug && c.status === 'approved'));
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const url = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/post/${params.slug}`;
  }, [params.slug]);

  if (!post) {
    return (
      <>
        <Header />
        <PageBand eyebrow="Not found" title="Post not found" sub="This story does not exist — or it was moved." />
        <main className="container"><div className="article"><p><Link href="/">← Back to Home</Link></p></div></main>
        <Footer />
      </>
    );
  }

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(url); } catch {}
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  const encoded = encodeURIComponent(url);

  return (
    <>
      <Header />
      <PageBand eyebrow={post.category} title={post.title} sub={`${post.author} · ${post.date} · ${post.readTime}`} />
      <main className="container">
        <div className="article">
          <p><Link href="/">← Back to Home</Link></p>
          {post.content.map((para, i) => <p key={i}>{para}</p>)}
          <div className="card-actions">
            <button className="small-btn" onClick={copyLink}>{copied ? '✓ Copied!' : 'Copy Link'}</button>
            <a className="small-btn" href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noreferrer">Facebook</a>
            <a className="small-btn" href={`https://wa.me/?text=${encodeURIComponent(post.title)}%20${encoded}`} target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="small-btn" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encoded}`} target="_blank" rel="noreferrer">X</a>
            <a className="small-btn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>

        <div className="article">
          <h2 className="serif">Comments ({comments.length})</h2>
          {comments.length === 0 && <p>No comments yet. Be the first to share your thoughts.</p>}
          {comments.map((c) => (
            <div key={c.id} style={{ borderBottom: '1px solid #e5ddd0', padding: '12px 0' }}>
              <strong>{c.name}</strong> <span className="meta">{c.date}</span>
              <p>{c.text}</p>
            </div>
          ))}
          {submitted ? (
            <p style={{ background: '#e6f4ea', padding: 14, borderRadius: 8, marginTop: 16 }}>
              Thank you! Your comment was submitted and is awaiting review.
            </p>
          ) : (
            <form className="form" style={{ marginTop: 16 }} onSubmit={(e) => { e.preventDefault(); if (name.trim() && text.trim()) setSubmitted(true); }}>
              <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
              <textarea placeholder="Write a comment..." rows={4} value={text} onChange={(e) => setText(e.target.value)} required />
              <button className="btn" type="submit">Post Comment</button>
            </form>
          )}
        </div>

        <div className="section-head">
          <span className="eyebrow">Keep reading</span>
          <h2>More posts</h2>
          <div className="rule" />
        </div>
        {SEED_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3).map((p) => (
          <article className="post-row" key={p.slug}>
            <div className={`post-row-cover ${p.cover === 'gold' ? 'gold' : ''}`}>
              <span className="cat">{p.category}</span>
            </div>
            <div className="post-row-body">
              <h3><Link href={`/post/${p.slug}`}>{p.title}</Link></h3>
              <p>{p.excerpt}</p>
              <div className="meta">{p.author} · {p.date} · {p.readTime}</div>
            </div>
          </article>
        ))}
      </main>
      <Footer />
    </>
  );
}
