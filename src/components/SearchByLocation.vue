<template>
  <div class="theme--light">
    <v-toolbar color="shades white" dark style="z-index: 100;">
      <v-toolbar-title>Buscar por localización</v-toolbar-title>
    </v-toolbar>

    <v-subheader>Busca los diez paquetes más cercanos a la ubicación dada.</v-subheader>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <strong>Localización:</strong>
        </v-flex>
        <v-flex xs6>
          <v-text-field v-model="location.latitude" :rules="[() => isFloat(location.latitude) || 'Este campo es requerido']" label="Latitud"
            required></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field v-model="location.longitude" :rules="[() => isFloat(location.longitude) || 'Este campo es requerido']" label="Longitud"
            required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="text-xs-center">
            <v-btn color="teal white--text" :disabled="!isFloat(location.latitude) || !isFloat(location.longitude)" @click="getPackagesCloseToLocation()">Buscar</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>

    <v-subheader v-if="this.packages.length > 0">Resultado</v-subheader>
    <v-container grid-list-md>
      <v-layout row wrap v-for="(item) in packages" :key="item._id">
        <v-flex xs7 sm9>
          <v-layout row wrap>
            <v-flex xs12 sm4>
              <strong>Remitente:</strong>
              <br class="hidden-xs-only"> {{ item.fromPersonName }}
            </v-flex>
            <v-flex xs12 sm4>
              <strong>Dirección a enviar:</strong>
              <br class="hidden-xs-only"> {{ item.toAddress }}
            </v-flex>
            <v-flex v-if="item.currentLocation" xs12 sm4>
              <strong>Ubicación:</strong>
              <br> Latitud: {{ item.currentLocation[0] }}
              <br> Longitud: {{ item.currentLocation[1] }}
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs5 sm3 text-xs-center>
          <v-btn icon class="mx-0" :to="{ name: 'ViewPackage', params: { id: item._id }}">
            <v-icon color="teal">visibility</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" :to="{ name: 'EditPackage', params: { id: item._id }}">
            <v-icon color="amber">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deletePackage(index,item._id)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 class="theme--light">
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
    </v-container>

    <div v-if="loader" style="z-index: 10;position: fixed;height: 100%;width: 100%;top: 0;background-color: #ffffffba;">
      <div style="height: 50px;width: 50px;position: absolute;top: calc( 50% - 25px);left: calc( 50% - 25px);">
        <v-progress-circular :size="50" indeterminate color="primary"></v-progress-circular>
      </div>
    </div>
    <bottom-navigation selected="2"></bottom-navigation>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loader: false,
        location: {
          latitude: '',
          longitude: ''
        },
        packages: []
      };
    },
    methods: {
      getPackagesCloseToLocation() {
        let uri = this.apiPath + "api/paquetes?latitude=" + this.location.latitude + "&longitude=" + this.location.longitude;
        this.loader = true;
        let loader = document.querySelector('#loader');
        if (loader) loader.style.display = 'block';
        this.axios
          .get(uri)
          .then(response => {
            this.loader = false;
            this.packages = response.data;
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