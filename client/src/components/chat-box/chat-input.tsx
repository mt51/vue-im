import { createComponent, ref, PropType } from '@vue/composition-api';
import { IMessage } from 'definitions';
export default createComponent({
  name: 'chat-input',
  props: {
    sendMessage: {
      type: (null as unknown) as PropType<(message: IMessage) => void>,
    }
  },

  setup(props, context){
    const message = ref<string>('');

    function handleSendEvent(event: KeyboardEvent) {
      if (event.keyCode === 13) {
        props.sendMessage && props.sendMessage({to: '123', type: '123', message: message.value });
      }
    }

    function handleTextareaOnInput(event: any) {
      message.value = event.target.value;
    }

    return {
      message,
      handleSendEvent,
      handleTextareaOnInput
    };
  },
  
  render(this: any) {
    return (
      <div class="chat-box-input">
        <textarea class="input-textarea" placeholder="回车发送" value={this.message} onInput={this.handleTextareaOnInput} onKeyup={this.handleSendEvent} />
      </div>
    );
  }
})
