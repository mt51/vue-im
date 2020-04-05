import { Message } from 'element-ui';
import socket from './socket';

export function sending<T>(event: string, data?: T): Promise<any> {
  return new Promise((resolve, reject) => {
    socket.emit(event, data, (res: any) => {
      if(typeof res === 'string') {
        Message({
          message: res,
          type: 'error',
          duration: 3000
        })
        reject(new Error(res));
      }
      resolve(res);
    });
  })
}