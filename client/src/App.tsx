import { createComponent, onMounted } from '@vue/composition-api';
import io from 'socket.io-client';
import SideBar from './components/side-bar/index.vue';
import Middle from './components/middle';
import ChatBox from './components/chat-box';

import { IMessage } from '../definitions';

import './styles.scss';

export default createComponent({
  name: 'App',

  setup() {
    const socket = io('http://localhost:3000', {
      query: {
        token: 'token'
      }
    });
    socket.on('connect', () => {
      console.log('connect');
    });

    socket.on('message', (data: any) => {
      console.log(data);
    })

    onMounted(() => {
      socket.emit('signUp', { nickname: '123', password: '123123123' });

      // socket.emit('signIn', { nickname: '123', password: '123123123' });
    });

    function handleSendMessage(message: IMessage) {
      socket.emit('sendMessage', message)
    }

    return {
      handleSendMessage
    }
  },

  components: {
    [SideBar.name]: SideBar,
    [Middle.name]: Middle,
    [ChatBox.name]: ChatBox
  },

  render(this: any) {
    return (
      <div class="app-container">
        <side-bar />
        <middle />
        <chat-box sendMessage={this.handleSendMessage} />
      </div>
    );
  }
});
