import ROUTE from '@config/routes/Routes'
import { Formik } from 'formik'
import React, { memo } from 'react'
import { ActivityIndicator, Dimensions, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { register } from '@actions/auth/auth-actions'
import Disclaimer from '@components/AuthSpecific/Disclaimer'
import BackToAppButton from '@components/Buttons/BackToAppButton'
import BottomButton from '@components/Buttons/BottomButton'
import { Container, H1, SafeAreaView } from '@components/Primitives/Primitives'
import SCTextInput from '@components/TextField'
import TopInfo from '@components/TopInfo'
import TranslatedText from '@components/TranslatedText'
import { getLoading } from '@selectors/auth-selectors/auth-selectors'
import { fonts, StyleProps } from '@styles/themes'
import { RegisterSchema } from '../../config/Validation'
import colors from '../../styles/colors'

const { width } = Dimensions.get('window')

type Props = {
  navigation: any
}

const Register = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const loading = useSelector(getLoading)

  const signUp = async (email: string, password: string) => {
    await dispatch(register(email.trim(), password))
  }

  const navigateToSignIn = () => {
    navigation.navigate(ROUTE.AUTH, { screen: ROUTE.LOGIN })
  }

  return (
    <SafeAreaView>
      <Circle />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          signUp(values.email, values.password)
        }}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          touched,
          errors,
          isValid
        }) => (
          <>
            <Container>
              <TopInfo />
              <ScrollView>
                <TitleRow>
                  <H1>TITLE_REGISTER</H1>
                </TitleRow>
                <SCTextInput
                  fieldName="INPUT_EMAIL"
                  keyboardType="email-address"
                  error={touched.email && errors.email}
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  value={values.email}
                  key="email"
                  autoCorrect={false}
                  placeholder="INPUT_EMAIL"
                  icon="emailUnread"
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  enablesReturnKeyAutomatically
                />

                <SCTextInput
                  fieldName="INPUT_PASSWORD"
                  textContentType="newPassword"
                  key="password"
                  value={values.password}
                  autoCompleteType="password"
                  placeholder="INPUT_PASSWORD"
                  secureTextEntry
                  error={touched.password && errors.password}
                  icon="lockCircle"
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  enablesReturnKeyAutomatically
                />
                <PasswordRequirement>PASSWORD_REQUIREMENT</PasswordRequirement>

                <Disclaimer />
                <LoginButton onPress={navigateToSignIn}>
                  MOVE_TO_SIGNIN
                </LoginButton>

                {loading && <ActivityIndicator />}
              </ScrollView>
            </Container>

            <BottomButton
              loading={loading}
              disabled={!isValid}
              onPress={handleSubmit}
              title="BUTTON_REGISTER"
            />
          </>
        )}
      </Formik>
      <BackToAppButton />
    </SafeAreaView>
  )
}

export default memo(Register)

const PasswordRequirement = styled(TranslatedText)<StyleProps>`
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${fonts.medium};
  font-size: 13px;
`

const Circle = styled.View`
  width: ${width}px;
  height: ${width}px;
  background-color: ${colors.darkBlueTransparent};
  border-radius: ${width}px;
  position: absolute;
  left: ${width / -2}px;
  top: ${width / -2}px;
`

const TitleRow = styled.View`
  margin-bottom: 40px;
`

const LoginButton = styled(TranslatedText)`
  font-family: ${fonts.medium};
  text-align: center;
  font-size: 15px;
  color: ${colors.darkBlue};
`
