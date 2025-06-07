import axios from 'axios'

// Create axios instance with default config
const apiService = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request interceptor for API calls
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for API calls
apiService.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    
    // Handle token expiration
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      // Clear token and redirect to login
      localStorage.removeItem('token')
      window.location.href = '/login'
      return Promise.reject(error)
    }
    
    return Promise.reject(error)
  }
)

export { apiService }