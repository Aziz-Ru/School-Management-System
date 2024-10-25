export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="md:overflow-auto">
      <section>{children}</section>
    </main>
  );
}
