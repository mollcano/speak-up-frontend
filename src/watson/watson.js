import { router } from '../router';
import auth from '../auth/auth';

const API_URL = 'http://localhost:3000/';
const ADD_AUDIO_URL = API_URL + 'addAudio/';
const GET_AUDIO_URL = API_URL + 'audio/';

export default {
  addAudio(context, audio){
    var self = this
    console.log('hello')
    console.log(audio.user_id)
    context.$http.post((ADD_AUDIO_URL+audio.user_id), audio)
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
