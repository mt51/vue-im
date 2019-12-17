import { createComponent } from '@vue/composition-api';
import ContactGroups from './contact-groups';
import './index.scss';

export default createComponent({
  name: 'contacts',

  components: {
    [ContactGroups.name]: ContactGroups
  },

  render() {
    return (
      <div class="contacts">
        <contact-groups />
      </div>
    );
  }
});
