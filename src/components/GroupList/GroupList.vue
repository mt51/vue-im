<template>
  <div class="gg-list-container">
    <ul class='gg-list'>
      <li class="gg-empty" v-if="groupsList.length === 0">暂无群组信息</li>
      <li class='gg-item' v-for='(group, gindex) in groupsList' :key='gindex' @click="handleGroupItemClick(group)" v-else>
        <img class='gg-avatar' :src='group.avatar'>
        <span class='gg-name'>{{group.groupname}}</span>
      </li>
    </ul>
    <div class="gg-add-new" @click="handledialogVisible">+</div>
    <el-dialog width="650px" :visible.sync="dialogVisible" title="创建群组">
      <div class="">
        <label class="label">请输入群组名称</label>
        <el-input v-model="groupname"></el-input>
      </div>
      <el-transfer v-model="checkedUsers" :titles="titles" :data="cloneList"  filterable :filter-method="filterMethod" filter-placeholder="请输入用户名"></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="handleCreateNewGroup">确认</el-button>
        <el-button size="small" type="info" @click="handledialogVisible">取消</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
  export default {
    name: 'UserList',
    props: {
      groupsList: {
        type: Array,
        default () {
          return []
        }
      },
      lists: Array
    },
    data () {
      return {
        dialogVisible: false,
        checkedUsers: [],
        isIndeterminate: true,
        groupname: '',
        titles: ['用户列表', '群组成员'],
        clickCount: 0
      }
    },
    methods: {
      handleGroupItemClick (contact) {
        contact.type = 'group'
        contact.username = contact.groupname
        this.clickCount++
        setTimeout(() => {
          if (this.clickCount >= 2) {
            this.$parent.handleOpenChatBox(contact)
          } else {
            this.$parent.handleCurrentConcatChange(contact)
          }
          this.clickCount = 0
        }, 200)
      },
      makeCloneList () {
        const tempData = []
        this.lists.forEach(item => {
          if (item.groupname && item.list) {
            const list = item.list
            list.forEach(gitem => {
              gitem.key = gitem.id
              gitem.label = gitem.username
              tempData.push(gitem)
            })
          } else {
            item.key = item.id
            item.label = item.username
            tempData.push(item)
          }
        })
        return tempData
      },
      handledialogVisible () {
        this.dialogVisible = !this.dialogVisible
      },
      handleCreateNewGroup () {
        if (!this.groupname) {
          this.$message({
            type: 'warning',
            message: '请输入群组名称'
          })
          return
        }
        if (this.checkedUsers.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择群组成员'
          })
          return
        }
        this.$parent.handleCreateNewGroup({members: this.checkedUsers, groupname: this.groupname})
        this.groupname = ''
        this.checkedUsers = []
        this.dialogVisible = !this.dialogVisible
      },
      filterMethod (query, item) {
        return item.username.indexOf(query) > -1
      }
    },
    computed: {
      cloneList () {
        return this.makeCloneList()
      }
    }
  }
</script>
<style lang='scss' scoped>
  .gg-list-container {
    position: relative;
    width: 100%;
    height: 100%;
    .gg-avatar {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .label {
      display: inline-block;
      height: 40px;
    }
    .el-input {
      width: 460px;
      margin: 0 0 20px 20px;
    }
    .el-dialog__body {
      padding-top: 10px;
    }
  }
  .gg-add-new {
    position: absolute;
    bottom: 60px;
    right: 20px;
    width: 40px;
    height: 40px;
    line-height: 36px;
    font-size: 32px;
    font-weight: 600;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  .gg-list {
    width: 100%;
    margin-top: 10px;
    height: 98%;
    overflow: auto;
    font-size: 14px;
    .gg-item {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      cursor: pointer;
    }
    .gg-empty{
      text-align: center;
      color: #ccc;
      padding-top: 30px;
    }
  }
  .gg-user-list {
    display: flex;
    flex-wrap: wrap;
  }
  .gg-user-item {
    width: 25%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
</style>
