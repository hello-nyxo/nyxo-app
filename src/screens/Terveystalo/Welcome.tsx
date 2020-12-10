import React, { FC, useState } from 'react'
import styled from 'styled-components/native'
import { useSelector, useDispatch } from 'react-redux'
import { linkAccount } from '@actions/linking/linking-actions'
import { getLinkingCode, getLoading } from '@selectors/linking-selectors'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@typings/navigation/navigation'
import LinkingButton from '@components/Buttons/LinkingButton'
import LoginButton from '@components/Buttons/LoginButton'
import { getAuthState } from '@selectors/auth-selectors/auth-selectors'
import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import {
  H2,
  SafeAreaView,
  StyledScrollView,
  P,
  CheckBox,
  Container,
  StyledModal
} from '@components/Primitives/Primitives'
import { RouteProp } from '@react-navigation/core'
import TranslatedText from '@components/TranslatedText'
import colors from '@styles/colors'
import LinkModule from '@components/SettingsSpecific/LinkModule'
import ROUTE from '../../config/routes/Routes'

type TerveystaloNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ROUTE.TERVEYSTALO
>

type TerveystaloScreenRouteProp = RouteProp<
  RootStackParamList,
  ROUTE.TERVEYSTALO
>

type Props = {
  navigation: TerveystaloNavigationProp
  route: TerveystaloScreenRouteProp
}

const TTWelcome: FC<Props> = ({ route }) => {
  const [showCode, toggleShowCode] = useState(false)
  const loggedIn = useSelector(getAuthState)
  const loading = useSelector(getLoading)
  const code = useSelector(getLinkingCode)
  const dispatch = useDispatch()
  const linkCode = route?.params?.code

  const toggleLinkModule = () => {
    toggleShowCode(showCode)
  }

  const handleLink = () => {
    dispatch(linkAccount(linkCode))
  }

  return (
    <SafeAreaView>
      <StyledScrollView>
        <GoBackContainer>
          <GoBack route={ROUTE.SLEEP} />
        </GoBackContainer>
        <Container>
          <H2>TERVEYSTALO.WELCOME</H2>
          <P>TERVEYSTALO.DESCRIPTION</P>
          <Task>
            <Row>
              <CheckBox size={25} checked={loggedIn} />
              <Point>TERVEYSTALO.TASK_1</Point>
            </Row>
            <Explanation>TERVEYSTALO.TASK_1_EXPLANATION</Explanation>
          </Task>

          {!loggedIn && <LoginButton />}

          <Task>
            <Row>
              <CheckBox size={25} checked={!!code} />
              <Point>TERVEYSTALO.TASK_2</Point>
            </Row>
            <Explanation>TERVEYSTALO.TASK_2_EXPLANATION</Explanation>
          </Task>
          {!code && (
            <LinkingButton
              disabled={!loggedIn}
              code={linkCode}
              loading={loading}
              navigate={() => {}}
              link={handleLink}
            />
          )}

          {loggedIn && !!code && <P>TERVEYSTALO.DONE</P>}

          <StyledModal
            isVisible={showCode}
            transparent={false}
            onSwipeComplete={toggleLinkModule}
            onRequestClose={toggleLinkModule}
            presentationStyle="pageSheet"
            hideModalContentWhileAnimating
            animationType="slide">
            <ModalContent>
              <LinkModule />
            </ModalContent>
          </StyledModal>
        </Container>
      </StyledScrollView>
    </SafeAreaView>
  )
}

export default TTWelcome

const Task = styled.View`
  margin: 30px 0px;
`

const Point = styled(P)`
  font-size: 17px;
  font-family: ${({ theme }) => theme.FONT_BOLD};
  margin: 0px;
  padding: 0px;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const Explanation = styled(P)`
  line-height: 25px;
`

const ErrorContainer = styled.View``

const Error = styled(TranslatedText)`
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${colors.red};
`

const ModalContent = styled.ScrollView`
  flex: 1;
  padding: 16px;
`
