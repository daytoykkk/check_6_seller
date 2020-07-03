<template>
  <div>
    <div style="display:flex;background:#109abf;height:830px;">
      <img src="../assets/bk.jpg" style="width:950px;height:100%;margin-left:150px;" />


      <!--登陆窗口-->
      <div class="login">
        <center>
          <p class="title-p">登陆</p>
        </center>
        <hr />
        <input class="input-box" type="text" placeholder="请输入账号" v-model="number" />
        <input class="input-box" type="text" placeholder="请输入密码" v-model="password" />
        <input
          class="input-box"
          style="width: 248px;"
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
        <button v-show="!show" disabled style="border:none;width: 133px;height: 56px;font-size: 16px;background-color: #cdcaca;margin-left:15px;color: #ffffff;">{{count}}s后重新发送</button>
        <center>
          <input type="button" value="登陆" @click="login()" title="点我登陆" class="login-btn" />
          <p v-show="isError" style="color:red;border:1px solid red;background:#ffebeb;padding-top:5px;padding-bottom:5px;width:80%">
            <i class="el-icon-warning-outline" style="margin-right:10px"></i>信息有误，请重试
          </p>
          <p v-show="isEmpty" style="color:red;border:1px solid red;background:#ffebeb;padding-top:5px;padding-bottom:5px;width:80%">
            <i class="el-icon-warning-outline" style="margin-right:20px"></i>信息不能为空，请重试
          </p>
           
        </center>
      </div>
    </div>


    <!--条款-->
    <div style="height:80px;text-align:center;padding-top:20px;">
      <span
        style="font-family: FZLanTingHei-R-GBK;font-size: 23px;font-weight: normal;font-stretch: normal;line-height: 27px;letter-spacing: 0px;color: #000000;"
      >继续使用此网站，表示您同意我们的</span>
      <span
        style="font-family: FZLanTingHei-R-GBK;font-size: 23px;font-weight: normal;letter-spacing: 0px;color: #a2c2d7;cursor:pointer;"
      > 隐私政策</span>
      <button
        style="margin-left:50px;width: 110px;height: 35px;background-color: #a2c2d7;border:none;border-radius: 18px;font-family: FZLanTingHei-R-GBK;font-size: 23px;font-weight: normal;font-stretch: normal;line-height: 27px;letter-spacing: 0px;color: #ffffff;cursor:pointer;"
      >好的</button>
      
    </div>
  </div>
</template>

<script>
import Msg from '../components/Msg'
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

      this.$axios
        .post("/consumer/UserLogin/", form, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(res => {
           if (res.data == "验证码错误"||res.data=="用户名或密码错误") {
            that.isError = true;
          } else {
            that.isError = false;
            let msg = new Object();
            msg = res.data;
            localStorage.setItem("sellerMsg", JSON.stringify(msg));
            localStorage.setItem("isLogin",true);
            Msg.$emit("tome","1")
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
        .post("/consumer/SendEmail/")
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
  width: 527px;
  height: 635px;
  margin-left: 250px;
  margin-top: 128px;
  background-color: #ffffff;
}
.title-p {
  width: 61px;
  height: 34px;
  font-family: FZLanTingHei-H-GBK;
  font-size: 27px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 34px;
  letter-spacing: 0px;
  color: #707070;
  padding-top: 23px;
}
.login hr {
  width: 395px;
  height: 0px;
  border: solid 2px #929090;
  opacity: 0.52;
}
.input-box {
  width: 395px;
  height: 56px;
  margin-top: 46px;
  margin-left: 54px;
  padding-left: 19px;
  line-height: 23px;
  background-color: #ffffff;
  border: solid 1px #dadee2;
  font-family: FZLanTingHei-R-GBK;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: black;
}
.input-box::-moz-placeholder {
  width: 100px;
  height: 22px;
  font-family: FZLanTingHei-R-GBK;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 56px;
  letter-spacing: 0px;
  color: #c4c3c6;
}
.get-code-btn {
  width: 133px;
  height: 56px;
  background-color: #a2c2d7;
  border: 1px solid #a2c2d7;
  margin-left: 15px;
  cursor: pointer;
  font-family: FZLanTingHei-R-GBK;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 23px;
  letter-spacing: 0px;
  color: #ffffff;
}
.login-btn {
  width: 420px;
  height: 59px;
  background-color: #a2c2d7;
  border: 1px solid #a2c2d7;
  margin-top: 27px;
  cursor: pointer;
  border-radius: 18px;
  font-family: FZLanTingHei-B-GBK;
  font-size: 27px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 31px;
  letter-spacing: 0px;
  color: #ffffff;
}
</style>

