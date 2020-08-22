const codePush = {
  InstallMode: { ON_NEXT_RESTART: 'ON_APP_RESTART' },
  CheckFrequency: { ON_APP_RESUME: 'ON_APP_RESUME' }
}

const cb = (_: any) => (app: any) => app
Object.assign(cb, codePush)
export default cb
