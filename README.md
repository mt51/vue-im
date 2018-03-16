# vue-im

> 基于Vue的即时通讯组件

注意： 
1. 该组件会将部分聊天记录保存在localStorage，尽量不要将头像转成base64格式，不然会localStorage或溢出
2. 部分数据使用了layim模拟数据，如有侵权请告知修改

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

``` js
    
    {
        'username': '会飞的猪',
        'id': '100000',
        'avatar': 'http://ofl49b399.bkt.clouddn.com/1.jpg'
    }

```
##### 2. 联系人数组
``` js

若未提供groupname， 会处理为默认的未命名分组中

    [
        {
      "groupname": "我心中的女神",
      "id": 3,
      "list": [{
        "username": "林心如",
        "id": "76543",
        "avatar": "http://tp3.sinaimg.cn/1223762662/180/5741707953/0"
      }, {
        "username": "佟丽娅",
        "id": "4803920",
        "avatar": "http://tp4.sinaimg.cn/1345566427/180/5730976522/0"
      }]
    }
        ...
    ]
```

##### 3. 群组列表

``` js
    [
      {
        'groupname': '前端群',
        'id': '101',
        'avatar': 'http://tp2.sinaimg.cn/2211874245/180/40050524279/0'
      }, {
        'groupname': 'Fly社区官方群',
        'id': '102',
        'avatar': 'http://tp2.sinaimg.cn/5488749285/50/5719808192/1'
      }
    ]
```

4. 群组成员

``` js
[{
    'username': '奔跑的五花肉',
    'id': '100001',
    'avatar': '//ofl49b399.bkt.clouddn.com/2.jpg'
  },
  {
    'username': '刘涛tamia',
    'id': '100001222',
    'avatar': '//tva4.sinaimg.cn/crop.0.1.1125.1125.180/475bb144jw8f9nwebnuhkj20v90vbwh9.jpg'
  },
  {
    'username': '谢楠',
    'id': '10034001',
    'avatar': '//tva2.sinaimg.cn/crop.1.0.747.747.180/633f068fjw8f9h040n951j20ku0kr74t.jpg'
  },
  {
    'username': '马小云',
    'id': '168168',
    'avatar': '//tva1.sinaimg.cn/crop.0.0.180.180.180/7fde8b93jw1e8qgp5bmzyj2050050aa8.jpg'
}]


```


##### 5.  聊天记录

``` js

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

##### 6. 新消息
``` js
    {
      content: '你好呀',  // 消息内容
      avatar: this.lists[0].avatar, // 发送者头像
      sender: this.lists[0].id, // 发送人id
      recver: this.mine.id, // 接收人id，当前登录用户
      time: new Date().getTime(), // 发送时间
      sendername: this.lists[0].username, // 发送人名称
      recvername: this.mine.username // 接收人名称， 当前登录用户
      chatlogType: 'text'  // 消息类型， text为文本，file文件，image图片
    }

```

##### 7.发送文件和图片

发送文件和图片后台接口的返回值格式： 

``` js
    {
        //图片路径
      src: ‘’
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
        recvername: this.mine.username,
        chatlogType: 'text'  // 消息类型， text为文本，file文件，image图片
    })
    ....

```

### 4、查看历史记录和群组成员

提供了相应的事件接口和属性，监听相应的事件，获取数据，再利用属性值传递给组件即可


## API 文档

### props

| 名称      | 类型 | 默认值 | 描述                          |
| --------- | ---  | ------ | ----------------------------- |
| mine        | Object  |       ——      | 初始值，必需          |
| lists     | Array  |     空数组      | 联系人数组，好友数组 |
| history  | Object |    空对象     | 历史记录数据              |
| brief | Boolean |    false     |  是否使用客服模式  |
| voice | String |    ——     |  新消息声音提醒，需要传入声音文件，使用mp3格式  |
| ext | Array |    []     |  配置图片发送支持的格式  |
| action | String |    ——     |  图片上传的后台地址，启用图片发送功能时该项为必需  |
| upload-name | String |    image     |  图片上传的表单的name属性  |
| members-list | Array |    空数组     |  聊天的群组成员列表  |
| groups-list | Array |    空数组     |  聊天的群组列表  |
| chat | Object |    ——     |  客服模式下的会话对象，客服模式下必需  |
| un-read-list | Array |    空数组     |  离线消息，格式同消息  |




### events

| 名称         |             参数            |  描述                              |
| ---------------- | ----------------------------- | ---------------------------------------- |
| on-chat-change           |  Object  | 聊天框切换时触发该回调， 参数是当前的聊天用户 |
| on-send             |  Object | 发送消息时触发该回调             |
| on-page-change       | Number: page | 切换聊天记录分页是触发             |
| on-view-history       | Object, 当前对话的用户  | 点击查看历史聊天记录时触发             |
| on-view-members       | Object, 当前点击的群组对象  | 点击查看群信息和成员时触发             |

### methods
| 名称         | 参数            | 描述                              |
| -------------| --------------- | --------------------------------- |
| getMessage   |  Object         | 接收的的新消息内容                |

## TODOS

* 添加好友，删除好友功能
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

