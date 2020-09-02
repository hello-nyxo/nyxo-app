import React, { FC, memo, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import {
  toggleRatingModal,
  updateRatingDate
} from '../../actions/modal/modal-actions'
import getRating from '../../helpers/rating'
import ScalingButton from '../Buttons/ScalingButton'
import { IconBold } from '../iconRegular'
import { makeGetRatingOnDate } from 'store/Selectors/night-quality-selectors/night-quality-selector'
import { State } from 'Types/State'

type Props = {
  date: string
  height: number
  width: number
  unClickable?: boolean
}

const NightRating: FC<Props> = ({ date, unClickable, height, width }) => {
  const getRatingOnDate = useMemo(makeGetRatingOnDate, [])
  const ratingDate = useSelector((state: State) =>
    getRatingOnDate(state, { date })
  )

  const { icon, color } = getRating(ratingDate?.rating)
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
