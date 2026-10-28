import { cityStats } from '@/lib/metrics'
import { SNAPSHOTS } from '@/lib/data'

const STEPS = [
  {
    title: 'Who speaks what',
    body: 'Planned source: American Community Survey 5-year estimates (tables C16001 and S1601) by census tract, aggregated to Chicago’s 77 community areas. CMAP Community Data Snapshots publish these at the community-area level.',
  },
  {
    title: 'What is visible',
    body: 'Planned source: a field survey of public-facing signs (storefronts, government notices, transit, community boards), recording every language on each sign.',
  },
  {
    title: 'Measuring the gap',
    body: 'Visibility divided by speaker share. 85% or above counts as well represented, 50–85% as partially represented, and below 50% as under-represented.',
  },
  {
    title: 'What it misses',
    body: 'Census data does not capture dialects such as African American English, many Indigenous languages, or ASL, and sign counts cannot measure spoken services.',
  },
]

export function Methodology() {
  const stats = cityStats()
  const progress = [
    { label: 'Census language data', value: stats.withCensus },
    { label: 'Signage survey', value: stats.withSignage },
  ]

  return (
    <section id="method" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 md:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">Methodology</p>
        <h2 className="mt-3 text-balance font-serif text-3xl text-foreground md:text-4xl">How the map is built</h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Inspired by linguistic landscape research such as LinguaSnap Hamburg, this project pairs demographic data with
          on-the-ground observation of the written languages that shape public space.
        </p>
      </div>
      <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-3 bg-background p-6">
            <span className="font-serif text-3xl text-accent">0{i + 1}</span>
            <h3 className="font-semibold text-foreground">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-lg border border-border bg-card p-6">
        <h3 className="text-sm font-semibold text-foreground">Data collection progress</h3>
        <ul className="mt-4 flex flex-col gap-4">
          {progress.map((p) => (
            <li key={p.label} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-muted-foreground">{p.label}</span>
                <span className="tabular-nums text-foreground">
                  {p.value} / {stats.total} areas
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: `${(p.value / stats.total) * 100}%` }} />
              </div>
            </li>
          ))}
          <li className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">Field snapshots</span>
            <span className="tabular-nums text-foreground">{SNAPSHOTS.length} recorded</span>
          </li>
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Only real, sourced data is shown on this site. Areas without data appear in gray as &ldquo;No data yet.&rdquo;
          Community area boundaries come from the City of Chicago Data Portal.
        </p>
      </div>
    </section>
  )
}
