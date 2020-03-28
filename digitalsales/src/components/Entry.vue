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
                            <v-text-field v-if="viewNew==0" class="text-xs-center" v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
                            <v-spacer></v-spacer>

                              <v-btn v-if="viewNew==0" @click="viewerNew"  color="primary" dark class="mb-2">New</v-btn>
                   
                   
                         <v-dialog v-model="viewArticles" max-width="1000px">
                             <v-card>
                                 <v-card-title>
                                     <span class="headline">Seleccione un articulo</span>
                                 </v-card-title>
                                 <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm12 md12 lg12 xl12>
                                                <v-text-field append-icon="search" 
                                                class="text-xs-center" v-model="textFind"
                                                aria-label="Entry Article at find" @keyup.enter="listArticle()">

                                                </v-text-field>
                                                <template>
                                                     <v-data-table
                                                        :headers="headersArticles"
                                                        :items="articles"
                                                        sort-by="calories"
                                                        class="elevation-1"
                                                    >

                                                    <template v-slot:item="{ item }"> 
                                                    <tr>                        
                                                     <td class="justify-center layout px-0">
                                                    <v-icon   
                                                    small         
                                                    class="mr-2"
                                                    @click="addDetail(item)"
                                                    >
                                                    add
                                                    </v-icon>
                                                    </td>
                                                        <td>{{ item.name}}</td>
                                                        <td>{{item.category}}</td>
                                                        <td>{{item.description}}</td>
                                                        <td>{{item.stock}}</td>
                                                        <td>{{item.price_Sale}}</td>
                                                        </tr>  
                                                        </template>
                                                        <template v-slot:no-data>
                                                        <h3>Not add Articles </h3>
                                                        </template>
                                                    </v-data-table>
                                                </template>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                 </v-card-text>
                                 <v-card-actions>
                                     <v-spacer></v-spacer>
                                     <v-btn @click="hideArticles()" color="blue darken" text>
                                         Cancel
                                     </v-btn>
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
                        @click="viewDetails(item)"
                        >
                        tab
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
                            :items="vouchers" label="Type Voucher">
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
                            <v-text-field @keyup.enter="findCodeArticle()" v-model="Code" label="Code">

                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm2 md4 lg2 xl2>
                            <v-btn @click="showArticles()"  small fab dark color="teal">
                                <v-icon dark>list</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex xs12 sm2 md4 lg2 xl2 v-if="errorArticle">
                                <div class="red--text" v-text="errorArticle">

                                </div>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                                    <v-data-table
                                    :headers="headersDetails"
                                    :items="details"
                                    sort-by="calories"
                                    class="elevation-1"
                                    hide-default-footer
                                    >

                                <template v-slot:item="{ item }">   
                                    <tr>
                                    <td class="layout px-5">
                                        <v-icon            
                                        class="mr-2"
                                        @click="deleteDetailArticle(details,item)"
                                        >
                                        delete
                                        </v-icon>
                                    </td>
                                    <td>{{ item.article}}</td>
                                    <td><v-text-field type='number' min="0" step=".1" v-model.number="item.quantity"></v-text-field></td>
                                    <td><v-text-field type='number' v-model.number="item.price" ></v-text-field></td>
                                    <td>${{ item.quantity* item.price }}</td>
                                    </tr>
                                                                
                                        
                                </template>
                                    <template v-slot:no-data>
                                      <h3>Not add Articles </h3>
                                    </template>
                            </v-data-table>
                            <v-flex class="text-xs-right">
                                <strong>Total Partial:</strong> ${{totalPartial=( total-totalTax).toFixed(2)}}
                            </v-flex>
                            <v-flex class="text-xs-right">
                                <strong>Total Tax:</strong> ${{totalTax=((total * tax)/(100 + tax)).toFixed(2)}}
                            </v-flex>
                            <v-flex class="text-xs-right">
                                <strong>Total Neto:</strong> ${{total= (calculeTotal).toFixed(2)}}
                            </v-flex>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                             <div class="red--text" v-for="v in validationMessage" :key="v" v-text="v"></div>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12>
                            <v-btn @click="disableNew()" color="blue darken-1" text>Cancelar</v-btn>
                            <v-btn  @click="save()" color="success">Save</v-btn>
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
                        details:[],
                        search:'',              
                         id:'',
                         type_Voucher:'',
                         idprovider:'',
                         providers:[],
                         type_document:'',
                         vouchers:['FACTURA', 'BOLETA', 'TICKET', 'GUIA'],
                         num_Voucher:0,
                         tax:18,
                         Code:'',
                         viewNew:0,
                         total:0 ,
                         headersArticles :[
                             {text:'Select', value: 'select', sortable:false},
                             {text:'Article', value:'article'},
                             {text:'Category', value:'category'},
                             {text:'Description', value:'description', sortable: false},
                             {text:'Stock', value:'stock', sortable:false},
                             { text: 'Price Sale', value: 'price_Sale', sortable:false },
                         ],
                         articles:[],
                         textFind:'',
                         viewArticles:0,
                         validation:'',
                         validationMessage:[],
                         adModal:0,
                         adAction:0,
                         adName:'',
                         adIdUser:'',
                         errorArticle: null,
                         totalPartial:0,
                         totalNeto:0,
                         totalTax:0,
                         viewDetail:0,
            }

    },
        computed: {
            calculeTotal:function(){
                var resultado=0.0;
                for (var i=0; i<this.details.length;i++){
                    resultado= resultado+(this.details[i].price*this.details[i].quantity);
                }
                return resultado;
            }
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
             disableNew(){this.viewNew=0; this.clear();},
             getColor (calories) {
                 if (calories =="ACCEPTED") return 'blue'
                     else return 'red'
                  
                },
            addDetail(data =''){  
                    console.log(data)
                    this.errorArticle=null; 
                     if(this.findArticleDetail(data['idArticle'])){
                         this.errorArticle="this article has already been added";
                     }else{
                    this.details.push(
                    {idArticle:data['idArticle'],
                    article:data['name'],
                    quantity:1,
                    price:1
                    })
                     }
                    
            },
            findArticleDetail(id){
                var sw=0;
                console.log(id);
                for(var i=0; i<this.details.length;i++)
                {
                    if(this.details[i].idArticle==id)
                    {
                        sw=1;
                    }
                }
                return sw;
            },
            findCodeArticle(){
                
                let me= this;
                me.errorArticle=null;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuration={ headers: header};
                axios.get('api/Articles/ObtainArticleForCode/'+this.Code  ,configuration).then(function(response){
                    console.log(response)
                    
                   me.addDetail(response.data)
                }).catch(function(error){
                    me.errorArticle="Not exists code article"
                        console.log(error)
                });
            },
            listArticle(){
                let me =this; 
                let header={"Authorization": "Bearer " + this.$store.state.token};
                let configuration = {headers : header};
                axios.get('api/Articles/ListEntry/'+me.textFind, configuration).then(function(response){
                        me.articles= response.data || [];
                }).catch(function(error){
                    console.log(error);
                });
            },
            viewDetails(item)
            {
                this.clear();
                this.type_Voucher= item.type_Voucher;
                this.num_Voucher= item.num_Voucher;
                this.idprovider= item.IdProvider;
                this.Tax= item.tax;
                this.listDetails(item.idEntry);
                this.viewNew=1;
                //this.viewDetail=1;
            },
            showArticles(){
                this.articles=[];
                this.viewArticles=1;
            },
            hideArticles(){
                this.viewArticles=0;
                this.articles=[];
            },
            deleteDetailArticle(arr, item){
                var i= arr.indexOf(item);
                if(i!=-1){
                    arr.splice(i,1);
                }
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
            listDetails(id){
                let me =this; 
                let header={"Authorization": "Bearer " + this.$store.state.token};
                let configuration = {headers : header};
                axios.get('api/Entries/ListDetailEntry/'+id, configuration).then(function(response){
                        me.details= response.data= response.data || [];
                         console.log(me.details);
                }).catch(function(error){
                    console.log(error);
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
                deleteItem (item) {
                    const index = this.desserts.indexOf(item)
                    confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
                },
                clear(){
                    this.id="";
                    this.type_Voucher="";
                    this.idprovider="";
                    this.num_Voucher=0;
                    this.tax="18";
                    this.Code="";
                    this.details=[];
                    this.total=0;
                    this.totalTax=0;
                    this.totalPartial=0;
                    this.articles=[];
                },
                  force(){
                    this.validation=0;
                    this.validationMessage=[];
                    if(!this.idprovider){
                        this.validationMessage.push("Selecciones un proveedor.")
                    }
                    if(!this.type_Voucher){
                        this.validationMessage.push("Seleccione un tipo de documento");
                    }
                    if(!this.num_Voucher)
                    {

                        this.validationMessage.push("Ingrese numero de comprobante");
                    }
                    if(!this.tax || this.tax<0){
                        this.validationMessage.push("Ingrese un impuesto valido");
                    }
                    if(this.details.length<=0){
                        this.validationMessage.push("Ingrese al menos un articulo al detalle.")
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
                       let me = this; 
                       console.log(me.details)
                       console.log("Id Usuario "+ me.$store.state.user.idUser,)
                        this.StructureData = {
                                            IdProvider: me.idprovider,
                                            IdUser:parseInt(me.$store.state.user.idUser),
                                            Type_Voucher: me.type_Voucher,
                                            Num_Voucher:me.num_Voucher,
                                            Tax: me.tax,
                                            Total: parseFloat( me.total),  
                                            detail_entry: me.details
                            };
                       var postHeaders = {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + this.$store.state.token,
                                        };
                       axios.post('api/Entries/AddEntry',this.StructureData,{
                           headers: postHeaders
                       } ).then(function(response){
                           
                            me.disableNew()
                            me.list()
                            me.clear();
                       }).catch(function(error){
                            console.log(error);
                       });
                    
                  
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