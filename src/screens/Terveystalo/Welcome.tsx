import React, { useEffect } from 'react'
import { SvgCss } from 'react-native-svg'
import styled from 'styled-components/native'
import { useSelector, useDispatch } from 'react-redux'
import Intercom from 'react-native-intercom'
import { Alert, Button } from 'react-native'
import { linkAccount } from '@actions/linking/linking-actions'
import { getLinkingCode, getLoading } from '@selectors/linking-selectors'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { JournalStackParamList } from 'Types/navigation/navigation'
import LinkingButton from 'components/Buttons/LinkingButton'
import LoginButton from '../../components/Buttons/LoginButton'
import TerveystaloLogo from '../../../assets/terveystalo-logo.svg'
import TerveystaloButton from '../../components/Buttons/TerveystaloButton'
import { getAuthState } from '@selectors/auth-selectors/auth-selectors'
import translate from '../../config/i18n'
import { PrimaryButton } from '../../components/Buttons/PrimaryButton'
import GoBack, { GoBackContainer } from '../../components/Buttons/GoBack'
import ROUTE from '../../config/routes/Routes'
import {
  H2,
  SafeAreaView,
  StyledScrollView,
  P,
  CheckBox,
  Container
} from '../../components/Primitives/Primitives'

type TerveystaloNavigationProp = NativeStackNavigationProp<
  JournalStackParamList,
  'Terveystalo'
>

type Props = {
  navigation: TerveystaloNavigationProp
  data: any
}

const TTWelcome = ({ navigation, route }: Props) => {
  const loggedIn = useSelector(getAuthState)
  const loading = useSelector(getLoading)
  const code = useSelector(getLinkingCode)

  const linkCode = route?.params?.link

  const dispatch = useDispatch()

  const handleChatPress = () => {
    Intercom.displayMessenger()
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

const OpenChat = styled.TouchableOpacity``

const OpenChatText = styled.Text``

const Text = styled.Text``
