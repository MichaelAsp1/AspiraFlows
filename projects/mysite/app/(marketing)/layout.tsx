// app/(marketing)/layout.tsx

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "#0B1120" }}>
      
      {/* Dark radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-800/20 via-transparent to-transparent"></div>

      {/* Subtle grid pattern with smooth fade */}
      <div
        className="
          absolute inset-x-0 top-0 
          h-[80vh] 
          dark-grid-bg 
          pointer-events-none
          [mask-image:linear-gradient(to_bottom,white,transparent)]
        "
      />

      {/* Ambient glow blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-500/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="flex-1 relative z-10">{children}</main>

      <Footer />
    </div>
  );
}
