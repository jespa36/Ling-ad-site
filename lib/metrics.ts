import { COMMUNITY_AREAS, type CommunityArea } from './data'

export type EquityStatus = 'represented' | 'partial' | 'under' | 'english' | 'nodata'

export const NO_DATA_COLOR = '#b9b3a8'

export const STATUS_META: Record<EquityStatus, { label: string; color: string; description: string }> = {
  represented: {
    label: 'Well represented',
    color: '#1f7a72',
    description: 'Public signage reflects at least 85% of the community’s language share.',
  },
  partial: {
    label: 'Partially represented',
    color: '#e0a43a',
    description: 'Visibility reaches 50–85% of what the language population would suggest.',
  },
  under: {
    label: 'Under-represented',
    color: '#d24d2c',
    description: 'Visibility is less than half of the community’s language share.',
  },
  english: {
    label: 'Predominantly English',
    color: '#d9d3c7',
    description: 'Fewer than 10% of residents speak another language at home.',
  },
  nodata: {
    label: 'No data yet',
    color: NO_DATA_COLOR,
    description: 'Census or signage data has not been added for this area.',
  },
}

export const STATUS_ORDER: EquityStatus[] = ['represented', 'partial', 'under', 'english', 'nodata']

/** Ratio of visible multilingual signage to the share of non-English speakers. */
export function representationRatio(area: CommunityArea) {
  if (area.speakers === null || area.visibility === null) return null
  return area.speakers === 0 ? 1 : area.visibility / area.speakers
}

export function equityStatus(area: CommunityArea): EquityStatus {
  if (area.speakers === null) return 'nodata'
  if (area.speakers < 10) return 'english'
  const ratio = representationRatio(area)
  if (ratio === null) return 'nodata'
  if (ratio >= 0.85) return 'represented'
  if (ratio >= 0.5) return 'partial'
  return 'under'
}

/** Percentage-point gap between speakers and visibility (positive = under-represented). */
export function visibilityGap(area: CommunityArea) {
  if (area.speakers === null || area.visibility === null) return null
  return area.speakers - area.visibility
}

export function languageShare(area: CommunityArea, language: string) {
  return area.languages.find((l) => l.language === language)?.pct ?? null
}

const RAMP = ['#f3eee4', '#c9d5dc', '#8fa9bb', '#557c99', '#2c4f6e', '#16304a']

export function rampColor(value: number | null, max: number) {
  if (value === null) return NO_DATA_COLOR
  if (value <= 0) return RAMP[0]
  const t = Math.min(value / max, 1)
  const index = Math.min(RAMP.length - 1, Math.max(1, Math.ceil(t * (RAMP.length - 1))))
  return RAMP[index]
}

export const RAMP_COLORS = RAMP

export const LANGUAGES = Array.from(
  COMMUNITY_AREAS.reduce((totals, area) => {
    for (const { language, pct } of area.languages) {
      totals.set(language, (totals.get(language) ?? 0) + pct)
    }
    return totals
  }, new Map<string, number>()),
)
  .sort((x, y) => y[1] - x[1])
  .map(([language]) => language)

const average = (vals: number[]) =>
  vals.length === 0 ? null : Math.round(vals.reduce((s, v) => s + v, 0) / vals.length)

export function cityStats() {
  const statuses = COMMUNITY_AREAS.map(equityStatus)
  const count = (s: EquityStatus) => statuses.filter((x) => x === s).length
  const scored = COMMUNITY_AREAS.filter((a) => a.speakers !== null && a.visibility !== null && a.speakers >= 10)
  return {
    total: COMMUNITY_AREAS.length,
    represented: count('represented'),
    partial: count('partial'),
    under: count('under'),
    english: count('english'),
    nodata: count('nodata'),
    withCensus: COMMUNITY_AREAS.filter((a) => a.speakers !== null).length,
    withSignage: COMMUNITY_AREAS.filter((a) => a.visibility !== null).length,
    scored: scored.length,
    avgSpeakers: average(scored.map((a) => a.speakers as number)),
    avgVisibility: average(scored.map((a) => a.visibility as number)),
  }
}

export function largestGaps(limit = 10) {
  return COMMUNITY_AREAS.filter((a) => {
    const s = equityStatus(a)
    return s !== 'english' && s !== 'nodata'
  })
    .sort((x, y) => (visibilityGap(y) ?? 0) - (visibilityGap(x) ?? 0))
    .slice(0, limit)
}

export function strongestRepresentation(limit = 5) {
  return COMMUNITY_AREAS.filter((a) => a.speakers !== null && a.speakers >= 25 && representationRatio(a) !== null)
    .sort((x, y) => (representationRatio(y) ?? 0) - (representationRatio(x) ?? 0))
    .slice(0, limit)
}

/** For each language: weighted speakers across areas and how much of that weight lives where signage keeps pace. */
export function languageRepresentation() {
  return LANGUAGES.map((language) => {
    const areas = COMMUNITY_AREAS.filter((a) => (languageShare(a, language) ?? 0) > 0 && representationRatio(a) !== null)
    const speakerWeight = areas.reduce((s, a) => s + (languageShare(a, language) ?? 0), 0)
    const visibleWeight = areas.reduce(
      (s, a) => s + (languageShare(a, language) ?? 0) * Math.min(1, representationRatio(a) ?? 0),
      0,
    )
    return {
      language,
      areas: areas.length,
      coverage: speakerWeight === 0 ? 0 : Math.round((visibleWeight / speakerWeight) * 100),
    }
  }).filter((row) => row.areas > 0)
}
