/* eslint-disable camelcase */
import React, { FC, useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { getGarminAccessTokenAndroid } from '@actions/api-actions/garmin-actions'
import ROUTE from '@config/routes/Routes'

const GarminScreen: FC = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    const { oauth_token, oauth_verifier } = route.params as {
      oauth_token: string
      oauth_verifier: string
    }
    dispatch(getGarminAccessTokenAndroid(oauth_token, oauth_verifier))

    navigation.navigate(ROUTE.SOURCE_SETTINGS)
  }, [dispatch, navigation, route.params])
  return <></>
}

export default GarminScreen
