import { NO_DATA_COLOR, RAMP_COLORS, STATUS_META, STATUS_ORDER } from '@/lib/metrics'
import { modeMax, type MapMode } from '@/lib/map-modes'

export function MapLegend({ mode, language }: { mode: MapMode; language: string }) {
  if (mode === 'equity') {
    return (
      <div className="pointer-events-auto rounded-md border border-border bg-card/95 p-3 shadow-sm backdrop-blur">
        <p className="mb-2 text-xs font-semibold text-foreground">Representation</p>
        <ul className="flex flex-col gap-1.5">
          {STATUS_ORDER.map((s) => (
            <li key={s} className="flex items-center gap-2 text-xs text-foreground/80">
              <span className="size-3 rounded-sm" style={{ backgroundColor: STATUS_META[s].color }} aria-hidden="true" />
              {STATUS_META[s].label}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const title =
    mode === 'speakers'
      ? 'Speak a non-English language'
      : mode === 'visibility'
        ? 'Multilingual signage'
        : `${language || 'Language'} speakers`

  return (
    <div className="pointer-events-auto w-48 rounded-md border border-border bg-card/95 p-3 shadow-sm backdrop-blur">
      <p className="mb-2 text-xs font-semibold text-foreground">{title}</p>
      <div className="flex h-2.5 overflow-hidden rounded-sm" aria-hidden="true">
        {RAMP_COLORS.map((c) => (
          <span key={c} className="flex-1" style={{ backgroundColor: c }} />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
        <span>0%</span>
        <span>{modeMax(mode)}%+</span>
      </div>
      <p className="mt-2 flex items-center gap-2 text-[11px] text-foreground/80">
        <span className="size-3 rounded-sm" style={{ backgroundColor: NO_DATA_COLOR }} aria-hidden="true" />
        No data yet
      </p>
    </div>
  )
}
