<template>
    <div>
        <h1>View Product</h1>
        <div class="row">
            <div class="col-md-10"></div>
            <div class="col-md-2">
                <router-link :to="{ name: 'ListProducts' }" class="btn btnsuccess">Back</router-link>
            </div>
        </div>
        <div class="form-group">
            <label>
                <strong>Name</strong>
            </label>
            <br> {{ product.name }}
        </div>
        <div class="form-group">
            <label>
                <strong>Price</strong>
            </label>
            <br> {{ product.price }}
        </div>
        <div class="form-group">
            <label>
                <strong>Expiration</strong>
            </label>
            <br> {{ product.expiration }}
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      product: {}
    };
  },
  created: function() {
    // Event
    this.getItem();
  },
  methods: {
    getItem() {
      let base = "https://www.server.com/";
      let uri = base + "products/" + this.$route.params.id;
      this.axios
        .get(uri)
        .then(response => {
          console.log(response.data);
          this.product = response.data;
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