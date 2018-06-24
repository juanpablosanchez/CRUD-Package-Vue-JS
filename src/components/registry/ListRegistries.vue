<template>
  <div class="theme--light">
    <v-toolbar color="shades white" dark>
      <v-toolbar-title>Notificaciones</v-toolbar-title>
    </v-toolbar>
    <v-subheader>Lista de notificaciones</v-subheader>
    <v-data-table :headers="headers" :items="registries" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.date | moment("ddd, DD MMM YYYY HH:mm") }}</td>
        <td class="text-xs-right hidden-xs-only text-md-center">{{ props.item.fromPersonName }}</td>
        <td class="text-xs-right text-md-center">{{ props.item.state }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" v-if="props.item._id" :to="{ name: 'ViewRegistry', params: { id: props.item._id }}">
            <v-icon color="teal">visibility</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <bottom-navigation selected="1"></bottom-navigation>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        registries: [],
        packages: [],
        headers: [
          { text: 'Fecha', value: 'date' },
          { text: 'Remitente', value: 'sender', class: 'hidden-xs-only text-md-center' },
          { text: 'Estado', value: 'state', class: 'text-md-center' },
          { text: 'Acción', sortable: false, value: 'action', class: 'text-md-center' }
        ]
      };
    },
    created: function () {
      // Event
      this.fetchRegistries();
      this.fetchPackages();
    },
    methods: {
      fetchRegistries() {
        let uri = this.apiPath + "api/registros/";
        this.axios.get(uri).then(response => {
          response.data.forEach(element => {
            element.fromPersonName = "";
          });
          this.registries = response.data;
          if (this.packages.length > 0) matchResult();
        });
      },
      fetchPackages() {
        let uri = this.apiPath + "api/paquetes/";
        this.axios.get(uri).then(response => {
          this.packages = response.data;
          if (this.registries.length > 0) this.matchResult();
        });
      },
      matchResult() {
        this.registries.forEach(registry => {
          let item = this.getPackage(registry._id);
          registry.fromPersonName = item.fromPersonName;
        });
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