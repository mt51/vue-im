import { createComponent } from '@vue/composition-api';
import Avatar from 'components/avatar/index.vue';
import './index.scss';

export default createComponent({
  name: 'message-item',

  components: {
    [Avatar.name]: Avatar
  },

  render() {
    return(
      <div class="message-item">
        <avatar size="small" src="" />
        <div class="message-wrapper">
          <div class="message-user__info">
            <p class="message-nickname">馒头五毛钱俩</p>
            <div class="message-send__time">10分钟前</div>
          </div>
          <p class="message-info">馒头五毛钱俩,一块钱几个呢</p>
        </div>
      </div>
    );
  }
});
