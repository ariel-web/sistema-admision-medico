import { createStore } from "vuex";
import chat from "./app/chat";
import email from "./app/email";
import kanban from "./app/kanban";
import project from "./app/project";
import apptodo from "./app/todo";
import examen from "./examen"

import axios from "axios";
import { useToast } from "vue-toastification";
import router from "../router/index";

const toast = useToast();

export default createStore({
  state: {
    sidebarCollasp: false,
    sidebarHidden: false,
    mobielSidebar: false,
    semidark: false,
    semiDarkTheme: "semi-light",
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
    },
    setAut(state, value){
      state.aut = value;
    },

    setSidebarCollasp(state) {
      state.sidebarCollasp = !state.sidebarCollasp;
    },

    toogleDark(state) {
      state.isDark = !state.isDark;
      state.theme = state.theme === "dark" ? "light" : "dark";
      document.body.classList.toggle(state.theme);
      localStorage.setItem("theme", state.theme);
    },

    toggleSettings(state) {
      state.isOpenSettings = !state.isOpenSettings;
    },
    toggleMsidebar(state) {
      state.mobielSidebar = !state.mobielSidebar;
    },
    toggleSemiDark(state) {
      state.semidark = !state.semidark;
      state.semiDarkTheme = state.semidark ? "semi-dark" : "semi-light";
      document.body.classList.toggle(state.semiDarkTheme);
      localStorage.setItem("semiDark", state.semidark);
    },
  },
  actions: {

    addRespuesta(context, value) {
      return axios
        .post("api/save", JSON.stringify(value))
        .then((response) => {
          context.commit("addvalue", {
            id: response.data.insert_id,
            ...value
          });
        });
    },
    updateResaddRespuesta(context, value) {
      return axios
        .post("api/update", JSON.stringify(value))
        .then((response) => {
          context.commit("updatevalue", value);
        });
    },
    deleteResaddRespuesta(context, valueID) {
      return axios
        .post("https://plankton-app-848ak.ondigitalocean.app/api/delete", JSON.stringify({ id: valueID }))
        .then((response) => {
          context.commit("deletevalue", valueID);
        });
    },

    // toogleDark
    async login ({dispatch}, credenciales) {        
      let res = await axios.post(
        "https://plankton-app-848ak.ondigitalocean.app/api/auth/login",
        credenciales
      )  
      .then(function (response) {
        if (response.status === 200){
          localStorage.setItem("activeUser", JSON.stringify(response.data.datos));
          toast.success("Ingresando al Sistema", {
            timeout: 1500,
          });
          router.push("/app/home");
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
    toggleSemiDark({ commit }) {
      commit("toggleSemiDark");
    },

    // setTheme
  },

  getters: {
    getRespuestas(state) {
      return state.respuestas;
    }
  },

  modules: {
    apptodo,
    project,
    kanban,
    email,
    chat,
    examen
  },
});
