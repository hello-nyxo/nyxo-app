import React, { memo, useRef } from 'react'
import { Dimensions, Platform } from 'react-native'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getIntroductionCompleted } from '@selectors/UserSelectors'
import { StyleProps } from '../../styles/themes'
import GoogleFit from './AskAboutDataModal/GoogleFit'
import HealthKit from './AskAboutDataModal/HealthKit'
import SelectSource from './AskAboutDataModal/SelectSource'

const hMargin = 10
const padding = 20
const width = Dimensions.get('window').width - 2 * padding - 2 * hMargin

const AskAboutDataModal = () => {
  const introDone = useSelector(getIntroductionCompleted)
  const ref: any = useRef()

  const isAndroid = Platform.OS === 'android'

  const scroll = () => {
    ref.current.scrollToEnd({ animated: true })
  }

  return (
    <StyledModal
      backdropTransitionOutTiming={0}
      isVisible={!introDone}
      hideModalContentWhileAnimating>
      <Container>
        <ScrollView
          ref={ref}
          horizontal
          scrollEnabled={false}
          pagingEnabled
          showsHorizontalScrollIndicator={false}>
          <InnerContainer>
            {isAndroid ? (
              <GoogleFit scrollNext={scroll} />
            ) : (
              <HealthKit scrollNext={scroll} />
            )}
          </InnerContainer>
          <InnerContainer>
            <SelectSource />
          </InnerContainer>
        </ScrollView>
      </Container>
    </StyledModal>
  )
}

export default memo(AskAboutDataModal)

const StyledModal = styled(Modal)`
  margin: 20px ${hMargin}px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  top: 0px;
  justify-content: flex-end;
`

const Container = styled.View`
  border-radius: 30px;
  background-color: ${(props: StyleProps) =>
    props.theme.SECONDARY_BACKGROUND_COLOR};
  justify-content: space-between;
  padding: ${padding}px;
  height: 350px;
`

const ScrollView = styled.ScrollView`
  flex: 1;
`

const InnerContainer = styled.View`
  flex: 1;
  width: ${width}px;
`
