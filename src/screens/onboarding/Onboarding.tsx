import { PrimaryButton } from '@components/Buttons/PrimaryButton'
import { H2, SafeAreaView } from '@components/Primitives/Primitives'
import TranslatedText from '@components/TranslatedText'
import { HEIGHT, WIDTH } from '@helpers/Dimensions'
import colors from '@styles/colors'
import React, { FC, useState } from 'react'
import { ScrollView } from 'react-native'
import { SourceSettingsView } from '@views/SourceView'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/core'
import ROUTE from '@config/routes/Routes'
import PurchaseView from '@views/PurchaseView'
import Modal, { ReactNativeModal } from 'react-native-modal'
import RegisterScreen from '@screens/Auth/RegisterScreen'
import { CoachingIllustration } from '@components/onboarding/CoachingIllustration'
import { DeviceIllustration } from '@components/onboarding/DeviceIllustration'
import { RegisterView } from '@views/RegisterView'
import { useDispatch } from 'react-redux'
import { register } from '@actions/auth/auth-actions'

export const Onboarding: FC = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const [showDataModal, setShowDataModal] = useState(false)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [authModal, toggleAuthModal] = useState(false)

  const signUp = async (email, password) => {
    await dispatch(register(email, password, openAuthModal))
  }

  const openSourceModal = () => {
    setShowDataModal(true)
  }

  const skip = () => {
    navigate(ROUTE.APP)
  }

  const openPurchaseModal = () => {
    setShowPurchaseModal(true)
  }

  const closeModal = () => {
    setShowDataModal(false)
  }

  const closePurchase = () => {
    setShowPurchaseModal(false)
  }

  const openAuthModal = () => {
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
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled>
        <Page>
          <ImageContainer />
          <Line />
          <TextContainer>
            <Title>ONBOARDING.HELLO</Title>
            <Text>ONBOARDING.HELLO_TEXT</Text>
          </TextContainer>
        </Page>
        <Page>
          <ImageContainer>
            <DeviceIllustration />
          </ImageContainer>
          <Line />
          <TextContainer>
            <Title>ONBOARDING.DATA</Title>
            <Text>ONBOARDING.DATA_TEXT</Text>

            <PrimaryButton title="START.BUTTON" onPress={openSourceModal} />
          </TextContainer>
        </Page>

        <Page>
          <ImageContainer />
          <Line />
          <TextContainer>
            <Title>ONBOARDING.REGISTER</Title>
            <Text>ONBOARDING.REGISTER_TEXT</Text>

            <PrimaryButton
              title="CREATE_ACCOUNT_BUTTON"
              onPress={openAuthModal}
            />
          </TextContainer>
        </Page>

        <Page>
          <ImageContainer>
            <CoachingIllustration />
          </ImageContainer>
          <Line />
          <TextContainer>
            <Title>ONBOARDING.COACHING</Title>
            <Text>ONBOARDING.COACHING_TEXT</Text>

            <PrimaryButton title="START.PURCHASE" onPress={openPurchaseModal} />
          </TextContainer>
        </Page>
      </ScrollView>

      {/* Source Selection */}
      <StyledModal
        isVisible={showDataModal}
        transparent={false}
        onSwipeComplete={closeModal}
        onRequestClose={closeModal}
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
        onSwipeComplete={openAuthModal}
        onRequestClose={openAuthModal}
        presentationStyle="pageSheet"
        hideModalContentWhileAnimating
        animationType="slide">
        <ModalContent>
          <RegisterView
            back={openAuthModal}
            goToLogin={() => {}}
            register={signUp}
          />
        </ModalContent>
      </StyledModal>

      {/* IAP */}
      <StyledModal
        isVisible={showPurchaseModal}
        transparent={false}
        onSwipeComplete={closePurchase}
        onRequestClose={closePurchase}
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
  height: 2px;
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
