<template>
  <div class="diary">
    <button id="presentation-btn" type="button" name="button" v-on:click="seen = !seen">Submit a New Presentation</button>

    <v-layout column align-center v-if="seen">
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
    <v-expansion-panel expand>
      <v-expansion-panel-content v-for="item in items" :key="item" v-bind:value="item === 2">
        <div slot="header">{{ item.title }}<div class="text-xs-center">date | length</div></div>
        <v-card>
          <v-card-text class="grey lighten-3">{{ item. length }}</v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- <form id="hidden" method="POST" action="http://localhost:3000/addAudio">
      <v-text-field label="Title of Presentation" required></v-text-field>
      <input type="file" />
      <button type="submit" name="submit">SUBMIT</button>
    </form> -->
  </div>
</template>

<script>
import watson from '../watson/watson';

export default {
  data() {
    return {
      seen: false,
      audio: {
        title: '',
        file: '',
      },
      error: '',
      items: [
        {title: 'hello', length: 4},
        {title: 'no way', length: 7},
      ],
    };
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
</style>
