import React, { memo, useState } from 'react'
import { Animated, SafeAreaView, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import { ConfirmationSchema } from 'config/Validation'
import {
  requestNewPassword,
  submitNewPassword
} from '@actions/auth/auth-actions'
import BottomButton from '../../components/Buttons/BottomButton'
import TextButton from '../../components/Buttons/TextButton'
import { Container, H1, H4 } from '../../components/Primitives/Primitives'
import SCTextInput from '../../components/TextField'
import TopInfo from '../../components/TopInfo'
import { getEmail } from '../../store/Selectors/UserSelectors'

const ForgotPasswordScreen = () => {
  const emailFromState = useSelector(getEmail)
  const dispatch = useDispatch()

  const requestPassword = () => {
    dispatch(requestNewPassword(emailFromState))
  }

  return (
    <SafeAreaView style={{ paddingTop: 20, flex: 1 }}>
      <TopInfo />
      <ScrollView>
        <Formik
          initialValues={{ email: '', password: '', code: '' }}
          validationSchema={ConfirmationSchema}
          onSubmit={(values) => {}}>
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
                <H1>RECOVER_PASSWORD_TITLE</H1>
                <H4>RECOVER_PASSWORD_TEXT</H4>

                <SCTextInput
                  key="email"
                  fieldName="INPUT_EMAIL"
                  autoCompleteType="email"
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  placeholder="INPUT_EMAIL"
                  value={values.email}
                  icon="emailUnread"
                  onChangeText={handleChange('email')}
                />

                <TextButton
                  center
                  style={{ marginVertical: 20 }}
                  onPress={requestPassword}>
                  Request password reset
                </TextButton>

                <SCTextInput
                  key="code"
                  fieldName="INPUT_CODE"
                  textContentType="oneTimeCode"
                  placeholder="INPUT_CODE"
                  icon="dialPad"
                  keyboardType="numeric"
                  blurOnSubmit
                  onChangeText={handleChange('code')}
                />

                <SCTextInput
                  key="password"
                  fieldName="INPUT_PASSWORD"
                  textContentType="password"
                  autoCompleteType="password"
                  secureTextEntry
                  placeholder="INPUT_PASSWORD"
                  icon="lockCircle"
                  blurOnSubmit
                  onChangeText={handleChange('password')}
                />
              </Container>
              <BottomButton
                disabled={!isValid}
                onPress={handleSubmit}
                title="BUTTON_CONFIRM"
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

export default memo(ForgotPasswordScreen)
