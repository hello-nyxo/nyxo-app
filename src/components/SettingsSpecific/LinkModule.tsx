import React, { FC, memo } from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components/native'
import { Formik } from 'formik'
import { constants, fonts } from '@styles/themes'
import translate from '@config/i18n'
import colors from '../../styles/colors'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import { IconBold } from '../iconRegular'
import { H3, H5, P } from '../Primitives/Primitives'
import TranslatedText from '../TranslatedText'
import { CodeSchema } from '@config/validation'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { removeLink, linkAccount } from '@reducers/linking'

interface Props {
  linkCode?: string | null
}
const LinkModule: FC<Props> = ({ linkCode: linkCodeFromParams }) => {
  const dispatch = useAppDispatch()
  const linkCode = useAppSelector((state) => state.linking.code)

  const removeCode = () => {
    dispatch(removeLink())
  }

  const confirmUnLink = () => {
    Alert.alert(
      translate('UNLINK_CODE_TITLE'),
      translate('UNLINK_CODE_TEXT'),
      [
        {
          text: translate('UNLINK_YES'),
          onPress: () => removeCode()
        },
        {
          text: translate('UNLINK_NO'),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    )
  }

  return (
    <Container>
      <H3>LINK_PARTNER_TITLE</H3>
      <P>LINK_PARTNER_TEXT</P>

      {linkCode && linkCodeFromParams ? (
        <CodeSuggestionContainer>
          <CodeSuggestion variables={{ linkCode: linkCodeFromParams }}>
            FYI_LINK_CODE
          </CodeSuggestion>
        </CodeSuggestionContainer>
      ) : null}

      {linkCode ? (
        <CurrentLinkCodes>
          <H5>CURRENT_LINK_CODES</H5>
          <LinkCodeRow>
            <LinkCode>{linkCode}</LinkCode>
            <RemoveButton onPress={confirmUnLink}>
              <RemoveButtonIcon name="bin" height={20} width={20} />
            </RemoveButton>
          </LinkCodeRow>
        </CurrentLinkCodes>
      ) : (
        <Formik
          initialValues={{ code: '' }}
          validationSchema={CodeSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(linkAccount(values.code))
            setTimeout(() => {
              setSubmitting(false)
            }, 1000)
          }}>
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            touched,
            isSubmitting,
            isValid
          }) => (
            <InnerContainer>
              <CodeInput
                autoCompleteType="off"
                autoCorrect={false}
                autoCapitalize="none"
                value={values.code}
                onChangeText={handleChange('code')}
                onBlur={handleBlur('code')}
                placeholder={translate('LINK_CODE_PLACEHOLDER')}
              />
              <PrimaryButton
                disabled={!isValid && !touched.code}
                title="VALIDATE_CODE"
                onPress={handleSubmit}
                loading={isSubmitting}
              />
            </InnerContainer>
          )}
        </Formik>
      )}
    </Container>
  )
}

export default memo(LinkModule)

const Container = styled.View`
  margin: 30px 0px 60px;
`

const CodeInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.PRIMARY_TEXT_COLOR
}))`
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 17px;
  flex: 1;
  min-height: 50px;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-color: ${({ theme }) => theme.HAIRLINE_COLOR};
  border-width: ${constants.hairlineWidth}px;
`

const InnerContainer = styled.View`
  margin: 20px 0px;
`

const CurrentLinkCodes = styled.View`
  margin: 20px 0px;
`

const LinkCodeRow = styled.View`
  flex-direction: row;
`

const LinkCode = styled.Text`
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 17px;
  flex: 1;
`

const RemoveButton = styled.TouchableOpacity``

const RemoveButtonIcon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.PRIMARY_TEXT_COLOR
}))``

const CodeSuggestionContainer = styled.View`
  border-radius: 5px;
  border-width: 1px;
  border-color: ${colors.red};
  padding: 5px 10px;
  text-align: center;
`

const CodeSuggestion = styled(TranslatedText)`
  font-family: ${fonts.medium};
  color: ${colors.red};
  font-size: 15px;
  flex: 1;
`
