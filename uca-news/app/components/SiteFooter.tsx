export function SiteFooter() {
  return (
    <footer className="bg-red-700 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm sm:flex-row sm:px-6">
        <p>UCA News {"\u00A9"} 2026</p>
        <div className="flex items-center gap-6">
          <a href="#" className="transition-opacity hover:opacity-80">
            Instagram
          </a>
          <a href="#" className="transition-opacity hover:opacity-80">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
