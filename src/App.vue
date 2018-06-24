<template>
  <div id="app">
    <div>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>
<style>
#app {
  margin-bottom: 56px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>