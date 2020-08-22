import React, { memo } from 'react'
import { View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import Achievement from './Components/Achievement'
import TranslatedText from '../../components/TranslatedText'
import { getVisibleChallenges } from '../../store/Selectors/ChallengeSelectors'
import { H2, P } from '../../components/Primitives/Primitives'

interface ChallengesProps {}

const Challenge = (props: ChallengesProps) => {
  const challenges = useSelector(getVisibleChallenges)

  const renderChallenge = ({ item, index }: any) => {
    return <Achievement key={index} item={item} onPress={() => {}} />
  }

  return (
    <View>
      <View>
        <H2>Challenges</H2>
        <TranslatedText
          variables={{
            challengeCompleted: 0,
            challengesLeft: 0
          }}>
          challenges-completed
        </TranslatedText>
      </View>
      <FlatList
        data={challenges}
        renderItem={renderChallenge}
        horizontal
        centerContent
      />
      <P>ChallengesExplanation</P>
    </View>
  )
}

export default memo(Challenge)
