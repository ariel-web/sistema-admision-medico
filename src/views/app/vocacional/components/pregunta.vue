<template>
    <Card :title="pregunta"> 
    <!-- <div class="flex space-x-rb flex-wrap" v-for="(ite) in item.respuestas" :key="ite.id"> -->
        <div v-for="(item, i) in items" :key="i">
          <Radio
            :label="item.respuesta"
            class="mb-5"
            name="jorina"
            v-model="respuesta"
            :value="item"
            @click="addRespuesta( respuesta )"
          />
        </div>
    </Card>
</template>

<script>
import Card from "@/components/Card";
import Radio from "@/components/Radio";
//import axios from 'axios';
import { mapActions } from 'vuex'

export default {
    name:'respuestas',
    props:['pregunta','items'],
    components: {
      Card,
      Radio,
    },

  data() {
    return {
      respuesta:{},
    }
  },

  methods: {     
    ...mapActions(['addRespuesta'])    
  },




};

</script>

