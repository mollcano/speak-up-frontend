<template>
  <div class="hello">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent>
        <v-btn primary dark slot="activator">Log In</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Email" type="email" required></v-text-field>
            <v-text-field label="Password" type="password" required hint="Must be at least 6 characters"
              persistent-hint></v-text-field>
            <v-text-field label="First Name" required></v-text-field>
            <v-text-field label="Last Name" required></v-text-field>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      giphys: [],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      fetch('http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC')
      .then(res => res.json())
      .then((result) => {
        this.giphys = result.data;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
