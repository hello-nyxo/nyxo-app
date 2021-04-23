import getRating from '@helpers/rating'
import { useAppDispatch } from '@hooks/redux'
import { toggleRatingModal } from '@reducers/modal'
import { Day } from '@typings/Sleepdata'
import React, { FC, memo } from 'react'
import styled from 'styled-components/native'
import ScalingButton from '../Buttons/ScalingButton'
import { IconBold } from '../iconRegular'

type Props = {
  day: Day
  x: number
}

const NightRating: FC<Props> = ({ day: { rating = 0 }, x }) => {
  const { icon, color } = getRating(rating)
  const dispatch = useAppDispatch()

  const openModal = () => {
    dispatch(toggleRatingModal(true))
  }
  return (
    <Container x={x}>
      <ScalingButton analyticsEvent="Pressed rating button" onPress={openModal}>
        <ButtonContainer color={color}>
          <Icon name={icon} height={30} width={30} />
        </ButtonContainer>
      </ScalingButton>
    </Container>
  )
}

export default memo(NightRating)

type ContainerProps = {
  readonly x: number
}

const Container = styled.View<ContainerProps>`
  position: absolute;
  top: 90px;
  right: ${({ x }) => x - 5}px;
  z-index: 20;
`
interface RatingButtonProps {
  readonly color?: string
}

const ButtonContainer = styled.View<RatingButtonProps>`
  background-color: ${({ color }) => color || 'transparent'};
  border-radius: 30px;
`

const Icon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.PRIMARY_TEXT_COLOR
}))``
