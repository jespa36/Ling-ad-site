'use client'

import 'leaflet/dist/leaflet.css'
import { CircleMarker, GeoJSON, MapContainer, Popup, TileLayer } from 'react-leaflet'
import type { Feature, FeatureCollection, Geometry } from 'geojson'
import type { Layer, PathOptions } from 'leaflet'
import boundaries from '@/lib/community-areas.json'
import { AREA_BY_ID, SNAPSHOTS } from '@/lib/data'
import { areaFill, type MapMode } from '@/lib/map-modes'

type AreaProps = { id: number; name: string }

const BOUNDARIES = boundaries as FeatureCollection<Geometry, AreaProps>

type ChicagoMapProps = {
  mode: MapMode
  language: string
  selectedId: number | null
  showSnapshots: boolean
  onSelect: (id: number) => void
}

export default function ChicagoMap({ mode, language, selectedId, showSnapshots, onSelect }: ChicagoMapProps) {
  const style = (feature?: Feature<Geometry, AreaProps>): PathOptions => {
    const area = feature ? AREA_BY_ID.get(feature.properties.id) : undefined
    const selected = feature?.properties.id === selectedId
    return {
      fillColor: area ? areaFill(area, mode, language) : '#eee',
      fillOpacity: 0.82,
      color: selected ? '#14202b' : '#fbf8f2',
      weight: selected ? 3 : 1,
    }
  }

  const onEachFeature = (feature: Feature<Geometry, AreaProps>, layer: Layer) => {
    const area = AREA_BY_ID.get(feature.properties.id)
    if (!area) return
    layer.bindTooltip(area.name, { sticky: true, direction: 'top', className: 'area-tooltip' })
    layer.on({
      click: () => onSelect(area.id),
      mouseover: (e) => e.target.setStyle({ weight: 3, color: '#14202b' }),
      mouseout: (e) => e.target.setStyle(style(feature)),
    })
  }

  return (
    <MapContainer
      center={[41.835, -87.69]}
      zoom={10.5}
      zoomSnap={0.5}
      minZoom={10}
      maxZoom={16}
      scrollWheelZoom
      className="h-full w-full"
      attributionControl
    >
      <TileLayer
url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution='Basemap &copy; Esri, HERE, Garmin, OpenStreetMap contributors · Boundaries: City of Chicago'
          maxNativeZoom={16}
      />
      <GeoJSON
        key={`${mode}-${language}-${selectedId}`}
        data={BOUNDARIES}
        style={style}
        onEachFeature={onEachFeature}
      />
      <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
          pane="shadowPane"
          maxNativeZoom={16}
        />
      {showSnapshots &&
        SNAPSHOTS.map((s) => (
          <CircleMarker
            key={s.id}
            center={[s.lat, s.lng]}
            radius={6}
            pathOptions={{ color: '#14202b', weight: 2, fillColor: '#fbf8f2', fillOpacity: 1 }}
          >
            <Popup>
              <div className="flex max-w-60 flex-col gap-1.5 font-sans">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {s.type} · {AREA_BY_ID.get(s.areaId)?.name}
                </span>
                <strong className="text-sm leading-snug text-foreground">{s.title}</strong>
                <span className="text-xs leading-relaxed text-foreground/80">{s.note}</span>
                <span className="flex flex-wrap gap-1 pt-1">
                  {s.languages.map((l) => (
                    <span key={l} className="rounded-sm bg-secondary px-1.5 py-0.5 text-[11px] text-secondary-foreground">
                      {l}
                    </span>
                  ))}
                </span>
              </div>
            </Popup>
          </CircleMarker>
        ))}
    </MapContainer>
  )
}
