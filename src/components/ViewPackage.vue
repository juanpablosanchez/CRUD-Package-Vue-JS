<template>
    <div>
        <h1 class="text-center">View Package</h1>
        <br><br>
        <div class="row">
            <div class="col-md-6">
                <img id="photo" width="100%" :src="package.imageUrl">
            </div>
            <div class="col-md-6">
                <p>
                    <label>
                        <strong>Weight</strong>
                    </label>
                    <br> {{ package.weight }}
                </p>
                <p>
                    <label>
                        <strong>Location</strong>
                    </label>
                    <ul>
                        <li>
                            Latitude: {{ package.currentLocation[0] }}
                        </li>
                        <li>
                            Longitude: {{ package.currentLocation[1] }}
                        </li>
                    </ul>
                </p>
            </div>
        </div>
        <br><br>
        <div class="row">
            <div class="col-md-6">
                <p>
                    <label>
                        <strong>Sender</strong>
                    </label>
                    <br> {{ package.fromPersonName }}
                </p>
                <p>
                    <label>
                        <strong>Phone</strong>
                    </label>
                    <br> {{ package.phone }}
                </p>
            </div>
            <div class="col-md-6">
                <p>
                    <label>
                        <strong>Receiver</strong>
                    </label>
                    <br> {{ package.toPersonName }}
                </p>
                <p>
                    <label>
                        <strong>To direction</strong>
                    </label>
                    <br> {{ package.toAddress }}
                </p>
            </div>
        </div>
        <hr>
        <br><br>  <h4>Registries</h4>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>State</th>
                    <th>Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(registryItem, index) in registries">
                    <td>{{ registryItem.state }}</td>
                    <td>{{ registryItem.date | moment("ddd, DD MMM YYYY HH:mm") }}</td>
                    <td>
                        <router-link :to="{ name: 'ViewRegistry', params: { id: registryItem._id }}" class="btn btn-info">View</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="row">
            <div class="col-md-10"></div>
            <div class="col-md-2">
                <router-link :to="{ name: 'ListPackages' }" class="btn btn-success">Back</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                package: {},
                registries: []
            };
        },
        created: function () {
            // Event
            this.getItem();
            this.getRegistries();
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
                    .catch(function (error) {
                        const message = error.response.data.message;
                        const status = error.response.status;
                        alert(status + ": " + message);
                    });
            },
            getRegistries() {
                let uri = this.apiPath + "api/paquetes/" + this.$route.params.id + "/registros";
                this.axios
                    .get(uri)
                    .then(response => {
                        this.registries = response.data;
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