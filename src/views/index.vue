<template>
    <div class="test">
       <p class="title">测试</p>
    </div>
</template>

<script>
    export default {
        name: "index",
        title:'index',
        head: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: '首页',
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ]
        }
    }
</script>

<style lang="less">
  .test{
      background-color: red;

  }
</style>
