import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import LinkingButton from '@components/Buttons/LinkingButton'
import LoginButton from '@components/Buttons/LoginButton'
import {
  CheckBox,
  Container,
  H2,
  P,
  SafeAreaView,
  StyledModal,
  StyledScrollView
} from '@components/Primitives/Primitives'
import LinkModule from '@components/SettingsSpecific/LinkModule'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { linkAccount } from '@reducers/linking'
import { RootStackParamList } from '@typings/navigation/navigation'
import React, { FC, useState } from 'react'
import styled from 'styled-components/native'

type TerveystaloNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTE.TERVEYSTALO
>

type TerveystaloScreenRouteProp = RouteProp<RootStackParamList, 'Terveystalo'>

type Props = {
  navigation: TerveystaloNavigationProp
  route: TerveystaloScreenRouteProp
}

const TTWelcome: FC<Props> = ({ route }) => {
  const [showCode, toggleShowCode] = useState(false)
  const loggedIn = false //useAppSelector(getAuthState) FIXME
  const { loading, code } = useAppSelector(({ linking }) => linking)
  const dispatch = useAppDispatch()
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
          <GoBack route="App" />
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
              loading={loading === 'pending'}
              navigate={() => undefined} // FIXME
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

const ModalContent = styled.ScrollView`
  flex: 1;
  padding: 16px;
`
