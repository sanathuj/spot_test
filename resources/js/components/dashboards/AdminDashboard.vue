<template>
    <div class="container">
        <div class="row"> 
             <div class="col-sm-12 text-center mb-5 mt-5"> 
        <h1>
            Indexed DB Example
        </h1>
             </div>
        </div>

        <form>
            <div class="form-group">
                <label for="inputEmail1">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    v-model="models.email"
                />
                <small v-if="inputErrors.email" class="form-text" style="color:red">{{inputErrors.email}}</small>
            </div>
            <div class="form-group">
                <label for="inputFirstName">First Name</label>
                <input
                    type="email"
                    class="form-control"
                    placeholder="Enter first name"
                    v-model="models.first_name"
                />
                <small class="form-text" style="color:red">{{inputErrors.first_name}}</small>
            </div>
            <div class="form-group">
                <label for="inputLastName">Last Name</label>
                <input
                    type="email"
                    class="form-control"
                    placeholder="Enter last name"
                    v-model="models.last_name"
                />
                <small id="emailHelp" class="form-text"  style="color:red">{{inputErrors.last_name}}</small>
            </div>
            <button type="button" class="btn btn-primary" @click="saveData">
                Submit
            </button>
            <div><br /></div>
        </form>

        <div>
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items">
                        <th scope="row">{{ item.id }}</th>
                        <td>{{ item.email }}</td>
                        <td>{{ item.first_name }}</td>
                        <td>@{{ item.last_name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { openDB } from "idb";

export default {
    data() {
        return {
            models: {
                email: "",
                first_name: "",
                last_name: ""
            },
            items: [],
            db: "",
            inputErrors: {
                email: "",
                first_name: "",
                last_name: ""
            }
        };
    },
    async created() {
        await this.openDatabase();
        await this.loadItems();
    },
    methods: {
        async openDatabase() {
            this.db = await openDB("spot_test_db", 1, {
                upgrade(db) {
                    db.createObjectStore("user_store", {
                        keyPath: "id",
                        autoIncrement: true
                    });
                }
            });
        },
        async saveData() {
            this.resetErrors();
            let validationPassed = this.validateInputes();
            if(!validationPassed) {
                await this.db.add("user_store", this.models);
                await this.openDatabase();
                await this.loadItems();
                this.resetInputs();
            }
        },
        async getAllData() {
            return await this.db.getAll("user_store");
        },
        async loadItems() {
            this.items = await this.getAllData();
            console.log("this.items", this.items);
        },
        resetInputs() {
            this.models.email = "";
            this.models.first_name = "";
            this.models.last_name = "";
        },
        validateInputes(){
            let error =false;
            if(this.models.email == '') {
                this.inputErrors.email = 'Enter email';
                error =true;
            }
            if(this.models.first_name == '') {
                this.inputErrors.first_name = 'Enter first name';
                error =true;
            }
            if(this.models.last_name == '') {
                this.inputErrors.last_name = 'Enter last name';
                error =true;
            }
            return error;
        },
        resetErrors() {
            this.inputErrors.email = "";
            this.inputErrors.first_name = "";
            this.inputErrors.last_name = "";
        },

    }
};
</script>

<style scoped></style>
