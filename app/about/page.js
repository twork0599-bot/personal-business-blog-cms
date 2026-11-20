import { Header, Footer, PageBand } from '../../components/SiteChrome';

export const metadata = { title: 'About — My Business Journal' };

export default function AboutPage() {
  return (
    <>
      <Header />
      <PageBand
        eyebrow="About"
        title="About My Business Journal"
        sub="A personal business blog about starting small, staying honest, and building something that lasts."
      />
      <main className="container">
        <div className="article">
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
          <div className="contact-cards">
            <div className="contact-card"><b>Business</b><span>Starting, pricing, and serving customers well.</span></div>
            <div className="contact-card"><b>Marketing</b><span>Honest marketing without a big budget.</span></div>
            <div className="contact-card"><b>Finance</b><span>Money habits that compound quietly.</span></div>
            <div className="contact-card"><b>Personal</b><span>The journey, the mistakes, and the lessons.</span></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
