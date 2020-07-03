<template>
  <div>
    <div class="menu">
      <div v-show="!isLogin" class="title">
        <span style="margin-right:52px;">登陆</span>
        <hr style="width: 58px; display: block;" />
      </div>
      <!--登陆后 -->
      <div
        v-show="isLogin"
        style="margin-top:35px;margin-left:80px;margin-right:108px;border-radius:50%;"
      >
        <el-dropdown>
          <img
            class="el-dropdown-link"
            :src="imgUrl"
            style="width:85px;height:85px;border-radius:50%;cursor:pointer;"
          />
          <el-dropdown-menu style="width: 308px;height: 220px;background-color: #ffffff;border-radius: 8px;" slot="dropdown">
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
            <el-dropdown-item divided><center><span @click="tuichu()" style="font-size:23px;">退出</span></center></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="title">
        <span @click="showHr(1,'/addgood');">发布商品</span>
        <hr style="width: 119px;" />
      </div>
      <div class="title">
        <span @click="showHr(2,'/allgoods');">查看已发布</span>
        <hr style="width: 147px;" />
      </div>
      <div class="title">
        <span @click="showHr(3,'/order');">全部订单</span>
        <hr style="width: 119px;" />
      </div>

      <div class="search-box">
        <div style="width:56px;height:56px;background:#FFFFFF;text-align:center;">
          <img
            src="../assets/search.png"
            style="width:26px;height:26px;background:#FFFFFF;margin-top:14px;"
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
      sellerMsg: ""
    };
  },
  mounted() {
    let that = this;
    //判断是否为登陆状态并做处理
    if (localStorage.getItem("isLogin") == "true") {
      that.isLogin = true;
      that.getMsg()
    }

    Msg.$on("tome", function() {
      let hrs = document.getElementsByTagName("hr");
      for (let i = 0; i < 3; i++) {
        hrs[i].style.display = "none";
      }
      hrs[2].style.display = "block";
      that.isLogin = true;
      that.getMsg()
    });
  },
  methods: {
    showHr(index,path) {
      if(this.isLogin==false){
        this.$message({
          type:'warning',
          message:"请先登录！"
        })
        return 
      }
      this.$router.push({ path:path})
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
    getMsg(){
      let that=this
      that.sellerMsg = JSON.parse(localStorage.getItem("sellerMsg"));

      let form = new FormData();
      form.append("FileName", "tx.png");
      that.$axios
        .post("/consumer/showEInvoice/", form, {
          responseType: "arraybuffer"
        })
        .then(res => {
          that.imgUrl =
            "data:image/png;base64," +
            btoa(
              new Uint8Array(res.data).reduce(
                (res, byte) => res + String.fromCharCode(byte),
                ""
              )
            );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style type="text/css">
.menu {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: 150px;
  background-color: #224761;
}
.title span {
  height: 35px;
  margin-right: 64px;
  font-family: FZLanTingHei-R-GBK;
  font-size: 30px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 36px;
  letter-spacing: 0px;
  color: #ffffff;
  cursor: pointer;
}
.title {
  margin-top: 54px;
}
.title hr {
  height: 0px;
  border: solid 1px #ffffff;
  display: none;
  margin-top: 18px;
  margin-left: 0px;
}
.search-box {
  width: 489px;
  height: 56px;
  display: flex;
  margin-right: 84px;
  margin-top: 48px;
}
.search-box input {
  border: none;
  width: 323px;
  height: 54px;
  background-color: #ffffff;
  font-family: FZLanTingHei-R-GBK;
  font-size: 25px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 56px;
  letter-spacing: 0px;
  color: black;
}
.search-box input::-moz-placeholder {
  font-family: FZLanTingHei-R-GBK;
  font-size: 25px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 56px;
  letter-spacing: 0px;
  color: #b2b2b2;
}
.btn {
  width: 110px;
  height: 56px;
  background-color: #a2c2d7;
  cursor: pointer;
}
.btn p {
  width: 53px;
  height: 26px;
  font-family: FZLanTingHei-R-GBK;
  font-size: 25px;
  font-weight: normal;
  font-stretch: normal;
  margin-left: 29px;
  margin-top: 10px;
  letter-spacing: 0px;
  color: #ffffff;
}
.pic {
  border: 1px solid red;
  width: 56px;
  height: 56px;
  background: url("/search.png") no-repeat !important;
}
.msg-title{
  font-family: FZLanTingHei-R-GBK;
	font-size: 20px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 27px;
	letter-spacing: 0px;
	color: #979595;
  padding-left: 30px;
}
.msg-sty{
  font-family: FZLanTingHei-B-GBK;
	font-size: 23px;
	font-weight: normal;
	letter-spacing: 0px;
	color: #6d6d6d;
}
</style>
