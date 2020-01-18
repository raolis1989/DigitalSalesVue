<template>
   <v-layout alig-start>
        <v-flex>  
        
                <v-toolbar flat color="white">
                    <v-toolbar-title>Clients</v-toolbar-title>
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                            <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" dark class="mb-2" v-on="on">New</v-btn>
                                 </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">{{ formTitle }}</span>
                                        </v-card-title>

                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field v-model="name" label="Name"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                           <v-select v-model="idRole"
                                                             :items="roles" label="Role">
                                                             </v-select>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                           <v-select v-model="type_document"
                                                             :items="documents" label="Type Documents">
                                                             </v-select>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field v-model="num_document" label="Number Document"></v-text-field>
                                                        </v-col>
                                                         <v-col cols="12" sm="6" md="4">
                                                            <v-text-field v-model="address" label="Address"></v-text-field>
                                                        </v-col>
                                                         <v-col cols="12" sm="6" md="4">
                                                            <v-text-field v-model="email"  label="Email"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field v-model="phone" label="Phone"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field v-model="password" type="password" label="Password"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="12" md="12" v-show="validation">
                                                            <div class="red--text" v-for="v in validationMessage" :key="v" v-text="v"></div>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                             </v-card-text>

                                             <v-card-actions>
                                                <v-spacer></v-spacer>
                                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                                </v-card-actions>
                                    </v-card>
                             </v-dialog>
                    
                    
                    
                    
                    
                   
                   
                   
                         <v-dialog v-model="adModal" max-width="290">
                             <v-card>
                                 <v-card-title class="headline" v-if="adAction==1">Activate Item?</v-card-title>
                                 <v-card-title class="headline" v-if="adAction==2">Deactivate Item?</v-card-title>
                                 <v-card-text>
                                     Estas a punto de 
                                     <span v-if="adAction==1">Activar</span>
                                     <span v-if="adAction==2">Desactivar</span>
                                     el item {{adName}}
                                 </v-card-text>
                                 <v-card-actions>
                                     <v-spacer></v-spacer>
                                     <v-btn color="green darken-1" text="text" @click="ActivateDeactivateClose">
                                         Cancel
                                     </v-btn>
                                     <v-btn  v-if="adAction==1" color="orange darken-4" text="text" @click="ActivarArticulo">
                                         Activate
                                     </v-btn>
                                     <v-btn  v-if="adAction==2" color="orange darken-4" text="text" @click="DesactivarArticulo">
                                         Deactivate
                                     </v-btn>
                                 </v-card-actions>
                             </v-card>
                        </v-dialog> 
                       </v-toolbar>
             
                <v-data-table
                :headers="headers"
                :items="clients"
                sort-by="calories"
                class="elevation-1"
                :search="search"
                >

                <template v-slot:item="{ item }">   
                    <tr>
                    <td class="layout px-5">
                        <v-icon            
                        class="mr-2"
                        @click="editItem(item)"
                        >
                        edit
                        </v-icon>
                    </td>
                    <td>{{ item.name}}</td>
                    <td>{{ item.type_person}}</td>
                    <td>{{ item.type_Document }}</td>
                    <td>{{ item.num_Document }}</td>
                    <td>{{ item.address }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.email }}</td>
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
                clients:[],
                dialog: false,
                 headers: [
                    { text: 'Actions', value: 'action', sortable: false },
                    { text: 'Name', value: 'name' },
                    { text: 'Type Client', value: 'Type_Client' },
                    { text: 'Type Document', value: 'Type_Document' },
                    { text: 'Number Document', value: 'Num_Document', sortable:false },
                    { text: 'Address', value: 'Adress', sortable:false },
                    { text: 'Phone', value: 'Phone', sortable:false },
                    { text: 'Email', value: 'Email', sortable:false },
                    { text: 'Estatus', value: 'condition', sortable:false },
                    
                        ],
                        search:'',              
                        editedIndex: -1,
                         id:'',
                         idRole:'',
                         roles:[],
                         type_document:'',
                         documents:['RUT', 'DNI', 'PASAPORTE', 'CEDULA'],
                         num_document:0,
                         address:'',
                         email:'',
                         phone:'',
                         name:'',
                         password:'',
                         actPassword:false,
                         actionEdit:false,
                         passwordAnt:'',
                         validation:'',
                         validationMessage:[],
                         adModal:0,
                         adAction:0,
                         adName:'',
                         adIdUser:''
            }

    },
        computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Client' : 'Edit User'
        },
        },

        watch: {
        dialog (val) {
            val || this.close()
        },
        },

        created () {

        this.list();
        this.selectCategories();
        },
    methods:{
             getColor (calories) {
                 if (calories ==true) return 'blue'
                     else return 'red'
                  
                },
            list(){
                let me= this;
                axios.get('api/Persons/ListClients').then(function(response){
                    me.clients= response.data
                }).catch(function(error){
                        console.log(error)
                });
            },
            selectCategories(){
                let me= this;
                var rolesArray=[];
                axios.get('api/Roles/SelectActive').then(function(response){
                    rolesArray= response.data;
                    rolesArray.map(function(x){
                        me.roles.push({text: x.name, value: x.idRole})
                    });
                }).catch(function(error){
                        console.log(error)
                });
            },

                editItem (item) {
                    this.id=item.idUser;
                    this.idRole=item.idRole;
                    this.name= item.name;
                    this.type_document = item.type_Document;
                    this.num_document= item.num_Document;
                    this.address = item.address;
                    this.phone= item.phone; 
                    this.email= item.email; 
                    this.editedIndex=1;
                    this.dialog=true;
                    this.actionEdit=true;
                },

                deleteItem (item) {
                    const index = this.desserts.indexOf(item)
                    confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
                },

                close () {
                    this.dialog = false
                    this.clear();
                },
                clear(){
                    this.id="";
                    this.idRole="";
                    this.name="";
                    this.type_document="";
                    this.num_document="";
                    this.address="";
                    this.phone="";
                    this.email="";
                    this.password="";
                    this.passwordAnt="";
                    this.actPassword="";
                    this.editedIndex=-1;
                },
                  force(){
                    this.validation=0;
                    this.validationMessage=[];
                    if(this.name.length<'3' || this.name.length>'100'){
                        this.validationMessage.push("El nombre debe tener mas de 3 caracteres y menos de 50 caractares");

                    }
                    if(!this.idRole){
                        this.validationMessage.push("Selecciones un rol.")
                    }
                    if(!this.type_document){
                        this.validationMessage.push("Seleccione un tipo de documento");
                    }
                    if(!this.email)
                    {

                        this.validationMessage.push("Ingrese el email del usuario");
                    }
                    if(!this.actionEdit)
                    {
                    if(!this.password){
                        this.validationMessage.push("Ingrese el password del usuario");
                    }
                    }
                    
                    if(this.validationMessage.length){
                        this.validation=1;
                    }
                    return  this.validation;
                },
                save () {
                    if(this.force()){
                        return;
                    }
                    if (this.editedIndex > -1) {
                            //code for edit
                            let me = this; 
                            if(me.password.length>0)
                            {
                                 me.actPassword=true;
                            }

                            this.StructureData = {
                                            IdUSer:me.id,
                                            IdRole: me.idRole,
                                            Name:me.name,
                                            TypeDocument: me.type_document,
                                            NumDocument:me.num_document,
                                            Address: me.address,
                                            Phone: me.phone,
                                            Email: me.email,
                                            Password:me.password,
                                            ActPassword : me.actPassword

                            };
                             var postHeaders = {
                                'Content-Type': 'application/json',
                            };
                            axios.put('api/Users/UpdateUser', this.StructureData,{headers:postHeaders})
                            .then(function(response){
                                me.close();
                                me.list();
                                me.clear();
                            }).catch(function(error){
                                console.log(error);
                            });
                    } else {
                       //code for add 
                       let me = this; 
                        this.StructureData = {
                                            IdRole: me.idRole,
                                            Name:me.name,
                                            TypeDocument: me.type_document,
                                            NumDocument:me.num_document,
                                            Address: me.address,
                                            Phone: me.phone,
                                            Email: me.email,
                                            Password:me.password,
                                            

                            };
                       var postHeaders = {
                                'Content-Type': 'application/json',
                                        };
                       axios.post('api/Users/AddUser',this.StructureData,{
                           headers: postHeaders
                       } ).then(function(response){
                            me.close();
                            me.list()
                            me.clear();
                       }).catch(function(error){
                            console.log(error);
                       });
                    }
                  
                },
                ActivateDeactivateView(actionitem, item){
                    this.adModal=1;
                    this.adName= item.name;
                    this.adIdUser= item.idRole;




                    if(actionitem==1){
                        this.adAction=1;
                    }
                    else if(actionitem==2){
                      this.adAction=2;
                    }
                    else 
                    {
                        this.adModal=0;
                    }
                  
                },
                ActivarArticulo(){
                                let me = this; 
                                var postHeaders = {
                                'Content-Type': 'application/json',
                                 };
                            axios.put('api/Users/ActivateUser/'+this.adIdUser,{headers:postHeaders})
                            .then(function(response){
                                me.adModal=0;
                                me.adAction=0;
                                me.adName="";
                                me.adIdUser=""
                                me.list();
                            }).catch(function(error){
                                console.log(error);
                            });
                },
                DesactivarArticulo(){
                                let me = this; 
                                var postHeaders = {
                                'Content-Type': 'application/json',
                                 };
                            axios.put('api/Users/DeactivateUser/'+this.adIdUser,{headers:postHeaders})
                            .then(function(response){
                                me.adModal=0;
                                me.adAction=0;
                                me.adName="";
                                me.adIdUser=""
                                me.list();
                            }).catch(function(error){
                                console.log(error);
                            });
                },
                ActivateDeactivateClose(){
                    this.adModal=0;
                }
                


              
    }
}
</script>