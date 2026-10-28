import { Hero } from '@/components/hero'
import { LanguageBreakdown } from '@/components/language-breakdown'
import { MapExplorer } from '@/components/map-explorer'
import { Methodology } from '@/components/methodology'
import { Rankings } from '@/components/rankings'
import { SiteHeader } from '@/components/site-header'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <MapExplorer />
        <Rankings />
        <LanguageBreakdown />
        <Methodology />
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground md:flex-row md:justify-between md:px-6">
          <p>LinguaChicago — a Linguistic Advocacy Project.</p>
          <p>Boundaries: City of Chicago Data Portal · Basemap: Esri, OpenStreetMap</p>
        </div>
      </footer>
    </>
  )
}
