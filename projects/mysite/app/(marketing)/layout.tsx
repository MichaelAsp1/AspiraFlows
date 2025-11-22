// IMPORTANT: this file must be at:
// app/(marketing)/layout.tsx   (note the parentheses)

import Header from "../../components/Header";  // or "../../components/Header" if no alias
import Footer from "../../components/Footer";

export default function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen relative" style={{backgroundColor: '#0B1120'}}>
      {/* Dark radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-800/20 via-transparent to-transparent"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 dark-grid-bg"></div>
      
      {/* Ambient glow blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-500/6 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 text-cyan-400 text-xs text-center py-1 border-b border-cyan-500/30">
        <div className="neon-text-cyan">✨ Experience the future of job searching</div>
      </div>
      <Header />
      <main className="flex-1 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
