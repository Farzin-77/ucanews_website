export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh min-h-screen overflow-hidden bg-white text-black">
      {children}
    </div>
  );
}
