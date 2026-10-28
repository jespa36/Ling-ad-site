import { cityStats } from '@/lib/metrics'

export function Hero() {
  const stats = cityStats()
  const hasScores = stats.scored > 0
  const figures = [
    {
      value: hasScores ? `${stats.under}` : '—',
      label: 'community areas where community languages are under-represented',
    },
    {
      value: stats.avgSpeakers !== null ? `${stats.avgSpeakers}%` : '—',
      label: 'average share of residents speaking another language at home*',
    },
    {
      value: stats.avgVisibility !== null ? `${stats.avgVisibility}%` : '—',
      label: 'average share of public signage that includes those languages*',
    },
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 pb-12 md:px-6 md:pt-20">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Language equity in public space</p>
          <h1 className="mt-4 text-balance font-serif text-4xl leading-[1.05] text-foreground md:text-6xl">
            Who gets to be seen on Chicago&apos;s streets?
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            The signs, notices, and wayfinding in public space don&apos;t always reflect the languages people speak at
            home. This map compares the languages residents speak with the languages they can see, and shows where
            that gap is widest.
          </p>
        </div>
        <dl className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 lg:grid-cols-1">
          {figures.map((f) => (
            <div key={f.label} className="flex items-baseline gap-4 bg-card p-5">
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-serif text-4xl tabular-nums text-foreground">{f.value}</dd>
              <p aria-hidden="true" className="text-sm leading-snug text-muted-foreground">
                {f.label}
              </p>
            </div>
          ))}
        </dl>
      </div>
      <p className="mt-4 text-xs text-muted-foreground lg:text-right">
        {hasScores
          ? `*Across the ${stats.scored} community areas with both census and signage data where at least 10% of residents speak another language.`
          : `No data has been added yet. Figures will appear once census and signage data are added (0 of ${stats.total} areas so far).`}
      </p>
    </section>
  )
}
