<template>
   <v-layout alig-start>
        <v-flex>  
        
                <v-toolbar flat color="white">
                    <v-toolbar-title>Roles</v-toolbar-title>
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                            <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
                            <v-spacer></v-spacer>
                       </v-toolbar>
             
                <v-data-table
                :headers="headers"
                :items="roles"
                sort-by="calories"
                class="elevation-1"
                :search="search"
                >

                <template v-slot:item="{ item }">   
                    <tr>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>
                        <v-chip :color="getColor(item.condition)" dark>
                            <div v-if="item.condition">
                            <span class="black--text">Activo</span>
                        </div>
                        <div v-else>
                            <span class="black--text">Inactivo</span>
                        </div>
                        </v-chip> 
                        
                    </td>  
                    </tr>
                                                  
                        
                </template>
                    <template v-slot:no-data>
                        <v-btn color="primary" @click="list">Reset</v-btn>
                    </template>
            </v-data-table>

        </v-flex>
   </v-layout>
</template>

<script>
import axios from 'axios'
export default {
    data(){
    return {
                roles:[],
                dialog: false,
                 headers: [
                    { text: 'Name', value: 'name' },
                    { text: 'Description', value: 'description', sortable:false },
                    { text: 'Estatus', value: 'condition', sortable:false },
                    
                        ],
                        search:''
            }

    },
        computed: {
        },

        watch: {
        },

        created () {

        this.list()
        },
    methods:{
             getColor (calories) {
                 if (calories ==true) return 'blue'
                     else return 'red'
                  
                },
            list(){
                let me= this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuration={ headers: header};
                axios.get('api/Roles/List',configuration).then(function(response){
                    me.roles= response.data
                }).catch(function(error){
                        console.log(error)
                });
            }
           
    }
}
</script>