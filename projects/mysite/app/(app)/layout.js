import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-br from-purple-50/40 via-white to-indigo-50/40 text-gray-900">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
