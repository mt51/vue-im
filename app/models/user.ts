import uuid from 'uuid';
import mysql2 from 'mysql2';
import pool from './index';


interface IUser{
  nickname?: string;
  password?: string;
  friends?: string;
  updatedAt?: Date;
  avatar?: string;
  isDelete?: number;
  groups?: string;
  isAdmin?: number;
}

export function createOne(user: IUser) {
  const id = uuid();
  const { password, nickname, avatar, friends = null, updatedAt = null, isDelete = 0, groups = null, isAdmin = 0, } = user;
  const createdAt = new Date;
  return pool.execute("INSERT INTO users (id, password, nickname, avatar, friends, createdAt, updatedAt, isDelete, groups, isAdmin ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, password, nickname, avatar, friends,createdAt, updatedAt, isDelete, groups, isAdmin ])
}

export function findOne(key: string, data: string) {
  const sql = mysql2.format('SELECT * FROM `users` WHERE ?? = ? limit 1', [key, data])
  return pool.execute(sql);
}