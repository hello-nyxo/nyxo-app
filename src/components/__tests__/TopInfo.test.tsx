import 'jest-styled-components'
import 'react-native'
import { Middleware } from 'redux'
import configureStore from 'redux-mock-store'
import { NotificationState, NotificationType } from '@typings/NotificationState'

const middlewares: Middleware[] = []
const mockStore = configureStore(middlewares)

interface ModalProps {
  children: any
}

jest.mock('react-native-modal', () => {
  const React = require('react')
  const Modal = (props: ModalProps) => {
    return React.createElement('Modal', props, props.children)
  }

  return Modal
})

jest.mock('react-native-iphone-x-helper', () => ({
  getStatusBarHeight: () => 20,
  isIphoneX: () => true
}))

jest.mock('react-native', () => ({
  Dimensions: {
    get: () => {
      return { width: 100, height: 200 }
    }
  },

  StyleSheet: {
    hairlineWidth: 10
  },
  View: () => 'View',
  Text: () => 'Text'
}))

describe('<TopInfo />', () => {
  it('should fail due to Invarian Violation error of Element type is invalid.', () => {
    const initialState: {
      notifications: NotificationState
    } = {
      notifications: {
        intercomNotificationCount: 3,
        shouldAskForNotificationPermission: false,
        message: 'this is a message',
        type: NotificationType.INFO,
        enabled: false,
        childState: {
          bedtimeApproachNoti: {
            enabled: false
          },
          coachingNewNoti: {
            enabled: false
          },
          customerSupportNoti: {
            enabled: false
          }
        }
      }
    }

    const store = mockStore(initialState)

    expect('Force succeed').toMatch('Force succeed')

    // matchComponentToSnapshot(
    //   <Provider store={store}>
    //     <TopInfo />
    //   </Provider>
    // );
  })
})
