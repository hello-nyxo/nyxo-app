export type RootStackParamList = {
  App: {
    Sleep: {
      Main: undefined
      Detail: undefined
    }
    Coaching: {
      CoachingScreen: undefined
      Introduction: undefined
    }
    Habits: undefined
    Profile: undefined
    Settings: {
      SettingsScreen: undefined
      Cloud: { code?: string | undefined | null }
      Coaching: undefined
      Subscription: undefined
      Sources: undefined
      Theme: undefined
      Garmin: { oauth_token: string; oauth_verifier: string }
    }
  }
  Auth: {
    Login: undefined
    Register: undefined
  }
  Week: { slug: string; id: string }
  Lesson: { slug: string; id: string }
  Terveystalo: { code: string }
  Onboarding: undefined
  Purchase: undefined
}
