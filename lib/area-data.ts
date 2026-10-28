import type { AreaMeasurements, Snapshot } from './data'

/*
 * Real data goes here. Everything on the site is computed from these two exports;
 * any area or field left out shows as "No data yet" instead of a made-up value.
 *
 * AREA_DATA is keyed by official community area number (1–77). Example entry:
 *   14: {
 *     speakers: 0,        // ACS: % of pop. 5+ speaking a non-English language at home
 *     lep: 0,             // ACS: % of pop. 5+ speaking English less than "very well"
 *     languages: [{ language: 'Spanish', pct: 0 }],
 *     visibility: 0,      // your survey: % of signs with a non-English language
 *     signsSurveyed: 0,   // your survey: number of signs counted
 *   },
 *
 * SNAPSHOT_DATA holds individual field observations (photos/notes of real signs).
 */

export const AREA_DATA: Partial<Record<number, AreaMeasurements>> = {}

export const SNAPSHOT_DATA: Snapshot[] = []
