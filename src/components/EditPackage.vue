<template>
  <div class="theme--light">
    <v-toolbar color="shades white" dark style="z-index: 100;">
      <v-btn icon class="mx-0" :to="{ name: 'ListPackages' }">
        <v-icon color="black">chevron_left</v-icon>
      </v-btn>
      <v-toolbar-title>Editar paquete</v-toolbar-title>
    </v-toolbar>
    <br>
    <v-container grid-list-md>
      <form v-on:submit.prevent="editPackage">
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <img id="photo" width="70%" :src="itemPackage.imageUrl">
            <input type="file" id="packageImage">
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field v-model="itemPackage.fromPersonName" :rules="[() => (itemPackage.fromPersonName && itemPackage.fromPersonName.length > 0) || 'Este campo es requerido']"
              label="Remitente" required></v-text-field>
            <v-text-field v-model="itemPackage.phone" :rules="[() => (itemPackage.phone && itemPackage.phone.length > 0) || 'Este campo es requerido']"
              label="Teléfono" required></v-text-field>
            <v-text-field v-model="itemPackage.toPersonName" :rules="[() => (itemPackage.toPersonName && itemPackage.toPersonName.length > 0) || 'Este campo es requerido']"
              label="Receptor" required></v-text-field>
            <v-text-field v-model="itemPackage.toAddress" :rules="[() => (itemPackage.toAddress && itemPackage.toAddress.length > 0) || 'Este campo es requerido']"
              label="Dirección a enviar" required></v-text-field>
            <v-text-field v-model="itemPackage.weight" :rules="[() => (itemPackage.weight && itemPackage.weight.length > 0) || 'Este campo es requerido']"
              label="Peso" required></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <div class="text-xs-center">
              <v-btn type="submit" color="teal white--text">Editar</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </form>
    </v-container>
    <div v-if="loader" style="z-index: 10;position: fixed;height: 100%;width: 100%;top: 0;background-color: #ffffffba;">
      <div style="height: 50px;width: 50px;position: absolute;top: calc( 50% - 25px);left: calc( 50% - 25px);">
        <v-progress-circular :size="50" indeterminate color="primary"></v-progress-circular>
      </div>
    </div>
    <bottom-navigation selected="0"></bottom-navigation>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loader: false,
        itemPackage: {}
      };
    },
    created: function () {
      // Event
      this.getItem();
    },
    methods: {
      getItem() {
        let uri = this.apiPath + "api/paquetes/" + this.$route.params.id;
        this.axios
          .get(uri)
          .then(response => {
            this.setDatas(response);
          })
          .catch(function (error) {
            const message = error.response.data.message;
            const status = error.response.status;
            alert(status + ": " + message);
          });
      },
      editPackage() {
        let uri = this.apiPath + "api/paquetes/" + this.$route.params.id;
        this.loader = true;
        let data = this.getFormData();
        this.axios
          .put(uri, data, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(response => {
            this.setDatas(response);
            this.loader = false;
          })
          .catch(function (error) {
            this.loader = false;
            const message = error.response.data.message;
            const status = error.response.status;
            alert(status + ": " + message);
          });
      },
      setDatas(response) {
        this.itemPackage = response.data;

        var arrayBufferView = new Uint8Array(
          response.data.packageImage.data.data
        );
        var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);

        this.itemPackage.imageUrl = imageUrl;
      },
      getFormData() {
        let formData = new FormData();

        let images = document.querySelector("#packageImage");

        // in the value '[Object object]' on the server.
        formData.append("fromPersonName", this.itemPackage.fromPersonName);
        formData.append("toPersonName", this.itemPackage.toPersonName);
        formData.append("phone", this.itemPackage.phone);
        formData.append("toAddress", this.itemPackage.toAddress);
        formData.append("weight", this.itemPackage.weight);
        formData.append("dimention", this.itemPackage.dimention);
        if (images.files.length > 0) {
          let packageImage = images.files[0];
          formData.append("packageImage", packageImage.name);
          formData.append("packageImage", packageImage);
        }
        return formData;
      }
    }
  };
</script>