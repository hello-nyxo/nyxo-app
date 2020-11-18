import { registerIntercomUser } from '@actions/IntercomActions'
import getStateFromPath from '@helpers/GetPathFromState'
import useLinking from '@hooks/useLinking'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native'
import { actionCreators as notificationActions } from '@reducers/NotificationReducer'
import { getIsDarkMode } from '@selectors/UserSelectors'
import { readFromStorage } from 'persist-queries'
import Analytics from 'appcenter-analytics'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Linking } from 'react-native'
import Intercom from 'react-native-intercom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { StyleProps } from '../styles/themes'
import { navigationRef } from './NavigationHelper'
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

  const { getInitialState } = useLinking(navigationRef, {
    prefixes: [
      'https://nyxo.fi',
      'https://nyxo.app',
      'https://get.nyxo.fi',
      'https://auth.nyxo.app',
      'nyxo://'
    ],
    config: {
      [ROUTE.TERVEYSTALO]: {
        path: 'link'
      },
      [ROUTE.APP]: {
        path: 'app',
        [ROUTE.JOURNAL]: {
          path: 'sleep'
        },
        [ROUTE.SETTINGS]: {
          path: 'settings',
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
    },
    getStateFromPath
  })

  const [isReady, setIsReady] = useState(false)
  const [initialState, setInitialState] = useState()
  const routeNameRef = useRef<string>()

  Linking.getInitialURL()
    .then((url) => {})
    .catch((err) => console.error('An error occurred', err))

  useEffect(() => {
    readQueries()

    const onUnreadChange = ({ count }: { count: number }) => {
      dispatch(notificationActions.updateIntercomNotificationCount(count))
    }

    getInitialState()
      .catch((error) => {
        console.warn(error)
      })
      .then((state) => {
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
        ref={navigationRef}
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
