<template>
  <v-app id="example-2">
    <v-navigation-drawer class="side-nav" temporary v-model="drawer" :mini-variant.sync="mini" dark>
      <div v-if="shown">
        <img class="shown side-nav-logo ml-5 mt-5" src="./assets/speakup_logo_hor.png" alt="">
        <br>
        <v-icon dark class="social" fa>facebook-f</v-icon>
        <v-icon dark class="social" fa>twitter</v-icon>
        <v-icon dark class= "social" fa>instagram</v-icon>
        <v-icon dark class="social" fa>envelope</v-icon>
      </div>
      <v-list class="pa-0">
        <v-list-item>
          <v-list-tile class="ml-3" avatar tag="div">
            <v-list-tile-avatar>
              <img src="./assets/MollyPic.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ user.first_name }} {{ user.last_name }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <!-- <v-btn icon dark @click.native.stop="mini = !mini" v-on:click="shown = !shown">
                <v-icon>chevron_left</v-icon>
              </v-btn> -->
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-item v-for="item in items" :key="item">
          <v-list-tile class="linked">
            <v-list-tile-action>
              <router-link :to="item.path" class="links"><v-icon class="ml-3" dark>{{ item.icon }}</v-icon></router-link>
            </v-list-tile-action>
            <v-list-tile-content>
              <router-link :to="item.path+user.id" class="links"><v-list-tile-title>{{ item.title }}</v-list-tile-title></router-link>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="light-blue accent-2" light>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer" light></v-toolbar-side-icon>
      <img class="speakup-logo ml-4 mr-0" src="./assets/speakup-logo-circle-only.png" alt="">
      <v-toolbar-title class="text-xs-center mt-0 ml-1 title"> Speak Up</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="text-xs-center">
        <v-menu offset-y>
          <v-btn flat slot="activator"><v-icon>person</v-icon>{{ user.first_name }}<v-icon>keyboard_arrow_down</v-icon></v-btn>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>Log Out</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>My Account</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
        <!--v-router-->
      </v-container>
    </main>
    <v-footer :fixed="!fixed" class="pa-3">
      <!-- <v-spacer></v-spacer> -->
      <div class="text-xs-center">©2017 Speak Up</div>
    </v-footer>
  </v-app>
</template>

<script>
import auth from './auth/auth';

export default {
  data() {
    return {
      drawer: null,
      fixed: false,
      shown: true,
      items: [
        { title: 'Dashboard', icon: 'dashboard', path: '/dashboard/' },
        { title: 'Diary', icon: 'mic', path: '/diary/' },
        { title: 'Goals', icon: 'star', path: '/goals/' },
      ],
      mini: false,
      right: null,
      user: auth.user,
      // first_name: auth.user.first_name,
      // last_name: auth.user.last_name,
    };
  },
};
</script>

<style scoped>
#app{
  display: flex;
  flex-direction: column;
}
.speakup-logo{
  width: 3%;
}
.side-logo{
  width: 50%;
  display: inline-block;
}
.links{
  text-decoration: none;
}
.title{
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  color: #FAFAFA;
}
.side-nav-logo{
  width: 60%;
}
.social{
  margin-left: 13%;
  margin-top: 10%;
  margin-bottom: 10%;
}
.social:hover{
  color: #4DE0FF;
}
.linked:hover{
  background-color: #4DE0FF;
}




</style>
