/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  ChevronLeft, 
  Share2, 
  Download, 
  Send, 
  Eye,
  Check,
  Copy,
  X,
  MessageCircle,
  Video
} from 'lucide-react';

// --- Types ---
interface Post {
  id: number;
  title: string;
  img: string;
  views: string;
  link: string;
}

// --- Data ---
const POSTS: Post[] = [
  { id: 7, title: 'এই মালের  ভাইরাল ভিডিও দিলাম । অস্থির একটা মাল 😧', img: 'https://i.ibb.co/PzQ9TxBr/file-1927.jpg', views: '১৮.৪K', link: 'https://www.profitablecpmratenetwork.com/gwmuf1afm?key=6f16927b180a36f7b179abfffa3685ca' },
  { id: 4, title: 'এই কচি মেয়ের দু*দ আর ভো*দা দেখলে হাত মারতেই হবে 🚸', img: 'https://i.ibb.co/XZhfWYvF/file-1923.jpg', views: '২০.১K', link: 'https://www.profitablecpmratenetwork.com/ggy3ka32wm?key=142c34383de7db50808802c5d3c8b1c9' },
  { id: 5, title: 'কচি মেয়ের এত বড় এগুলা কেমনে কি 🥵🥵', img: 'https://i.ibb.co/8GGzH1K/file-1924.jpg', views: '৭.৩K', link: 'https://www.profitablecpmratenetwork.com/q22i5byud?key=dcf3fce3472d6ba711a0feee502b7013' },
  { id: 6, title: ' tik tok  আর ভাইরাল মেয়ের ভাইরাল শসার ভিডিও 🥵', img: 'https://i.ibb.co/nM06BWPc/file-1926.jpg', views: '৩১.৭K', link: 'https://www.profitablecpmratenetwork.com/ss7nmu0apx?key=a5ea4453215928f238b0b35845fef01f' },
  { id: 8, title: 'এদের ফুল collection আছে 🔥', img: 'https://i.ibb.co/G3kg5XKv/file-1928.jpg', views: '২৫.৬K', link: 'https://www.profitablecpmratenetwork.com/dfxs2nu1wq?key=4d1218daa319186cb7d95e989135779c' },
  { id: 9, title: 'সেই একটা সেক্সি মাল মাগির দু*দ দুইটা 🥵', img: 'https://i.ibb.co/8Lr2nZqy/file-1933.jpg', views: '৩০.২K', link: 'https://www.profitablecpmratenetwork.com/dyyctbfkq?key=c298d4bf82cd56f091274372b74742b2' },
  { id: 1, title: 'অবশেষে চলে আসলো miss chocolate এর ভাইরাল ভিডিও ♥️🌸', img: 'https://i.ibb.co/xtLD7RC1/file-1929.jpg', views: '১২.৫K', link: 'https://www.profitablecpmratenetwork.com/b95149mfm?key=72f73ad9f2fe474fe1fafb711a3598ae' },
  { id: 2, title: 'নওরীন আফরোজ প্রিয়ার ভাইরাল ভিডিও। 🔥', img: 'https://i.ibb.co/gQFQXbr/file-1930.jpg', views: '৯.৮K', link: 'https://www.profitablecpmratenetwork.com/pyyjv65j?key=95de829956a4f5b623086a7513a2f5e9' },
  { id: 3, title: '2 মিনিট 54 সেকেন্ডের সেই ভাইরাল ভিডিও ...🌸❤️🩹', img: 'https://i.ibb.co/1c2YHzk/file-1931.jpg', views: '১৫.২K', link: 'https://www.profitablecpmratenetwork.com/c8w3rysv?key=4345f99e5ef6faca4564bb3e54a382ea' },
];

const TELEGRAM_LINK = "https://t.me/+So6eVloKECI2YjM1";
const VIDEO_LINK_1 = "https://t.co/uHN1WXseAP";
const VIDEO_LINK_2 = "https://text-designpro-bd.vercel.app";

// --- Components ---

const Toast = ({ message, onHide }: { message: string; onHide: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onHide, 2500);
    return () => clearTimeout(timer);
  }, [onHide]);

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      exit={{ y: -20, opacity: 0, x: '-50%' }}
      className="fixed top-6 left-1/2 z-[200] bg-white border border-neutral-200 shadow-xl px-5 py-3 rounded-2xl flex items-center gap-3"
    >
      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white">
        <Check size={12} strokeWidth={3} />
      </div>
      <span className="text-sm font-medium text-neutral-800">{message}</span>
    </motion.div>
  );
};

