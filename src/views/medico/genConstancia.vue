<template>
    <div style="height: calc(100vh - 200px);">
      <div> 
        <Card
          imaClass="rounded-md"
          noborder
        >
        <div>
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 sm:col-span-4">

               <pre>{{ selected }}</pre>
                <VueSelect
                  :options="programa_estudios" 
                  label="Programa de Estudios"
                  v-model="selected"
                  @onchange="switchSelect"
                /> 

                <VueSelect v-model="selected" :value="value" :options="programa_estudios" >
                  <!-- <option :value="item.value" v-for="(item, index) in programa_estudios">
                    {{ item.label }}
                  </option> -->
                </VueSelect>
              
                <InputGroup
                   v-model="dni"
                    label="Dni"
                    name="smallsize"
                    type="text"
                    placeholder="Dni"
                />

                <InputGroup
                  v-model="postulante.paterno"
                  label="Apellido Paterno"
                  name="defaultsize"
                  type="text"
                  placeholder="Apellido Paterno"
                />
                <InputGroup
                  v-model="postulante.materno"
                  label="Apellido Materno"
                  name="smallsize"
                  type="text"
                  placeholder="Apellido materno"
                />
                <InputGroup
                  v-model="postulante.nombres"
                  label="Nombres"
                  name="smallsize"
                  type="text"
                  placeholder="Nombres"
                />
                
                <div class="mt-4 space-x-4 rtl:space-x-reverse block" >
                  <label v-if="constancia.codigo !== '' ">{{ constancia.codigo }}</label>
                </div>
        
                <div class="mt-4 space-x-4 rtl:space-x-reverse">
                  <Button text="Imprimir" @click="guardar" btnClass="btn-dark btn-sm" />
                </div>
            </div>
            <div class="col-span-12 sm:col-span-8">
              <label>Vista previa</label>
              <div class="col-span-12 sm:col-span-8 border mt-2 p-2 rounded-md ">
                <div class="w-full" style="background-color: #f2f2f2;">
                  <VistaPrevia/>
                </div>
              </div>
            </div>
          </div>
          <!-- <div style="max-width: 300px;"> 
            <Textinput
                v-model="dni"
                name="ValidState"
                type="text"
                placeholder="Ingrese su dni"  
                block
              />
              <Textinput
                v-model="postulante.paterno"
                name="ValidState"
                type="text"
                placeholder="Apellido Paterno"  
                block
              />
              <Textinput
                v-model="postulante.materno"
                name="ValidState"
                type="text"
                placeholder="Apellido Materno"  
                block
              />
              <Textinput
                v-model="postulante.nombres"
                name="ValidState"
                type="text"
                placeholder="Nombres"  
                block
              />
          </div> -->
        </div>      

        </Card>
      </div>
    </div>
  </template>
  <script>
  import window from "@/mixins/window";
  import Textinput from "@/components/Textinput";
  import Button from "@/components/Button";
  import Card from "@/components/Card";
  import InputGroup from "@/components/InputGroup";
  import VistaPrevia from "./componentes/vistaPrevia.vue"
  import VueSelect from '@/components/Select/VueSelect.vue';
  import axios from 'axios';
  
  export default {
    mixins: [window],
    components: { Textinput, Button, Card, InputGroup, VistaPrevia, VueSelect },
    data() {
      return {
        tipo_doc:1,
        dni:'',
        clave:1,
        size:"8", 
        auto:"true", 
        characters:"a-z,A-Z,0-9",
        postulante: {
          nombres:'Jhon Ariel',
          paterno:'Luque',
          materno:'cusacani',

        },
        constancia : {
          codigo: '',
          nombre: '',
          estado: '',
          url:''
        },
        data: null,
        programa_estudios:[],
        selected:'',
  
      };
    },
    created(){
       this.getProgramas()
    },
  
    methods:{
      async guardar() {
          this.data = {
            "postulante":this.postulante,
            "constancia":this.constancia,
            "dni":this.dni,
            "programa":this.selected,
            "tipo":1
          }
          let res = axios.post("http://sistema-admision-back.test/api/guardar-constancia",this.data)
          .then(response => {
            console.log(response);
            // this.PDF = response.data.datos;
            // this.PDF=response.data.datos;
            // this.url = response.data.datos.url;
            // this.PrintPdf(this.url);
          });
      },

      switchSelect(event) {
        this.selected = event.target.value;
      },

      async getConstancias(){
        let res = await axios.get('http://sistema-admision-back.test/api/select-data/get-programa-estudios');
        this.programa_estudios = res.data.datos;
      },

      

      async getProgramas(){
        let res = await axios.get('http://sistema-admision-back.test/api/select-data/get-programa-estudios');
        this.programa_estudios = res.data.datos;
      },

      generate() {
        let charactersArray = this.characters.split(',');  
        let CharacterSet = '';
        let password = '';
        
        if( charactersArray.indexOf('a-z') >= 0) {
          CharacterSet += 'abcdefghijklmnopqrstuvwxyz';
        }
        if( charactersArray.indexOf('A-Z') >= 0) {
          CharacterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if( charactersArray.indexOf('0-9') >= 0) {
          CharacterSet += '0123456789';
        }
        if( charactersArray.indexOf('#') >= 0) {
          CharacterSet += '![]{}()%&*$#^<>~@|';
        }
        
        for(let i=0; i < this.size; i++) {
          password += CharacterSet.charAt(Math.floor(Math.random() * CharacterSet.length));
        }
        this.constancia.codigo = password;
      }
    },
    watch:{ 
      dni: function(){
        if(this.clave === 1){ 
          if(this.dni.length === 8){
            this.clave = 0
            this.generate()
          }    
        }
  
      },
    }
    // watch:{
    //   dni:function(){
    //     //if(this.length === 8){
    //       this.generate()
    //     //}
  
    //   }
    // }
  
  
  };
  </script>
  