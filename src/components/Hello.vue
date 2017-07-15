<template>
    <div class="hello">
      <v-layout column align-center justify-center class="overlay">
        <div class="text-data">
          <h1 class="white--text big-title mb-0"><img src="../assets/speakup_logo_hor.png" class="speakup"></h1>
          <h4 class="white--text subtitle">Build better public speaking skills through actionable data</h4>
          <v-layout row justify-center class="mt-5">
            <v-dialog v-model="signup" persistent>
              <v-btn class="auth-btn" light slot="activator">Sign Up</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">Sign Up</span>
                </v-card-title>
                <div class="error" v-if="error">
                  <p>{{ error }}</p>
                </div>
                <v-card-text>
                  <v-text-field
                    label="Email"
                    type="email"
                    class="mt-1"
                    v-model="credentials.username"
                    required></v-text-field>
                  <v-text-field
                    label="password"
                    type="password"
                    class="mt-1"
                    v-model="credentials.password"
                    required
                    hint="Must be at least 6 characters"
                    persistent-hint></v-text-field>
                  <v-text-field label="First Name" required></v-text-field>
                  <v-text-field label="Last Name" required></v-text-field>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="blue--text darken-1" flat @click.native="signup = false">Close</v-btn>
                  <v-btn class="blue--text darken-1" flat @click.native="signup = false">Sign Up</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="login" persistent>
              <v-btn class="auth-btn" light slot="activator">Log In</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">Log In</span>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    label="Email"
                    type="email"
                    class="mt-1"
                    v-model="credentials.username"
                    required></v-text-field>
                  <v-text-field
                    label="password"
                    type="password"
                    class="mt-1"
                    v-model="credentials.password"
                    required></v-text-field>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="blue--text darken-1" flat @click.native="login = false">Close</v-btn>
                  <v-btn class="blue--text darken-1" flat @click.native="submit()">Log In</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
        </div>
      </v-layout>
    </div>
</template>

<script>
import auth from '../auth/auth';

export default {
  data() {
    return {
      signup: false,
      login: false,
      credentials: {
        username: '',
        password: '',
      },
      error: '',
    };
  },
  methods: {
    submit() {
      const credentials = {
        username: this.credentials.username,
        password: this.credentials.password,
      };
    auth.login(this, credentials, '/dashboard/')
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  /*background-image: url('../assets/mic-background.png');
  background-size: cover;
  height: 90vh;*/
}
.big-title{
  margin-top: 12%;
  text-align: center;
}
.speakup{
  width: 50%;
}
.auth-btn{
  background-color: #4DD6B6 !important;
  pointer-events:auto;
  font-size: 25px;
}
.overlay{
  background-image: url('../assets/mic-background.jpg');
  background-size: cover;
  height: 100vh;
  pointer-events: none;
}
.text-data{
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  width: 100%;
}
.subtitle{
  text-align: center;
}

</style>
