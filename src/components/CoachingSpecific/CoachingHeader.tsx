import { IconBold } from '@components/iconRegular'
import { useGetActiveCoaching } from '@hooks/coaching/useCoaching'
import { format } from 'date-fns'
import React, { FC } from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import styled from 'styled-components/native'
import colors from 'styles/colors'
import { PageTitle } from '../Primitives/Primitives'
import IntroduceCoaching from './IntroduceCoaching'

const CoachingHeader: FC = () => {
  const { data } = useGetActiveCoaching()

  return (
    <>
      <PageTitle>Coaching</PageTitle>

      <Title>Active Coaching Period</Title>
      <Container>
        <Column>
          {data?.started && (
            <Text>Started: {format(new Date(data?.started), 'dd.mm.yy')}</Text>
          )}
          <Row>
            <Icon />
            <Text>{data?.lessons?.length} lessons completed</Text>
          </Row>
          <Row>
            <Icon />
            <Text>{data?.weeks?.length} weeks completed</Text>
          </Row>
        </Column>
        <Progress rotation={0} size={50} fill={50} width={5} />
      </Container>

      <IntroduceCoaching />
    </>
  )
}

export default CoachingHeader

const Container = styled.View`
  margin: 0px 16px 32px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  padding: 16px;
  border-radius: 8px;
  flex-direction: row;
  box-shadow: ${({ theme }) => theme.SHADOW};
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const Text = styled.Text`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
`

const Icon = styled(IconBold).attrs(({ theme }) => ({
  height: 15,
  width: 15,
  fill: theme.SECONDARY_TEXT_COLOR,
  name: 'bookLamp'
}))`
  margin-right: 8px;
`

const Title = styled.Text`
  margin: 16px 16px 8px;
  text-transform: uppercase;
  font-size: 15px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_BOLD};
`

const Column = styled.View``

const Progress = styled(AnimatedCircularProgress).attrs(({ theme }) => ({
  tintColor: colors.radiantBlue,
  backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
  lineCap: 'round'
}))`
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
`
