<template>
  <div style="height: calc(100vh - 200px);">
    <div>
      <Card
        imaClass="rounded-md"
        noborder
      >
      <div style="background: yellow; height: calc(100vh - 500px); align-items: center; justify-content: center;">
        <div style="max-width: 300px;"> 
          <Textinput
              v-model="dni"
              name="ValidState"
              type="text"
              placeholder="Ingrese su dni"  
              block
            />
        </div>
      </div>      
        <!-- <div class="mt-4 space-x-4 rtl:space-x-reverse">
          <label v-if="clave_seguridad !== '' ">{{ clave_seguridad }}</label>
        </div>

        <div class="mt-4 space-x-4 rtl:space-x-reverse">
          <Button text="Iniciar Postulación" btnClass="btn-primary btn-sm" />
        </div> -->
      </Card>
    </div>
  </div>
</template>
<script>
import window from "@/mixins/window";
import Textinput from "@/components/Textinput";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default {
  mixins: [window],
  components: { Textinput, Button, Card },
  data() {
    return {
      dni:'',
      clave:1,
      email: '',
      clave_seguridad:'',
      size:"8", 
      auto:"true", 
      characters:"a-z,A-Z,0-9"

    };
  },

  methods:{
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
      this.clave_seguridad = password;
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
