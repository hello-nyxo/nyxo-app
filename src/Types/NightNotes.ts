export interface NightNoteState {
  nightNotes: Map<string, NightNotes>
}

export interface NightNotes {
  notes: Map<string, NightNote>
}

export interface NightNote {
  date: string
  id: string
  content: string
  meta: NightNoteMeta
}

export interface NightNoteMeta {}
