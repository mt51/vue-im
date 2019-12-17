import Koa from 'koa';
import IO from  'koa-socket-2';
import * as user from './routes/user';
import route from './middlewares/route';
import './models';


const app = new Koa();

const io = new IO();

io.attach(app);

// @ts-ignore
io.use(route(app.io, app._io, {
  ...user,
}))

// @ts-ignore
app.io.on('connection', async socket =>{
  console.log(`<<<<<< connection ${socket.id}`);
  socket.on('disconnect', async () => {
    console.log('>>>>>>disconnect');
  })
});

app.listen(3000);

export default app;