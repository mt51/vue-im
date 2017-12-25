<template>
  <div class="left-bar" v-drag="target">
    <div class="avatar">
      <img :src="mine.avatar">
    </div>
    <ul class="rs-nav">
      <li class="nav-item"><span class="active">会话</span></li>
      <!-- <li class="nav-item" title="通讯录"><router-link to="contacts">会话</router-link></li> -->
    </ul>
  </div>
</template>
<script>
  import drag from '@/directives/drag'
  export default {
    props: {
      mine: Object
    },
    data () {
      return {
        target: null
      }
    },
    directives: {
      drag
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
  .left-bar{
    width: 60px;
    height: 100%;
    background: #25292c;
    color: #8c8c8c;
    cursor: move;
    .avatar{
      width: 40px;
      height: 40px;
      margin: 30px auto;
      img{
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .rs-nav{
      width: 100%;
      height: 40px;
      margin: 0;
      padding: 0;
      margin-top: 15px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      .nav-item {
        margin: 0 5px;
        background: #eee;
        border-radius: 5px;
        color: #000;
      }
      a{
        text-decoration: none;
        color: #8c8c8c;
        &.active{
          color: #129611;
        }
      }
    }
  }
</style>