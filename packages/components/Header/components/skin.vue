<template>
  <ul class="im-tools">
    <li class="im-tools-item im-tools-skin">
      <button class="btn btn-skin" title="皮肤" @click="handleSkinVisible">
        <i class="fa fa-bookmark"></i>
      </button>
      <ul class="skin-list" v-show="skinVisible">
        <li
          v-for="skin in skins"
          class="skin-item"
          :key="skin.type"
          @click="onSkinChange(skin.type)"
        >
          <i
            class="fa fa-check"
            :class="{ active: currentSkin === skin.type }"
          ></i>
          {{ skin.name }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { skins } from '../../../config';
export default {
  inject: ['handleSkinChange'],
  data() {
    return {
      skinVisible: false,
      skins,
      currentSkin: 'red'
    };
  },
  methods: {
    onSkinChange(skin) {
      this.currentSkin = skin;
      this.handleSkinChange(skin);
      this.skinVisible = false;
    },
    handleSkinVisible() {
      this.skinVisible = !this.skinVisible;
    }
  }
};
</script>
<style lang="scss" scoped>
.im-tools {
  margin-right: 30px;
}
.im-tools-item {
  cursor: pointer;
  margin-top: 5px;
  .btn {
    border: none;
    outline: none;
    font-size: 24px;
    cursor: pointer;
  }
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
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
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
</style>
