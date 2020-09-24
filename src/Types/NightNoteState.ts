export interface NightNoteState {
  nightNotes: Map<string, NightNotes> // key is the value of "date" key
}

export interface NightNotes {
  notes: Map<string, NightNote> // key is the value of "id" key
}

export interface NightNote {
  date: string
  dateTime: string
  id: string
  content: string
  meta: NightNoteMeta
}

export interface NightNoteMeta {
  tags: Array<string> // This will be NightNoteTags enum keys but is converted to strings. They can be extracted by using Object.keys(NightNoteTags)
}

export enum NightNoteTags {
  HOT_SHOWER = 'NIGHT_NOTE.TAGS.HOT_SHOWER',
  BEER = 'NIGHT_NOTE.TAGS.BEER',
  FEVER = 'NIGHT_NOTE.TAGS.FEVER',
  MEDITATE = 'NIGHT_NOTE.TAGS.MEDITATE'
}
