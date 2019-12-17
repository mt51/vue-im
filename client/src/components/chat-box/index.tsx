import { createComponent, PropType } from '@vue/composition-api';
import ChatBoxHeader from './chat-box-header';
import ChatInput from './chat-input';
import ChatBoxContent from './chat-box-content';
import './index.scss';
import { IMessage } from 'definitions';

export default createComponent({
  name: 'chat-box',

  props: {
    sendMessage: {
      type: (null as unknown) as PropType<(message: IMessage) => void>
    },
  },

  components: {
    [ChatBoxHeader.name]: ChatBoxHeader,
    [ChatInput.name]: ChatInput,
    [ChatBoxContent.name]: ChatBoxContent,
    [ChatInput.name]: ChatInput,
  },

  setup(context, props){
    console.log(props);
  },
  
  render(this: any, props, d) {
    return (
      <div class="chat-box">
        <chat-box-header />
        <chat-box-content />
        <chat-input sendMessage={this.sendMessage} />
      </div>
    );
  }
})
