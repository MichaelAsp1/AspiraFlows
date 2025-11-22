// IMPORTANT: this file must be at:
// app/(marketing)/layout.tsx   (note the parentheses)

import Header from "../../components/Header";  // or "../../components/Header" if no alias
import Footer from "../../components/Footer";

export default function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark-grid-bg">
      <div className="bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 text-cyan-400 text-xs text-center py-1 border-b border-cyan-500/30">
        <div className="neon-text-cyan">✨ Experience the future of job searching</div>
      </div>
      <Header />
      <main className="flex-1 relative">
        {/* Ambient neon glow effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
