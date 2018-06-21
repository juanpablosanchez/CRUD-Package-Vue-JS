<template>
    <div>
        <h1>Create a Product</h1>
        <div class="row">
            <div class="col-md-10"></div>
            <div class="col-md-2">
                <router-link :to="{ name: 'ListProducts' }" class="btn btnsuccess">Back</router-link>
            </div>
        </div>
        <form v-on:submit.prevent="addProduct">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="product.name">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Price</label>
                        <input type="number" class="form-control col-md-6" v-model="product.price" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Expiration Date</label>
                        <input type="date" class="form-control col-md-6" v-model="product.expiration" />
                    </div>
                </div>
            </div>
            <br />
            <div class="form-group">
                <button class="btn btn-primary">Create</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      product: {}
    };
  },
  methods: {
    addProduct() {
      let base = "https://www.server.com/";
      let uri = base + "products/";
      this.axios
        .post(uri, this.product)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "ListProducts" });
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