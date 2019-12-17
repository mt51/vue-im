import { createComponent } from '@vue/composition-api';
import Avatar from 'components/avatar/index.vue';

export default createComponent({
  name: 'contact-item',

  components: {
    [Avatar.name]: Avatar
  },

  render() {
    return (
      <div class="contact-item">
        <avatar src="123" size="mini" />
        <span class="nickname">馒头五毛钱俩</span>
      </div>
    );
  }
});
