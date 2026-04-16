import React, { useRef, useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2, Music, Plus, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_VIDEOS = [
  {
    id: '1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    username: '@nature_lover',
    description: 'Caught this incredible moment on camera! 🔥 #nature #amazing',
    song: 'Original Sound - nature_lover',
    likes: '1.2M',
    comments: '4,102',
    shares: '12K',
    avatar: 'https://picsum.photos/seed/user1/100/100'
  },
  {
    id: '2',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    username: '@dreamer3d',
    description: 'My latest test render ✨ #3d #animation #blender',
    song: 'Elephants Dream Theme',
    likes: '890K',
    comments: '1,200',
    shares: '3,400',
    avatar: 'https://picsum.photos/seed/user2/100/100'
  },
  {
    id: '3',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    username: '@scifi_geek',
    description: 'Tears of Steel recap going hard right now 🎬🍿 #scifi #cinema',
    song: 'Tears of Steel OST',
    likes: '2.5M',
    comments: '12K',
    shares: '50K',
    avatar: 'https://picsum.photos/seed/user3/100/100'
  },
  {
    id: '4',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    username: '@daily_vibes',
    description: 'Just enjoying the ride! 🚗✨ #joyride #vibes',
    song: 'Cruising Beats - DJ Cool',
    likes: '450K',
    comments: '905',
    shares: '1.1K',
    avatar: 'https://picsum.photos/seed/user4/100/100'
  }
];

function VideoPost({ post, isActive }: { post: any, isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (isActive) {
      if (isPlaying) {
        videoRef.current?.play().catch(e => console.log('Autoplay prevented:', e));
      }
    } else {
      videoRef.current?.pause();
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive, isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play().catch(e => console.log('Play prevented:', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-[100dvh] md:h-full snap-start snap-always bg-zinc-900 overflow-hidden flex-shrink-0">
      <video
        ref={videoRef}
        src={post.url}
        className="w-full h-[100dvh] md:h-full object-cover"
        loop
        playsInline
        muted
        onClick={togglePlay}
      />
      
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none text-white/60"
          >
            <Play fill="currentColor" size={80} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute right-4 bottom-24 md:bottom-28 pb-safe flex flex-col items-center gap-6">
        <div className="relative w-12 h-12">
          <img src={post.avatar} alt={post.username} className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-lg" />
          <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-rose-500 rounded-full text-white p-0.5 shadow-md hover:scale-110 transition-transform">
            <Plus size={14} strokeWidth={3} />
          </button>
        </div>

        <button className="flex flex-col items-center gap-1 group" onClick={() => setIsLiked(!isLiked)}>
          <div className="p-3 group-hover:bg-black/20 rounded-full transition-colors drop-shadow-xl">
            <Heart 
              size={32} 
              className={isLiked ? "text-rose-500 drop-shadow-md" : "text-white drop-shadow-md"} 
              fill={isLiked ? "currentColor" : "none"} 
              strokeWidth={isLiked ? 0 : 2}
            />
          </div>
          <span className="text-white text-xs font-semibold drop-shadow-md">{post.likes}</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="p-3 group-hover:bg-black/20 rounded-full transition-colors drop-shadow-xl">
            <MessageCircle size={32} className="text-white drop-shadow-md" fill="rgba(0,0,0,0.2)" strokeWidth={2} />
          </div>
          <span className="text-white text-xs font-semibold drop-shadow-md">{post.comments}</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="p-3 group-hover:bg-black/20 rounded-full transition-colors drop-shadow-xl">
            <Share2 size={32} className="text-white drop-shadow-md" fill="rgba(0,0,0,0.2)" strokeWidth={2} />
          </div>
          <span className="text-white text-xs font-semibold drop-shadow-md">{post.shares}</span>
        </button>
        
        <div className="w-12 h-12 rounded-full mt-4 flex items-center justify-center bg-zinc-800 border-[8px] border-zinc-900 animate-spin-slow shadow-xl">
          <img src={post.avatar} alt="Record" className="w-6 h-6 rounded-full object-cover" />
        </div>
      </div>

      <div className="absolute bottom-8 left-4 right-20 flex flex-col gap-2 pb-safe md:pb-6">
        <h3 className="text-white font-bold text-[17px] drop-shadow-md cursor-pointer hover:underline">{post.username}</h3>
        <p className="text-white/90 text-sm drop-shadow-md whitespace-pre-wrap">{post.description}</p>
        
        <div className="flex items-center gap-2 mt-2 w-full pr-12">
          <Music size={16} className="text-white shrink-0 drop-shadow-md" />
          <div className="overflow-hidden w-full relative h-[18px] fade-edges">
            <div className="animate-marquee absolute whitespace-nowrap text-white text-[15px] font-medium drop-shadow-md">
              {post.song} &nbsp;&nbsp;&nbsp;&nbsp; {post.song}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    const newIndex = Math.round(scrollTop / clientHeight);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center font-sans overflow-hidden">
      <div className="w-full max-w-[420px] h-[100dvh] md:h-[860px] md:max-h-[95vh] md:rounded-[40px] overflow-hidden relative shadow-2xl md:border-[8px] md:border-zinc-800 bg-zinc-950">
        
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-center gap-6 pt-12 px-4 pb-12 bg-gradient-to-b from-black/80 to-transparent pointer-events-none fade-in">
          <span className="text-white/60 font-semibold text-lg hover:text-white transition-colors pointer-events-auto cursor-pointer drop-shadow-md">Following</span>
          <span className="text-white font-bold text-lg pointer-events-auto cursor-pointer relative drop-shadow-md">
            For You
            <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-[30px] h-1 bg-white rounded-full"></div>
          </span>
        </div>

        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth"
        >
          {MOCK_VIDEOS.map((post, index) => (
            <VideoPost 
              key={post.id} 
              post={post} 
              isActive={index === activeIndex} 
            />
          ))}
        </div>
        
        {/* Mock Bottom Tab Bar for Desktop to complete the look */}
        <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-black items-center justify-around px-2 text-white z-10 hidden md:flex border-t border-zinc-900">
             <div className="flex flex-col items-center gap-1 cursor-pointer">
                <span className="font-bold text-[13px]">Home</span>
             </div>
             <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
                <span className="font-semibold text-[13px]">Friends</span>
             </div>
             <div className="w-12 h-[30px] rounded-[10px] flex items-center justify-center cursor-pointer relative">
               <div className="absolute inset-y-0 left-0 w-8 bg-cyan-400 rounded-lg"></div>
               <div className="absolute inset-y-0 right-0 w-8 bg-rose-500 rounded-lg"></div>
               <div className="absolute inset-0 bg-white rounded-[10px] flex items-center justify-center -m-x-1 z-10">
                 <Plus size={20} className="text-black font-bold" strokeWidth={3} />
               </div>
             </div>
             <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
                <span className="font-semibold text-[13px]">Inbox</span>
             </div>
             <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
                <span className="font-semibold text-[13px]">Profile</span>
             </div>
        </div>

      </div>
    </div>
  );
}
