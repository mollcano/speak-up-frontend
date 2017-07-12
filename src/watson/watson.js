import { router } from '../router';

const API_URL = 'http://localhost:3000/';
const AUDIO_URL = API_URL + 'addAudio';

export default {
  addAudio(context, audio){
    var self = this
    console.log('hello')
    context.$http.post(AUDIO_URL, audio)
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
