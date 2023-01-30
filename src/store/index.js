import { createStore } from "vuex";

import axios from "axios";
import { useToast } from "vue-toastification";
import router from "../router/index";

const toast = useToast();

export default createStore({
  state: {
    sidebarCollasp: false,
    sidebarHidden: false,
    mobielSidebar: false,
    isDark: false,
    skin: "default",
    theme: "light",
    isOpenSettings: false,
    cWidth: "full",
    menuLayout: "vertical",
    navbarType: "sticky",
    isMouseHovered: false,
    footerType: "static",
    direction: false,
    chartColors: {
      title: "red",
    },
    user:null,
    aut:false,
    
    respuestas:[],
    respuesta:null
  },
  getters: {
    theme: (state) => state.theme,
    skin: (state) => state.skin,
    direction: (state) => state.direction,
  },
  mutations: {
    addRespuesta(state, value) {
      state.respuestas.push(value);
      console.log(state.respuestas)
    },
    updateRespuesta(state, respuesta) {
      let index = state.respuestas.findIndex((c) => c.id == respuesta.id);
      if (index > -1) {
        state.respuestas[index] = respuesta;
      }
    },
    deleteRespuesta(state, valueID) {
      let index = state.respuestas.findIndex((c) => c.id == valueID);
      if (index > -1) {
        state.respuestas.splice(index, 1);
      }
    },

    setUser(state, value){
      state.user = value;
      localStorage.setItem("activeUser", JSON.stringify(state.user));
      router.push("/home");
    },
    setAut(state, value){
      state.aut = value;
    },

    setSidebarCollasp(state) {
      state.sidebarCollasp = !state.sidebarCollasp;
    },

    toogleDark(state) {
      state.isDark = !state.isDark;
      document.body.classList.toggle(state.theme);
      localStorage.setItem("theme", state.theme);
    },

    toggleSettings(state) {
      state.isOpenSettings = !state.isOpenSettings;
    },
    toggleMsidebar(state) {
      state.mobielSidebar = !state.mobielSidebar;
    },
  },
  actions: {

    // toogleDark
    async login ({dispatch}, credenciales) {        
      let res = await axios.post(
        "https://plankton-app-848ak.ondigitalocean.app/api/auth/login",
        credenciales
      )  
      .then(function (response) {
        if (response.status === 200){
          console.log(response.data);
//          localStorage.setItem("activeUser", JSON.stringify(response.data.datos));
          toast.success("Ingresando al Sistema", {
            timeout: 1500,
          });
        }
      })
      .catch(function (error) {
        toast.error("Contraseña o usuario incorrectos", { 
            timeout: 1500,
        });
      });
      return dispatch('getUser');
    },

    async getUser({ commit}) {
      const config = {
        headers: { Authorization: `Bearer ${'33|UcmAiiNooJisYyEnXvLioZYHOQMoDuctjR5qXjag'}` }
      }
      await axios.get("/auth/user",config)
      .then(res=>{
        commit('setUser',res.data);
        commit('setAut',true);
      })
      .catch(()=>{
        commit('setUser',null);
      })
    },


    toogleDark({ commit }) {
      commit("toogleDark");
    },
    // toggleSettings
    toggleSettings({ commit }) {
      commit("toggleSettings");
    },
    // setSidebarCollasp
    setSidebarCollasp({ commit }) {
      commit("setSidebarCollasp");
    },
    // toggleMsidebar
    toggleMsidebar({ commit }) {
      commit("toggleMsidebar");
    },

    // setTheme
  },

  getters: {
  },

  modules: {
  },
});
