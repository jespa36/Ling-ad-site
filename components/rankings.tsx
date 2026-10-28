import { STATUS_META, largestGaps, representationRatio, strongestRepresentation, visibilityGap } from '@/lib/metrics'
import { DataPending } from './data-pending'

export function Rankings() {
  const gaps = largestGaps(10)
  const strongest = strongestRepresentation(5)
  const maxGap = Math.max(1, ...gaps.map((a) => visibilityGap(a) ?? 0))

  return (
    <section id="gaps" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 md:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">Where the gap is widest</p>
        <h2 className="mt-3 text-balance font-serif text-3xl text-foreground md:text-4xl">Many voices, few signs</h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          The visibility gap is the difference, in percentage points, between residents who speak another language at
          home and public signage that includes one.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Largest visibility gaps</h3>
          {gaps.length === 0 ? (
            <DataPending title="Ranking not available yet" className="mt-4">
              Requires both the census speaker share and a signage survey for at least one community area.
            </DataPending>
          ) : (
            <ol className="mt-4 flex flex-col">
              {gaps.map((area, i) => {
                const gap = visibilityGap(area) ?? 0
                return (
                  <li key={area.id} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-border py-3">
                    <span className="font-serif text-lg tabular-nums text-muted-foreground">{i + 1}</span>
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <span className="flex items-baseline gap-2">
                        <span className="truncate font-medium text-foreground">{area.name}</span>
                        <span className="text-xs text-muted-foreground">{area.languages[0]?.language}</span>
                      </span>
                      <span className="h-1.5 overflow-hidden rounded-full bg-secondary">
                        <span
                          className="block h-full rounded-full"
                          style={{ width: `${(Math.max(0, gap) / maxGap) * 100}%`, backgroundColor: STATUS_META.under.color }}
                        />
                      </span>
                    </div>
                    <span className="text-right text-sm tabular-nums text-foreground">
                      <span className="font-semibold">{gap}</span> pts
                    </span>
                  </li>
                )
              })}
            </ol>
          )}
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground">Models of representation</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Multilingual communities where public space most closely matches spoken language.
          </p>
          {strongest.length === 0 ? (
            <p className="mt-5 text-sm text-muted-foreground">
              Will list areas where at least 25% of residents speak another language and signage keeps pace.
            </p>
          ) : (
            <ul className="mt-5 flex flex-col gap-4">
              {strongest.map((area) => (
                <li key={area.id} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground">{area.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {area.languages.map((l) => l.language).slice(0, 2).join(', ')}
                    </p>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums"
                    style={{ backgroundColor: `${STATUS_META.represented.color}1f`, color: STATUS_META.represented.color }}
                  >
                    {Math.min(100, Math.round((representationRatio(area) ?? 0) * 100))}% match
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
