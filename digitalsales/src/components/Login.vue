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
                    <v-flex class="red--text" v-if="error">
                        {{error}}
                    </v-flex>
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
            password:'',
            error:null
        }
    },
    methods :{
        Insert(){
            this.error=null;
            axios.post('api/Users/Login', {email:this.email, password: this.password})
            .then(request => {
                return request.data
            })
            .then(data => {
                
                this.$store.dispatch("saveToken", data.token)
                this.$router.go({ name: 'home' })
            })
            .catch(err => {
                console.log(err.response.status)
                if(err.response.status==400)
                {
                    this.error="Not its email valid!"
                }
                else if (err.response.status==404)
                {
                    this.error="Not Exist this user or data its incorrect!"
                }
                else 
                {
                    this.error="Error!!"
                }
                console.log(err);
            })
        }
    }
}
</script>