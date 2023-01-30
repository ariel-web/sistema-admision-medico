<template>
  <div class="loginwrapper">
    <div class="lg-inner-column">
      <div class="left-column relative z-[1]">
        <div class="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
          <router-link to="/">
            <div style="display: flex;">
              <div>
                <img
                  src="@/assets/images/logo/logo_unap.png"
                  width="60"
                  alt=""
                  class="mb-10"
                  v-if="!this.$store.state.isDark"
                />
                <img
                  src="@/assets/images/logo/logo_unap.png"
                  width="60"
                  alt=""
                  class="mb-10"
                  v-else
                />
              </div>
              <div class="pl-3" style="display: flex; margin-top: 20px;">
                <div>
                  <div><h6 style="font-size:1.1rem;">UNIVERSIDAD NACIONAL DEL ALTIPLANO</h6></div>
                  <div>Comisión de admisión 2023</div>
                  <div >
                    {{this.$store.state.aut}}
                  </div>
                </div> 
              </div>
            </div>
          </router-link>

          <h4>
            
            <span class="text-slate-800 dark:text-slate-400 font-bold"
              ></span
            >
          </h4>
        </div>
        <div
          class="absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]"
          style="display: flex; justify-content: center; opacity: .6;"
        >
          <img
            src="@/assets/images/logo/logo_unap.png"
            style="width: 400px; margin-top: -90px;"
            alt=""
            class="h-full w-full object-contain"
          />
        </div>
      </div>
      <div class="right-column relative">
        <div
          class="inner-content h-full flex flex-col bg-white dark:bg-slate-800"
        >
          <div class="auth-box h-full flex flex-col justify-center">
            <div class="mobile-logo text-center mb-6 lg:hidden block">
              <router-link to="/">
                <img
                  src="@/assets/images/logo/logo.svg"
                  width="130"
                  alt=""
                  class="mx-auto"
                  v-if="!this.$store.state.isDark"
                />
                <img
                  src="@/assets/images/logo/logo-white.svg"
                  width="130"
                  alt=""
                  class="mx-auto"
                  v-else
                />
              </router-link>
            </div>
            <div class="text-center 2xl:mb-10 mb-4">
              <h4 class="font-medium">Ingresar al Sistema</h4>
              <div class="text-slate-500 text-base">
                  <span style="height: 30px;"></span>
              </div>
            </div>
            <Signin/>
            <div class="max-w-[242px] mx-auto mt-8 w-full">
            </div>
          </div>
          <div class="auth-footer text-center">
            Copyright&copy; 2023 - Unap Puno - Todos los derechos reservados
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Signin from "../common/Signin";
export default {
  components: {
    Signin,
  },
  // created() {
  //   this.sesionActiva()
  // },
  // methods:{
  //   sesionActiva() {
  //     if (localStorage.activeUser) {
  //       this.$router.push('/home');
  //       console.log("Sesion iniciada");
  //     } else next({ name: "Login" });
  //   }
  // }
};
</script>
<style lang="scss"></style>
