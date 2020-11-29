import { registerIntercomUser } from '@actions/IntercomActions'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useLinking
} from '@react-navigation/native'
import { actionCreators as notificationActions } from '@reducers/NotificationReducer'
import { getIsDarkMode } from '@selectors/UserSelectors'
import Analytics from 'appcenter-analytics'
import { readFromStorage } from 'persist-queries'
import React, { FC, useEffect, useRef, useState } from 'react'
import Intercom from 'react-native-intercom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import Root from './routes/RootNavigator'
import ROUTE from './routes/Routes'

function getActiveRouteName(state: any): string {
  const route = state.routes[state.index]

  if (route.state) {
    return getActiveRouteName(route.state)
  }

  return route.name
}

const Routes: FC = () => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector(getIsDarkMode)
  const ref = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const [initialState, setInitialState] = useState()
  const routeNameRef = useRef<string>()

  const { getInitialState } = useLinking(ref, {
    prefixes: [
      'https://nyxo.fi',
      'https://nyxo.app',
      'https://get.nyxo.fi',
      'https://auth.nyxo.app',
      'nyxo://'
    ],
    config: {
      screens: {
        [ROUTE.TERVEYSTALO]: {
          path: 'link',
          parse: {
            code: (code) => `${code}`
          }
        },
        [ROUTE.AUTH]: {
          path: 'auth',
          screens: {
            [ROUTE.REGISTER]: {
              path: 'register'
            },
            [ROUTE.LOGIN]: {
              path: 'login'
            }
          }
        },
        [ROUTE.ONBOARDING]: {
          path: 'onboarding'
        },
        [ROUTE.PURCHASE]: {
          path: 'purchase'
        },
        [ROUTE.LESSON]: {
          path: 'lesson/:slug'
        },
        [ROUTE.LESSON]: {
          path: 'fi/lesson/:slug'
        },
        [ROUTE.APP]: {
          screens: {
            [ROUTE.SETTINGS]: {
              screens: {
                [ROUTE.CLOUD_SETTINGS]: {
                  path: 'join'
                }
              }
            }
          }
        },
        [ROUTE.APP]: {
          path: 'app',
          screens: {
            [ROUTE.JOURNAL]: {
              path: 'sleep'
            },
            [ROUTE.PROFILE]: {
              path: 'profile'
            },
            [ROUTE.COACHING]: {
              path: 'coaching'
            },
            [ROUTE.SETTINGS]: {
              path: 'settings',
              screens: {
                [ROUTE.CLOUD_SETTINGS]: {
                  path: 'cloud'
                },
                [ROUTE.GARMIN]: {
                  path: 'garmin'
                },
                [ROUTE.SOURCE_SETTINGS]: {
                  path: 'callback'
                }
              }
            }
          }
        }
      }
    }
  })

  useEffect(() => {
    readQueries()

    const onUnreadChange = ({ count }: { count: number }) => {
      dispatch(notificationActions.updateIntercomNotificationCount(count))
    }

    getInitialState().then((state) => {
      if (state !== undefined) {
        setInitialState(state)
      }

      setIsReady(true)
    })

    dispatch(registerIntercomUser())

    Intercom.addEventListener(
      Intercom.Notifications.UNREAD_COUNT,
      onUnreadChange
    )

    return () => {
      Intercom.removeEventListener(
        Intercom.Notifications.UNREAD_COUNT,
        onUnreadChange
      )
    }
  }, [getInitialState])

  const readQueries = async () => {
    await Promise.all([
      readFromStorage('user'),
      readFromStorage('userActiveCoaching')
    ])
  }

  if (!isReady) {
    return null
  }

  return (
    <>
      <StyledStatusBar animated />
      <NavigationContainer
        ref={ref}
        theme={isDarkMode ? DarkTheme : DefaultTheme}
        initialState={initialState}
        onStateChange={(state) => {
          const previousRouteName = routeNameRef.current
          const currentRouteName = getActiveRouteName(state)
          if (previousRouteName !== currentRouteName) {
            Intercom.logEvent('viewed_screen', { currentRouteName })
            Analytics.trackEvent(`Navigated to ${currentRouteName}`)
          }

          routeNameRef.current = currentRouteName
        }}>
        <Root />
      </NavigationContainer>
    </>
  )
}

export default Routes

const StyledStatusBar = styled.StatusBar.attrs(({ theme }) => ({
  barStyle: theme.mode === 'dark' ? 'light-content' : 'dark-content',
  backgroundColor: theme.PRIMARY_BACKGROUND_COLOR
}))``
