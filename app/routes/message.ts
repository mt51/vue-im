import { KoaContext } from '../../types/koa';


interface ISendMessageData {
  to: string; // 消息的接收者
  type: string; // 消息的类型
  content: string; // 消息的内容
}

export function sendMessage(ctx: KoaContext<ISendMessageData>) {
  
}
