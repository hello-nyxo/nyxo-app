import BackToAppButton from '@components/Buttons/BackToAppButton'
import BottomButton from '@components/Buttons/BottomButton'
import { Container, H1, SafeAreaView } from '@components/Primitives/Primitives'
import Input from '@components/TextField'
import TranslatedText from '@components/TranslatedText'
import { LoginSchema } from '@config/validation'
import { WIDTH } from '@helpers/Dimensions'
import { useAppSelector } from '@hooks/redux'

import colors from '@styles/colors'
import { fonts } from '@styles/themes'
import { Formik } from 'formik'
import React, { FC, memo } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'

type Props = {
  login: (email: string, password: string) => Promise<void>
  back: () => void
  goToRegister: () => void
}

const SignInScreen: FC<Props> = ({ back, goToRegister, login }) => {
  const loading = useAppSelector(({ auth }) => auth.loading)

  const submit = ({ email, password }: { email: string; password: string }) => {
    login(email, password)
  }

  return (
    <SafeAreaView>
      <Circle />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={submit}>
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
              <ScrollView>
                <TitleRow>
                  <H1>TITLE_SIGNIN</H1>
                </TitleRow>

                <Input
                  key="email"
                  fieldName="INPUT_EMAIL"
                  autoCompleteType="email"
                  returnKeyType="next"
                  value={values.email}
                  error={touched.email ? errors.email : ''}
                  blurOnSubmit={false}
                  enablesReturnKeyAutomatically
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  placeholder="INPUT_EMAIL"
                  onBlur={handleBlur('email')}
                  icon="emailUnread"
                  onChangeText={handleChange('email')}
                />
                <Input
                  key="password"
                  fieldName="INPUT_PASSWORD"
                  textContentType="password"
                  autoCompleteType="password"
                  value={values.password}
                  error={touched.password ? errors.password : ''}
                  returnKeyType="done"
                  enablesReturnKeyAutomatically
                  placeholder="INPUT_PASSWORD"
                  secureTextEntry
                  icon="lockCircle"
                  onBlur={handleBlur('password')}
                  blurOnSubmit
                  onChangeText={handleChange('password')}
                />

                <Register onPress={goToRegister}>MOVE_TO_REGISTER</Register>
              </ScrollView>
            </Container>

            <BottomButton
              loading={loading === 'pending'}
              disabled={!isValid || (!touched.email && !touched.password)}
              onPress={handleSubmit}
              title="BUTTON_SIGNIN"
            />
          </>
        )}
      </Formik>
      <BackToAppButton back={back} />
    </SafeAreaView>
  )
}

export default memo(SignInScreen)

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0px;
`

const Circle = styled.View`
  width: ${WIDTH}px;
  background-color: ${colors.darkBlueTransparent};
  height: ${WIDTH}px;
  border-radius: ${WIDTH}px;
  position: absolute;
  right: ${WIDTH / -2}px;
  top: ${WIDTH / -2}px;
`

const Register = styled(TranslatedText)`
  text-align: center;
  font-family: ${fonts.medium};
  font-size: 15px;
  color: ${colors.darkBlue};
  margin-top: 30px;
`
