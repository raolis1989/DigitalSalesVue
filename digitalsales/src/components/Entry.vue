<template>
   <v-layout alig-start>
        <v-flex>  
        
                <v-toolbar flat color="white">
                    <v-toolbar-title>Entries</v-toolbar-title>
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                            <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
                            <v-spacer></v-spacer>

                              <v-btn v-if="viewNew==0" @click="viewerNew"  color="primary" dark class="mb-2">New</v-btn>
                   
                   
                   
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
                :items="entries"
                sort-by="calories"
                class="elevation-1"
                v-if="viewNew==0"
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
                        <template v-if="item.status=='ACCEPTED'">
                            <v-icon
                            @click="ActivateDeactivateView(2,item)"
                            >
                                block
                            </v-icon>
                        </template>
                        <template v-else>
                            <v-icon
                            @click="ActivateDeactivateView(1,item)"
                            >
                                check
                            </v-icon>
                        </template>
                        
                    </td>
                    <td>{{ item.userName}}</td>
                    <td>{{ item.providerName}}</td>
                    <td>{{ item.type_Voucher }}</td>
                    <td>{{ item.num_Voucher }}</td>
                    <td>{{ item.date_Time   }}</td>
                    <td>{{ item.tax }}</td>
                    <td>{{ item.total }}</td>
                    <td>
                        <v-chip :color="getColor(item.status)" dark>
                            <div v-if="item.status=='ACCEPTED'">
                            <span class="black--text">Accepted</span>
                        </div>
                        <div v-else>
                            <span class="black--text">{{item.status}}</span>
                        </div>
                        </v-chip> 
                        
                    </td>  
                    </tr>
                                                  
                        
                </template>
                    <template v-slot:no-data>
                        <v-btn color="primary" @click="list">Reset</v-btn>
                    </template>
            </v-data-table>
            <v-container grid-list-sm class="pa-4 white" v-if="viewNew">
                <v-layout row wrap>
                        <v-flex xs12 sm md4 lg4 xl4>
                            <v-select v-model="type_Voucher"
                            :items="vochers" label="Type Voucher">
                            </v-select>
                        </v-flex>
                        <v-flex xs12 sm md4 lg4 xl4>
                            <v-text-field v-model="num_Voucher" label="Number Voucher">

                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm8 md8 lg8 xl8>
                            <v-select v-model="idprovider"
                            :items="providers" label="Providers">
                            </v-select>
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg4 xl4>
                            <v-text-field type="number" v-model="tax" label="Tax">

                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm8 md8 lg8 xl8>
                            <v-text-field v-model="code" label="Code">

                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm2 md4 lg2 xl2>
                            <v-btn small fab dark color="teal">
                                <v-icon dark>list</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                                    <v-data-table
                                    :headers="headersDetails"
                                    :items="details"
                                    sort-by="calories"
                                    class="elevation-1"
                                    hide-actions
                                    >

                                <template v-slot:item="{ item }">   
                                    <tr>
                                    <td class="layout px-5">
                                        <v-icon            
                                        class="mr-2"
                                        >
                                        delete
                                        </v-icon>
                                    </td>
                                    <td>{{ item.article}}</td>
                                    <td>{{ item.quantity}}</td>
                                    <td>{{ item.price }}</td>
                                    <td>{{ item.quantity* item.price }}</td>
                                    </tr>
                                                                
                                        
                                </template>
                                    <template v-slot:no-data>
                                      <h3>Not add Articles </h3>
                                    </template>
                            </v-data-table>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                             <div class="red--text" v-for="v in validationMessage" :key="v" v-text="v"></div>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                            <v-btn @click="disableNew" color="blue darken-1" flat>Cancelar</v-btn>
                            <v-btn color="success">Save</v-btn>
                        </v-flex>
                </v-layout>
            </v-container>

        </v-flex>
   </v-layout>
</template>

<script>
import axios from 'axios'
export default {
    data(){
    return {
                entries:[],
                dialog: false,
                 headers: [
                    { text: 'Actions', value: 'action', sortable: false },
                    { text: 'User', value: 'userName' },
                    { text: 'Provider', value: 'providerName' },
                    { text: 'Type Voucher', value: 'type_Voucher' },
                    { text: 'Number Voucher', value: 'num_Voucher', sortable:false },
                    { text: 'Date', value: 'date_Time', sortable:false },
                    { text: 'Tax', value: 'tax', sortable:false },
                    { text: 'Total', value: 'total', sortable:false },
                    { text: 'Estatus', value: 'status', sortable:false },
                    
                        ],
                    headersDetails: [
                    { text: 'Delete', value: 'delete', sortable: false },
                    { text: 'Article', value: 'article' },
                    { text: 'Quantity', value: 'quantity', sortable:false },
                    { text: 'Price', value: 'price', sortable:false },
                    { text: 'Subtotal', value: 'subtotal', sortable:false },
                    
                        ],
                        details:[
                            {idArticle:'1000', article:'Articulo 1', quantity:'65', price:'1000'},
                            {idArticle:'2000', article:'Articulo 2', quantity:'100', price:'5500'}
                        ],
                        search:'',              
                        editedIndex: -1,
                         id:'',
                         type_voucher:'',
                         providers:[],
                         vouchers:['FACTURA', 'BOLETA', 'TICKET', 'GUIA'],
                         num_voucher:0,
                         tax:18,
                         Code:'',
                         viewNew:0,
                         total:'',
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
            return this.editedIndex === -1 ? 'New Entry' : 'Edit Entry'
        },
        },

        watch: {
        dialog (val) {
            val || this.close()
        },
        },

        created () {

        this.list();
        this.selectProviders();
        },
    methods:{
             viewerNew(){this.viewNew=1;},
             disableNew(){this.viewNew=0},
             getColor (calories) {
                 if (calories =="ACCEPTED") return 'blue'
                     else return 'red'
                  
                },
            list(){
                let me= this;
                  let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuration={ headers: header};
                axios.get('api/Entries/List',configuration).then(function(response){
                    me.entries= response.data
                    console.log(me.entries);
                }).catch(function(error){
                        console.log(error)
                });
            },
            selectProviders(){
                let me= this;
                var ProvidersArray=[];
                  let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuration={ headers: header};
                axios.get('api/Persons/SelectProviders',configuration).then(function(response){
                    ProvidersArray= response.data;
                    console.log(ProvidersArray);
                    ProvidersArray.map(function(x){
                        me.providers.push({text: x.name, value: x.idPerson})
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
                                'Authorization': 'Bearer ' + this.$store.state.token,
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
                                'Authorization': 'Bearer ' + this.$store.state.token,
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
                                let header={"Authorization" : "Bearer " + this.$store.state.token};
                                let configuration={ headers: header};
                                var postHeaders = {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + this.$store.state.token,
                                 };
                            axios.put('api/Users/ActivateUser/'+this.adIdUser,configuration,{headers:postHeaders})
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
                                let header={"Authorization" : "Bearer " + this.$store.state.token};
                                let configuration={ headers: header};
                                var postHeaders = {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + this.$store.state.token,
                                 };
                            axios.put('api/Users/DeactivateUser/'+this.adIdUser,configuration,{headers:postHeaders})
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