import React, { memo } from 'react'
import { Dimensions, View } from 'react-native'
import styled from 'styled-components/native'
import { fonts } from '../styles/themes'
import { IconBold } from './iconRegular'
import TranslatedText from './TranslatedText'

const cardMinWidth = Dimensions.get('window').width / 2 - 40

interface TinyCardProps {
  iconBg: string
  iconColor: string
  icon: string
  title: string
  figure: string
}

const TinyCard = (props: TinyCardProps) => (
  <Card>
    <IconContainer style={{ backgroundColor: props.iconBg }}>
      <IconBold
        fill={props.iconColor}
        name={props.icon}
        height={20}
        width={20}
      />
    </IconContainer>
    <View>
      <Title>{props.title}</Title>
      <Figure>{props.figure}</Figure>
    </View>
  </Card>
)

export default memo(TinyCard)

const Card = styled.View({
  minWidth: cardMinWidth,
  maxHeight: 80,
  flex: 1,
  paddingHorizontal: 10,
  paddingVertical: 15,
  margin: 5,
  borderRadius: 5,
  backgroundColor: 'white',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
})

const IconContainer = styled.View({
  padding: 8,
  borderRadius: 20
})

const Title = styled(TranslatedText)`
  font-family: ${fonts.bold};
  text-align: right;
  font-size: 15;
  color: black;
  margin-bottom: 5px;
`

const Figure = styled.Text({
  fontFamily: fonts.bold,
  textAlign: 'right',
  fontSize: 17,
  color: 'black'
})
