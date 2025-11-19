import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
