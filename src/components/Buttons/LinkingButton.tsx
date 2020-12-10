import React, { FC } from 'react'
import styled from 'styled-components/native'
import TranslatedText from '@components/TranslatedText'
import colors from '@styles/colors'
import { fonts } from '@styles/themes'

interface Props {
  navigate: () => void
  link: () => void
  code?: string
  loading: boolean
  disabled?: boolean
}

const LinkingButton: FC<Props> = ({
  navigate,
  link,
  code,
  loading,
  disabled
}) => {
  const handlePress = () => {
    if (code) {
      link()
    } else {
      navigate()
    }
  }
  return (
    <Touchable onPress={handlePress} disabled={loading || disabled}>
      <Button disabled={loading || disabled}>
        {loading ? (
          <Loading />
        ) : code ? (
          <ButtonText variables={{ code }} disabled={loading || disabled}>
            TERVEYSTALO.USING_CODE
          </ButtonText>
        ) : (
          <ButtonText disabled={loading}>TERVEYSTALO.MANUAL_CODE</ButtonText>
        )}
      </Button>
    </Touchable>
  )
}

export default LinkingButton

interface ButtonProps {
  readonly disabled?: boolean
  readonly white?: boolean
}

const Button = styled.View<ButtonProps>`
  border-radius: 5px;
  border-color: ${(props) => (props.white ? colors.darkBlue : 'transparent')};
  border-width: 1px;
  padding: 15px;
  min-width: 150px;
  margin-bottom: 10px;
  width: auto;
  align-items: center;
  background-color: ${(props) =>
    props.white ? colors.white : colors.darkBlue};
  opacity: ${(props: ButtonProps) => (props.disabled ? 0.2 : 1)};
`

const ButtonText = styled(TranslatedText)<ButtonProps>`
  font-family: ${fonts.medium};
  color: ${(props) => (props.white ? colors.darkBlue : colors.white)};
  font-size: 15px;
  text-transform: uppercase;
  text-align: center;
  opacity: ${(props: ButtonProps) => (props.disabled ? 0.5 : 1)};
`

const Loading = styled.ActivityIndicator``

const Touchable = styled.TouchableOpacity``
