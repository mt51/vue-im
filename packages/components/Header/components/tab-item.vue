<template>
  <li
    class="im-tab-item"
    :class="tabClass"
    :title="tab.title"
    @click="onTabItemClick(tab.type)"
  >
    <template v-if="tab.type === 'chat'">
      <i class="new-msg" v-show="count">{{ count }}</i>
    </template>
    <button :class="`btn btn-${tab.type}list`">
      <i class="fa fa-comment-o" v-if="tab.type === 'chat'"></i>
      <i class="fa fa-users" v-else></i>
    </button>
    <p class="ti-arrow">
      <i class="fa fa-caret-up"></i>
    </p>
  </li>
</template>

<script>
import get from 'lodash/get';
export default {
  name: 'tab-item',
  inject: ['store'],
  props: {
    tab: {
      type: Object,
      required: true
    },
    currentTab: String
  },
  computed: {
    tabClass() {
      return {
        active: this.currentTab === this.tab.type,
        [`tab-${this.tab.type}list`]: true
      };
    },
    count() {
      return get(this.store.state, 'count', 0);
    }
  },
  methods: {
    onTabItemClick(tab) {
      this.$emit('on-change', tab);
    }
  }
};
</script>
<style lang="scss" scoped>
.im-tab-item {
  display: inline-block;
  margin: 0 20px;
  cursor: pointer;
  .ti-arrow {
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: 30px;
    margin-top: -6px;
    margin-top: -4px\9\0;
    opacity: 0;
    transition: opacity 0.35s;
  }
}
.new-msg {
  position: absolute;
  top: -10px;
  left: -10px;
  background: #f00;
  color: #fff;
  width: 32px;
  height: 26px;
  border-radius: 50%;
  font-size: 12px;
  line-height: 26px;
  text-align: center;
}
.active {
  & .ti-arrow {
    opacity: 1;
  }
}
.btn {
  border: none;
  outline: none;
  font-size: 24px;
  cursor: pointer;
}
.tab-chatlist {
  position: relative;
}
</style>
