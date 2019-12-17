import pool from './index';

function insert(socket, userId ) {
  const createdTime = new Date().getTime();
  const { id } = socket;
  pool.query('INSERT socket ')
}
