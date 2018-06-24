<template>
  <div class="theme--light">
    <v-toolbar color="shades white" dark>
      <v-toolbar-title>Paquetes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small round color="teal" :to="{ name: 'CreatePackage' }">
        Crear
        <v-icon small>add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-subheader>Lista de paquetes</v-subheader>
    <v-container grid-list-md>
      <v-layout row wrap v-for="(item,index) in packages" :key="item._id">
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
            <v-flex xs12 sm4>
              <strong>Peso:</strong>
              <br class="hidden-xs-only"> {{ item.weight }}
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
    <bottom-navigation selected="1"></bottom-navigation>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        packages: []
      };
    },
    created: function () {
      // Event
      this.fetchPackages();
    },
    methods: {
      fetchPackages() {
        let uri = this.apiPath + "api/paquetes/";
        this.axios.get(uri).then(response => {
          this.packages = response.data;
        });
      },
      deletePackage(index, id) {
        if (
          !confirm(
            "Desea eliminar el paquete de " +
            this.packages[index].fromPersonName +
            "?"
          )
        )
          return;
        let uri = this.apiPath + "api/paquetes/" + id;
        this.axios
          .delete(uri)
          .then(response => {
            this.packages.splice(index, 1);
          })
          .catch(function (error) {
            const message = error.response.data.message;
            const status = error.response.status;
            alert(status + ": " + message);
          });
      }
    }
  };
</script>