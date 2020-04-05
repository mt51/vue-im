import io from 'socket.io-client';
const socket = io('http://im.liuziyang.top');

socket.on('connect', () => {
  console.log('connect');
});

socket.on('message', (data: any) => {
  console.log(data);
})

export default socket;
