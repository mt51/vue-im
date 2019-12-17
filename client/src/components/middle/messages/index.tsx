import { createComponent } from '@vue/composition-api';
import MessageItem from './message-item';

export default createComponent({
  name: 'message-list',

  components: {
    [MessageItem.name]: MessageItem
  },

  render() {
    return(
      <div class="message-list">
        <message-item />
      </div>
    );
  }
});
