/* eslint-disable global-require */
import { register } from '@actions/auth/auth-actions'
import { markDataOnboardingCompleted } from '@actions/onboarding/onboarding-actions'
import { PrimaryButton } from '@components/Buttons/PrimaryButton'
import { ExpandingDot } from '@components/micro-interactions/FlatListPageIndicator'
import { H2, SafeAreaView } from '@components/Primitives/Primitives'
import TranslatedText from '@components/TranslatedText'
import ROUTE from '@config/routes/Routes'
import { HEIGHT, WIDTH } from '@helpers/Dimensions'
import { useNavigation } from '@react-navigation/core'
import colors from '@styles/colors'
import PurchaseView from '@views/PurchaseView'
import { RegisterView } from '@views/RegisterView'
import { SourceSettingsView } from '@views/SourceView'
import React, { FC, useRef, useState } from 'react'
import { ScrollView, Animated } from 'react-native'
import Modal, { ReactNativeModal } from 'react-native-modal'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'

const images = {
  welcome: require('@assets/onboarding/welcome.png'),
  auth: require('@assets/onboarding/auth.png'),
  coaching: require('@assets/onboarding/coaching.png'),
  done: require('@assets/onboarding/done.png'),
  devices: require('@assets/onboarding/devices.png')
}

export const Onboarding: FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const [dataModal, toggleDataModal] = useState(false)
  const [purchaseModal, togglePurchaseModal] = useState(false)
  const [authModal, toggleAuthModal] = useState(false)

  const signUp = async (email: string, password: string) => {
    await dispatch(register(email, password, authModalToggle))
  }

  const skip = () => {
    navigate(ROUTE.APP)
  }

  const done = () => {
    dispatch(markDataOnboardingCompleted())
    navigate(ROUTE.APP)
  }

  const dataModalToggle = () => {
    toggleDataModal(!dataModal)
  }

  const purchaseModalToggle = () => {
    togglePurchaseModal(!purchaseModal)
  }

  const authModalToggle = () => {
    toggleAuthModal(!authModal)
  }

  return (
    <Container>
      <SkipContainer>
        <SkipButton onPress={skip}>
          <SkipButtonText>Skip</SkipButtonText>
        </SkipButton>
      </SkipContainer>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false
          }
        )}>
        <Page>
          <ImageContainer>
            <Image source={images.welcome} />
          </ImageContainer>
          <Line />
          <TextContainer>
            <Content>
              <Title>ONBOARDING.HELLO</Title>
              <Text>ONBOARDING.HELLO_TEXT</Text>
            </Content>
          </TextContainer>
        </Page>
        <Page>
          <ImageContainer>
            <Image source={images.devices} />
          </ImageContainer>
          <Line />
          <TextContainer>
            <Content>
              <Title>ONBOARDING.DATA</Title>
              <Text>ONBOARDING.DATA_TEXT</Text>
            </Content>
            <PrimaryButton title="START.BUTTON" onPress={dataModalToggle} />
          </TextContainer>
        </Page>

        <Page>
          <ImageContainer>
            <Image source={images.auth} />
          </ImageContainer>
          <Line />
          <TextContainer>
            <Content>
              <Title>ONBOARDING.REGISTER</Title>
              <Text>ONBOARDING.REGISTER_TEXT</Text>
            </Content>
            <PrimaryButton
              title="CREATE_ACCOUNT_BUTTON"
              onPress={authModalToggle}
            />
          </TextContainer>
        </Page>

        <Page>
          <ImageContainer>
            <Image source={images.coaching} />
          </ImageContainer>
          <Line />
          <TextContainer>
            <Content>
              <Title>ONBOARDING.COACHING</Title>
              <Text>ONBOARDING.COACHING_TEXT</Text>
            </Content>
            <PrimaryButton
              title="ONBOARDING.PURCHASE"
              onPress={purchaseModalToggle}
            />
          </TextContainer>
        </Page>

        <Page>
          <ImageContainer>
            <Image source={images.done} />
          </ImageContainer>
          <Line />
          <TextContainer>
            <Content>
              <Title>ONBOARDING.ALL_DONE</Title>
              <Text>ONBOARDING.ALL_DONE_TEXT</Text>
            </Content>
            <PrimaryButton title="ONBOARDING.DONE" onPress={done} />
          </TextContainer>
        </Page>
      </ScrollView>
      <ScrollIndicator scrollX={scrollX} data={[1, 2, 3, 4, 5]} />
      {/* Source Selection */}
      <StyledModal
        isVisible={dataModal}
        transparent={false}
        onSwipeComplete={dataModalToggle}
        onRequestClose={dataModalToggle}
        presentationStyle="pageSheet"
        hideModalContentWhileAnimating
        animationType="slide">
        <ModalContent>
          <SourceSettingsView />
        </ModalContent>
      </StyledModal>

      {/* Source Selection */}
      <StyledModal
        isVisible={authModal}
        transparent={false}
        onSwipeComplete={authModalToggle}
        onRequestClose={authModalToggle}
        presentationStyle="pageSheet"
        hideModalContentWhileAnimating
        animationType="slide">
        <ModalContent>
          <RegisterView
            back={authModalToggle}
            goToLogin={() => {}}
            register={signUp}
          />
        </ModalContent>
      </StyledModal>

      {/* IAP */}
      <StyledModal
        isVisible={purchaseModal}
        transparent={false}
        onSwipeComplete={purchaseModalToggle}
        onRequestClose={purchaseModalToggle}
        presentationStyle="pageSheet"
        hideModalContentWhileAnimating
        animationType="slide">
        <ModalContent>
          <PurchaseView isScreen={false} />
        </ModalContent>
      </StyledModal>
    </Container>
  )
}

const Container = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
`

const Page = styled.View`
  width: 100%;
  width: ${WIDTH}px;
`

const Title = styled(H2)`
  text-align: center;
  color: ${colors.darkBlue};
`

const Text = styled(TranslatedText)`
  text-align: center;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-size: 15px;
  line-height: 28px;
  margin-bottom: 32px;
`

const Line = styled.View`
  background-color: ${colors.darkBlue};
  height: 0px;
  width: 100%;
`

const TextContainer = styled.View`
  padding: 16px;
  margin-top: 32px;
`

const ImageContainer = styled.View`
  height: ${(HEIGHT * 2) / 5}px;
  justify-content: flex-end;
  align-items: center;
`

const ModalContent = styled.ScrollView`
  flex: 1;
`

const StyledModal = styled(Modal)<ReactNativeModal>`
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
  flex: 1;
  margin: 0px;
`
const SkipContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 16px;
`

const SkipButton = styled.TouchableOpacity``

const SkipButtonText = styled(TranslatedText)`
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Image = styled.Image.attrs(() => ({
  resizeMode: 'contain'
}))`
  width: 80%;
  height: 80%;
  margin-bottom: 0px;
`

const Content = styled.View`
  height: 180px;
`

const ScrollIndicator = styled(ExpandingDot)`
  margin-bottom: 30px;
  justify-content: center;
  width: 100%;
`
