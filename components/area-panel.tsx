import { MousePointerClick, X } from 'lucide-react'
import { SNAPSHOTS, type CommunityArea } from '@/lib/data'
import { STATUS_META, STATUS_ORDER, cityStats, equityStatus, visibilityGap, type EquityStatus } from '@/lib/metrics'
import { DataPending } from './data-pending'

const ADVOCACY: Partial<Record<EquityStatus, string>> = {
  represented:
    'Public language here largely mirrors who lives here. Document what works, such as bilingual street signs and multilingual notices, as a model for other neighborhoods.',
  partial:
    'Community languages appear in public space but lag behind the share of speakers. Look at which sign types (civic, transit, commercial) are missing them.',
  under:
    'A large share of residents speak a language that is rarely visible in public space. Priorities could include translated city services, multilingual wayfinding, and resident-led signage audits.',
  english:
    'Few residents speak another language at home. Census language data does not capture dialects such as African American English, so dialect and heritage visibility deserve separate study.',
}

function Bar({ label, value, color }: { label: string; value: number | null; color: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="shrink-0 font-semibold tabular-nums text-foreground">
          {value === null ? <span className="font-normal text-muted-foreground">No data yet</span> : `${value}%`}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        {value !== null && <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />}
      </div>
    </div>
  )
}

function CityOverview() {
  const stats = cityStats()
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-start gap-3 rounded-md border border-dashed border-border p-3 text-sm text-muted-foreground">
        <MousePointerClick className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        Select a community area on the map to see its language profile and visibility gap.
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Citywide</p>
        <h3 className="mt-1 font-serif text-2xl text-foreground">{stats.total} community areas</h3>
      </div>
      <ul className="flex flex-col gap-3">
        {STATUS_ORDER.map((status) => (
          <li key={status} className="flex items-center gap-3">
            <span className="size-3 rounded-sm" style={{ backgroundColor: STATUS_META[status].color }} aria-hidden="true" />
            <span className="flex-1 text-sm text-foreground">{STATUS_META[status].label}</span>
            <span className="font-semibold tabular-nums text-foreground">{stats[status]}</span>
          </li>
        ))}
      </ul>
      {stats.scored > 0 ? (
        <div className="flex flex-col gap-4 border-t border-border pt-5">
          <p className="text-sm text-muted-foreground">Average across {stats.scored} multilingual communities with data</p>
          <Bar label="Residents speaking another language" value={stats.avgSpeakers} color="#2c4f6e" />
          <Bar label="Signage including another language" value={stats.avgVisibility} color="#d24d2c" />
        </div>
      ) : (
        <DataPending title="Awaiting data">
          Citywide averages appear once census and signage data are added for community areas.
        </DataPending>
      )}
    </div>
  )
}

export function AreaPanel({ area, onClear }: { area: CommunityArea | null; onClear: () => void }) {
  if (!area) return <CityOverview />

  const status = equityStatus(area)
  const meta = STATUS_META[status]
  const gap = visibilityGap(area)
  const snapshots = SNAPSHOTS.filter((s) => s.areaId === area.id)
  const neutral = status === 'english' || status === 'nodata'

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Area {area.id} · {area.region} Side
          </p>
          <h3 className="mt-1 font-serif text-3xl leading-tight text-foreground">{area.name}</h3>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Back to citywide overview</span>
        </button>
      </div>

      <span
        className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
        style={{ backgroundColor: `${meta.color}2e`, color: neutral ? undefined : meta.color }}
      >
        <span className="size-2 rounded-full" style={{ backgroundColor: meta.color }} aria-hidden="true" />
        {meta.label}
      </span>

      <div className="flex flex-col gap-4">
        <Bar label="Speak another language at home" value={area.speakers} color="#2c4f6e" />
        <Bar
          label="Signage including another language"
          value={area.visibility}
          color={neutral ? '#8c8576' : meta.color}
        />
        <dl className="grid grid-cols-2 gap-3 pt-1">
          <div className="rounded-md bg-secondary p-3">
            <dt className="text-xs text-muted-foreground">Visibility gap</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums text-foreground">
              {gap === null ? '—' : gap > 0 ? `${gap} pts` : 'None'}
            </dd>
          </div>
          <div className="rounded-md bg-secondary p-3">
            <dt className="text-xs text-muted-foreground">Limited English</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums text-foreground">
              {area.lep === null ? '—' : `${area.lep}%`}
            </dd>
          </div>
        </dl>
        {area.signsSurveyed !== null && (
          <p className="text-xs text-muted-foreground">Based on {area.signsSurveyed} signs surveyed.</p>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-5">
        <h4 className="text-sm font-semibold text-foreground">Leading home languages</h4>
        {area.languages.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {area.languages.map((l) => (
              <li key={l.language} className="flex items-center gap-3 text-sm">
                <span className="w-24 shrink-0 text-foreground">{l.language}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                  <span className="block h-full rounded-full bg-primary" style={{ width: `${l.pct}%` }} />
                </span>
                <span className="w-9 text-right tabular-nums text-muted-foreground">{l.pct}%</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No data yet.</p>
        )}
      </div>

      {ADVOCACY[status] && (
        <div className="flex flex-col gap-2 border-t border-border pt-5">
          <h4 className="text-sm font-semibold text-foreground">Advocacy focus</h4>
          <p className="text-sm leading-relaxed text-foreground/80">{ADVOCACY[status]}</p>
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-border pt-5">
        <h4 className="text-sm font-semibold text-foreground">Field snapshots</h4>
        {snapshots.length > 0 ? (
          snapshots.map((s) => (
            <article key={s.id} className="rounded-md border border-border p-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {s.type}
                {s.date ? ` · ${s.date}` : ''}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">{s.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/80">{s.note}</p>
              <p className="mt-2 text-xs text-muted-foreground">{s.languages.join(' · ')}</p>
            </article>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">None recorded yet.</p>
        )}
      </div>
    </div>
  )
}
