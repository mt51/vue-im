import { provide, inject, SetupContext } from '@vue/composition-api';
import { Message, RecordConfig } from '../../types';

const eventSymbol = Symbol('event');
interface EventContext {
  handleSendEvent: (message: Message) => void;
  handleTabChange: (tab: string) => void;
  handleContactExpand: (type: string, isExpand: boolean) => void;
  viewHistoricRecord: (recordConfig: RecordConfig) => void;
}

export function useEventProvider(props: any, context: SetupContext) {
  function handleSendEvent(message: Message) {
    context.emit('send', message);
  }
  function handleTabChange(key: string) {
    context.emit('on-tab-change', key);
  }
  function handleContactExpand(type: string, isExpand: boolean) {
    context.emit('on-contact-expand', type, isExpand);
  }
  function viewHistoricRecord(recordConfig: RecordConfig) {
    context.emit('on-view-history', recordConfig);
  }

  provide(eventSymbol, {
    handleSendEvent,
    handleTabChange,
    handleContactExpand,
    viewHistoricRecord
  });
}

export function useEventInject() {
  const eventContext = inject<EventContext>(eventSymbol);
  if (!eventContext) {
    throw new Error('useEventInject must be used after useEventProvider');
  }

  return eventContext;
}
