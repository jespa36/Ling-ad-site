const NAV = [
  { href: '#map', label: 'Map' },
  { href: '#gaps', label: 'Gaps' },
  { href: '#languages', label: 'Languages' },
  { href: '#method', label: 'Method' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[1100] border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-6">
        <a href="#" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary font-serif text-lg text-primary-foreground">
            L
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg text-foreground">LinguaChicago</span>
            <span className="text-[11px] text-muted-foreground">Linguistic Advocacy Project</span>
          </span>
        </a>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-1 text-sm">
            {NAV.map((item) => (
              <li key={item.href} className="hidden sm:block">
                <a href={item.href} className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#map" className="rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground">
                Explore
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
