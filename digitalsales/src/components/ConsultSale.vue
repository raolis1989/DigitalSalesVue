<template>
   <v-layout alig-start>
        <v-flex>  
        
                <v-toolbar flat color="white">
                    <v-toolbar-title>Consult Sales</v-toolbar-title>
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                            <v-text-field v-if="viewNew==0" class="text-xs-center" v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
                             <v-btn v-if="viewNew==0" @click="list()"  color="primary" dark class="mb-2">Find</v-btn>

                        <v-dialog v-model="comprobanteModal" max-width="1000px">
                            <v-card>
                                <v-card-text>
                                    <v-btn @click="createPDF()"><v-icon>print</v-icon></v-btn>
                                    <div id="factura">
                                         <header>
                                            <div id="logo">
                                                <img src="data:image/png;base64,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" id="imagen">
                                            </div>
                                            <div id="datos">
                                                <p id="encabezado">
                                                    <b>IncanatoIT</b><br>José Gálvez 1368, Chongoyape - Chiclayo, Perú<br>Telefono:(+51)931742904<br>Email:jcarlos.ad7@gmail.com
                                                </p>
                                            </div>
                                            <div id="fact">
                                                <p>{{type_Voucher}}<br>
                                                {{num_Voucher}}<br>
                                                {{date_hour}}</p>
                                            </div>
                                        </header>
                                        <br>
                                        <section>
                                            <div>
                                                <table id="facliente">
                                                    <tbody>
                                                        <tr>
                                                            <td id="cliente">
                                                                <strong>Sr(a). {{client}}</strong><br>
                                                                <strong>Documento:</strong> {{numDocument}}<br>
                                                                <strong>Dirección:</strong> {{address}}<br>
                                                                <strong>Teléfono:</strong> {{phone}}<br>
                                                                <strong>Email:</strong> {{email}}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </section>
                                        <br>
                                        <section>
                                            <div>
                                                <table id="facarticulo">
                                                    <thead>
                                                        <tr id="fa">
                                                            <th>CANT</th>
                                                            <th>DESCRIPCION</th>
                                                            <th>PRECIO UNIT</th>
                                                            <th>DESC.</th>
                                                            <th>PRECIO TOTAL</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="det in details" :key="det.iddetail_sale">
                                                            <td style="text-align:center;">{{det.quantity}}</td>
                                                            <td>{{det.article}}</td>
                                                            <td style="text-align:right;">{{det.price.toFixed(2)}}</td>
                                                            <td style="text-align:right;">{{det.discount.toFixed(2)}}</td>
                                                            <td style="text-align:right;">{{(det.quantity*det.price-det.discount).toFixed(2)}}</td>
                                                        </tr>
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th style="text-align:right;">SUBTOTAL</th>
                                                            <th style="text-align:right;">${{totalPartial= (total - totalTax).toFixed(2)}}</th>
                                                        </tr>
                                                        <tr>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th style="text-align:right;">IGV ({{tax}}%)</th>
                                                            <th style="text-align:right;">$ {{totalTax=((total*tax)/(100+tax)).toFixed(2)}}</th>
                                                        </tr>
                                                        <tr>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                            <th style="text-align:right;">TOTAL</th>
                                                            <th style="text-align:right;">$ {{total = (calculeTotal).toFixed(2)}}</th>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </section>
                                        <br>
                                        <br>
                                        <footer>
                                            <div id="gracias">
                                                <p><b>Gracias por su compra!</b></p>
                                            </div>
                                        </footer>
                                    </div>
                                    <v-btn @click="hideComprobante()" color="blue darken-1">Cancel</v-btn>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                       </v-toolbar>
             
                <v-data-table
                :headers="headers"
                :items="sales"
                sort-by="calories"
                class="elevation-1"
                v-if="viewNew==0"
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
                         <v-icon            
                        class="mr-2"
                        @click="showComprobante(item)"
                        >
                        print
                        </v-icon>                
                    </td>
                    <td>{{ item.userName}}</td>
                    <td>{{ item.clientName}}</td>
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
                            <v-select v-model="idclient"
                            :items="clients" label="Clients">
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
                                    <td>{{ item.article}}</td>
                                    <td><v-text-field type='number' min="0" step=".1" v-model.number="item.quantity"></v-text-field></td>
                                    <td><v-text-field type='number' v-model.number="item.price" ></v-text-field></td>
                                    <td><v-text-field type='number' v-model.number="item.discount" ></v-text-field></td>
                                    <td>${{ item.quantity* item.price - item.discount }}</td>
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
                            <v-btn v-if="viewDet==0" @click="save()" color="success">Save</v-btn>
                        </v-flex>
                </v-layout>
            </v-container>

        </v-flex>
   </v-layout>
</template>

