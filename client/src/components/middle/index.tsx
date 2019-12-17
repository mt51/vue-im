import { createComponent } from '@vue/composition-api';
import MiddleHeader from './middle-header';
import MessageList from './messages';
import './index.scss';
import Contacts from './contacts';

export default createComponent({
  name: 'middle',

  components: {
    [MiddleHeader.name]: MiddleHeader,
    [MessageList.name]: MessageList,
    [Contacts.name]: Contacts
  },

  render() {
    return (
      <div class="middle-bar">
        <middle-header />
        {/* <message-list /> */}
        <contacts />
      </div>
    );
  }
});
