import { createComponent } from '@vue/composition-api';
import Avatar from 'components/avatar/index.vue';
export default createComponent({
  name: 'chat-box-header',

  components: {
    [Avatar.name]: Avatar
  },
  
  render() {
    return (
      <div class="chat-box-header">
        <h4 class="chat-box-header__nickname">馒头五毛钱俩</h4>
      </div>
    );
  }
})
