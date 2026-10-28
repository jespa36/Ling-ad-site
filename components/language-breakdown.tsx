import { STATUS_META, languageRepresentation } from '@/lib/metrics'
import { DataPending } from './data-pending'

function coverageColor(coverage: number) {
  if (coverage >= 85) return STATUS_META.represented.color
  if (coverage >= 50) return STATUS_META.partial.color
  return STATUS_META.under.color
}

export function LanguageBreakdown() {
  const rows = languageRepresentation()

  return (
    <section id="languages" className="scroll-mt-20 border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">By language</p>
            <h2 className="mt-3 text-balance font-serif text-3xl text-foreground md:text-4xl">
              Not every language is equally visible
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Coverage estimates how much of each language community lives in neighborhoods where public signage keeps
              pace with speakers.
            </p>
          </div>
          {rows.length === 0 ? (
            <DataPending title="Language coverage not available yet">
              Requires per-language speaker shares (for example, ACS table C16001) plus signage survey results for the
              same community areas.
            </DataPending>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th scope="col" className="py-2 pr-4 font-medium">Language</th>
                    <th scope="col" className="py-2 pr-4 font-medium">Areas</th>
                    <th scope="col" className="w-1/2 py-2 font-medium">Visibility coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.language} className="border-b border-border">
                      <th scope="row" className="py-3 pr-4 text-left font-medium text-foreground">{row.language}</th>
                      <td className="py-3 pr-4 tabular-nums text-muted-foreground">{row.areas}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <span className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                            <span
                              className="block h-full rounded-full"
                              style={{ width: `${row.coverage}%`, backgroundColor: coverageColor(row.coverage) }}
                            />
                          </span>
                          <span className="w-10 text-right tabular-nums text-foreground">{row.coverage}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
