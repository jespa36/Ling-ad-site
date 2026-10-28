import { AREA_DATA, SNAPSHOT_DATA } from './area-data'

export type Region =
  | 'Far North'
  | 'Northwest'
  | 'North'
  | 'West'
  | 'Central'
  | 'South'
  | 'Southwest'
  | 'Far Southwest'
  | 'Far Southeast'

export type LanguageShare = { language: string; pct: number }

export type AreaMeasurements = {
  /** % of residents (5+) who speak a language other than English at home */
  speakers?: number
  /** % of residents (5+) who speak English less than "very well" */
  lep?: number
  /** Leading non-English home languages, % of residents */
  languages?: LanguageShare[]
  /** % of surveyed public-facing signs that include a non-English language */
  visibility?: number
  /** Number of signs surveyed to produce `visibility` */
  signsSurveyed?: number
}

export type CommunityArea = {
  id: number
  name: string
  region: Region
  speakers: number | null
  lep: number | null
  languages: LanguageShare[]
  visibility: number | null
  signsSurveyed: number | null
}

const AREAS: [number, string, Region][] = [
  [1, 'Rogers Park', 'Far North'],
  [2, 'West Ridge', 'Far North'],
  [3, 'Uptown', 'Far North'],
  [4, 'Lincoln Square', 'Far North'],
  [5, 'North Center', 'North'],
  [6, 'Lake View', 'North'],
  [7, 'Lincoln Park', 'North'],
  [8, 'Near North Side', 'Central'],
  [9, 'Edison Park', 'Far North'],
  [10, 'Norwood Park', 'Far North'],
  [11, 'Jefferson Park', 'Far North'],
  [12, 'Forest Glen', 'Far North'],
  [13, 'North Park', 'Far North'],
  [14, 'Albany Park', 'Far North'],
  [15, 'Portage Park', 'Northwest'],
  [16, 'Irving Park', 'Northwest'],
  [17, 'Dunning', 'Northwest'],
  [18, 'Montclare', 'Northwest'],
  [19, 'Belmont Cragin', 'Northwest'],
  [20, 'Hermosa', 'Northwest'],
  [21, 'Avondale', 'North'],
  [22, 'Logan Square', 'North'],
  [23, 'Humboldt Park', 'West'],
  [24, 'West Town', 'West'],
  [25, 'Austin', 'West'],
  [26, 'West Garfield Park', 'West'],
  [27, 'East Garfield Park', 'West'],
  [28, 'Near West Side', 'West'],
  [29, 'North Lawndale', 'West'],
  [30, 'South Lawndale', 'West'],
  [31, 'Lower West Side', 'West'],
  [32, 'Loop', 'Central'],
  [33, 'Near South Side', 'Central'],
  [34, 'Armour Square', 'South'],
  [35, 'Douglas', 'South'],
  [36, 'Oakland', 'South'],
  [37, 'Fuller Park', 'South'],
  [38, 'Grand Boulevard', 'South'],
  [39, 'Kenwood', 'South'],
  [40, 'Washington Park', 'South'],
  [41, 'Hyde Park', 'South'],
  [42, 'Woodlawn', 'South'],
  [43, 'South Shore', 'South'],
  [44, 'Chatham', 'Far Southeast'],
  [45, 'Avalon Park', 'Far Southeast'],
  [46, 'South Chicago', 'Far Southeast'],
  [47, 'Burnside', 'Far Southeast'],
  [48, 'Calumet Heights', 'Far Southeast'],
  [49, 'Roseland', 'Far Southeast'],
  [50, 'Pullman', 'Far Southeast'],
  [51, 'South Deering', 'Far Southeast'],
  [52, 'East Side', 'Far Southeast'],
  [53, 'West Pullman', 'Far Southeast'],
  [54, 'Riverdale', 'Far Southeast'],
  [55, 'Hegewisch', 'Far Southeast'],
  [56, 'Garfield Ridge', 'Southwest'],
  [57, 'Archer Heights', 'Southwest'],
  [58, 'Brighton Park', 'Southwest'],
  [59, 'McKinley Park', 'Southwest'],
  [60, 'Bridgeport', 'South'],
  [61, 'New City', 'Southwest'],
  [62, 'West Elsdon', 'Southwest'],
  [63, 'Gage Park', 'Southwest'],
  [64, 'Clearing', 'Southwest'],
  [65, 'West Lawn', 'Southwest'],
  [66, 'Chicago Lawn', 'Southwest'],
  [67, 'West Englewood', 'Southwest'],
  [68, 'Englewood', 'Southwest'],
  [69, 'Greater Grand Crossing', 'South'],
  [70, 'Ashburn', 'Far Southwest'],
  [71, 'Auburn Gresham', 'Far Southwest'],
  [72, 'Beverly', 'Far Southwest'],
  [73, 'Washington Heights', 'Far Southwest'],
  [74, 'Mount Greenwood', 'Far Southwest'],
  [75, 'Morgan Park', 'Far Southwest'],
  [76, "O'Hare", 'Far North'],
  [77, 'Edgewater', 'Far North'],
]

export const COMMUNITY_AREAS: CommunityArea[] = AREAS.map(([id, name, region]) => {
  const d = AREA_DATA[id] ?? {}
  return {
    id,
    name,
    region,
    speakers: d.speakers ?? null,
    lep: d.lep ?? null,
    languages: d.languages ?? [],
    visibility: d.visibility ?? null,
    signsSurveyed: d.signsSurveyed ?? null,
  }
})

export const AREA_BY_ID = new Map(COMMUNITY_AREAS.map((area) => [area.id, area]))

export type SnapshotType = 'Commercial' | 'Government' | 'Transit' | 'Community'

export type Snapshot = {
  id: string
  title: string
  areaId: number
  lat: number
  lng: number
  type: SnapshotType
  languages: string[]
  note: string
  date?: string
}

export const SNAPSHOTS: Snapshot[] = SNAPSHOT_DATA

export const HAS_CENSUS_DATA = COMMUNITY_AREAS.some((a) => a.speakers !== null)
export const HAS_SIGNAGE_DATA = COMMUNITY_AREAS.some((a) => a.visibility !== null)
export const HAS_LANGUAGE_DATA = COMMUNITY_AREAS.some((a) => a.languages.length > 0)
