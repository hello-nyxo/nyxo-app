import React, { FC, memo } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import {
  toggleRatingModal,
  updateRatingDate
} from '../../actions/modal/modal-actions'
import getRating from '../../helpers/rating'
import { Day } from '../../Types/Sleepdata'
import ScalingButton from '../Buttons/ScalingButton'
import { IconBold } from '../iconRegular'

type Props = {
  day: Day
  height: number
  width: number
  unClickable?: boolean
}

const NightRating: FC<Props> = ({
  day: { rating = 0, date },
  unClickable,
  height,
  width
}) => {
  const { icon, color } = getRating(rating)
  const dispatch = useDispatch()

  const openModal = () => {
    dispatch(updateRatingDate(date))
    dispatch(toggleRatingModal())
  }
  return (
    <Container>
      <ScalingButton
        analyticsEvent="Pressed rating button"
        onPress={openModal}
        disabled={unClickable}>
        <ButtonContainer color={color}>
          <Icon name={icon} height={height} width={width} />
        </ButtonContainer>
      </ScalingButton>
    </Container>
  )
}

export default memo(NightRating)

const Container = styled.View``
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
