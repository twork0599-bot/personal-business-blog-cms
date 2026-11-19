export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'My Business Journal';
export const AUTHOR_NAME = process.env.AUTHOR_NAME || 'Farhan Islam';

export const CATEGORIES = ['Business', 'Marketing', 'Finance', 'Personal'];

export const SEED_POSTS = [
  {
    slug: 'start-small-think-big',
    title: 'Start Small, Think Big: How Small Businesses Win',
    excerpt: 'Big results rarely start big. They start with one clear offer, one loyal customer, and one habit repeated every day.',
    category: 'Business',
    author: 'Farhan Islam',
    date: '2026-11-15',
    readTime: '5 min read',
    featured: true,
    cover: 'deep-green',
    content: [
      'Every big business was once a small idea with a stubborn owner. The difference is not money — it is clarity. Know exactly who you help, and what changes for them after they buy from you.',
      'Start with one offer. Serve ten people brilliantly before you try to serve a thousand. Their stories become your marketing, and their trust becomes your growth.',
      'Keep your costs low, your promises honest, and your follow-up fast. Small businesses win on care, not on budget.',
      'Lesson: consistency beats intensity. One useful post, one honest conversation, one happy customer — every single day.',
    ],
  },
  {
    slug: 'money-habits-that-compound',
    title: 'Money Habits That Compound Quietly',
    excerpt: 'Wealth is rarely a single big win. It is a dozen small, boring decisions made on time, month after month.',
    category: 'Finance',
    author: 'Farhan Islam',
    date: '2026-11-12',
    readTime: '4 min read',
    featured: false,
    cover: 'gold',
    content: [
      'Pay yourself first, even if it is a small amount. The habit matters more than the number in the first year.',
      'Separate business money from personal money. When the lines blur, both suffer — and tax time becomes painful.',
      'Track every taka for thirty days. Most people do not have an income problem; they have a leak they never saw.',
      'Lesson: money grows where attention goes. Give it a plan, and it will stop disappearing.',
    ],
  },
  {
    slug: 'marketing-without-a-big-budget',
    title: 'Marketing Without a Big Budget',
    excerpt: 'You do not need ads to be remembered. You need one clear message, told in the same voice, in the same place, again and again.',
    category: 'Marketing',
    author: 'Farhan Islam',
    date: '2026-11-08',
    readTime: '6 min read',
    featured: false,
    cover: 'deep-green',
    content: [
      'Pick one channel your customers already use, and show up there every day. Depth beats breadth when you are small.',
      'Teach, do not shout. A short tip that saves someone ten minutes is worth more than ten slogans.',
      'Ask happy customers to tell their story in their own words. Real voices travel further than polished ads.',
      'Lesson: trust is the cheapest marketing there is — and the hardest to buy back once lost.',
    ],
  },
  {
    slug: 'my-journey-building-in-public',
    title: 'My Journey: Building in Public',
    excerpt: 'I started with no audience, no budget, and a notebook full of ideas. Here is what I learned in the first year.',
    category: 'Personal',
    author: 'Farhan Islam',
    date: '2026-11-05',
    readTime: '5 min read',
    featured: false,
    cover: 'gold',
    content: [
      'I wrote my first post for an audience of one — myself. It was messy, but it was honest, and honesty is what kept me writing.',
      'The hardest part was not the work. It was publishing before I felt ready, and learning from the comments instead of fearing them.',
      'Every week I kept one promise to myself: ship something small. That promise built the journal you are reading now.',
      'Lesson: you do not need permission to begin. You need a first step, and the courage to take the second one tomorrow.',
    ],
  },
  {
    slug: 'pricing-with-confidence',
    title: 'Pricing With Confidence',
    excerpt: 'If your price makes you nervous, it might be right. Cheap prices attract the wrong customers — and exhaust the right ones.',
    category: 'Business',
    author: 'Farhan Islam',
    date: '2026-11-01',
    readTime: '4 min read',
    featured: false,
    cover: 'deep-green',
    content: [
      'Price is a story about value, not about cost. If you only cover your costs, you cannot afford to serve people well.',
      'List what the customer avoids, saves, or gains — not just what you deliver. That list is your real price.',
      'Raise your price for new customers first. Your old customers will understand when the quality keeps rising.',
      'Lesson: a fair price protects both sides. It lets you do great work, and lets the customer expect great work.',
    ],
  },
  {
    slug: 'the-one-page-weekly-plan',
    title: 'The One-Page Weekly Plan',
    excerpt: 'A week without a plan fills itself with other people’s urgencies. One page, three priorities, and a Friday review fixes that.',
    category: 'Personal',
    author: 'Farhan Islam',
    date: '2026-10-28',
    readTime: '3 min read',
    featured: false,
    cover: 'gold',
    content: [
      'Every Sunday, write three priorities — no more. If everything is a priority, nothing is.',
      'Block the first hour of your workday for the hardest priority. Email can wait; momentum cannot.',
      'On Friday, review the page honestly. What finished? What moved? What should never return to the list?',
      'Lesson: a small plan, kept, beats a perfect plan abandoned by Tuesday.',
    ],
  },
];

export const SEED_COMMENTS = [
  { id: 'c1', postSlug: 'start-small-think-big', name: 'Rahim', text: 'This really helped me. Starting with ten customers sounds doable.', status: 'approved', date: '2026-11-16' },
  { id: 'c2', postSlug: 'money-habits-that-compound', name: 'Nusrat', text: 'Tracking for 30 days showed me where my money was leaking. Thank you!', status: 'pending', date: '2026-11-13' },
  { id: 'c3', postSlug: 'marketing-without-a-big-budget', name: 'Tanvir', text: 'Teach, do not shout — I am writing that on my wall.', status: 'pending', date: '2026-11-10' },
];

export const TRAFFIC_7D = [
  { day: 'Mon', views: 42 },
  { day: 'Tue', views: 58 },
  { day: 'Wed', views: 51 },
  { day: 'Thu', views: 76 },
  { day: 'Fri', views: 64 },
  { day: 'Sat', views: 89 },
  { day: 'Sun', views: 112 },
];

export function getPostBySlug(slug) {
  return SEED_POSTS.find((p) => p.slug === slug);
}

export function categoryCounts(posts) {
  const counts = {};
  for (const c of CATEGORIES) counts[c] = 0;
  for (const p of posts || SEED_POSTS) {
    if (counts[p.category] !== undefined) counts[p.category] += 1;
  }
  return counts;
}
