<template>
    <div>
        <div role="tabpanel" class="tab-pane active" id="login">
            <!-- 登录按钮 -->

            <div id="u_login">

                <div class="u_login_input">
                    <p>请输入管理员密码</p>
                    <input type="password" v-model="password" @keyup.enter="submit">
                </div>

            </div>

        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      password: ""
    };
  },
  methods: {
    submit() {
      console.log(this.password);
      if (this.password == "admin") {
        this.$emit("input", false);
        // let time = new Data()
        // console.log(time)
        window.sessionStorage.setItem("loginStatus", "1");
      } else {
        alert("密码输入错误");
      }
    }
  }
};
</script>

<style scoped>
#login {
  position: fixed;
  width: 100%;
  height: 100%;
}
#u_login {
  top: 20%;
  left: 26%;
  position: absolute;
  width: 350px;
  height: 200px;
  border-radius: 5px;
  background: #cccccc;
}
.u_login_input {
  position: relative;
  text-align: center;
  top: 26%;
  overflow: hidden;
}
</style>
