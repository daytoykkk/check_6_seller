<template>
  <div>
    <div style="display:flex;background:#109abf;height:550px;">
      <img src="../assets/bk.jpg" style="width:500px;height:100%;margin-left:80px;" />

      <!--登陆窗口-->
      <div class="login">
        <center>
          <p class="title-p">登陆</p>
        </center>
        <hr />
        <input class="input-box" type="text" placeholder="请输入账号" v-model="number" />
        <input class="input-box" type="password" placeholder="请输入密码" v-model="password" />
        <input
          class="input-box"
          style="width: 50%;"
          type="text"
          placeholder="请输入验证码"
          v-model="code"
        />
        <input
          v-show="show"
          type="button"
          value="获取验证码"
          title="点我获取验证码"
          @click="getCode()"
          class="get-code-btn"
        />
        <button
          v-show="!show"
          disabled
          style="border:none;width:28%;height: 40px;font-size: 0.8em;background-color: #cdcaca;margin-left:15px;color: #ffffff;"
        >{{count}}s后重新发送</button>
        <center>
          <input type="button" value="登陆" @click="login()" title="点我登陆" class="login-btn" />
          <p
            v-show="isError"
            style="margin-top:10px;color:red;border:1px solid red;background:#ffebeb;padding-top:5px;padding-bottom:5px;width:80%"
          >
            <i class="el-icon-warning-outline" style="margin-right:10px"></i>信息有误，请重试
          </p>
          <p
            v-show="isEmpty"
            style="margin-top:-5px;color:red;border:1px solid red;background:#ffebeb;padding-top:5px;padding-bottom:5px;width:80%"
          >
            <i class="el-icon-warning-outline" style="margin-right:10px"></i>信息不能为空，请重试
          </p>
        </center>
      </div>

    </div>

    <!--条款-->
    <div style="height:60px;text-align:center;padding-top:20px;">
      <span
        style="font-family: FZLanTingHei-R-GBK;font-size: 1em;font-weight: normal;font-stretch: normal;line-height: 27px;letter-spacing: 0px;color: #000000;"
      >继续使用此网站，表示您同意我们的</span>
      <span
        style="font-family: FZLanTingHei-R-GBK;font-size: 1em;font-weight: normal;letter-spacing: 0px;color: #a2c2d7;cursor:pointer;"
      >隐私政策</span>
      <button
        style="margin-left:2em;width: 110px;height: 35px;background-color: #a2c2d7;border:none;border-radius: 18px;font-family: FZLanTingHei-R-GBK;font-size: 1em;font-weight: normal;font-stretch: normal;line-height: 27px;letter-spacing: 0px;color: #ffffff;cursor:pointer;"
      >好的</button>
    
    </div>
  </div>
</template>

<script>
import Msg from "../components/Msg";
export default {
  data() {
    return {
      number: "",
      password: "",
      code: "",
      count: 0,
      show: true,
      timer: null,
      isError: false,
      isEmpty: false
    };
  },

  methods: {
    login() {
      let that = this;
      let form = new FormData();

      if (that.number == "" || that.password == "" || that.code == "") {
        that.isEmpty = true;
        return;
      } else {
        that.isEmpty = false;
      }

      form.append("UserLoginName", that.number);
      form.append("UserPassword", that.$md5(that.password));
      form.append("Code", that.code);

      this.$axios.post("/consumer/UserLogin/", form)
        .then(res => {
          if (res.data == "验证码错误" || res.data == "用户名或密码错误") {
            that.isError = true;
          } else {
            that.isError = false;
            let msg = new Object();
            msg = res.data;
            localStorage.setItem("sellerMsg", JSON.stringify(msg));
            localStorage.setItem("isLogin", true);
            Msg.$emit("tome", "1");
            that.$router.push({ path: "/allgoods" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCode() {
      //获取验证码
      let that = this;
      that.count = 60;

      this.$axios
        .get("/consumer/SendEmail/")
        .then(res => {
         if (res.data == "OK") {
            that.show = false;
            that.timer = setInterval(() => {
              if (that.count > 0 && that.count <= 60) {
                that.count--;
              } else {
                that.show = true;
                clearInterval(that.timer);
                that.timer = null;
              }
            }, 1000);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>


<style type="text/css">
.login {
  width: 410px;
  height: 420px;
  margin-left: 280px;
  margin-top: 80px;
  background-color: #ffffff;
}
.title-p {
  font-family: FZLanTingHei-H-GBK;
  font-size: 1.3em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 18px;
  letter-spacing: 0px;
  color: #707070;
  padding-top: 2px;
}
.login hr {
  width: 90%;
  margin-left: 5%;
  height: 0px;
  border: solid 2px #929090;
  opacity: 0.52;
}
.input-box {
  width: 80%;
  height: 40px;
  margin-top: 20px;
  margin-left: 8%;
  padding-left: 1em;
  line-height: 40px;
  background-color: #ffffff;
  border: solid 1px #dadee2;
  font-family: FZLanTingHei-R-GBK;
  font-size: 1em;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: black;
}
.input-box::-moz-placeholder {
  width: 100px;
  height: 22px;
  font-family: FZLanTingHei-R-GBK;
  font-size: 1em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 40px;
  letter-spacing: 0px;
  color: #c4c3c6;
}
.get-code-btn {
  width: 28%;
  height: 40px;
  background-color: #a2c2d7;
  border: 1px solid #a2c2d7;
  margin-left: 2%;
  cursor: pointer;
  font-family: FZLanTingHei-R-GBK;
  font-size: 1em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 23px;
  letter-spacing: 0px;
  color: #ffffff;
}
.login-btn {
  width: 80%;
  height: 40px;
  background-color: #a2c2d7;
  border: 1px solid #a2c2d7;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 18px;
  font-family: FZLanTingHei-B-GBK;
  font-size: 1.2em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 31px;
  letter-spacing: 0px;
  color: #ffffff;
}
</style>

