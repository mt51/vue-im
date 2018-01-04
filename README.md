# vue-im

> 基于Vue的即时通讯组件

注意： 该组件会将部分聊天记录保存在localStorage，尽量不要将头像转成base64格式，不然会localStorage或溢出

- [demo](https://lzy1043.github.io/vue-im-demo/)

### 安装

```
$ npm install vue-im --save
```

### 引入

- 单文件组件

``` js

    import vueIM from 'vue-im'
    import Vue from 'vue'
    Vue.use(vue-im)
```

- script引用


``` html
<!-- 引入样式 -->
<link rel="stylesheet" type="text/css" href="dist/vue-im.min.css">
<link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">


<!-- 引入组件 -->
<script src="dist/vue-im.min.js"></script>

```



### 使用

#### 数据格式

##### 1. 当前用户

``` json
    
    {
        'username': '会飞的猪',
        'id': '100000',
        'avatar': 'http://ofl49b399.bkt.clouddn.com/1.jpg'
    }

```
##### 2. 联系人数组
``` json
    [
        {
            'username': '会飞的猪',
            'id': '100000',
            'avatar': 'http://ofl49b399.bkt.clouddn.com/1.jpg'
        },
        {
            'username': '奔跑的五花肉',
            'id': '100001',
            'avatar': 'https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg'
        }, 
        ...
    ]
```

##### 3.  聊天记录

``` json

{
    total: 21,  //总条数
    size: 20,  // 每页显示条数
    records: [  // 聊天记录具体能容
      {
        content: '你好',
        'username': '奔跑的五花肉',
        'avatar': 'https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg',
        sender: '100001',
        recver: '100000',
        time: 1513215782417,
        sendername: '奔跑的五花肉',
        recvername: '会飞的猪'
      },
      {
        content: '你好',
        'username': '奔跑的五花肉',
        'avatar': 'https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg',
        sender: '100001',
        recver: '100000',
        time: 1513215782417,
        sendername: '奔跑的五花肉',
        recvername: '会飞的猪'
      }
    ]
}

```

##### 4. 新消息
``` json
    {
      content: '你好呀',  // 消息内容
      avatar: this.lists[0].avatar, // 发送者头像
      sender: this.lists[0].id, // 发送人id
      recver: this.mine.id, // 接收人id，当前登录用户
      time: new Date().getTime(), // 发送时间
      sendername: this.lists[0].username, // 发送人名称
      recvername: this.mine.username // 接收人名称， 当前登录用户
    }

```

### 2. 分页控制

监听 ` on-page-change ` 事件能够获取当前点击的页数，根据页数修改 history.records 会自动触发更新

### 3. 接收到新消息

接收到信息时， 需要调用getMessage 方法，将消息内容传递给组件

``` html
html
    ....

<vue-im ref="vueim"></vue-im>

    ....

```

``` js
    ....
    this.refs.vueim.getMessage({
        content: '你好呀',
        avatar: this.lists[0].avatar,
        sender: this.lists[0].id,
        recver: this.mine.id,
        time: new Date().getTime(),
        sendername: this.lists[0].username,
        recvername: this.mine.username
    })
    ....

```

## API 文档

### props

| 名称      | 类型 | 默认值 | 描述                          |
| --------- | ---  | ------ | ----------------------------- |
| mine        | Object  |       ——      | 初始值，必需          |
| lists     | Array  |     空数组      | 联系人数组 |
| history  | Object |    空对象     | 历史记录数据              |
| mini     | Boolean |    false     | true： 默认聊天框是否最小化    |
| miniicon     | String |    //cn.vuejs.org/images/logo.png     | 设置聊天框最小化时的图标    |
| notice | Boolean |    false     | 是否启用html5 Notification 提醒 |
| brief | Boolean |    false     |  是否使用客服模式  |
| voice | String |    ——     |  新消息声音提醒，需要传入声音文件，使用mp3格式  |
| image-upload | Boolean |    true     |  是否启用图片发送功能  |
| ext | Array |    []     |  配置图片发送支持的格式  |
| url | String |    ——     |  图片上传的后台地址，启用图片发送功能时该项为必填  |
| type | String |    POST     |  图片上传的方式  |



### events

| 名称         |             参数            |  描述                              |
| ---------------- | ----------------------------- | ---------------------------------------- |
| on-chat-change           |  Object  | 聊天框切换时触发该回调， 参数是当前的聊天用户 |
| on-send             |  Object | 发送消息时触发该回调             |
| on-page-change       | Number: page | 切换聊天记录分页是触发             |
| on-view-history       | Object, 当前对话的用户  | 点击查看历史聊天记录时触发             |

### methods
| 名称         | 参数            | 描述                              |
| -------------| --------------- | --------------------------------- |
| getMessage   |  Object         | 接收的的新消息内容                |

## TODOS

* 样式重写，目前是高仿微信来做的，后面试着重构界面风格
* 添加好友，删除好友功能
* 群组功能
* ...

暂时只想到这些，有想法的可以提issues，可以添加

## Dependencies (依赖)

- [moment](https://github.com/moment/moment.git)

## update(更新内容)

- [更新日志](./LOG.md)

## Licence (证书)

## Issues

- [issues](https://github.com/lzy1043/vue-im/issues)

vueIM is open source and released under the MIT Licence.

Copyright (c) 2017 liuziyang

