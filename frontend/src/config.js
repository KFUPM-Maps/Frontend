const config = {
  development: {
    apiBaseURL: 'http://localhost:4000/api'
  },
  production: {
    apiBaseURL: 'https://kfupm-maps-backend.onrender.com/api'
  }
}

const environment = import.meta.env.MODE
export const API_BASE_URL = config[environment].apiBaseURL