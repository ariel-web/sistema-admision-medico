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
             

                <h6 style="font-size: 1rem; margin-bottom: 5px;">Programa de Estudios</h6>


                <div
                  class="fromGroup relative"
                  :class="`${error ? 'has-error' : ''}  ${horizontal ? 'flex' : ''}  ${
                    validate ? 'is-valid' : ''
                  } `"
                >
                  <label
                    v-if="label"
                    :class="`${classLabel} inline-block input-label `"
                    :for="name"
                  >
                    {{ label }}</label
                  >
                  <div class="relative">
                    <div v-if="!$slots.default">
                      <vSelect
                        :name="label"
                        :error="error"
                        label="Programa de Estudios"
                        :id="label"
                        :readonly="isReadonly"
                        :disabled="disabled"
                        :validate="validate"
                        :multiple="multiple"
                        :options="programa_estudios"
                        v-model="programa"
                      >
                      </vSelect>
                    </div>
                    <slot></slot>
                    <div class="flex text-xl absolute right-[14px] top-1/2 -translate-y-1/2">
                      <span v-if="error" class="text-danger-500">
                        <Icon icon="heroicons-outline:information-circle" />
                      </span>

                      <span v-if="validate" class="text-success-500">
                        <Icon icon="bi:check-lg" />
                      </span>
                    </div>
                  </div>

                  <span
                    v-if="error"
                    class="mt-2"
                    :class="
                      msgTooltip
                        ? ' inline-block bg-danger-500 text-white text-[10px] px-2 py-1 rounded'
                        : ' text-danger-500 block text-sm'
                    "
                    >{{ error }}</span
                  >
                  <span
                    v-if="validate"
                    class="mt-2"
                    :class="
                      msgTooltip
                        ? ' inline-block bg-success-500 text-white text-[10px] px-2 py-1 rounded'
                        : ' text-success-500 block text-sm'
                    "
                    >{{ validate }}</span
                  >
                  <span
                    class="block text-secondary-500 font-light leading-4 text-xs mt-2"
                    v-if="description"
                    >{{ description }}</span
                  >
                </div>









              
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
              <h6 style="font-size: 1rem; margin-bottom: 5px;">Vista previa</h6>
              <div class="col-span-12 sm:col-span-8 border mt-2 p-2 rounded-md ">
                <div class="w-full" style="background-color: #f2f2f2;">
                  <VistaPrevia :postulante="postulante" :dni="dni" :programa="programa"/>
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
  // import VueSelect from "@/components/Select/VueSelect";
  import vSelect from "vue-select";
  import "vue-select/dist/vue-select.css";
 
  import axios from 'axios';
  import { useToast } from "vue-toastification";
  const toast = useToast();

  export default {
    mixins: [window],       
    components: { Textinput, Button, Card, InputGroup, VistaPrevia, vSelect },
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
        programa_estudios:['MEDICINA HUMANA','EDUCACIÓN FISICA'],
        selected:'',
        programa:'MEDICINA HUMANA',
  
      };
    },
    created(){
      //  this.getProgramas()
    },
  
    methods:{
      async guardar() {
        if (this.postulante.nombres !== null && this.dni !== null){
          this.data = {
            "postulante":this.postulante,
            "constancia":this.constancia,
            "dni":this.dni,
            "programa":this.programa,
            "tipo":1
          }
          let res = axios.post("/guardar-constancia",this.data)
          .then(response => {
            console.log(response);
            // this.PDF = response.data.datos;
            // this.PDF=response.data.datos;
            // this.url = response.data.datos.url;
            // this.PrintPdf(this.url);
            console.log("URL: ", response.data.url);
            this.PrintPdf(response.data.url);
            this.dni = null;
            this.postulante.paterno = null
            this.postulante.materno = null
            this.postulante.nombres = null
            toast.success("Constancia Creada", {
              timeout: 2000,
            });
          });
        }
      },

      switchSelect(event) {
        this.selected = event.target.value;
      },

      async getConstancias(){
        let res = await axios.get('/select-data/get-programa-estudios');
        this.programa_estudios = res.data.datos;
      },

      async getProgramas(){
        let res = await axios.get('/select-data/get-programa-estudios');
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
      },

      PrintPdf (URL) {
        console.log(URL);
        var iframe = document.createElement('iframe');
        iframe.style.display = "none";
        iframe.src = URL;
        document.body.appendChild(iframe);
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
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
 
 <style lang="scss">
.fromGroup {
  .vs__dropdown-toggle {
    @apply bg-transparent  dark:bg-slate-900 border-slate-200 dark:border-slate-700 dark:text-white min-h-[40px] text-slate-900 text-sm;
  }
  .v-select {
    @apply dark:text-slate-300;
  }
  &.has-error {
    .vs__dropdown-toggle {
      @apply border-danger-500;
    }
  }
  .vs__dropdown-option {
    @apply dark:text-slate-100;
  }
  .vs__dropdown-option--highlight {
    @apply bg-slate-900 dark:bg-slate-600 dark:bg-opacity-20 py-2 text-sm;
  }
  .vs__dropdown-menu {
    li {
      @apply capitalize;
    }
  }
  .vs__dropdown-menu {
    @apply shadow-dropdown bg-white dark:bg-slate-800  text-sm  border-[0px] dark:border-[1px] dark:border-slate-700;
  }
  .vs__search::placeholder {
    @apply text-secondary-500;
  }
  .vs__actions svg {
    @apply fill-secondary-500 w-[15px] h-[15px] mt-[6px] scale-[.8];
  }

  .vs--multiple {
    .vs__selected {
      @apply text-xs text-slate-900 dark:text-slate-300 font-light bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-700 border rounded-[3px] h-fit;
      padding: 4px 8px !important;
    }
    .vs__deselect {
      @apply dark:fill-slate-300;
    }

    .vs__selected-options {
      @apply items-center capitalize;
      svg {
        @apply scale-[0.8];
      }
    }
  }
  .vs--single .vs__selected {
    @apply dark:text-slate-300;
  }
  .vs__dropdown-option--disabled {
    @apply bg-slate-50 dark:bg-slate-700;
  }
}
</style>