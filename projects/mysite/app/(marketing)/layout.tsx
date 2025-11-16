// IMPORTANT: this file must be at:
// app/(marketing)/layout.tsx   (note the parentheses)

import Header from "../../components/Header";  // or "../../components/Header" if no alias
import Footer from "../../components/Footer";

export default function MarketingLayout({ children }) {
  return (
    <>
      <div className="bg-red-500 text-white text-xs text-center">
      </div>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
