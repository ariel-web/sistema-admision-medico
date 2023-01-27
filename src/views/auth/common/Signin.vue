<template>
  <div class="space-y-4">
    <Textinput
      label="Correo"
      type="email"
      placeholder="Type your email"
      name="emil"
      v-model="email"
      :error="emailError"
      classInput="h-[48px]"
    />
    <Textinput
      label="Contraseña"
      type="password"
      placeholder="8+ characters, 1 capitat letter "
      name="password"
      v-model="password"
      :error="passwordError"
      hasicon
      classInput="h-[48px]"
    />

    <div class="flex justify-between">
      <label class="cursor-pointer flex items-start">
        <input
          type="checkbox"
          class="hidden"
          @change="() => (checkbox = !checkbox)"
        />
        <span
          class="h-4 w-4 border rounded flex-none inline-flex mr-3 relative top-1 transition-all duration-150"
          :class="
            checkbox
              ? 'ring-2 ring-black-500 dark:ring-offset-slate-600 dark:ring-slate-900  dark:bg-slate-900 ring-offset-2 bg-slate-900'
              : 'bg-slate-100 dark:bg-slate-600 border-slate-100 dark:border-slate-600 '
          "
        >
          <img
            src="@/assets/images/icon/ck-white.svg"
            alt=""
            class="h-[10px] w-[10px] block m-auto"
            v-if="checkbox"
          />
        </span>
        <span class="text-slate-500 dark:text-slate-400 text-sm leading-6"
          >Recuerdame</span
        >
      </label>
      <router-link
        to="/forgot-password"
        class="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >¿Olvidaste tu contraseña?</router-link
      >
    </div>
    <button @click="login({ email: email, password: password })" class="btn btn-dark block w-full text-center">
      Ingresar
    </button>
  </div>
</template>
<script>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { mapActions } from 'vuex'
import axios from "axios";

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
export default {
  components: {
    Textinput,
  },
  data() {
    return {
      checkbox: false,
    };
  },
  methods: {
        ...mapActions(['login']),
  },
  setup() {
    // Define a validation schema
    const schema = yup.object({
      email: yup.string().required("Se requiere correo").email(),
      password: yup.string().required("Se requiere la Contraseña ").min(8),
    });

    const toast = useToast();
    const router = useRouter();

    const formValues = {
      email: "king@gmail.com",
      password: "12345678",
    };


    // No need to define rules for fields
  
    const { value: email, errorMessage: emailError } = useField("email");
    const { value: password, errorMessage: passwordError } =
    useField("password");

    return {
      email,
      emailError,
      password,
      passwordError,

    };
  },
};
</script>