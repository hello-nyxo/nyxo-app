import { Formik } from 'formik'
import { WIDTH } from '@helpers/Dimensions'
import React, { memo } from 'react'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getLoading } from '@selectors/auth-selectors/auth-selectors'
import styled from 'styled-components/native'
import { login } from '@actions/auth/auth-actions'
import BackToAppButton from '@components/Buttons/BackToAppButton'
import BottomButton from '@components/Buttons/BottomButton'
import MergingDialog from '@components/modals/MergeHabitsModal/MergeHabitsModal'
import { Container, H1, SafeAreaView } from '@components/Primitives/Primitives'
import Input from '@components/TextField'
import TopInfo from '@components/TopInfo'
import TranslatedText from '@components/TranslatedText'
import ROUTE from '../../config/routes/Routes'
import { LoginSchema } from '../../config/Validation'
import colors from '../../styles/colors'
import { fonts, StyleProps } from '../../styles/themes'

type Props = {
  navigation: any
}

const SignInScreen = ({ navigation }: Props) => {
  const loading = useSelector(getLoading)
  const dispatch = useDispatch()

  const forgotPassword = () => {
    navigation.navigate(ROUTE.RECOVER)
  }

  const toRegister = () => {
    navigation.navigate(ROUTE.REGISTER)
  }

  return (
    <SafeAreaView>
      <TopInfo />
      <Circle />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          dispatch(login(values.email, values.password))
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

                <Register onPress={toRegister}>MOVE_TO_REGISTER</Register>
              </ScrollView>
            </Container>

            <BottomButton
              loading={loading}
              disabled={!isValid}
              onPress={handleSubmit}
              title="BUTTON_SIGNIN"
            />
          </>
        )}
      </Formik>
      <BackToAppButton />
      <MergingDialog />
    </SafeAreaView>
  )
}

export default memo(SignInScreen)

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const Circle = styled.View`
  width: ${WIDTH}px;
  background-color: ${colors.radiantBlueTransparent};
  height: ${WIDTH}px;
  border-radius: ${WIDTH}px;
  position: absolute;
  right: ${WIDTH / -2}px;
  top: ${WIDTH / -2}px;
`

const ForgotPassword = styled(TranslatedText)`
  font-family: ${fonts.medium};
  font-size: 15px;
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
`

const Register = styled(TranslatedText)`
  text-align: center;
  font-family: ${fonts.medium};
  font-size: 15px;
  color: ${colors.radiantBlue};
  margin-top: 30px;
`
