export enum ChallengeStates {
  STATE_UNLOCKED = 'STATE_UNLOCKED',
  STATE_REVEALED = 'STATE_REVEALED',
  STATE_HIDDEN = 'STATE_HIDDEN',
  STATE_COMPLETED = 'STATE_COMPLETED',
  STATE_ONGOING = 'STATE_ONGOING'
}

export interface ChallengeState {
  challenges: Challenge[] | []
}

export interface Challenge {
  id: string
  state: ChallengeStates
  titleFI: string
  titleEN: string
  descFI: string
  descEN: string
}
