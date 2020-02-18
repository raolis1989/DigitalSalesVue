<template>
    <v-layout align-center justify-center>
        <v-flex xs8 sm4 md4 lg5 x8>
            <v-card>
                <v-toolbar dark color="blue darken-3">
                    <v-toolbar-title>
                        Acceso al Sistema
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field v-model="email" autofocus color="accent"  label="Email" required>
                    </v-text-field>
                    <v-text-field v-model="password" type="password" color="accent" label="Password" required>
                    </v-text-field>
                </v-card-text>
                <v-card-actions class="px-3 pb-3">
                    <v-btn  @click="Insert" color="primary">Ingresar</v-btn>
                </v-card-actions>          
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            email:'',
            password:''
        }
    },
    methods :{
        Insert(){
            axios.post('api/Users/Login', {email:this.email, password: this.password})
            .then(request => {
                return request.data
            })
            .then(data => {
                this.$store.dispatch("saveToken", data.token)
                this.$router.push({name:'home'})
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}
</script>