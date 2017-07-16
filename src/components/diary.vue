<template>
  <div class="diary">
    <button id="presentation-btn" type="button" name="button" v-on:click="seen = !seen">Submit a New Presentation</button>

    <v-layout class="mb-3" column align-center v-if="seen">
      <v-card class="mt-3"align-center>
        <v-toolbar dark>
          <v-toolbar-title>Upload a .wav audio file</v-toolbar-title>
          <div class="error" v-if="error">
            <p>{{ error }}</p>
          </div>
        </v-toolbar>
        <v-card-text class="pb-1">
          <v-text-field
            label="Title of Presentation"
            class="mt-1"
            v-model="audio.title"
            required
          ></v-text-field>
          <input
            type="file"
            label=""
            v-on:change="audioUpload"
          >
        </v-card-text>
        <v-card-actions class="pt-1">
          <v-btn id="submit-btn" @click.native="submit()">SUBMIT</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
    <h2><span>{{ first_name }}'s Diary</span></h2>
    <v-layout row>
    <v-flex xs12 sm12>
      <v-card class="mb-5" v-for="item in items" :key="item" v-bind:value="item === 2">
        <v-card-title class="diary-panels" primary-title>
          <div>
            <div class="headline">{{ item.title }}</div>
            <span class="grey--text"><v-icon dark class="date-icon">date_range</v-icon>
            {{ item.date }}
            <v-icon dark class="timer-icon">timer</v-icon>
            {{ item.length_of_audio }}</span>
          </div>
        </v-card-title>
        <v-card-actions class="ml-2">
          Analyze this presentation
          <v-btn icon @click.native="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show">
            <div class="clarity">
              <v-icon fa class="icons">glass</v-icon> <h3 class="conf-title">Clarity</h3><input type="range" min="0" max="1" step="0.1" :value="item.confidence" class="range-bar"/><h3 class="conf-val">{{ item.confidence }}</h3>
            </div>
            <div class="fillers">
              <svg class="whatFillers" style="height: 400; width: 450;"></svg>

            </div>



          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
import watson from '../watson/watson';
import auth from '../auth/auth';

export default {
  data() {
    return {
      seen: false,
      show: false,
      audio: {
        title: '',
        file: '',
      },
      error: '',
      items: [],
      first_name: auth.user.first_name,
      last_name: auth.user.last_name,
    };
  },
  created: function() {
    var self = this
    console.log(auth.user)
    this.$http.get('http://localhost:3000/audio/' + auth.user.id)
    .then(data => {
      for (var i=(data.body.length)-1; i>=0; i--){
        this.items.push(data.body[i])
      }
        this.renderWhatFillers(this.items)
    })
  },
  methods: {
    audioUpload(e){
      var uploadedFile = e.target.files || e.dataTransfer.files

      if(!uploadedFile.length){
        console.log('Audio file is undefined')
        return
      }
      this.audio.file = uploadedFile[0]
    },
    submit() {
      const audio = {
        title: this.audio.title,
        file: this.audio.file,
        user_id: auth.user.id,
      };
      watson.addAudio(this, audio)
      .then(data => {
        this.items.push(data.body)
      })
      .catch(err =>{
        console.log(err)
        this.error = err
      });
      this.seen = false;
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.diary {
  font-family: 'Open Sans', sans-serif;
}
#presentation-btn{
  width: 60%;
  margin-left: 20%;
  background-color: #4DD6B6;
  height: 80px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-size: 300%;
  color: #FAFAFA;
  border-style: outset;
}
*, :after, :before{
  box-sizing: initial;
}
#hidden{
  display: none;
  background-color: #433A3F;
  width: 50%;
}
#submit-btn{
  background-color: #4DD6B6;
  color: #FAFAFA;
  font-family: 'Open Sans', sans-serif;
  margin-left: 35% !important;
}
#submit-btn:hover{
  color: #FAFAFA;
}
.diary-panels{
  background-color: #433A3F;
  color: #FAFAFA;
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
}
.date-icon, .timer-icon{
  margin-left: 10px;
  margin-right: 0px;
}
h2 {
  width:100%;
  text-align:center;
  border-bottom: 1px solid #000;
  line-height:0.1em;
  margin:10px 0 20px;
  margin-top: 5%;
  margin-bottom: 5%;
}
h2 span {
  background-color: rgb(249, 249, 249);
  padding:0 10px;
}



input[type=range] {
  -webkit-appearance: none;
  margin: 18px 0;
  width: 80%;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 80%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #42C3DD;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -14px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #367ebd;
}
input[type=range]::-moz-range-track {
  width: 80%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #42C3DD;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 80%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type=range]::-ms-fill-upper {
  background: #42C3DD;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type=range]::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #42C3DD;
}
input[type=range]:focus::-ms-fill-upper {
  background: #367ebd;
}
.icons{
  font-size: 150% !important;
}
.clarity{
  font-size: 20px;
}
.conf-title{
  margin-right: 2%;
  font-size: 25px;
  display: inline;
}
.conf-val{
  margin-left: 2%;
  font-size: 25px;
  display: inline;
}


</style>
