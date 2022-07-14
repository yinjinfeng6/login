<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="user">
        <el-input v-model="ruleForm.user" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pw">
        <el-input v-model="ruleForm.pw" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import instance from "../api/index";
export default {
  name: "MyLogin",
  data() {
    let userfn = function (rule, value, callback) {
      let rg = /^[a-z]\w{2,6}\w$/;
      if (rg.test(value)) return;
      return callback(new Error("用户格式错误"));
    };
    let pwfn = function (rule, value, callback) {
      let rg = /^\w{2,6}$/;
      if (rg.test(value)) return;
      return callback(new Error("密码格式错误"));
    };
    return {
      ruleForm: {
        user: "admin",
        pw: 12345,
      },
      rules: {
        user: [{ validator: userfn, trigger: "blur" }],
        pw: [{ validator: pwfn, trigger: "blur" }],
      },
      newdebouncefn: null,
    };
  },
  methods: {
    submitForm() {
      this.newdebouncefn();
    },
    async getlogin() {
      let user = this.ruleForm.user;
      let pw = this.ruleForm.pw;
      let { data } = await instance.post("/login", { user, pw });
    //   console.log(data);

      //   本地存储
      localStorage.setItem("Token", data.data.Token);
      if (data.message == "fail") return this.$message.error("登录失败");
      if (data.message == "success") {
        this.$message({
          type: "success",
          message: "登录成功",
          duration: 1000,
          onClose: () => {
            this.$router.push({ name: "default" });
          },
        });
      }
    },
  },
  created() {
    this.newdebouncefn = this.debouncefn(this.getlogin, 1000);
  },
};
</script>

<style scoped>
.btn {
  width: 100%;
}
</style>