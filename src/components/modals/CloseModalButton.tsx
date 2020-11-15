import React, { FC } from 'react'
import styled from 'styled-components/native'
import ScalingButton from '../Buttons/ScalingButton'
import { IconBold } from '../iconRegular'

type Props = {
  relative?: boolean
  dark?: boolean
  closeModal: () => void
}

export const CloseModalButton: FC<Props> = ({ relative, dark, closeModal }) => {
  return (
    <ScalingButton analyticsEvent="Close modal" onPress={closeModal}>
      <ButtonContainer dark={dark} relative={relative}>
        <ThemedIcon dark={dark} name="closeCircle" height={30} width={30} />
      </ButtonContainer>
    </ScalingButton>
  )
}

interface ButtonProps {
  readonly dark?: boolean
  readonly relative?: boolean
}

const ButtonContainer = styled.View<ButtonProps>`
  flex-direction: row;
  justify-content: flex-end;
  z-index: 20;
  height: 30px;
  width: 30px;
  margin: 0px 20px;
  border-radius: 30px;
  background-color: ${({ dark }) =>
    dark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)'};
`

const ThemedIcon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.PRIMARY_TEXT_COLOR
}))<ButtonProps>``
