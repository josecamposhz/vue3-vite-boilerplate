<template>
  <div id="app" class="vh-100">
    <base-navbar />
    <router-view />
  </div>
</template>

<script>
import BaseNavbar from "./components/base/Navbar.vue";
export default {
  components: { BaseNavbar },
};
</script>
