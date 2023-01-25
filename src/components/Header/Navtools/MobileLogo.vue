<template>
  <router-link :to="{ name: 'home' }">
    <img
      src="@/assets/images/logo/logo_unap.png"
      width="40"
      alt=""
      v-if="!this.$store.state.isDark"
    />

    <img
      src="@/assets/images/logo/logo_unap.png"
      width="40"
      alt=""
      v-if="this.$store.state.isDark"
    />
  </router-link>
</template>
<script></script>
