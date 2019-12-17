import { createComponent, ref, Ref } from '@vue/composition-api';
import ContactItem from './contact-item';

const tuple = <T extends string[]>(...args: T) => args;
const GroupTypes = tuple('contact', 'message');
type groupType = (typeof GroupTypes)[number];

interface IState {
  expand: boolean;
  toggleExpand: (kdy: groupType) => void;
}

export default createComponent({
  name: 'contact-groups',

  components: {
    [ContactItem.name]: ContactItem
  },

  setup() {
    const expand = ref(false);
    const expandedGroup: Ref<groupType> = ref('');

    function toggleExpand(key: groupType) {
      expand.value = !expand.value;
      expandedGroup.value = key;
    }

    return {
      expand,
      toggleExpand,
    }
  },

  render(this: any) {
    return (
      <div class="contact-group">
        <h4 class="group-title" onClick={this.toggleExpand}>
          <i class={`iconfont icon-arrow-down ${this.expand ? 'expand' : ''}`} />
          联系人
        </h4>
        <transition>
          <div class="contacts-list" v-show={this.expand}>
            <contact-item />
          </div>
        </transition>
      </div>
    );
  }
});
