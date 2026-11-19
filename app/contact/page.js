'use client';
import { useState } from 'react';
import { Header, Footer } from '../../components/SiteChrome';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  return (
    <>
      <Header />
      <main className="container">
        <div className="article">
          <span className="eyebrow" style={{ color: '#0f5132' }}>Contact</span>
          <h1>Get in touch</h1>
          <p>Have a question, an idea, or a story to share? Send a message — I read every one.</p>
          <p><strong>Email:</strong> hello@mybusinessjournal.example<br />
          <strong>WhatsApp:</strong> Message via the contact form below<br />
          <strong>Location:</strong> Dhaka, Bangladesh</p>
          {sent ? (
            <p style={{ background: '#e6f4ea', padding: 14, borderRadius: 8 }}>Thank you, {name || 'friend'}! Your message was received.</p>
          ) : (
            <form className="form" onSubmit={(e) => { e.preventDefault(); if (name.trim() && message.trim()) setSent(true); }}>
              <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
              <input placeholder="Your email" type="email" required />
              <textarea placeholder="Your message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required />
              <button className="btn btn-gold" type="submit">Send Message</button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
