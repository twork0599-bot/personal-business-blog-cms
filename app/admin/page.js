'use client';
import { useMemo, useState } from 'react';
import { CATEGORIES, SEED_POSTS, SEED_COMMENTS, TRAFFIC_7D, categoryCounts } from '../../lib/data';

const TABS = ['Dashboard', 'Posts', 'Write', 'Visitors', 'Categories', 'Comments', 'Settings', 'Env Variables'];

const ENV_VARS = [
  { key: 'NEXT_PUBLIC_SITE_NAME', value: 'My Business Journal', scope: 'Public', status: 'Set' },
  { key: 'AUTHOR_NAME', value: 'Farhan Islam', scope: 'Public', status: 'Set' },
  { key: 'CONTACT_EMAIL', value: '', scope: 'Public', status: 'Empty' },
  { key: 'SITE_URL', value: '', scope: 'Public', status: 'Empty' },
  { key: 'ANALYTICS_ENABLED', value: 'true', scope: 'Public', status: 'Set' },
  { key: 'COMMENTS_ENABLED', value: 'true', scope: 'Public', status: 'Set' },
  { key: 'ADMIN_ROUTE', value: '/admin', scope: 'Public', status: 'Set' },
  { key: 'DATABASE_URL', value: 'file:./app.db', scope: 'Secret', status: 'Set' },
  { key: 'ADMIN_EMAIL', value: '', scope: 'Secret', status: 'Empty' },
  { key: 'SESSION_SECRET', value: '•••••••• (generated, 64-char hex)', scope: 'Secret', status: 'Set' },
];

