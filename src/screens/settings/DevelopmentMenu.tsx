import React, { memo } from 'react'
import { SafeAreaView, Switch } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../../components/Buttons/IconButton'
import { Container, H1, P, Row } from '../../components/Primitives/Primitives'
import colors from '../../styles/colors'
import { getActiveCoaching } from '../../store/Selectors/subscription-selectors/SubscriptionSelectors'
import {
  disableCoaching,
  purchaseCoachingForAWeek
} from '../../actions/subscription/subscription-actions'

const DevelopmentMenu = () => {
  const dispatch = useDispatch()
  const devCoachingOne = useSelector(getActiveCoaching)

  const toggleWeeksOpen = () => {}

  const toggleCoachingOn = () => {
    if (devCoachingOne) {
      dispatch(disableCoaching())
    } else {
      dispatch(purchaseCoachingForAWeek())
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <H1>DEVELOPMENT_MENU</H1>
        <Row>
          <P>DEVELOPMENT_MENU_ENABLE_COACHING</P>
          <IconButton
            color={colors.radiantBlue}
            onPress={toggleWeeksOpen}
            analyticsEvent="Dev menu coaching"
            icon="lockCircle"
            backgroundColor={colors.radiantBlueTransparent}
          />
        </Row>

        <Row>
          <P>DEVELOPMENT_MENU_ENABLE_COACHING</P>
          <Switch value={devCoachingOne} onValueChange={toggleCoachingOn} />
        </Row>
      </Container>
    </SafeAreaView>
  )
}

export default memo(DevelopmentMenu)
