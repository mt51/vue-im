# vue-im

> 基于Vue的即时通讯组件

### Install mavon-editor (安装)

```
$ npm install vue-im --save
```

### Use (如何引入)

`index.js`:
```javascript
    // 全局注册
    // import with ES6
    import Vue from 'vue'
    import VueIM from 'vue-im'
    import 'vue-im/dist/vue-im.css'
    // use
    Vue.use(VueIM)
    new Vue({
        'el': '#app',
        data() {
            return { 
                el: '#app',
                data: {
                  lists: [],
                  mine: {},
                  history: [],
                }
            }
        }
    })
```
`index.html`
```html
<div id="app">
    <vue-im :lists="lists" :mine="mine" :history="history"  @send="handleSend" ></vue-im>
</div>
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
| voice | String |    default.mp3     |  新消息声音提醒  |
| image-upload | Boolean |    true     |  是否启用图片发送功能  |
| ext | Array |    []     |  配置图片发送支持的格式  |
| url | String |    ——     |  图片上传的后台地址，启用图片发送功能时该项为必填  |
| type | String |    POST     |  图片上传的方式  |



### events

| name 方法名         |             参数            |  描述                              |
| ---------------- | ----------------------------- | ---------------------------------------- |
| chat-change           |  Object  | 聊天框切换时触发该回调， 参数是当前的聊天用户 |
| send             |  Object | 发送消息时触发该回调             |
| page-change       | Number: page | 切换聊天记录分页是触发             |


## Dependencies (依赖)

- [moment](https://github.com/moment/moment.git)


## Licence (证书)

vueIM is open source and released under the MIT Licence.

Copyright (c) 2017 liuziyang

