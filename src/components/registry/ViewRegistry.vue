<template>
  <div class="theme--light">
    <v-toolbar color="shades white" dark>
      <v-btn icon class="mx-0" :to="{ name: 'ListRegistries' }">
        <v-icon color="black">chevron_left</v-icon>
      </v-btn>
      <v-toolbar-title>Notificación</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small round color="teal" v-if="packageId" :to="{ name: 'ViewPackage', params: { id: packageId }}">
        Ir al paquete
        <v-icon small>chevron_right</v-icon>
      </v-btn>
    </v-toolbar>
    <v-subheader>Detalles del registro</v-subheader>
    <v-container grid-list-md>
      <v-layout row wrap v-if="registry.state">
        <v-flex xs6>
          <strong>Cerrado:</strong>
          <span>Por entrega o problemas con el paquete</span>
          <br> {{ registry.isClosed ? 'Cerrado' : 'Aun no' }}
          <v-icon v-if="registry.isClosed" color="teal">check_circle</v-icon>
          <v-icon v-if="!registry.isClosed" color="teal">airport_shuttle</v-icon>
          <br>
          <br>
          <strong>Estado del paquete:</strong>
          <br> {{ registry.state }}
        </v-flex>
        <v-flex xs6>
          <strong>Fecha del registro:</strong>
          <br> {{ registry.date | moment("dddd, DD MMMM YYYY - HH:mm") }}
          <br>
          <br>
          <strong>Localización:</strong>
          <p>
            <v-icon small>play_arrow</v-icon>
            Latitud: {{ registry.location ? registry.location[0] : '' }}
            <br>
            <v-icon small>play_arrow</v-icon>
            Longitud: {{ registry.location ? registry.location[1] : '' }}
          </p>
        </v-flex>
      </v-layout>
    </v-container>
    <bottom-navigation selected="1"></bottom-navigation>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        item: {},
        registry: {},
        packages: [],
        packageId: ''
      };
    },
    created: function () {
      // Event
      this.getRegistry();
      this.fetchPackages();
    },
    methods: {
      getRegistry() {
        let uri = this.apiPath + "api/registros/" + this.$route.params.id;
        this.axios
          .get(uri)
          .then(response => {
            this.registry = response.data;
            if (this.packages.length > 0) this.matchResult();
          })
          .catch(function (error) {
            const message = error.response.data.message;
            const status = error.response.status;
            alert(status + ": " + message);
          });
      },
      fetchPackages() {
        let uri = this.apiPath + "api/paquetes/";
        this.axios.get(uri).then(response => {
          this.packages = response.data;
          if (this.registry.state) this.matchResult();
        });
      },
      matchResult() {
        let item = this.getPackage(this.registry._id);
        this.packageId = item._id;
      },
      getPackage(registryId) {
        let result = null;
        this.packages.forEach(item => {
          if (item.notifications.filter(notification => notification._id === registryId).length > 0) {
            result = item;
            return;
          }
        });
        return result;
      }
    }
  };
</script>