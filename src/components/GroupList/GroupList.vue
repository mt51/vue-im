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
      default() {
        return []
      }
    },
    lists: Array
  },
  data() {
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
    handleGroupItemClick(contact) {
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
    makeCloneList() {
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
    handledialogVisible() {
      this.dialogVisible = !this.dialogVisible
    },
    handleCreateNewGroup() {
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
      this.$parent.handleCreateNewGroup({
        members: this.checkedUsers,
        groupname: this.groupname
      })
      this.groupname = ''
      this.checkedUsers = []
      this.dialogVisible = !this.dialogVisible
    },
    filterMethod(query, item) {
      return item.username.indexOf(query) > -1
    }
  },
  computed: {
    cloneList() {
      return this.makeCloneList()
    }
  }
}
</script>
<style>
</style>
