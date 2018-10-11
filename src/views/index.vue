<template>
    <div class="test">
        <at-button type="primary">主要按钮</at-button>
        <at-button>次要按钮</at-button>
        <at-button type="text">文字按钮</at-button>
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

<style >
  .test{
      background-color: red;

  }
</style>
