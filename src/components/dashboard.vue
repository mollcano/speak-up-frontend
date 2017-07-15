<template>
  <div class="dashboard">
    <h2 class="text-xs-center">Welcome Back, {{ first_name }}</h2>
    <div class="box">
      <img class="user-pic ml-5 mb-3 mt-3" src="../assets/MollyPic.jpg" alt="">
      <div id="chart">

      </div>

    </div>
    <v-tabs dark fixed icons centered>
      <v-tabs-bar slot="activators" class="data-tab">
        <v-tabs-slider class="tab-slider"></v-tabs-slider>
        <v-tabs-item href="#tab-1">
          <v-icon>star</v-icon>
          My Goals
        </v-tabs-item>
        <v-tabs-item href="#tab-2">
          <v-icon>assessment</v-icon>
          All Data
        </v-tabs-item>
      </v-tabs-bar>
      <v-tabs-content
        v-for="i in 2"
        :key="i"
        :id="'tab-' + i"
      >
        <v-card flat>
          <v-card-text>{{ items }}</v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs>
  </div>
</template>

<script>
import watson from '../watson/watson';
import auth from '../auth/auth';

export default {
  data () {
    return {
      items: [
      ],
      first_name: auth.user.first_name,
      last_name: auth.user.last_name,
    };
  },
  created: function() {
    var self = this
    console.log(auth.user)
    this.$http.get('http://localhost:3000/audio/' + auth.user.id)
    .then(data => {
      console.log("data")
      for (var i=0; i<data.body.length; i++){
        this.items.push(data.body[i])
      }

    })
    console.log(items[0])
  },
  methods: {

  }
};
</script>

<style lang="css">
.dashboard{
  font-family: 'Open Sans', sans-serif;
}
.data-tab{
  background-color: #4DD6B6;
}
.tab-slider{
  background-color: #433A3F;
}
.user-pic{
  width: 20%;
  border-radius: 50%;
  border: 2px solid #433A3F;
}
.box{
  width: 70%;
  border: 5px double #4DD6B6;
  margin-bottom: 2%;
  margin-left: 15%;
}
</style>
