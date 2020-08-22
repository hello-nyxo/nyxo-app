const firebase = {
  messaging: jest.fn(() => ({
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('myMockToken')),
    onTokenRefresh: jest.fn(() => Promise.resolve('myMockToken'))
  })),
  notifications: jest.fn(() => ({
    onNotification: jest.fn(),
    onNotificationDisplayed: jest.fn(),
    android: {
      createChannel: jest.fn()
    }
  }))
}

firebase.notifications.Android = {
  Channel: jest.fn(() => ({
    setDescription: jest.fn()
  })),
  Importance: {
    Max: {}
  }
}

export default firebase
