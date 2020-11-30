import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { constants, fonts } from '@styles/themes'
import colors from '../../styles/colors'
import { IconBold } from '../iconRegular'

interface SourceRowProps {
  sourceId: string
  sourceName: string
  selectedSourceId?: string
  switchSource: Function
}

const SourceRow = (props: SourceRowProps) => {
  const { sourceId, sourceName, selectedSourceId, switchSource } = props
  let artworkUrl = null
  const [icon, setIconUrl] = useState(
    require('../../../assets/healthkitIcon.png')
  )

  const getArtwork = () => {
    fetch(`http://itunes.apple.com/lookup?bundleId=${sourceId}`).then(
      (response) => {
        response.text().then((text) => {
          const array = JSON.parse(text)
          if (array.results.length !== 0) {
            artworkUrl = array.results[0].artworkUrl60
            setIconUrl({ uri: artworkUrl })
          }
        })
      }
    )
  }

  useEffect(() => {
    getArtwork()
  }, [])

  const handlePress = () => {
    switchSource(sourceId)
  }

  const selected = selectedSourceId === sourceId

  return (
    <ListItem disabled={selected} onPress={handlePress}>
      <ListItemContainer>
        <ImageContainer>
          <Image resizeMode="cover" source={icon} />
        </ImageContainer>
        <SourceRowContainer>
          <SourceName>{sourceName}</SourceName>
          <SubTitle>{sourceId}</SubTitle>
        </SourceRowContainer>

        <Icon selected={!!selected} width={20} height={20} />
      </ListItemContainer>
    </ListItem>
  )
}

export default SourceRow

const ListItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

const ListItem = styled.TouchableOpacity`
  padding: 10px 0px;
  border-bottom-width: ${constants.hairlineWidth}px;
  border-bottom-color: ${({ theme }) => theme.HAIRLINE_COLOR};
`

const ImageContainer = styled.View`
  height: 30px;
  width: 30px;
  border-radius: 5px;
  overflow: hidden;
`
interface IconProps {
  readonly selected?: boolean
}

const Image = styled.Image`
  height: 30px;
  width: 30px;
`

const Icon = styled(IconBold).attrs(({ selected, theme }: IconProps) => ({
  fill: selected ? colors.darkBlue : theme.SECONDARY_TEXT_COLOR,
  name: selected ? 'circleCheck' : 'circleAlternate'
}))<IconProps>``

const SourceName = styled.Text`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const SubTitle = styled.Text`
  font-size: 12px;
  margin-top: 5px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const SourceRowContainer = styled.View`
  margin-left: 10px;
  flex: 1;
`
