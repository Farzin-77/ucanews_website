const navLinks = [
  { label: "Home", href: "/" },
  { label: "Khorog", href: "/khorog" },
  { label: "Naryn", href: "/naryn" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export function SiteHeader({ currentPath = "/" }: { currentPath?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="/" className="flex items-center gap-2.5">
          <span className="relative h-10 w-[5.75rem] shrink-0 overflow-hidden sm:h-11 sm:w-[6.25rem]">
            <img
              src="/logo.png"
              alt="UCA News logo"
              className="h-full w-full scale-[1.35] object-cover object-center"
            />
          </span>
          <span className="text-lg font-bold tracking-tight text-neutral-900">
            UCA News
          </span>
        </a>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={
                      isActive
                        ? "text-red-700"
                        : "text-neutral-700 transition-colors hover:text-red-700"
                    }
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
