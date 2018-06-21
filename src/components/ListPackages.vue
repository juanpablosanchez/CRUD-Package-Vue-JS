<template>
    <div>
        <h1>Products</h1>
        <div class="row">
            <div class="col-md-10"></div>
            <div class="col-md-2">
                <router-link :to="{ name: 'CreateProduct' }" class="btn btn-primary">Create Product
                </router-link>
            </div>
        </div>
        <br />
        <table class="table table-hover">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products">
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>
                        <router-link :to="{ name: 'ViewProduct', params: { id: product._id }}" class="btn btn-info">View</router-link>
                        <router-link :to="{ name: 'EditProduct', params: { id: product._id }}" class="btn btn-warning">Edit</router-link>
                        <button class="btn btn-danger" v-on:click="deleteProduct(index,product._id)">Delete</button>
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
      products: []
    };
  },
  created: function() {
    // Event
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      let base = "https://www.server.com/";
      let uri = base + "products/";
      this.axios.get(uri).then(response => {
        this.products = response.data;
      });
    },
    deleteProduct(index, id) {
      let base = "https://www.server.com/";
      let uri = base + "products/" + id;
      this.axios
        .delete(uri)
        .then(response => {
          console.log(response.data);
          this.products.splice(index, 1);
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