<template>
    <div>
        <h1 class="text-center">Packages</h1>
        <br />
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Sender</th>
                    <th>To Address</th>
                    <th>Weight</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(packageItem, index) in packages">
                    <td>{{ packageItem.fromPersonName }}</td>
                    <td>{{ packageItem.toAddress }}</td>
                    <td>{{ packageItem.weight }}</td>
                    <td>
                        <router-link :to="{ name: 'ViewPackage', params: { id: packageItem._id }}" class="btn btn-info">View</router-link>
                        <router-link :to="{ name: 'EditPackage', params: { id: packageItem._id }}" class="btn btn-warning">Edit</router-link>
                        <button class="btn btn-danger" v-on:click="deletePackage(index,packageItem._id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
  data() {
    return {
      packages: []
    };
  },
  created: function() {
    // Event
    this.fetchPackages();
  },
  methods: {
    fetchPackages() {
      let uri = this.apiPath + "api/paquetes/";
      this.axios.get(uri).then(response => {
          console.log(response.data);
        this.packages = response.data;
      });
    },
    deletePackage(index, id) {
      if (!confirm("Do you want delete this package (" + id + ")?")) return;
      let uri = this.apiPath + "api/paquetes/" + id;
      this.axios
        .delete(uri)
        .then(response => {
          this.packages.splice(index, 1);
        })
        .catch(function(error) {
          const message = error.response.data.message;
          const status = error.response.status;
          alert(status + ": " + message);
        });
    }
  }
};
</script>