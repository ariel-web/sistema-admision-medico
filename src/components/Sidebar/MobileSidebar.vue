<template>
  <div
    :class="`mobile-sidebar bg-white dark:bg-slate-800  ${
      this.$store.state.theme === 'bordered'
        ? 'border border-gray-5002'
        : 'shadow-base'
    }   `"
  >
    <div class="logo-segment flex justify-between items-center px-4 py-6">
      <router-link :to="{ name: 'home' }">
        <div style="display: flex; align-items: center;">
          <img
            src="@/assets/images/logo/logo_unap.png"
            width="40"
            alt=""
            v-if="!this.$store.state.isDark"
          />
          <div v-if="!this.$store.state.isDark" style="margin-top:8px; margin-left: 5px;">
            <h6 style="font-size: 1rem; margin-top: 2px; margin-bottom: -3px;">Comision de admision</h6>
            <div style="font-size: 0.8rem;">2023</div>
          </div>

        </div>

        <div style="display: flex; align-items: center;">
        <img
          src="@/assets/images/logo/logo_unap.png"
          width="40"
          alt=""
          v-if="this.$store.state.isDark"
        />
        <div v-if="this.$store.state.isDark" style="margin-top:8px; margin-left: 5px;">
            <h6 style="font-size: 1rem; margin-top: 2px; margin-bottom: -3px;">Comision de admision</h6>
            <div style="font-size: 0.8rem;">2023</div>
          </div>

        </div>
      </router-link>
      <span
        class="cursor-pointer text-slate-900 dark:text-white text-2xl"
        @click="toggleMsidebar"
        ><Icon icon="heroicons:x-mark"
      /></span>
    </div>

    <div class="sidebar-menu px-4 h-[calc(100%-100px)]" data-simplebar>
      <Navmenu :items="menu"/>
    </div>

  </div>
</template>
<script>
import { Icon } from "@iconify/vue";
import { defineComponent } from "vue";
import { menuItems, menuItemsVerificador } from "../../constant/data";
import Navmenu from "./Navmenu";

export default defineComponent({
  components: {
    Icon,
    Navmenu,
  },
  data() {
    return {
      menuItems,
      menuItemsVerificador,
      openClass: "w-[248px]",
      closeClass: "w-[72px] close_sidebar",
      menu:null,
      use:null
    };
  },
  methods: {
    toggleMsidebar() {
      this.$store.dispatch("toggleMsidebar");
    },
  },
  created(){
    if(localStorage.activeUser){
      this.use = JSON.parse(localStorage.getItem('activeUser'));
      if( this.use.rol === 1){
        this.menu = menuItemsVerificador;    
      }
      if( this.use.rol === 2){
        this.menu = menuItems;    
      }

    }
  },
});
</script>
<style lang="scss" scoped>
.mobile-sidebar {
  @apply fixed ltr:left-0 rtl:right-0 top-0   h-full   z-[9999]  w-[280px];
}
</style>
