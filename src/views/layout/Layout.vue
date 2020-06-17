<template>
  <div>
    <router-view></router-view>
    <bss-footer />
  </div>
</template>

<script>
import BssFooter from 'components/BssFooter';
export default {
  name: 'Layout',
  components: {
    BssFooter
  }
}
</script>

<style>

</style>
