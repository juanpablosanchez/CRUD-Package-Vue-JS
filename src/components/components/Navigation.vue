<template>
  <v-bottom-nav :value="true" :active.sync="e2" :color="colors[e2]" absolute shift>
    <v-btn class="white--text" dark @click="redirectTo('ListPackages')">
      <span>Paquetes</span>
      <v-icon>unarchive</v-icon>
    </v-btn>
    <v-btn class="white--text" dark @click="redirectTo('ListRegistries')">
      <span>Notificaciones</span>
      <v-icon>assignment</v-icon>
    </v-btn>
    <v-btn class="white--text" dark @click="redirectTo('SearchByLocation')">
      <span>Ubicación</span>
      <v-icon>location_on</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>
<script>
  export default {
    data() {
      return {
        e2: parseInt(this.selected) || 0,
        colors: ['indigo', 'teal', 'red']
      };
    },
    props: ['selected'],
    methods: {
      redirectTo: function (to) {
        this.$router.push({ name: to });
      }
    }
  };
</script>