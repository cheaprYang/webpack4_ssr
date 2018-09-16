<template>
    <div class="home">
       <p class="title">首页</p>
    </div>
</template>

<script>
    export default {
        name: "index",
        title:'首页',
        head: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: 'Default Title9999',
            // all titles will be injected into this template
            titleTemplate: 'My scssxsAwesome Webapp'
        }
    }
</script>

<style lang="less">
  .home{
      background-color: yellow;
     .title{
         color: red;
     }
  }
</style>
