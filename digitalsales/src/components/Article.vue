<template>
   <v-layout alig-start>
        <v-flex>  
        
                <v-toolbar flat color="white">
                    <v-toolbar-title>Articles</v-toolbar-title>
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
                                                            <v-text-field v-model="code" label="Code"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                           <v-select v-model="idCategory"
                                                             :items="categories" label="Category">
                                                             </v-select>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field v-model="name" label="Name"></v-text-field>
                                                        </v-col>
                                                         <v-col cols="12" sm="6" md="4">
                                                            <v-text-field v-model="stock" type="number" label="Stock"></v-text-field>
                                                        </v-col>
                                                         <v-col cols="12" sm="6" md="4">
                                                            <v-text-field v-model="price_sale" type="number" label="Price Sale"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6" md="4">
                                                            <v-text-field v-model="description" label="Description"></v-text-field>
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
                :items="articles"
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
                        <template v-if="item.condition">
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
                     <td>{{ item.code }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.categoryName }}</td>
                    <td>{{ item.stock }}</td>
                    <td>{{ item.price_Sale }}</td>
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
                articles:[],
                dialog: false,
                 headers: [
                    { text: 'Actions', value: 'action', sortable: false },
                    { text: 'Code', value: 'code', sortable: false },
                    { text: 'Name', value: 'name' },
                    { text: 'Category', value: 'category' },
                    { text: 'Stock', value: 'stock', sortable:false },
                    { text: 'Price Sale', value: 'price_Sale', sortable:false },
                    { text: 'Description', value: 'description', sortable:false },
                    { text: 'Estatus', value: 'condition', sortable:false },
                    
                        ],
                        search:'',              
                        editedIndex: -1,
                         id:'',
                         idCategory:'',
                         categories:[],
                         code:0,
                         name:'',
                         stock:0,
                         price_sale:0,
                         description:'',
                         validation:'',
                         validationMessage:[],
                         adModal:0,
                         adAction:0,
                         adName:'',
                         adIdArticle:''
            }

    },
        computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Article' : 'Edit Article'
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
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuration={ headers: header};
                axios.get('api/Articles/List', configuration).then(function(response){
                    me.articles= response.data
                }).catch(function(error){
                        console.log(error)
                });
            },
            selectCategories(){
                let me= this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuration={ headers: header};
                var categoriesArray=[];
                axios.get('api/Categories/SelectActive',configuration).then(function(response){
                    categoriesArray= response.data;
                    categoriesArray.map(function(x){
                        me.categories.push({text: x.name, value: x.idCategory})
                    });
                }).catch(function(error){
                        console.log(error)
                });
            },

                editItem (item) {
                    this.id=item.idArticle;
                    this.idCategory=item.idCategory;
                    this.code= item.code;
                    this.name= item.name;
                    this.stock= item.stock;
                    this.price_sale= item.price_Sale;
                    this.description= item.description; 
                    this.editedIndex=1;
                    this.dialog=true;
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
                    this.idCategory="";
                    this.name="";
                    this.stock="";
                    this.price_sale="";
                    this.description="";
                    this.editedIndex=-1;
                },
                  force(){
                    this.validation=0;
                    this.validationMessage=[];
                    if(this.name.length<'3' || this.name.length>'50'){
                        this.validationMessage.push("El nombre debe tener mas de 3 caracteres y menos de 50 caractares");

                    }
                    if(!this.idCategory){
                        this.validationMessage.push("Seleccione una categoria")
                    }
                    if(!this.stock || this.stock==0)
                    {
                        this.validationMessage.push("Ingrese el precio de venta  del articulo");
                    }
                    if(!this.price_sale || this.price_sale==0)
                    {

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
                            this.StructureData = {
                                            IdArticle: me.id,
                                            IdCategory: me.idCategory,
                                            Code:me.code,
                                            Name: me.name,
                                            Stock:parseInt(me.stock),
                                            Price_Sale: parseFloat(me.price_sale),
                                            Description: me.description 
                            };
                             var postHeaders = {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + this.$store.state.token,
                            };
                            axios.put('api/Articles/UpdateArticle', this.StructureData,{headers:postHeaders})
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
                                            IdCategory: me.idCategory,
                                            Code:me.code,
                                            Name: me.name,
                                            Stock:parseInt(me.stock),
                                            Price_Sale: parseFloat(me.price_sale),
                                            Description: me.description 
                            };
                       var postHeaders = {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + this.$store.state.token,
                                        };
                       axios.post('api/Articles/AddArticle',this.StructureData,{
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
                    this.adIdArticle= item.idArticle;




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
                            axios.put('api/Articles/ActivateArticle/'+this.adIdArticle,configuration,{headers:postHeaders})
                            .then(function(response){
                                me.adModal=0;
                                me.adAction=0;
                                me.adName="";
                                me.adIdCategory=""
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
                            axios.put('api/Articles/DeactivateArticle/'+this.adIdArticle,configuration,{headers:postHeaders})
                            .then(function(response){
                                me.adModal=0;
                                me.adAction=0;
                                me.adName="";
                                me.adIdCategory=""
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