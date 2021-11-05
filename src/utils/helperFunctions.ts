const config = require('dotenv')

export const isDevMode = () => {
  if (config.env.NODE_ENV === 'development') {
    return true
  }
  return false
}
