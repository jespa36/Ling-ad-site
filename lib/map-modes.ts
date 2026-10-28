import type { CommunityArea } from './data'
import { STATUS_META, equityStatus, languageShare, rampColor } from './metrics'

export type MapMode = 'equity' | 'speakers' | 'visibility' | 'language'

export const MAP_MODES: { value: MapMode; label: string; hint: string }[] = [
  { value: 'equity', label: 'Equity', hint: 'How well public signage reflects the languages residents speak.' },
  { value: 'speakers', label: 'Speakers', hint: 'Share of residents who speak a language other than English at home.' },
  { value: 'visibility', label: 'Visibility', hint: 'Share of surveyed public signage that includes a non-English language.' },
  { value: 'language', label: 'By language', hint: 'Where a specific language is spoken at home.' },
]

export function modeMax(mode: MapMode) {
  return mode === 'language' ? 60 : 80
}

export function areaFill(area: CommunityArea, mode: MapMode, language: string) {
  switch (mode) {
    case 'equity':
      return STATUS_META[equityStatus(area)].color
    case 'speakers':
      return rampColor(area.speakers, modeMax(mode))
    case 'visibility':
      return rampColor(area.visibility, modeMax(mode))
    case 'language':
      return rampColor(area.languages.length ? languageShare(area, language) ?? 0 : null, modeMax(mode))
  }
}
