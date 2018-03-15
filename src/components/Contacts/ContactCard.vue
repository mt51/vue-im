<template>
  <div class="contact-card" v-if="contact">
    <div class="cc-container" :class="`cc-${contact.type}`">
      <button class="cc-send" title="发送消息" @click="handleOpenChatBox"><i class="fa fa-comment-o"></i></button>
      <div class="cc-header">
        <template v-if="contact.type === 'friend'">
          <img class="cc-avatar" :src="contact.avatar">
          <h4 class="cc-username">{{contact.username}}</h4>
        </template>

        <h4 v-else>{{contact.groupname}}</h4>
      </div>
      <div class="cc-content">
        <template v-if="contact.type === 'friend'">
          <dl class="cc-info">
            <dt>昵称：</dt>
            <dd>{{contact.username}}</dd>
          </dl>
        </template>
        
        <template v-else>
          <h5 class="cc-info-title">成员：</h5>
          <ul class="cc-info gg-member-list">
            <li class="cc-info-item" v-for="(item, index) in membersList" :key="index" :title="item.username">
              <img class="cc-avatar" :src="item.avatar">
              <p class="cc-username">{{item.username}}</p>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  import { deepCopy } from '@/util/utils'
  export default {
    props: {
      contact: Object,
      membersList: Array
    },
    methods: {
      handleOpenChatBox () {
        const temp = deepCopy(this.contact)
        temp.username = temp.username || temp.groupname
        this.$parent.handleOpenChatBox(temp)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .contact-card {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .cc-container {
      position: relative;
      width: 260px;
      border-radius: 10px;
      background-image: url(../../assets/2.jpg);
      background-size: cover;
      box-shadow: 0 0 20px rgba(0,0,0,.15);
      overflow: auto;
    }
    .cc-send {
      position: absolute;
      top: 80px;
      right: 20px;
      outline: none;
      border: none;
      color: #fff;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 20px;
      cursor: pointer;
    }
    .cc-header {
      border-bottom: 1px solid #ccc;
    }
    .cc-friend {
      height: 400px;
      .cc-header {
        height: 100px;
        text-align: center;
        padding: 20px;
      }
      .cc-content {
        text-align: center;
        margin-top: 30px;
        font-size: 14px;
        dt,dd {
          display: inline-block;
        }
        dt {
          color: #666;
        }
      }
      .cc-username {
        margin-top: 20px;
        font-size: 18px;
        font-weight: bold;
      }
      .cc-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
    .cc-group {
      width: 300px;
      height: 500px;
      font-size: 14px;
      .cc-header {
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 18px;
        font-weight: 700;
      }
      .cc-content {
        padding: 0 20px;
      }
      .cc-info-title {
        font-weight: 400px;
        padding: 20px 0;
      }
      .cc-info-item {
        display: inline-block;
        text-align: center;
        width: 21%;
        margin: 10px 10px 10px 0;
        cursor: pointer;
      }
      .cc-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .cc-username {
        font-size: 12px;
        height: 16px;
        line-height: 16px;
        margin-top: 3px;
        color: #666;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
</style>