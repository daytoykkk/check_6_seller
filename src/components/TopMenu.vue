<template>
  <div>
    <div class="menu">
      <div v-show="!isLogin" class="title">
        <span style="margin-right:52px;">登陆</span>
        <hr style="width: 2.4em; display: block;" />
      </div>
      <!--登陆后 -->
      <div
        v-show="isLogin"
        style="margin-top:0.5em;margin-left:3em;margin-right:5em;border-radius:50%;"
      >
        <el-dropdown>
          <img
            class="el-dropdown-link"
            :src="imgUrl"
            style="width:50px;height:50px;border-radius:50%;cursor:pointer;"
          />
          <el-dropdown-menu
            style="width:15em;height: 12em;background-color: #ffffff;border-radius: 8px;"
            slot="dropdown"
          >
            <el-dropdown-item disabled>
              <span class="msg-title">卖家名称：</span>
              <span class="msg-sty">{{sellerMsg.卖家姓名}}</span>
            </el-dropdown-item>
            <el-dropdown-item disabled>
              <span class="msg-title">店铺名称：</span>
              <span class="msg-sty">{{sellerMsg.卖家商店}}</span>
            </el-dropdown-item>
            <el-dropdown-item disabled>
              <span class="msg-title">卖家电话：</span>
              <span class="msg-sty">{{sellerMsg.卖家电话}}</span>
            </el-dropdown-item>
            <el-dropdown-item disabled>
              <span class="msg-title">卖家地址：</span>
              <span class="msg-sty">{{sellerMsg.卖家地址}}</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <center>
                <span @click="tuichu()" style="font-size:1em;">退出</span>
              </center>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="title">
        <span @click="showHr(1,'/addgood');">发布商品</span>
        <hr style="width:4.8em;" />
      </div>
      <div class="title">
        <span @click="showHr(2,'/allgoods');">查看已发布</span>
        <hr style="width: 6em;" />
      </div>
      <div class="title">
        <span @click="showHr(3,'/order');">全部订单</span>
        <hr style="width: 4.8em;" />
      </div>

      <div class="search-box" v-show="isShow">
        <div style="width:40px;height:40px;background:#FFFFFF;text-align:center;">
          <img
            src="../assets/search.png"
            style="width:26px;height:26px;background:#FFFFFF;margin-top:10px;"
          />
        </div>
        <input type="text" placeholder="请输入订单号" />
        <div class="btn">
          <p>搜索</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Msg from "./Msg";
export default {
  data() {
    return {
      isLogin: false,
      imgUrl: "",
      sellerMsg: "",
      isShow:false
    };
  },
  mounted() {
    let that = this;
    //判断是否为登陆状态并做处理
   
    if (localStorage.getItem("isLogin") == "true") {
      that.isLogin = true;
      that.getMsg();
    }

    Msg.$on("tome", function() {
      that.isLogin=true;
      that.getMsg();
    });
  },
  methods: {
    showHr(index, path) {
      if (this.isLogin == false) {
        this.$message({
          type: "warning",
          message: "请先登录！"
        });
        return;
      }
     if(index==3){
       this.isShow=true
     }else{
       this.isShow=false
     }
      this.$router.push({ path: path });
      let hrs = document.getElementsByTagName("hr");
      for (let i = 0; i < 4; i++) {
        hrs[i].style.display = "none";
      }
      hrs[index].style.display = "block";
    },
    tuichu() {
      localStorage.clear();
      this.$router.push({ path: "/" });
      window.location.reload();
    },
    getMsg() {
      let that = this;
      that.sellerMsg = JSON.parse(localStorage.getItem("sellerMsg"));
     that.imgUrl= "https://fzulyt.fun:7001/consumer/showEInvoice/?FileName=" +"tx.png"
     this.showHr(2,'/allgoods')
    }
  }
};
</script>

<style type="text/css">
.menu {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: 70px;
  background-color: #224761;
}
.title span {
  margin-right: 1.5em;
  font-family: FZLanTingHei-R-GBK;
  font-size: 1.2em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #ffffff;
  cursor: pointer;
}
.title {
  margin-top: 1.3em;
}
.title hr {
  height: 0px;
  border: solid 1px #ffffff;
  display: none;
  margin-top: 10px;
  margin-left: 0px;
}
.search-box {
  width: 280px;
  height: 40px;
  display: flex;
  margin-right: 78px;
  margin-top: 1em;
}
.search-box input {
  border: none;
  width: 210px;
  height: 38px;
  background-color: #ffffff;
  font-family: FZLanTingHei-R-GBK;
  font-size: 1em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 40px;
  letter-spacing: 0px;
  color: black;
}
.search-box input::-moz-placeholder {
  font-family: FZLanTingHei-R-GBK;
  font-size: 0.8em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 40px;
  letter-spacing: 0px;
  color: #b2b2b2;
}
.btn {
  width: 90px;
  height: 40px;
  background-color: #a2c2d7;
  cursor: pointer;
}
.btn p {
  width: 52px;
  height: 26px;
  font-family: FZLanTingHei-R-GBK;
  font-size: 1.1em;
  font-weight: normal;
  font-stretch: normal;
  margin-left: 22px;
  margin-top: 8px;
  letter-spacing: 0px;
  color: #ffffff;
}
.pic {
  border: 1px solid red;
  width: 45px;
  height: 45px;
  background: url("/search.png") no-repeat !important;
}
.msg-title {
  font-family: FZLanTingHei-R-GBK;
  font-size: 1em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 27px;
  letter-spacing: 0px;
  color: #979595;
  padding-left: 30px;
}
.msg-sty {
  font-family: FZLanTingHei-B-GBK;
  font-size: 1.2em;
  font-weight: normal;
  letter-spacing: 0px;
  color: #6d6d6d;
}
</style>