<script>
import axios from 'axios'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
export default {
    data(){
    return {
              
                sales:[],
                dialog: false,
                 headers: [
                    { text: 'Actions', value: 'action', sortable: false },
                    { text: 'User', value: 'userName' },
                    { text: 'Client', value: 'clientName' },
                    { text: 'Type Voucher', value: 'type_Voucher' },
                    { text: 'Number Voucher', value: 'num_Voucher', sortable:false },
                    { text: 'Date', value: 'date_Time', sortable:false },
                    { text: 'Tax', value: 'tax', sortable:false },
                    { text: 'Total', value: 'total', sortable:false },
                    { text: 'Estatus', value: 'status', sortable:false },
                    
                        ],
                    headersDetails: [
                    { text: 'Article', value: 'article' },
                    { text: 'Quantity', value: 'quantity', sortable:false },
                    { text: 'Price', value: 'price', sortable:false },
                    { text: 'Discount', value: 'discount', sortable:false },
                    { text: 'Subtotal', value: 'subtotal', sortable:false },
                    
                        ],
                        details:[],
                        search:'',              
                         id:'',
                         type_Voucher:'',
                         idclient:'',
                         clients:[],
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
                         viewDet:0,
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
                         comprobanteModal:0,
                         client:'',
                         date_hour:'',
                         numDocument:'',
                         address:'',
                         phone:'',
                         email:''

            }

    },
        computed: {
            calculeTotal:function(){
                var resultado=0.0;
                for (var i=0; i<this.details.length;i++){
                    resultado= resultado+(this.details[i].price*this.details[i].quantity- this.details[i].discount);
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
        this.selectClients();
        },
    methods:{
            createPDF(){
                var quotes = document.getElementById('factura');
                html2canvas(quotes).then(function(canvas){
                    var imgData= canvas.toDataURL('image/png');
                    var imgWidth= 210; 
                    var pageHeight=295;
                    var imgHeight= canvas.height * imgWidth / canvas.width;
                    var heightLeft = imgHeight;
                    var doc = new jsPDF('p', 'mm', 'a4');
                    var position=0;
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    doc.save('ComprobanteSale.pdf');
                });
            },
            showComprobante(item){
                console.log(item);
                this.clear();
                this.type_Voucher= item.type_Voucher;
                this.num_Voucher= item.num_Voucher;
                this.client= item.clientName;
                this.numDocument= item.numDocument;
                this.address = item.address; 
                this.phone = item.phone;
                this.email= item.email;
                this.date_hour=item.date_Time;
                this.tax = item.tax;
                this.listDetails(item.idSale);
                this.comprobanteModal=1;
            },
            hideComprobante(){
                this.comprobanteModal=0;
                this.clear();
            },
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
                    price:data['price_Sale'],
                    discount:0
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
            viewDetails(item){
                this.clear();
                this.type_Voucher= item.type_Voucher;
                this.num_Voucher= item.num_Voucher;
                this.idclient= item.idClient;
                this.Tax= item.tax;
                this.listDetails(item.idSale);
                this.viewNew=1;
                this.viewDet=1;
                //this.viewDetail=1;
            },
            list(){
                let me= this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuration={ headers: header};
                let url='';
                console.log(me.search);
                if(!me.search){
                     url='api/Sales/List';   
                }
                else{
                     url='api/Sales/ListSalesFilter/'+me.search; 
                }
                axios.get(url,configuration).then(function(response){
                    me.sales= response.data
                }).catch(function(error){
                        console.log(error)
                });
            },
            listDetails(id){
                let me =this; 
                let header={"Authorization": "Bearer " + this.$store.state.token};
                let configuration = {headers : header};
                axios.get('api/Sales/ListDetailSale/'+id, configuration).then(function(response){
                        me.details= response.data= response.data || [];
                         console.log(me.details);
                }).catch(function(error){
                    console.log(error);
                });
            },
            selectClients(){
                let me= this;
                var ClientsArray=[];
                  let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuration={ headers: header};
                axios.get('api/Persons/SelectClients',configuration).then(function(response){
                    ClientsArray= response.data;
                    ClientsArray.map(function(x){
                        me.clients.push({text: x.name, value: x.idPerson})
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
                    this.idclient="";
                    this.num_Voucher=0;
                    this.tax="18";
                    this.Code="";
                    this.details=[];
                    this.total=0;
                    this.totalTax=0;
                    this.totalPartial=0;
                    this.articles=[];
                    this.viewDet=0;
                }
    }
}
</script>
<style>
 #factura {
            padding: 20px;
            font-family: Arial, sans-serif;
            font-size: 16px ;
        }

        #logo {
            float: left;
            margin-left: 2%;
            margin-right: 2%;
        }
        #imagen {
            width: 100px;
        }

        #fact {
            font-size: 18px;
            font-weight: bold;
            text-align: center;
        }   

        #datos {
            float: left;
            margin-top: 0%;
            margin-left: 2%;
            margin-right: 2%;
            /*text-align: justify;*/
        }

        #encabezado {
            text-align: center;
            margin-left: 10px;
            margin-right: 10px;
            font-size: 16px;
        }

        section {
            clear: left;
        }

        #cliente {
            text-align: left;
        }

        #facliente {
            width: 40%;
            border-collapse: collapse;
            border-spacing: 0;
            margin-bottom: 15px;
        }

        #fa {
            color: #FFFFFF;
            font-size: 14px;
        }

        #facarticulo {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            padding: 20px;
            margin-bottom: 15px;
        }

        #facarticulo thead {
            padding: 20px;
            background: #2183E3;
            text-align: center;
            border-bottom: 1px solid #FFFFFF;
        }

        #gracias {
            text-align: center;
        }
</style>