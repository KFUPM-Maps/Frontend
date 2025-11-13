const config = {
  development: {
    apiBaseURL: 'http://localhost:4000/'
  },
  production: {
    apiBaseURL: 'https://.com/api'
  }
}

const environment = import.meta.env.MODE
export const API_BASE_URL = config[environment].apiBaseURL