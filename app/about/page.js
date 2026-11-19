import { Header, Footer } from '../../components/SiteChrome';

export const metadata = { title: 'About — My Business Journal' };

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container">
        <div className="article">
          <span className="eyebrow" style={{ color: '#0f5132' }}>About</span>
          <h1>About My Business Journal</h1>
          <p>
            My Business Journal is a personal business blog about starting small,
            staying honest, and building something that lasts. I write about
            business, marketing, finance, and the personal habits behind them.
          </p>
          <p>
            No hype, no shortcuts, no copied formulas — just practical notes from
            real work, written simply so anyone can use them the same day.
          </p>
          <h2 className="serif">The author</h2>
          <p>
            <strong>Farhan Islam</strong> — builder, writer, and lifelong learner.
            This journal is where ideas are tested in public, one small post at a time.
          </p>
          <h2 className="serif">What you will find here</h2>
          <p>Business — starting, pricing, and serving customers well.<br />
          Marketing — honest marketing without a big budget.<br />
          Finance — money habits that compound quietly.<br />
          Personal — the journey, the mistakes, and the lessons.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
