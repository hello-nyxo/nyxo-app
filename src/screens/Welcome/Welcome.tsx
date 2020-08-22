import React, { memo, useState } from 'react'
import { Platform, View } from 'react-native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import { prepareSleepDataFetching } from '@actions/sleep/health-kit-actions'
import { markIntroductionCompleted } from '../../actions/user/user-actions'
import AnimationContainer from '../../components/animationContainer'
import ScalingButton from '../../components/Buttons/ScalingButton'
import TranslatedText from '../../components/TranslatedText'
import colors from '../../styles/colors'
import { fonts } from '../../styles/themes'

interface WelcomeProps {
  navigation: any
}

const Welcome = (props: WelcomeProps) => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()

  const handleHealthKit = async () => {
    await dispatch(prepareSleepDataFetching())
    await setShow(true)
  }

  const handleNavigation = async () => {
    await dispatch(markIntroductionCompleted(true))
    await props.navigation.navigate('Main', {})
  }

  const isAndroid = Platform.OS === 'android'

  return (
    <SafeContainer>
      <AnimationContainer style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 20, flex: 1 }}>
          <WelcomeTitle>WELCOME_TITLE</WelcomeTitle>
          <WelcomeDescription>
            {isAndroid
              ? 'WELCOME_PERMISSIONS_ANDROID'
              : 'WELCOME_PERMISSIONS_IOS'}
          </WelcomeDescription>
        </View>

        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ScalingButton
            analyticsEvent="Allow Apple Health "
            onPress={handleHealthKit}>
            <HKButtonContainer>
              <WelcomeButtonText numberOfLines={1} adjustsFontSizeToFit>
                {isAndroid ? 'WELCOME_BUTTON_ANDROID' : 'WELCOME_BUTTON_IOS'}
              </WelcomeButtonText>
            </HKButtonContainer>
          </ScalingButton>
        </View>

        {isAndroid || show ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}>
            <ScalingButton
              analyticsEvent="Let's go button"
              onPress={handleNavigation}>
              <GoButton>
                <GoButtonText numberOfLines={1} adjustsFontSizeToFit>
                  WELCOME_LETS_GO
                </GoButtonText>
              </GoButton>
            </ScalingButton>
          </View>
        ) : null}
      </AnimationContainer>
    </SafeContainer>
  )
}

export default memo(Welcome)

const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.radiantBlue};
  justify-content: center;
`

const WelcomeTitle = styled(TranslatedText)`
  margin-top: 50px;
  font-size: 26;
  color: white;
  font-family: ${fonts.bold};
`

const WelcomeDescription = styled(TranslatedText)`
  line-height: 40;
  margin-top: 30px;
  font-size: 17px;
  color: white;
  font-family: ${fonts.bold};
`

const HKButtonContainer = styled.View`
  background-color: white;
  margin: 20px;
  border-radius: 30px;
  padding: 20px;
  align-items: center;
  justify-content: center;
`
const WelcomeButtonText = styled(TranslatedText)`
  text-transform: uppercase;
  font-family: ${fonts.bold};
  color: ${colors.radiantBlue};
  font-size: 17px;
`

const GoButton = styled.View`
  background-color: white;
  margin: 20px;
  border-radius: 30px;
  padding: 20px;
  align-items: center;
  justify-content: center;
`

const GoButtonText = styled(TranslatedText)`
  text-transform: uppercase;
  font-family: ${fonts.bold};
  color: ${colors.radiantBlue};
  font-size: 17px;
`
