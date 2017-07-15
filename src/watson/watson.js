import { router } from '../router';
import auth from '../auth/auth';

const API_URL = 'http://localhost:3000/';
const ADD_AUDIO_URL = API_URL + 'addAudio/';
const GET_AUDIO_URL = API_URL + 'audio/';

export default {
  addAudio(context, audio){
    var self = this
    var formData = new FormData()
    formData.append('title', audio.title)
    formData.append('file', audio.file)
    formData.append('user_id', audio.user_id)
    console.log(audio, formData)
    return context.$http.post((ADD_AUDIO_URL+audio.user_id), formData, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Transfer-Encoding': 'chunked'
      },
    })
  }
}
