
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="flex min-h-screen items-center bg-slate-100 p-4">
        {children}
      </section>
    </>
  );
}
