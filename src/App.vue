<template>
  <v-app id="example-2">
    <v-navigation-drawer temporary v-model="drawer" :mini-variant.sync="mini" dark>
      <v-list class="pa-0">
        <v-list-item>
          </v-list-tile>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="./assets/MollyPic.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Molly Brooks</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon light @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-item v-for="item in items" :key="item">
          <v-list-tile>
            <v-list-tile-action>
              <router-link :to="item.path" class="links"><v-icon dark>{{ item.icon }}</v-icon></router-link>
            </v-list-tile-action>
            <v-list-tile-content>
              <router-link :to="item.path" class="links"><v-list-tile-title>{{ item.title }}</v-list-tile-title></router-link>
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
          <v-btn flat slot="activator"><v-icon>person</v-icon>Molly<v-icon>keyboard_arrow_down</v-icon></v-btn>
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
export default {
  data() {
    return {
      drawer: null,
      fixed: false,
      items: [
        { title: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
        { title: 'Diary', icon: 'mic', path: '/diary' },
      ],
      mini: false,
      right: null,
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



</style>
