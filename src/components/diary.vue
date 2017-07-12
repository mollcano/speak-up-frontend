<template>
  <div class="diary">
    <button id="presentation-btn" type="button" name="button" v-on:click="seen = !seen">Submit a New Presentation</button>

    <v-layout class="mb-3" column align-center v-if="seen">
      <v-card align-center v-bind:class = "{'audioHide': audioShow}">
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
          <v-text-field
            type="file"
            label=""
            v-model="audio.file"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="pt-1">
          <v-btn id="submit-btn" @click.native="submit()">SUBMIT</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
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
            clarity: {{ item.confidence }}
            <br>
            transcript: {{ item.transcript }}
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
import watson from '../watson/watson';

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
      items: [

      ],
    };
  },
  created: function() {
    var self = this
    this.$http.get('http://localhost:3000/audio')
    .then(data => {
      for (var i=0; i<data.body.length; i++)
      this.items.push(data.body[i])

    })
    console.log(items[0])
  },
  methods: {
    submit() {
      const audio = {
        title: this.audio.title,
        file: this.audio.file,
      };
      watson.addAudio(this, audio);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#presentation-btn{
  width: 100%;
  background-color: #4DD6B6;
  height: 80px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-size: 300%;
  color: #FAFAFA
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

</style>
