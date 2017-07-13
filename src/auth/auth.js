import router from '../router/index'

const API_URL = 'http://localhost:3000/'
const LOGIN_URL = API_URL + 'signin'
const SIGNUP_URL = API_URL + 'signup'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false,
  },

  // Send a request to the login URL and save the returned JWT
  login(context, creds, redirect) {
    var self = this
    context.$http.post(LOGIN_URL, creds)
    .then(data => {
      console.log(data, 'login response data');

      // localStorage.setItem('access_token', data.access_token)

      // self.user.authenticated = true

      // Redirect to a specified route
      if (redirect) {
        // context.$router.push('/')
        routes.go(redirect)
      }

    }).catch(err => {
      console.log(err);
      context.error = err
    })
  },

  signup(context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('id_token', data.token)
      // localStorage.setItem('access_token', data.access_token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }

    }).error((err) => {
      context.error = err
    })
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('token')
    // localStorage.removeItem('access_token')
    this.user.authenticated = false
  },

  checkAuth () {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {

      this.user.authenticated = true

    } else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}
