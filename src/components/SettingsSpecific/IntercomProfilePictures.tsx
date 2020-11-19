import React from 'react'
import { Image, View } from 'react-native'
import styled from 'styled-components/native'
import colors from '../../styles/colors'

const IntercomProfilePictures = () => {
  return (
    <Container>
      <ProfilePicture
        borderRadius={30}
        resizeMode="cover"
        source={require('../../../assets/profilePictures/eeva.png')}
      />
      <ProfilePicture
        borderRadius={30}
        resizeMode="cover"
        source={require('../../../assets/profilePictures/perttu.jpg')}
      />
      <ProfilePicture
        borderRadius={30}
        resizeMode="cover"
        source={require('../../../assets/profilePictures/pietari.png')}
      />
    </Container>
  )
}

export default React.memo(IntercomProfilePictures)

const Container = styled.View`
  flex-direction: row;
`

const ProfilePicture = styled.Image`
  height: 30px;
  width: 30px;
  overflow: hidden;
  border-color: ${colors.darkBlue};
  border-width: 2px;
  border-radius: 30px;
  margin-left: -10px;
`
