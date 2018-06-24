<template>
  <div class="theme--light">
    <v-toolbar color="shades white" dark style="z-index: 100;">
      <v-btn icon class="mx-0" :to="{ name: 'ListRegistries' }">
        <v-icon color="black">chevron_left</v-icon>
      </v-btn>
      <v-toolbar-title>Crear notificación</v-toolbar-title>
    </v-toolbar>
    <br>
    <v-container grid-list-md>
      <form v-on:submit.prevent="addRegistry">
        <v-layout row wrap>
          <v-flex xs6>
            <strong>Localización:</strong>
            <v-text-field v-model="registry.latitude" :rules="[() => isFloat(registry.latitude) || 'Este campo es requerido']" label="Latitud"
              required></v-text-field>
            <v-text-field v-model="registry.longitude" :rules="[() => isFloat(registry.longitude) || 'Este campo es requerido']" label="Longitud"
              required></v-text-field>
          </v-flex>
          <v-flex xs6>
            <strong>Descripción:</strong>
            <v-text-field v-model="registry.state" :rules="[() => (registry.state && registry.state.length > 0) || 'Este campo es requerido']"
              label="Estado del paquete" multi-line required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-checkbox v-model="registry.isClosed" label="El paquete se entregó o se canceló?"></v-checkbox>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <div class="text-xs-center">
              <v-btn type="submit" color="teal white--text">Crear</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </form>
    </v-container>
    <div id="loader" v-if="loader" style="z-index: 10;position: fixed;height: 100%;width: 100%;top: 0;background-color: #ffffffba;">
      <div style="height: 50px;width: 50px;position: absolute;top: calc( 50% - 25px);left: calc( 50% - 25px);">
        <v-progress-circular :size="50" indeterminate color="primary"></v-progress-circular>
      </div>
    </div>
    <bottom-navigation selected="1"></bottom-navigation>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loader: false,
        registry: {
          isClosed: false,
          state: '',
          latitude: '',
          longitude: ''
        }
      };
    },
    methods: {
      addRegistry() {
        let uri = this.apiPath + "api/paquetes/" + this.$route.params.id + "/registros";
        this.loader = true;
        let loader = document.querySelector('#loader');
        if (loader) loader.style.display = 'block';
        this.axios
          .post(uri, this.registry)
          .then(response => {
            this.$router.push({ name: "ViewPackage", params: { id: this.$route.params.id } });
          })
          .catch(function (error) {
            let loader = document.querySelector('#loader');
            if (loader) loader.style.display = 'none';
            const message = error.response.data.message;
            const status = error.response.status;
            alert(status + ": " + message);
          });
      },
      isFloat(value) {
        return /^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value);
      }
    }
  };
</script>