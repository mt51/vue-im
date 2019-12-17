import { createComponent } from '@vue/composition-api';
import './index.scss';

export default createComponent({
  name: 'middle-header',

  render() {
    return (
      <div class="middle-header">
        {/* <div class="middle-header__item">
          <h4 class="middle-header__title">消息</h4>
          <i class="iconfont icon-addMessage middle-header__tools" />
        </div> */}

        <div class="middle-header__item">
          <h4 class="middle-header__title">通讯录</h4>
          <i class="iconfont icon-add-friend middle-header__tools" />
        </div>

        <div class="middle-header__search">
          <i class="iconfont icon-search search-input__icon" />
          <input class="search-input" />
        </div>
      </div>
    );
  }
});
