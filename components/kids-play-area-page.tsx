'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

type Lang = 'en' | 'ar';

type Bubble = { id: number; left: number; size: number; delay: number };

type MemoryCard = { id: number; emoji: string; matched: boolean };

const GALLERY_ITEMS = [
  { title: 'Inflatable Bounce Castle', emoji: '🏰', bg: 'from-sky-300 to-blue-500' },
  { title: 'Bubble Dome Party', emoji: '🫧', bg: 'from-pink-300 to-rose-500' },
  { title: 'Building Blocks Zone', emoji: '🧱', bg: 'from-emerald-300 to-green-500' },
  { title: 'Mini Football Fun', emoji: '⚽', bg: 'from-amber-300 to-orange-500' },
  { title: 'Color Balloon Tunnel', emoji: '🎈', bg: 'from-purple-300 to-indigo-500' },
  { title: 'Birthday Celebration Setup', emoji: '🎂', bg: 'from-red-300 to-rose-500' }
];

const FEATURES = [
  { icon: '🛡️', title: 'Safe & fenced environment', text: 'Secure play zones with soft flooring and trained staff supervision.' },
  { icon: '🫧', title: 'Unique bubble dome experience', text: 'A transparent bubble dome filled with colorful balloons and joy.' },
  { icon: '🎯', title: 'Multiple fun activities', text: 'Bounce castles, blocks, mini games, and active play corners.' },
  { icon: '🎉', title: 'Perfect for birthdays & events', text: 'Private events, themed decor, and hassle-free party packages.' }
];

const OFFERS = [
  '🎉 First Visit 50% Off',
  '👨‍👩‍👧 Family Package Deals',
  '🎂 Birthday Party Packages',
  '🕒 Morning Discounts'
];

const MEMORY_EMOJIS = ['🎈', '⚽', '🧱', '🫧'];

function shuffleCards(): MemoryCard[] {
  const cards = [...MEMORY_EMOJIS, ...MEMORY_EMOJIS]
    .map((emoji, idx) => ({ id: idx + Math.random(), emoji, matched: false }))
    .sort(() => Math.random() - 0.5);
  return cards;
}

