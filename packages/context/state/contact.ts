import { provide, inject, ref } from '@vue/composition-api';
import { ContactItem } from '../../types';

interface IContactsContext {
  contact: ContactItem[];
  setContacts: (value: ContactItem[]) => void;
}

const ContactSymbol = Symbol();

export function useContactsProvider() {
  const contacts = ref<ContactItem[]>([]);

  const setContacts = (value: ContactItem[]) => contacts.value = value;

  provide(ContactSymbol, {
    contacts,
    setContacts
  });
}

export function useContactsInject(): IContactsContext {
  const contactsContext = inject<IContactsContext>(ContactSymbol);

  if (!contactsContext) {
    throw new Error(`useContactsInject must be used after useContactsProvider`);
  }
  return contactsContext;
}
