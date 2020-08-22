import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getFitbitSleep,
  toggleFitbit
} from '../../../actions/api-actions/fitbit-actions'

import { toggleWithings } from '../../../actions/api-actions/withings-actions'
import {
  authorizeGoogleFit,
  readGoogleFitSleep
} from '../../../actions/api-actions/google-fit-actions'
import {
  getFitbitEnabled,
  getWithingsEnabled
} from '../../../store/Selectors/api-selectors/api-selectors'
import { Container, H3 } from '../../Primitives/Primitives'
import EnableSource from './EnableSource'
import GoogleFit from './GoogleFit'
import sources from '../../../../assets/source-images/SourceImages'
import {
  authorizeGarmin,
  toggleGarmin
} from '../../../actions/api-actions/garmin-actions'

const AddSources = () => {
  const dispatch = useDispatch()
  const fitbitEnabled = useSelector(getFitbitEnabled)
  const withingsEnabled = useSelector(getWithingsEnabled)

  const fitbit = () => {
    dispatch(toggleFitbit())
  }

  const garmin = () => {
    dispatch(toggleGarmin())
  }

  const withings = () => {
    dispatch(toggleWithings())
  }

  return (
    <Container>
      <H3>API.ADD_API</H3>

      <EnableSource
        name="Fitbit"
        image={sources.fitbit}
        toggleFunction={fitbit}
        enabled={fitbitEnabled}
        testFunction={fitbitTest}
        refreshFunction={() => {}}
      />

      <EnableSource
        name="Withings"
        image={sources.withings}
        toggleFunction={withings}
        enabled={withingsEnabled}
        testFunction={fitbitTest}
        refreshFunction={() => {}}
      />

      <EnableSource
        name="Garmin"
        image={sources.garmin}
        toggleFunction={garmin}
        enabled={fitbitEnabled}
        testFunction={fitbitTest}
        refreshFunction={() => {}}
      />

      <GoogleFit />
    </Container>
  )
}

export default memo(AddSources)
