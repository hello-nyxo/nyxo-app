import { PrimaryButton } from '@components/Buttons/PrimaryButton'
import { H2, SafeAreaView } from '@components/Primitives/Primitives'
import TranslatedText from '@components/TranslatedText'
import { HEIGHT, WIDTH } from '@helpers/Dimensions'
import colors from '@styles/colors'
import React, { FC } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'

export const Onboarding: FC = () => {
  const openSourceModal = () => {}

  const openPurchaseModal = () => {}

  return (
    <Container>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled>
        <Page>
          <ImageContainer />
          <Line />
          <TextContainer>
            <Title>ONBOARDING.HELLO</Title>
            <Text>ONBOARDING.HELLO_TEXT</Text>
          </TextContainer>
        </Page>
        <Page>
          <ImageContainer />
          <Line />
          <TextContainer>
            <Title>ONBOARDING.DATA</Title>
            <Text>ONBOARDING.DATA_TEXT</Text>

            <PrimaryButton title="START.BUTTON" onPress={openSourceModal} />
          </TextContainer>
        </Page>

        <Page>
          <ImageContainer />
          <Line />
          <TextContainer>
            <Title>ONBOARDING.COACHING</Title>
            <Text>ONBOARDING.COACHING_TEXT</Text>

            <PrimaryButton title="START.BUTTON" onPress={openSourceModal} />
          </TextContainer>
        </Page>
      </ScrollView>
    </Container>
  )
}

const Container = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
`

const Page = styled.View`
  width: 100%;
  width: ${WIDTH}px;
`

const Title = styled(H2)`
  text-align: center;
  color: ${colors.darkBlue};
`

const Text = styled(TranslatedText)`
  text-align: center;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-size: 15px;
  line-height: 28px;
`

const Line = styled.View`
  background-color: ${colors.darkBlue};
  height: 2px;
  width: 100%;
`

const TextContainer = styled.View`
  padding: 16px;
  margin-top: 32px;
`

const ImageContainer = styled.View`
  height: ${(HEIGHT * 2) / 5}px;
`
