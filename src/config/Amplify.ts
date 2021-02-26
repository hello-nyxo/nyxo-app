import Amplify, { Auth } from 'aws-amplify'
import awsAmplify from '../aws-exports'

const amplify = Amplify.configure(awsAmplify)

Auth.configure(awsAmplify)

export default amplify