export function KidsPlayAreaPage({ lang }: { lang: Lang }) {
  const city = lang === 'ar' ? 'مدينتك' : 'Your City';
  const [lightbox, setLightbox] = useState<(typeof GALLERY_ITEMS)[number] | null>(null);
  const [giveawayDone, setGiveawayDone] = useState(false);
  const [winner, setWinner] = useState('');
  const [bubbleScore, setBubbleScore] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const [cards, setCards] = useState<MemoryCard[]>(shuffleCards());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);

  const [targetPos, setTargetPos] = useState({ x: 40, y: 40 });
  const [targetScore, setTargetScore] = useState(0);

  useEffect(() => {
    const generated = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 90),
      size: 26 + Math.floor(Math.random() * 30),
      delay: Math.random() * 5
    }));
    setBubbles(generated);
  }, []);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [first, second] = flipped;
    const firstCard = cards[first];
    const secondCard = cards[second];

    if (firstCard?.emoji === secondCard?.emoji) {
      setCards((prev) =>
        prev.map((card, idx) => (idx === first || idx === second ? { ...card, matched: true } : card))
      );
      setFlipped([]);
      return;
    }

    const timer = setTimeout(() => setFlipped([]), 700);
    return () => clearTimeout(timer);
  }, [cards, flipped]);

  const memoryWon = useMemo(() => cards.every((card) => card.matched), [cards]);

  function submitGiveaway(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGiveawayDone(true);
    const names = ['Lina', 'Adam', 'Noor', 'Yousef', 'Sara'];
    setWinner(names[Math.floor(Math.random() * names.length)]);
  }

  function popBubble(id: number) {
    setBubbleScore((s) => s + 1);
    setBubbles((prev) => prev.filter((bubble) => bubble.id !== id));
  }

  function flipCard(index: number) {
    if (flipped.length === 2 || flipped.includes(index) || cards[index].matched) return;
    setFlipped((prev) => [...prev, index]);
    setMemoryMoves((m) => m + 1);
  }

  function resetMemory() {
    setCards(shuffleCards());
    setFlipped([]);
    setMemoryMoves(0);
  }

  function hitTarget() {
    setTargetScore((s) => s + 1);
    setTargetPos({ x: Math.random() * 85, y: Math.random() * 75 });
  }

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-yellow-100 via-sky-100 to-emerald-100 p-6 shadow-xl md:p-10">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-yellow-300/60 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-blue-300/50 blur-3xl" />
        <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-white px-4 py-1 text-xs font-semibold text-slate-700 shadow">Premium Indoor Fun Zone</span>
            <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl">The Most Fun Kids Play Area in {city} 🎈</h1>
            <p className="text-base text-slate-700 md:text-lg">Safe, colorful, and unforgettable fun for your kids.</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">Book Now</Button>
              <Button variant="outline" className="border-white bg-white/80 hover:bg-white">View Offers</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['🏰', '🫧', '🧱', '⚽'].map((item) => (
              <div key={item} className="group flex h-32 items-center justify-center rounded-3xl bg-white/85 text-5xl shadow-lg transition hover:-translate-y-1 hover:scale-[1.03]">
                <span className="animate-pulse">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-bold">Why Parents Love Us</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-white/70 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <p className="text-3xl">{feature.icon}</p>
              <h3 className="mt-3 font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-bold">Gallery</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item) => (
            <Dialog key={item.title}>
              <DialogTrigger asChild>
                <button onClick={() => setLightbox(item)} className={`h-44 rounded-3xl bg-gradient-to-br ${item.bg} p-4 text-left text-white shadow-lg transition hover:scale-[1.02]`}>
                  <span className="text-4xl">{item.emoji}</span>
                  <p className="mt-3 font-semibold">{item.title}</p>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-xl rounded-3xl bg-white p-0">
                <div className={`h-72 rounded-3xl bg-gradient-to-br p-8 text-white ${item.bg}`}>
                  <p className="text-6xl">{lightbox?.emoji ?? item.emoji}</p>
                  <h3 className="mt-5 text-3xl font-bold">{lightbox?.title ?? item.title}</h3>
                  <p className="mt-2 text-white/90">Tap, share, and preview our vibrant play area moments.</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border-2 border-dashed border-amber-300 bg-amber-50 p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-900">Special Offers</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {OFFERS.map((offer) => (
            <div key={offer} className="rounded-2xl bg-white p-5 shadow transition duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-yellow-100 hover:to-rose-100 hover:shadow-xl">
              <p className="font-semibold text-slate-800">{offer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-gradient-to-br from-sky-50 to-purple-50 p-6 shadow-lg">
        <h2 className="text-2xl font-bold">🎁 Win Free Entry!</h2>
        <form onSubmit={submitGiveaway} className="mt-4 grid gap-3 md:max-w-xl md:grid-cols-2">
          <input required placeholder="Name" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-400" />
          <input required placeholder="Phone number" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-400" />
          <Button type="submit" className="md:col-span-2 md:w-fit">Join Giveaway</Button>
        </form>
        {giveawayDone && (
          <div className="mt-4 animate-in fade-in zoom-in rounded-2xl bg-white p-4 shadow">
            <p className="font-semibold text-emerald-600">Success! You are in 🎉</p>
            <p className="text-sm text-slate-600">Lucky wheel simulation picked: <span className="font-semibold text-slate-900">{winner}</span></p>
          </div>
        )}
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Mini Games Zone</h2>
        <div className="grid gap-4 xl:grid-cols-3">
          <div className="rounded-3xl bg-white p-5 shadow-lg">
            <h3 className="font-semibold">Bubble Pop Game</h3>
            <p className="text-sm text-slate-600">Score: {bubbleScore}</p>
            <div className="relative mt-3 h-48 overflow-hidden rounded-2xl bg-gradient-to-b from-cyan-100 to-blue-200">
              {bubbles.map((bubble) => (
                <button
                  key={bubble.id}
                  onClick={() => popBubble(bubble.id)}
                  className="absolute bottom-0 rounded-full bg-white/80 shadow transition hover:scale-110"
                  style={{
                    left: `${bubble.left}%`,
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                    animation: `floatUp 6s linear ${bubble.delay}s infinite`
                  }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-lg">
            <h3 className="font-semibold">Memory Match</h3>
            <p className="text-sm text-slate-600">Moves: {memoryMoves}</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {cards.map((card, idx) => {
                const show = flipped.includes(idx) || card.matched;
                return (
                  <button
                    key={card.id}
                    onClick={() => flipCard(idx)}
                    className={`h-14 rounded-xl text-2xl transition ${show ? 'bg-emerald-100' : 'bg-slate-100 hover:bg-slate-200'}`}
                  >
                    {show ? card.emoji : '❔'}
                  </button>
                );
              })}
            </div>
            <Button variant="outline" className="mt-3" onClick={resetMemory}>Reset</Button>
            {memoryWon && <p className="mt-2 text-sm font-semibold text-emerald-600">Great memory! 🎉</p>}
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-lg">
            <h3 className="font-semibold">Mini Target Game</h3>
            <p className="text-sm text-slate-600">Hits: {targetScore}</p>
            <div className="relative mt-3 h-48 rounded-2xl bg-gradient-to-br from-rose-100 to-orange-100">
              <button
                onClick={hitTarget}
                className="absolute rounded-full bg-red-500 text-white shadow-lg transition hover:scale-110"
                style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%`, width: 40, height: 40 }}
              >
                🎯
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-3xl bg-white p-6 shadow-lg md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">Location & Contact</h2>
          <p className="text-slate-600">Kids Joy Arena, Green Avenue, Downtown, {city}</p>
          <p className="text-slate-600">Open daily: 9:00 AM – 10:00 PM</p>
          <a href="https://wa.me/1234567890" className="inline-flex rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600">Chat with us</a>
        </div>
        <iframe
          title="Kids Play Area Map"
          className="h-64 w-full rounded-2xl border-0"
          loading="lazy"
          src="https://www.google.com/maps?q=Times+Square,+New+York&output=embed"
        />
      </section>

      <section className="rounded-3xl bg-slate-900 p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold">Follow us for daily fun moments</p>
            <p className="text-sm text-slate-300">Instagram · TikTok | +1 (555) 000-1111</p>
          </div>
          <div className="flex items-center gap-2 text-2xl">
            <a href="#" aria-label="Instagram" className="rounded-full bg-white/10 p-3 hover:bg-white/20">📸</a>
            <a href="#" aria-label="TikTok" className="rounded-full bg-white/10 p-3 hover:bg-white/20">🎵</a>
          </div>
        </div>
      </section>
    </div>
  );
}
