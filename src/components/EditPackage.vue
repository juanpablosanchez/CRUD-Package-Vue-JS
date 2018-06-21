<template>
    <div>
        <h1>Edit Package</h1>
        <div class="row">
            <div class="col-md-10"></div>
            <div class="col-md-2">
                <router-link :to="{ name: 'ListProducts' }" class="btn btn-success">Back</router-link>
            </div>
        </div>
        <form v-on:submit.prevent="editProduct">
            <div class="form-group">
                <label>
                    <strong>From person from</strong>
                </label>
                <input type="text" class="form-control" v-model="package.fromPersonName">
            </div>
            <div class="form-group">
                <label>
                    <strong>To person name</strong>
                </label>
                <input type="text" class="form-control" v-model="package.toPersonName">
            </div>
            <div class="form-group">
                <label>
                    <strong>Phone</strong>
                </label>
                <input type="date" class="form-control" v-model="package.phone">
            </div>
            <img id="photo" alt="" :src="package.imageUrl">
            <div class="form-group">
                <button class="btn btn-info">Edit</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
  data() {
    return {
      package: {}
    };
  },
  created: function() {
    // Event
    this.getItem();
  },
  methods: {
    getItem() {
      let uri = this.apiPath + "api/paquetes/" + this.$route.params.id;
      this.axios
        .get(uri)
        .then(response => {
          this.package = response.data;

          var arrayBufferView = new Uint8Array(
            response.data.packageImage.data.data
          );
          var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
          var urlCreator = window.URL || window.webkitURL;
          var imageUrl = urlCreator.createObjectURL(blob);

          this.package.imageUrl = imageUrl;
        })
        .catch(function(error) {
          const message = error.response.data.message;
          const status = error.response.status;
          alert(status + ": " + message);
        });
    },
    editPackage() {
      let uri = this.apiPath + "api/paquetes/" + this.$route.params.id;
      this.axios
        .put(uri, this.package)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "ListPackages" });
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