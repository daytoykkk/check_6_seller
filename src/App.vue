<template>
  <div id="app">
    <TopMenu></TopMenu>
    <router-view/>
  </div>
</template>

<script>
import TopMenu from './components/TopMenu'

export default{
    components:{
      TopMenu
    }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
