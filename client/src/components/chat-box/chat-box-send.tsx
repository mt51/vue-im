import { createComponent } from '@vue/composition-api';
export default createComponent({
  name: 'chat-box-send',
  
  render() {
    return (
      <div class="chat-box-send">
        <button class="chat-box-send__btn">发送</button>
      </div>
    );
  }
})
