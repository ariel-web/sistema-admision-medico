import axios from 'axios';

const state = {
    respuestas:[]
};

const getters = {
    allRespuestas:(state) => {
        return state.respuestas
    }
};

const actions = {
    async fetchrespuestas({ commit }) {
        const response = await axios.get('');
        commit('setRespuestas', response.data);
    },
    async eliminarRespuesta({commit}, id){ 
        commit('removeTodo',id);
    },
    // async addRespuesta({commit}, respuesta){
    //     commit('addRespuesta',respuesta)
    // },
    // addRespuesta(state, value) {
    //     state.respuestas.push("king");
    // },

}

const mutations = {
    ADD_RESPUESTA(state, data) {
        setTimeout(() => {
          state.respuestas.unshift(data);
        });

    },
    setRespuestas: (state, respuestas) => (state.respuestas = respuestas),
    eliminarRespuesta: (state, id) => state.todos = state.respuestas.filter((respuesta) => respuesta.id !== id )
};

export default {
    state,
    getters,
    actions,
    mutations
};
