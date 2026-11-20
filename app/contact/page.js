'use client';
import { useState } from 'react';
import { Header, Footer, PageBand } from '../../components/SiteChrome';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  return (
    <>
      <Header />
      <PageBand
        eyebrow="Contact"
        title="Get in touch"
        sub="Have a question, an idea, or a story to share? Send a message — I read every one."
      />
      <main className="container">
        <div className="article">
          <div className="contact-cards">
            <div className="contact-card"><b>Email</b><span>hello@mybusinessjournal.example</span></div>
            <div className="contact-card"><b>WhatsApp</b><span>Message via the contact form below</span></div>
            <div className="contact-card"><b>Location</b><span>Dhaka, Bangladesh</span></div>
          </div>
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
