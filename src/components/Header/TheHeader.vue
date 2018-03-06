<template>
  <div class="im-header">
    <div class="current-user">
      <img class="avatar" :src="mine.avatar">
      <div class="top-search">
        <div class="search-box">
          <button class="search fa fa-search"></button>
          <input type="text" v-model="keyword" @keyup="searchContact">
        </div>
      </div>
    </div>
    <ul class="im-tab">
      <li class="im-tab-item tab-chatlist" :class="{'active': currentTab === 'chat'}" title="会话列表" @click="handleCurrentTab('chat')">
        <button class="btn btn-chatlist"><i class="fa fa-comment-o"></i></button>
        <p class="ti-arrow"><i class="fa fa-caret-up"></i></p>
      </li>
      <li class="im-tab-item tab-userlist" :class="{'active': currentTab === 'user'}" title="联系人列表" @click="handleCurrentTab('user')">
        <button class="btn btn-userlist"><i class="fa fa-users"></i></button>
        <p class="ti-arrow"><i class="fa fa-caret-up"></i></p>
      </li>
    </ul>
    <ul class="im-tools">
      <li class="im-tools-item im-tools-skin">
        <button class="btn btn-skin" title="皮肤" @click="handleSkinVisible"><i class="fa fa-bookmark"></i></button>
        <ul class="skin-list" v-show="skinVisible">
          <li class="skin-item" @click="handleSkinChange('red')"><i class="fa fa-check" :class="{'active': skin === 'red'}"></i>红色</li>
          <li class="skin-item" @click="handleSkinChange('blue')"><i class="fa fa-check" :class="{'active': skin === 'blue'}"></i>蓝色</li>
          <li class="skin-item" @click="handleSkinChange('white')"><i class="fa fa-check" :class="{'active': skin === 'white'}"></i>白色</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import storage from '@/util/storage'
export default {
  name: 'TheHeader',
  props: {
    mine: Object,
    tab: String,
    skin: String
  },
  data () {
    return {
      keyword: '',
      currentTab: this.tab,
      skinVisible: false
    }
  },
  methods: {
    searchContact: debounce(function () {
      this.$parent.handleSearch(this.keyword)
    }, 200),
    handleCurrentTab (type) {
      this.currentTab = type
      this.$parent.handleTabChange(type)
    },
    handleSkinVisible () {
      this.skinVisible = !this.skinVisible
    },
    handleSkinChange (skin) {
      this.handleSkinVisible()
      if (this.skin !== skin) {
        this.$parent.handleSkinChange(skin)
        storage.setItem('skin', skin)
      }
    }
  },
  watch: {
    tab () {
      this.currentTab = this.tab
    }
  }
}
</script>
<style lang="scss" scoped>
  .im-header {
    width: 100%;
    min-width: 800px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    .avatar {
      display: block;
      float: left;
      margin: 5px 10px;
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
    .top-search {
      display: inline-block;
     .search-box {
       width: 180px;
       height: 20px;
       line-height: 20px;
       margin: 14px auto;
       border-radius: 20px;
       padding: 3px 10px;
     }
      input {
        width: 150px;
        height: 20px;
        outline: none;
        border: none;
        flex: 1;
      }
      button{
        border:none;
        outline: none;
        padding: 0;
        margin: 0;
      }
      .show-clear {
        display: block;
      }
    }
    .im-tab, .im-tools {
      margin-top: 15px;
    }
    .im-tools-item {
      cursor: pointer;
      margin-top: 5px;
      .btn {
        font-size: 18px;
      }
    }
    .im-tab-item {
      display: inline-block;
      margin: 0 20px;
      cursor: pointer;
      .ti-arrow {
        margin: 0;
        padding: 0;
        text-align: center;
        font-size: 30px;
        margin-top: -9px;
        margin-top: -4px\9\0;
        opacity: 0;
        transition: opacity 0.35s;
      }
    }
    .active {
      .ti-arrow {
        opacity: 1;
      }
    }
    .btn {
      border: none;
      outline: none;
      font-size: 24px;
      cursor: pointer;
    }
    .im-tools {
      margin-right: 30px;
    }
    .im-tools-skin {
      position: relative;
    }
    .skin-list {
      position: absolute;
      left: -79px;
      top: 20px;
      z-index: 99;
      width: 100px;
      background: #fff;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0,0,0,0.15);
    }
    .skin-item {
      padding: 10px;
      font-size: 14px;
      border-bottom: 1px solid #ddd;
      .fa {
        color: transparent;
        margin-right: 5px;
      }
      .active {
        color: #000;
      }
      &:hover {
        background: #f5f5f5;
      }
    }
  }
</style>
