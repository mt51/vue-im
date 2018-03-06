<template>
  <ul class='gg-list'>
    <li class='gg-item' v-for='(group, findex) in groupsList' :key='findex' @click="handleGroupItemClick(group)">
      <img class='gg-avatar' :src='group.avatar'>
      <span class='gg-name'>{{group.groupname}}</span>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'UserList',
    props: {
      groupsList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      handleGroupItemClick (contact) {
        contact.type = 'group'
        this.$parent.handleCurrentConcatChange(contact)
      }
    }
  }
</script>
<style lang='scss' scoped>
  .gg-list {
    width: 100%;
    margin-top: 10px;
    height: 98%;
    overflow: auto;
    font-size: 14px;
    .gg-item {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      cursor: pointer;
    }
    .gg-avatar {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
</style>
