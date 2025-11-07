import Header from "@/components/Header";

export default function AppLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
    </>
  );
}
