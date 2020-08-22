import * as React from 'react'
import SvgIcon from './SvgIcon'

interface IconProps {
  name: string
  height: number
  width: number
  fill: string
}

const IconBold = (props: IconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24" />
)

// export const AnimatedIconBold = Animated.createAnimatedComponent(IconBold);

export default IconBold
