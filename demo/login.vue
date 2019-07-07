<template>
  <div class="login">
    <el-form label-width="80px" class="login-box">
      <el-form-item class="form-item" label="用户名">
        <el-input v-model="formData.account"></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="密码">
        <el-input v-model="formData.account" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="handleClickLogin">登录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      formData: {
        account: '100001',
        password: '123456'
      }
    }
  },
  methods: {
    handleClickLogin() {
      this.axios.post('/login', this.formData).then(res => {
        const { code, data } = res.data
        if (code === 0) {
          window.localStorage.setItem('token', data.token)
          window.localStorage.setItem('userId', this.formData.account)
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  & .login-box {
    width: 400px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 40px;
  }
}
</style>
