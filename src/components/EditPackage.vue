<template>
    <div>
        <h1 class="text-center">Edit Package</h1>
        <br>
        <form v-on:submit.prevent="editPackage">
            <div class="row">
                <div class="col-md-5 text-center">
                    <img id="photo" width="100%" :src="package.imageUrl">
                    <input type="file" name="" id="">
                </div>
                <div class="col-md-7">
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
                        <input type="text" class="form-control" v-model="package.phone">
                    </div>
                    <div class="form-group">
                        <label>
                            <strong>To address</strong>
                        </label>
                        <input type="text" class="form-control" v-model="package.toAddress">
                    </div>
                    <div class="form-group">
                        <label>
                            <strong>Weight</strong>
                        </label>
                        <input type="number" class="form-control" v-model="package.weight">
                    </div>
                </div>
            </div>
            <div class="form-group text-center">
                <button class="btn btn-info">Edit</button>
            </div>
        </form>
        <div class="row">
            <div class="col-md-12 text-center">
                <router-link :to="{ name: 'ListProducts' }" class="btn btn-success">Back</router-link>
            </div>
        </div>
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