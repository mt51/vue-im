import assert from 'assert';
import { promisify } from 'util';
import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';
import { findOne, createOne } from '../models/user';
import getRandomAvatar from '../utils';
import config from '../../config/server';
import { KoaContext } from '../../types/koa';


function generateToken(user) {
  return jwt.encode({
    user,
    expires: Date.now() + config.tokenExpiresTime,
  },
  config.jwtSecret,
  );
}

const saltRounds = 10;

interface ISignData {
  nickname: string;
  password: string;
}

// 注册
export async function signIn(ctx: KoaContext<ISignData>) {
  const { nickname, password } = ctx.data;
  assert(nickname, '用户名不能为空');
  assert(password, '密码不能为空');

  const [result] = await findOne('nickname', nickname);
  
  assert(!result.length, '该用户名已存在');

  // @ts-ignore
  const salt = await promisify(bcrypt.genSalt)(saltRounds);
  const hash = await promisify(bcrypt.hash)(password, salt);

  try {
    await createOne({
      nickname: nickname,
      password: hash,
      avatar: getRandomAvatar(),
    });
  } catch(err) {
    throw err;
  }

  const user = result[0];

  const token = generateToken(user._id);

  return {
    _id: user._id,
    avatar: user.avatar,
    nickname: user.username,
    token,
  };

}

// 登录
export async function signUp(ctx: KoaContext<ISignData>) {
  assert(!ctx.socket.user, '你已经登录了')
  const { nickname, password } = ctx.data;
  assert(nickname, '用户名不能为空');
  assert(password, '密码不能为空');

  const [result] = await findOne('nickname', nickname);
  
  assert(result.length, '该用户不存在');

  const user = result[0];

  const isPasswordCorrect = bcrypt.compareSync(password, user.password)

  assert(isPasswordCorrect, '密码错误');

  const token = generateToken(user.id);
  ctx.socket.user = user.id;
  return {
    _id: user._id,
    avatar: user.avatar,
    nickname: user.username,
    token,
  };
}

interface ISignByTokenData {
  token: string;
}
export async function signUpByToken(ctx: KoaContext<ISignByTokenData>) {
  const { token } = ctx.data;
  assert(token, 'token不能为空');

  let payload;

  try {
    payload = jwt.decode(token, config.jwtSecret);
  } catch(err) {
    return '非法token';
  }
  assert(Date.now() < payload.expires, 'token已过期');

  const user = await findOne('id', payload.user);
  assert(user.length, '用户不存在');
  ctx.socket.user = user.id;
}