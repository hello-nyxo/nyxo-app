import { H2, SafeAreaView } from '@components/Primitives/Primitives'
import TranslatedText from '@components/TranslatedText'
import { HEIGHT, WIDTH } from '@helpers/Dimensions'
import colors from '@styles/colors'
import React, { FC } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'

export const Onboarding: FC = () => {
  return (
    <SafeAreaView>
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
          </TextContainer>
        </Page>
      </ScrollView>
    </SafeAreaView>
  )
}

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
