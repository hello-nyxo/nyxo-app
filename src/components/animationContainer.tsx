import React, { memo, ReactNode } from 'react'

import ElegantAnimation from './ElegantAnimation'

interface AnimationContainerProps {
  style: any
  extraDelay?: number
  children: JSX.Element[] | JSX.Element
}

const AnimationContainer = (props: AnimationContainerProps) => {
  const animatedChildren = (child: any, index: number) => (
    <ElegantAnimation delay={index} key={index} style={props.style}>
      {child}
    </ElegantAnimation>
  )

  const { children } = props
  const extraDelay = props.extraDelay || 0

  if (children instanceof Array) {
    return children.map((child, index) =>
      animatedChildren(child, extraDelay + index)
    )
  }
  return animatedChildren(children, extraDelay)
}

export default memo(AnimationContainer)
