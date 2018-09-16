<template>
    <div class="about">
       <p class="title">关于我们</p>
    </div>
</template>

<script>
    export default {
        name: "index",
        title:'关于我们',
        head: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: ' Title',
            // all titles will be injected into this template
            titleTemplate: 'My Awesome Webapp'
        }
    }
</script>

<style >
  .about{
      background-color: cadetblue;

  }
</style>
