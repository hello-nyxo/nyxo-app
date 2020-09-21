export interface NightNoteState {
  nightNotes: Map<string, NightNotes>
}

export interface NightNotes {
  notes: Map<string, NightNote>
}

export interface NightNote {
  date: string
  dateTime: string
  id: string
  content: string
  meta: NightNoteMeta
}

export interface NightNoteMeta {}

export enum NightNoteTags {
  HOT_SHOWER = 'NIGHT_NOTE.TAGS.HOT_SHOWER',
  BEER = 'NIGHT_NOTE.TAGS.BEER',
  FEVER = 'NIGHT_NOTE.TAGS.FEVER',
  MEDITATE = 'NIGHT_NOTE.TAGS.MEDITATE'
}
