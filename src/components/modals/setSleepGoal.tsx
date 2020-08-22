import React, { PureComponent } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import Modal from 'react-native-modal'
import SleepTarget from '../SleepTarget/SleepTarget'
import ScalingButton from '../Buttons/ScalingButton'
import IconBold from '../iconBold'

export class SetSleepGoalModal extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      ready: false
    }
  }

  async componentDidMount() {
    const img = require('../../assets/pinch.png')
    this.setState({ ready: true })
  }

  render() {
    return (
      <Modal
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        useNativeDriver
        isVisible={this.props.modalVisible}
        style={{ margin: 0 }}
        onBackdropPress={() => this.props.setModalVisible(false)}>
        <View
          style={{
            position: 'absolute',
            right: 30,
            top: 50,
            zIndex: 20
          }}>
          <ScalingButton
            onPress={() => {
              this.props.setModalVisible(false)
            }}>
            <IconBold name="closeCircle" fill="white" height={30} width={30} />
          </ScalingButton>
        </View>
        <SleepTarget weight={84} height={1.77} sleepAmount={8} />
      </Modal>
    )
  }
}
