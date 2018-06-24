<template>
  <div class="theme--light">
    <v-toolbar color="shades white" dark>
      <v-btn icon class="mx-0" :to="{ name: 'ListPackages' }">
        <v-icon color="black">chevron_left</v-icon>
      </v-btn>
      <v-toolbar-title>Detalles del paquete</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small round color="amber" v-if="itemPackage._id" :to="{ name: 'EditPackage', params: { id: itemPackage._id }}">
        Editar
        <v-icon small>edit</v-icon>
      </v-btn>
    </v-toolbar>
    <br>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs6 md3>
          <img id="photo" width="70%" :src="itemPackage.imageUrl">
        </v-flex>
        <v-flex xs6 md3>
          <strong>Peso:</strong>
          <br> {{ itemPackage.weight }}
          <br>
          <br>
          <strong>Localización:</strong>
          <p>
            <v-icon small>play_arrow</v-icon>
            Latitud: {{ itemPackage.currentLocation ? itemPackage.currentLocation[0] : '' }}
            <br>
            <v-icon small>play_arrow</v-icon>
            Longitud: {{ itemPackage.currentLocation ? itemPackage.currentLocation[1] : '' }}
          </p>
        </v-flex>
        <v-flex xs6 md3>
          <strong>Remitente</strong>
          <br> {{ itemPackage.fromPersonName }}
          <br>
          <br>
          <strong>Teléfono</strong>
          <br> {{ itemPackage.phone }}
        </v-flex>
        <v-flex xs6 md3>
          <strong>Receptor</strong>
          <br> {{ itemPackage.toPersonName }}
          <br>
          <br>
          <strong>Dirección a enviar</strong>
          <br> {{ itemPackage.toAddress }}
        </v-flex>
      </v-layout>
    </v-container>
    <br>
    <v-subheader>
      Notificaciones
      <v-btn small round color="teal white--text" v-if="mayCreateRegistry && itemPackage._id" :to="{ name: 'ViewRegistry', params: { idpackage: itemPackage._id }}">
        Crear
        <v-icon small color="white">add</v-icon>
      </v-btn>
    </v-subheader>
    <v-data-table :headers="headers" :items="registries" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.date | moment("ddd, DD MMM YYYY HH:mm") }}</td>
        <td class="text-xs-right">{{ props.item.state }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" v-if="itemPackage._id && props.item._id" :to="{ name: 'ViewRegistry', params: { id: props.item._id }}">
            <v-icon color="teal">visibility</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <bottom-navigation selected="0"></bottom-navigation>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        mayCreateRegistry: false,
        itemPackage: {},
        registries: [],
        headers: [
          { text: 'Fecha', value: 'date' },
          { text: 'Estado', value: 'state' },
          { text: 'Acción', sortable: false, value: 'action' }
        ]
      };
    },
    created: function () {
      this.getItem();
      this.getRegistries();
    },
    methods: {
      getItem() {
        let uri = this.apiPath + "api/paquetes/" + this.$route.params.id;
        this.axios
          .get(uri)
          .then(response => {
            this.itemPackage = response.data;

            var arrayBufferView = new Uint8Array(
              response.data.packageImage.data.data
            );
            var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(blob);

            this.itemPackage.imageUrl = imageUrl;
          })
          .catch(function (error) {
            const message = error.response.data.message;
            const status = error.response.status;
            alert(status + ": " + message);
          });
      },
      getRegistries() {
        let uri =
          this.apiPath + "api/paquetes/" + this.$route.params.id + "/registros";
        this.axios
          .get(uri)
          .then(response => {
            this.registries = response.data;
            this.setMayCreateRegistry();
          })
          .catch(function (error) {
            constsetMayCreateRegistryponse.data.message;
            const status = error.response.status;
            alert(status + ": " + message);
          });
      },
      setMayCreateRegistry() {
        let isClosed = false;
        this.registries.forEach(registry => {
          if (registry.isClosed) {
            isClosed = true;
            return;
          }
        });
        
        this.mayCreateRegistry = !isClosed;
      }
    }
  };
</script>