export default function AdminPage() {
  const [tab, setTab] = useState('Dashboard');
  const [posts, setPosts] = useState(SEED_POSTS);
  const [comments, setComments] = useState(SEED_COMMENTS);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('Business');
  const [notice, setNotice] = useState('');

  const counts = useMemo(() => categoryCounts(posts), [posts]);
  const pending = comments.filter((c) => c.status === 'pending').length;
  const totalViews = TRAFFIC_7D.reduce((s, d) => s + d.views, 0);
  const maxViews = Math.max(...TRAFFIC_7D.map((d) => d.views));

  const publish = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `post-${Date.now()}`;
    setPosts([{ slug, title, excerpt: body.slice(0, 140) || 'New post.', category, author: 'Farhan Islam', date: '2026-11-20', readTime: '3 min read', featured: false, cover: 'deep-green', content: [body || title] }, ...posts]);
    setTitle(''); setBody(''); setNotice('Post published!');
    setTab('Posts');
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span className="logo-badge">$</span>
          <div>
            <div style={{ color: '#fff', fontWeight: 800 }}>My Business Journal</div>
            <div style={{ fontSize: 11, color: '#9db8ab' }}>Admin Console</div>
          </div>
          <span className="vip-badge">VIP</span>
        </div>
        <nav>
          {TABS.map((t) => (
            <a key={t} href="#" onClick={(e) => { e.preventDefault(); setTab(t); }} className={tab === t ? 'active' : ''}>{t}</a>
          ))}
        </nav>
        <p style={{ fontSize: 12, color: '#9db8ab', marginTop: 24 }}>
          Admin only — this panel is not linked from the public site.
        </p>
      </aside>

      <main className="admin-main">
        <h1 className="serif" style={{ margin: 0 }}>{tab === 'Dashboard' ? 'Welcome back — Dashboard' : tab}</h1>
        <p style={{ color: '#666' }}>My Business Journal · VIP Admin Panel</p>
        {notice && <p style={{ background: '#e6f4ea', padding: 12, borderRadius: 8 }}>{notice}</p>}

        {tab === 'Dashboard' && (
          <>
            <div className="stat-grid">
              <div className="stat-card"><span>Total Posts</span><b>{posts.length}</b></div>
              <div className="stat-card"><span>Views (7 days)</span><b>{totalViews}</b></div>
              <div className="stat-card"><span>Visitors</span><b>326</b></div>
              <div className="stat-card"><span>Pending Comments</span><b>{pending}</b></div>
            </div>
            <h2 className="serif">7-day traffic</h2>
            <div className="chart">
              {TRAFFIC_7D.map((d) => (
                <div key={d.day} style={{ flex: 1, textAlign: 'center' }}>
                  <div className="chart-bar" style={{ height: `${(d.views / maxViews) * 80}px` }} title={`${d.day}: ${d.views}`} />
                  <div style={{ fontSize: 11, marginTop: 6 }}>{d.day}<br />{d.views}</div>
                </div>
              ))}
            </div>
            <h2 className="serif" style={{ marginTop: 24 }}>Recent posts</h2>
            <table className="admin-table">
              <thead><tr><th>Title</th><th>Category</th><th>Date</th></tr></thead>
              <tbody>
                {posts.slice(0, 5).map((p) => (
                  <tr key={p.slug}><td>{p.title}</td><td>{p.category}</td><td>{p.date}</td></tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {tab === 'Posts' && (
          <table className="admin-table">
            <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Action</th></tr></thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.slug}>
                  <td>{p.title}</td><td>{p.category}</td><td>{p.date}</td>
                  <td><button className="small-btn" onClick={() => { setPosts(posts.filter((x) => x.slug !== p.slug)); setNotice(`Deleted: ${p.title}`); }}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'Write' && (
          <form className="form" onSubmit={publish} style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e5ddd0' }}>
            <input placeholder="Post title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8 }}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <textarea placeholder="Write your post..." rows={8} value={body} onChange={(e) => setBody(e.target.value)} />
            <button className="btn btn-gold" type="submit">Publish Post</button>
          </form>
        )}

        {tab === 'Visitors' && (
          <>
            <div className="stat-grid">
              <div className="stat-card"><span>Page Views (today)</span><b>15</b></div>
              <div className="stat-card"><span>Unique Visitors</span><b>326</b></div>
              <div className="stat-card"><span>Top Page</span><b style={{ fontSize: 16 }}>Home</b></div>
            </div>
            <p>Every visit is tracked by page, device, browser, source and time. This preview uses sample data; connect analytics in Vercel for live data.</p>
          </>
        )}

        {tab === 'Categories' && (
          <>
            <p><strong>Admin-only:</strong> category post counts are shown here only — never on the public site.</p>
            <table className="admin-table">
              <thead><tr><th>Category</th><th>Posts</th></tr></thead>
              <tbody>
                {CATEGORIES.map((c) => (
                  <tr key={c}><td>{c}</td><td>{counts[c]}</td></tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {tab === 'Comments' && (
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Comment</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {comments.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td><td>{c.text}</td><td>{c.status}</td>
                  <td>
                    {c.status === 'pending' && <button className="small-btn" onClick={() => setComments(comments.map((x) => x.id === c.id ? { ...x, status: 'approved' } : x))}>Approve</button>}{' '}
                    <button className="small-btn" onClick={() => setComments(comments.filter((x) => x.id !== c.id))}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'Settings' && (
          <form className="form" style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e5ddd0' }} onSubmit={(e) => { e.preventDefault(); setNotice('Settings saved (preview — saved in browser session only).'); }}>
            <label>Blog title</label>
            <input defaultValue="My Business Journal" />
            <label>Tagline</label>
            <input defaultValue="Practical business notes, written honestly." />
            <label>Author</label>
            <input defaultValue="Farhan Islam" />
            <label>About</label>
            <textarea rows={4} defaultValue="A personal business blog about starting small and building with honesty." />
            <label>Contact email</label>
            <input placeholder="hello@example.com" />
            <button className="btn" type="submit">Save Settings</button>
          </form>
        )}

        {tab === 'Env Variables' && (
          <>
            <p>These 10 variables are configured for this project. Secrets are masked here — set real values in Vercel: Project → Settings → Environment Variables.</p>
            <table className="admin-table">
              <thead><tr><th>Variable</th><th>Value</th><th>Scope</th><th>Status</th></tr></thead>
              <tbody>
                {ENV_VARS.map((v) => (
                  <tr key={v.key}><td><code>{v.key}</code></td><td>{v.value || '—'}</td><td>{v.scope}</td><td>{v.status === 'Set' ? '✓ Set' : 'Empty'}</td></tr>
                ))}
              </tbody>
            </table>
            <h3 className="serif">Vercel steps</h3>
            <ol>
              <li>Import this repo in Vercel (vercel.com → Add New → Project → Import from GitHub).</li>
              <li>Framework: Next.js. Build command: npm run build.</li>
              <li>Add each variable above in Settings → Environment Variables (Production + Preview).</li>
              <li>Deploy. The public URL is shown on the deployment page.</li>
            </ol>
          </>
        )}
      </main>
    </div>
  );
}
