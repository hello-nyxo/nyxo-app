import { getIsHealthKitMainSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import React, { FC, memo } from 'react'
import Reanimated from 'react-native-reanimated'
import { Defs, G, Path, Text, TextPath, TSpan } from 'react-native-svg'
import { useDispatch, useSelector } from 'react-redux'
import translate from '../../config/i18n'
import { describeArc } from '../../helpers/geometry'
import colors from '../../styles/colors'
import { fonts } from '../../styles/themes'

type Props = {
  x: number
  y: number
  radius: number
  toggleEdit: () => void
  hasData: boolean
  darkMode: boolean
}
const AnimatedText = Reanimated.createAnimatedComponent(Text)

const CurvedEditButton: FC<Props> = (props) => {
  const dispatch = useDispatch()
  const mainSource = useSelector(getIsHealthKitMainSource)

  const handlePress = () => {
    props.toggleEdit()
  }

  const path = describeArc(props.x, props.y, props.radius, 141, 219).toString()

  if (!mainSource || props.hasData) {
    return null
  }

  const color = props.darkMode ? 'black' : 'white'

  return (
    <G onPress={handlePress}>
      <Defs>
        <Path id="path" d={path} fill="none" stroke="none" strokeWidth="1" />
      </Defs>
      <Path
        d={path}
        fill="none"
        strokeOpacity={0.95}
        stroke={color}
        strokeWidth="50"
      />

      <AnimatedText
        onPress={handlePress}
        transform={{ originX: props.x, originY: props.y * 2 }}
        fill={colors.radiantBlue}
        fontSize="17"
        fontWeight="bold"
        fontFamily={fonts.bold}>
        <TextPath
          href="#path"
          startOffset="50%"
          textAnchor="end"
          midLine="sharp">
          <TSpan dy={-5} textAnchor="middle">
            {translate('ADD_NIGHT')}
          </TSpan>
        </TextPath>
      </AnimatedText>
    </G>
  )
}

export default memo(CurvedEditButton)
