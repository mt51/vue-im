/// <reference path="../../types/mysql2.d.ts" />
import mysql2 from 'mysql2';
import { dbConfig } from '../../config/db.config';

// 创建一个默认配置的连接池
const pool = mysql2.createPool(dbConfig);

export default pool.promise();
