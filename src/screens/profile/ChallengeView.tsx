import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { getVisibleChallenges } from '../../store/Selectors/ChallengeSelectors'
import { Challenges } from '../../store/Coaching/Challenges'
import ChallengeItem from '../../components/Challenge/ChallengeItem'

const ChallengeView = () => {
  const visibleAchievements = useSelector(getVisibleChallenges)

  const renderItem = ({ item, index }: any) => {
    return <ChallengeItem key={index} challenge={item} />
  }

  return (
    <View>
      <FlatList renderItem={renderItem} data={Challenges} />
    </View>
  )
}

export default React.memo(ChallengeView)
