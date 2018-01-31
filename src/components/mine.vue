<template>
  <div class="mine">
    <span class="avatar"><img :src="mine.avatar"></span>
    <span class="username">{{mine.username}}</span>
  </div>
</template>
<script>
  export default {
    props: {
      mine: Object
    },
    data () {
      return {
        target: null
      }
    },
    mounted () {
      this.target = this.$parent.$refs.imdrag
    }
  }
</script>
<style lang="scss" scoped>
  ul{
    list-style: none;
  }
  .mine{
    width: 210px;
    height: 60px;
    padding: 10px 0 0px 20px;
    background: #e45050;
    color: #fff;
    .avatar {
      display: block;
      float: left;
      margin-right: 10px;
      width: 40px;
      height: 40px;
      padding: 3px;
      background: #fff;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .username {
      display: block;
      float: left;
      margin-top: 8px;
    }
  }
</style>