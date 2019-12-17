import { createComponent } from '@vue/composition-api';
import ChatRecordItem from './chat-record-item';

export default createComponent({
  name: 'chat-box-content',

  components: {
    [ChatRecordItem.name]: ChatRecordItem
  },
  
  render() {
    return (
      <div class="chat-box-content">
        <chat-record-item />
      </div>
    );
  }
})
