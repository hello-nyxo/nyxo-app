import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native'
import Analytics from 'appcenter-analytics'
import React, { useEffect, useRef, useState } from 'react'
import { Linking } from 'react-native'
import Intercom from 'react-native-intercom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { registerIntercomUser } from '../actions/IntercomActions'
import getStateFromPath from '../helpers/GetPathFromState'
import useLinking from '../Hooks/useLinking'
import { StyleProps } from '../styles/themes'
import { actionCreators as notificationActions } from '../store/Reducers/NotificationReducer'
import { getIsDarkMode } from '../store/Selectors/UserSelectors'
import { navigationRef } from './NavigationHelper'
// Navigators
import Root from './routes/RootNavigator'
import ROUTE from './routes/Routes'

function getActiveRouteName(state: any): string {
  const route = state.routes[state.index]

  if (route.state) {
    return getActiveRouteName(route.state)
  }

  return route.name
}

const Routes = () => {
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
          }
        }
      }
    },
    getStateFromPath
  })

  const [isReady, setIsReady] = useState(false)
  const [initialState, setInitialState] = useState()
  const routeNameRef: any = useRef()
  Linking.getInitialURL()
    .then((url) => {})
    .catch((err) => console.error('An error occurred', err))
  useEffect(() => {
    const _onUnreadChange = ({ count }: { count: number }) => {
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
      _onUnreadChange
    )

    return () => {
      Intercom.removeEventListener(
        Intercom.Notifications.UNREAD_COUNT,
        _onUnreadChange
      )
    }
  }, [getInitialState])

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

const StyledStatusBar = styled.StatusBar.attrs((props: StyleProps) => ({
  barStyle: props.theme.mode === 'dark' ? 'light-content' : 'dark-content',
  backgroundColor: props.theme.PRIMARY_BACKGROUND_COLOR
}))``
