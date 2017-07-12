import { router } from '../router';

const API_URL = 'http://localhost:3000/';
const ADD_AUDIO_URL = API_URL + 'addAudio';
const GET_AUDIO_URL = API_URL + 'audio'

export default {
  getAudio(context, file){
    var self = this
    context.$http.get(GET_AUDIO_URL)
    .then(data => {
      console.log('data', data)
    })
  },
  addAudio(context, audio){
    var self = this
    console.log('hello')
    context.$http.post(ADD_AUDIO_URL, audio)
    console.log(audio)
    .then(data => {
      console.log('data', data)
    })
    .catch(err =>{
      console.log(err)
      context.error = err
    })
  }
}
