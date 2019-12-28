<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
          <template>
            <v-list-item :to="{name : 'home'}">
              <v-list-item-action>
                <v-icon>home</v-icon>
              </v-list-item-action>
              <v-list-item-title>
                Inicio
              </v-list-item-title>
            </v-list-item>
          </template>
            <template>
              <v-list-group>
                <v-list-item slot="activator">
                  <v-list-item-content>
                       <v-list-item-title>
                        Waherehouse
                      </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item :to="{name:''}">
                    <v-list-item-action>
                      <v-icon>table_chart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                       Categories 
                      </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                   <v-list-item :to="{name:''}">
                    <v-list-item-action>
                      <v-icon>table_chart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                       Articles 
                      </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </template>
            <template>
              <v-list-group>
                <v-list-item slot="activator">
                  <v-list-item-content>
                       <v-list-item-title>
                        Purchases
                      </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item :to="{name:''}">
                    <v-list-item-action>
                      <v-icon>table_chart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                       Income 
                      </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                   <v-list-item :to="{name:''}">
                    <v-list-item-action>
                      <v-icon>table_chart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                       Provider 
                      </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </template>
            <template>
              <v-list-group>
                <v-list-item slot="activator">
                  <v-list-item-content>
                       <v-list-item-title>
                        Sales
                      </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item :to="{name:''}">
                    <v-list-item-action>
                      <v-icon>table_chart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                       Sales 
                      </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                   <v-list-item :to="{name:''}">
                    <v-list-item-action>
                      <v-icon>table_chart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                       Clients
                      </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </template>
            <template>
              <v-list-group>
                <v-list-item slot="activator">
                  <v-list-item-content>
                       <v-list-item-title>
                        Access
                      </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item :to="{name:''}">
                    <v-list-item-action>
                      <v-icon>table_chart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                       Roles 
                      </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                   <v-list-item :to="{name:''}">
                    <v-list-item-action>
                      <v-icon>table_chart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                       Users 
                      </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </template>
            <template>
              <v-list-group>
                <v-list-item slot="activator">
                  <v-list-item-content>
                       <v-list-item-title>
                        Reports
                      </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item :to="{name:''}">
                    <v-list-item-action>
                      <v-icon>table_chart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                       Purchases 
                      </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                   <v-list-item :to="{name:''}">
                    <v-list-item-action>
                      <v-icon>table_chart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                       Sales 
                      </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Digital Sales</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
      <v-slide-y-transition mode="out-in">
        <router-view/>
      </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer  height="auto">
      <v-layout justify-center>
        <v-flex justify-xs-center>
          <v-card flat tile color="primary" class="wite--text">
            <v-card-text class="wite--text pt-0">
              OffinetIT &copy;2019
            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-footer>
  </v-app>
</template>
<script>
export default{
   name:'App',
   data(){
     return{
       drawer:null,
     }
   }
}
</script>