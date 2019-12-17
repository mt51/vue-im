import { createComponent } from '@vue/composition-api';
import Avatar from 'components/avatar/index.vue';
export default createComponent({
  name: 'chat-record-item',

  components: {
    [Avatar.name]: Avatar
  },
  
  render() {
    return (
      <div class="chat-record-item ">
        <avatar src="" size="small" class="record-item__avatar" />
        <p class="record-item__text">馒头五毛钱一个，一块钱几个</p>
      </div>
    );
  }
})
