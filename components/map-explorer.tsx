'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { AREA_BY_ID, SNAPSHOTS } from '@/lib/data'
import { LANGUAGES } from '@/lib/metrics'
import { MAP_MODES, type MapMode } from '@/lib/map-modes'
import { cn } from '@/lib/utils'
import { AreaPanel } from './area-panel'
import { MapLegend } from './map-legend'

const ChicagoMap = dynamic(() => import('./chicago-map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
      Loading map of Chicago…
    </div>
  ),
})

export function MapExplorer() {
  const [mode, setMode] = useState<MapMode>('equity')
  const [language, setLanguage] = useState(LANGUAGES[0] ?? '')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [showSnapshots, setShowSnapshots] = useState(true)

  const activeMode = MAP_MODES.find((m) => m.value === mode)!
  const selected = selectedId ? AREA_BY_ID.get(selectedId) ?? null : null

  return (
    <section id="map" aria-labelledby="map-heading" className="border-y border-border bg-card">
      <h2 id="map-heading" className="sr-only">
        Interactive map of language equity across Chicago community areas
      </h2>
      <div className="grid lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3 md:px-6">
            <div
              role="radiogroup"
              aria-label="Map layer"
              className="grid w-full grid-cols-4 rounded-md border border-border bg-background p-0.5 sm:flex sm:w-auto"
            >
              {MAP_MODES.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  role="radio"
                  aria-checked={mode === m.value}
                  onClick={() => setMode(m.value)}
                  className={cn(
                    'whitespace-nowrap rounded-[5px] px-1.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm',
                    mode === m.value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
            {mode === 'language' && LANGUAGES.length === 0 && (
              <span className="text-sm text-muted-foreground">No language data yet</span>
            )}
            {mode === 'language' && LANGUAGES.length > 0 && (
              <label className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Language</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="rounded-md border border-border bg-background px-2 py-1.5 text-sm font-medium text-foreground"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </label>
            )}
            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground sm:ml-auto">
              <input
                type="checkbox"
                checked={showSnapshots}
                onChange={(e) => setShowSnapshots(e.target.checked)}
                className="size-4 accent-primary"
              />
              <MapPin className="size-4" aria-hidden="true" />
              Field snapshots ({SNAPSHOTS.length})
            </label>
          </div>
          <p className="border-b border-border px-4 py-2 text-xs text-muted-foreground md:px-6">{activeMode.hint}</p>
          <div className="relative h-[60vh] min-h-[440px] lg:h-[720px]">
            <ChicagoMap
              mode={mode}
              language={language}
              selectedId={selectedId}
              showSnapshots={showSnapshots}
              onSelect={setSelectedId}
            />
            <div className="pointer-events-none absolute bottom-4 left-4 z-[500]">
              <MapLegend mode={mode} language={language} />
            </div>
          </div>
        </div>
        <aside
          aria-live="polite"
          className="border-t border-border bg-background lg:max-h-[812px] lg:overflow-y-auto lg:border-t-0 lg:border-l"
        >
          <AreaPanel area={selected} onClear={() => setSelectedId(null)} />
        </aside>
      </div>
    </section>
  )
}
