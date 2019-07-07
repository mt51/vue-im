<template>
  <transition name="collapse">
    <div class="chatlog" v-if="visible">
      <div class="chatlog-wrap">
        <div class="title">
          <span>聊天记录</span>
          <span class="close" @click="handleHistoryVisible">&times;</span>
        </div>
        <ul class="log-list">
          <li
            class="log-item"
            v-for="(item, index) in cloneHistory"
            :key="index"
            :class="{ mine: item.mine }"
          >
            <div class="time" v-if="handleTimeVisible(item, index)">
              <span>{{ item.time | formatDate(true) }}</span>
            </div>
            <div class="avatar">
              <img :src="item.avatar" />
            </div>
            <div
              class="message message-image"
              v-if="item.chatlogType === 'image'"
            >
              <img :src="item.content" />
            </div>
            <div
              class="message message-file"
              v-else-if="item.chatlogType === 'file'"
            >
              <a class="down-link" :href="item.content.src" download>
                <i class="fa fa-cloud-download down-link-icon"></i>
                <span class="down-link-file">{{ item.content.name }}</span>
              </a>
            </div>
            <div class="message" v-else v-html="item.content"></div>
          </li>
        </ul>
        <div class="page" v-show="history.total">
          <el-pagination
            layout="prev, pager, next"
            :total="history.total || 0"
            :page-size="history.size"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { formatDate } from '../../filters/filters';
import { deepCopy } from '../../util/utils';
export default {
  name: 'chatlog',
  props: {
    history: Object,
    value: {
      type: Boolean,
      default: false
    },
    mine: Object
  },
  data() {
    return {
      visible: this.value,
      cloneHistory: []
    };
  },
  methods: {
    handleTimeVisible(item, index) {
      if (index === 0) {
        return true;
      } else {
        // return (
        //   this.history.records[index].time -
        //     this.history.records[index - 1].time >
        //   10 * 60 * 1000
        // )
      }
    },
    handleHistoryVisible() {
      this.visible = false;
      this.$emit('input', this.visible);
    },
    handlePageChange(page) {
      this.$parent.$parent.handlePageChange(page);
    },
    makeCloneHistory() {
      if (this.history && !this.history.records) return;
      let history = deepCopy(this.history);
      // history.records.forEach(item => {
      //   item.mine = item.sender === this.mine.id
      // })
      return history;
    }
  },
  filters: {
    formatDate
  },
  watch: {
    value(newV) {
      this.visible = newV;
    },
    history: {
      handler() {
        this.cloneHistory = this.makeCloneHistory();
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style></style>
