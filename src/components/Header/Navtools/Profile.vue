<template>
  <Dropdown classMenuItems=" w-[180px] top-[58px] ">
    <div class="flex items-center">
      <div class="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
        <div class="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
          <img
            src="@/assets/images/auth/usuario.png"
            alt=""
            class="block w-full h-full object-cover rounded-full"
            v-if="!this.$store.state.isDark"
          />
          <img
            src="@/assets/images/auth/usuario_dark.png"
            alt=""
            class="block w-full h-full object-cover rounded-full"
            v-if="this.$store.state.isDark"
          />
        </div>
      </div>
      <div
        class="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {{ usuario.nombres }} {{ usuario.apellidos }}
        <!-- <span
          class="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block"
          ></span> -->
        <span class="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]"
          ><Icon icon="heroicons-outline:chevron-down"></Icon
        ></span>
      </div>
    </div>
    <template #menus>
      <MenuItem v-slot="{ active }" v-for="(item, i) in ProfileMenu" :key="i">
        <div
          type="button"
          :class="`${
            active
              ? 'bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-900 dark:text-slate-300'
              : 'text-slate-600 dark:text-slate-300'
          } `"
          class="inline-flex items-center space-x-2 rtl:space-x-reverse w-full px-4 py-2 first:rounded-t last:rounded-b font-normal cursor-pointer"
          @click="item.link()"
        >
          <div class="flex-none text-lg">
            <Icon :icon="item.icon" />
          </div>
          <div class="flex-1 text-sm">
            {{ item.label }}
          </div>
        </div>
      </MenuItem>
    </template>
  </Dropdown>
</template>
<script>
import { MenuItem } from "@headlessui/vue";
import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
    Dropdown,
    MenuItem,
  },
  data() {
    return {
      ProfileMenu: [
        {
          label: "Perfil",
          icon: "heroicons-outline:user",
          link: () => {
            this.$router.push("perfil");
          },
        },
        {
          label: "Logout",
          icon: "heroicons-outline:login",
          link: () => {
            this.$router.push("/login");
            localStorage.removeItem("activeUser");
          },
        },
      ],
      usuario: {}
    };
  },
  // created(){
  //   this.usuario = JSON.parse(localStorage.getItem('activeUser'));
  // }
};
</script>
<style lang=""></style>