export default function App() {
  const [page, setPage] = useState<'home' | 'detail'>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [downloadStep, setDownloadStep] = useState(0);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  const handlePostClick = (post: Post) => {
    // 1. Set the state locally first so UI is ready
    setSelectedPost(post);
    setPage('detail');
    setDownloadStep(0);
    
    // 2. Update the hash so the browser has a history entry for this post
    window.location.hash = `post=${post.id}`;
    
    // 3. Use a very small timeout to ensure the history/hash is committed 
    // before the page navigates away.
    setTimeout(() => {
      window.location.href = post.link;
    }, 100);
  };

  const handleBack = () => {
    setPage('home');
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = '';
  };

  const handleDownload = () => {
    if (!selectedPost) return;
    if (downloadStep === 0) {
      window.open(selectedPost.link, '_blank');
      setDownloadStep(1);
      showToast('লিংক খোলা হয়েছে!');
    } else {
      window.open(selectedPost.link, '_blank');
      showToast('ভিডিও ডাউনলোড হচ্ছে!');
    }
  };

  const handleWatch = () => {
    if (!selectedPost) return;
    window.open(selectedPost.link, '_blank');
    showToast('ভিডিও প্লে হচ্ছে!');
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      showToast('লিঙ্ক কপি হয়েছে!');
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#post=')) {
        const id = parseInt(hash.replace('#post=', ''));
        const post = POSTS.find(p => p.id === id);
        if (post) {
          setSelectedPost(post);
          setPage('detail');
        }
      } else {
        setPage('home');
        setSelectedPost(null);
      }
    };

    window.addEventListener('hashchange', handlePopState);
    handlePopState(); // Re-enabled to allow sharing links to specific posts

    return () => window.removeEventListener('hashchange', handlePopState);
  }, []);

  // Prevent default copy/context menu on images
  const preventImageMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-screen-xl mx-auto min-h-screen bg-white">
      <AnimatePresence>
        {toastMessage && (
          <Toast message={toastMessage} onHide={() => setToastMessage(null)} />
        )}
      </AnimatePresence>

      {/* --- Home Page --- */}
      {page === 'home' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="px-4 py-8 md:py-12"
        >
          <header className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-100">
                <Video size={20} className="text-white" />
              </div>
              <h2 className="text-neutral-900 font-black text-2xl tracking-tight">All Pro Video</h2>
            </div>
            <div className="w-full h-px bg-neutral-200/50 mt-6 mb-8"></div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POSTS.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => handlePostClick(post)}
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-sm border border-neutral-100 mb-4 bg-neutral-50">
                  <img 
                    src={post.img} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none select-none"
                    referrerPolicy="no-referrer"
                    onContextMenu={preventImageMenu}
                    draggable="false"
                  />
                  {/* Video Icon Overlay */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Video size={18} className="text-white" />
                  </div>
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl">
                      <Play size={22} className="text-neutral-900 fill-current ml-1" />
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-neutral-900 font-bold text-lg leading-tight mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-neutral-500 font-semibold text-sm uppercase tracking-wider">
                    <Eye size={16} className="text-neutral-400" />
                    {post.views} Views
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* --- Detail Page --- */}
      {page === 'detail' && selectedPost && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="px-0 sm:px-4 py-6 md:py-10 max-w-2xl mx-auto"
        >
          <div className="px-4 mb-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-neutral-500 font-bold text-sm bg-neutral-100 px-4 py-2.5 rounded-2xl hover:bg-neutral-200 transition-colors"
              >
                <ChevronLeft size={18} />
                ফিরে যান
              </button>
              
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 text-neutral-600 font-bold text-sm bg-neutral-100 px-4 py-2.5 rounded-2xl hover:bg-neutral-200 transition-colors border border-transparent active:border-neutral-300"
              >
                <Share2 size={18} />
                লিঙ্ক কপি করুন
              </button>
            </div>
          </div>

          <div className="bg-white rounded-t-[3rem] sm:rounded-[3rem] p-4 sm:p-8">
            {/* Thumbnail with Icon */}
            <div 
              className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-neutral-50 mb-8 border border-neutral-100 cursor-pointer group/thumb"
              onClick={handleWatch}
            >
              <img 
                src={selectedPost.img} 
                alt="" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-105 pointer-events-none select-none" 
                onContextMenu={preventImageMenu}
                referrerPolicy="no-referrer"
                draggable="false"
              />
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center border border-white/20">
                <Video size={24} className="text-white" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/95 shadow-2xl rounded-full flex items-center justify-center transition-transform group-hover/thumb:scale-110">
                <Play size={28} className="text-neutral-900 fill-current ml-1" />
              </div>
            </div>

            <div className="px-2">
              {/* Title below thumbnail */}
              <h1 className="text-2xl md:text-3xl font-black text-neutral-900 leading-tight mb-8">
                {selectedPost.title}
              </h1>

              {/* Action Buttons */}
              <div className="space-y-4">
                {/* Download Button */}
                <button 
                  onClick={handleDownload}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-16 flex items-center justify-center gap-3 bg-red-600 text-white font-black text-lg rounded-3xl shadow-xl shadow-red-100 hover:bg-red-700 transition-all active:scale-[0.98]"
                >
                  <Download size={22} strokeWidth={2.5} />
                  {downloadStep === 0 ? 'ডাউনলোড করুন' : 'ফাইল ডাউনলোড শুরু করুন'}
                </button>

                {/* Watch Button */}
                <button 
                  onClick={handleWatch}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-16 flex items-center justify-center gap-3 bg-neutral-900 text-white font-black text-lg rounded-3xl shadow-xl hover:bg-neutral-800 transition-all active:scale-[0.98]"
                >
                  <Play size={22} className="fill-current" />
                  ভিডিওটি দেখুন
                </button>

                {/* Telegram Button */}
                <button 
                  onClick={() => {
                    window.open(TELEGRAM_LINK, '_blank');
                    showToast('টেলিগ্রাম লিঙ্ক খোলা হয়েছে!');
                  }}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-16 flex items-center justify-center gap-3 bg-sky-500 text-white font-black text-lg rounded-3xl shadow-xl shadow-sky-100 hover:bg-sky-600 transition-all no-underline active:scale-[0.98]"
                >
                  <Send size={20} />
                  টেলিগ্রাম চ্যানেলে জয়েন করুন
                </button>
              </div>

              {/* Footer text */}
              <div className="mt-12 text-center text-neutral-400 text-xs font-bold uppercase tracking-widest leading-loose">
                Premium Content • High Definition • Secure Portal
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
