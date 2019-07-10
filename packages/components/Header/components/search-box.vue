<template>
  <div class="top-search" v-if="!brief">
    <div class="search-box">
      <button class="search fa fa-search"></button>
      <input type="text" v-model="keyword" @focus="handleVisibleChange" />
      <p v-show="visible" class="search-close" @click="handleVisibleChange">
        &times;
      </p>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['brief'],
  data() {
    return {
      visible: false,
      keyword: ''
    };
  },
  methods: {
    handleVisibleChange() {
      this.visible = !this.visible;
    }
  }
};
</script>
<style lang="scss" scoped>
.top-search {
  display: inline-block;
  .search-box {
    position: relative;
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
  button {
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
  }
  .search-close {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    line-height: 18px;
    background: #d5d5d5;
    cursor: pointer;
    color: #000;
    font-size: 20px;
    font-weight: 400;
    &:hover {
      background: #ccc;
    }
  }
}
</style>
