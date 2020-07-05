<template>
  <div>
    <div class="bg-box">
      <div class="title-box">
        <p class="title-box-p">{{msg.productName}}</p>
        <div
          style="float:right;width:280px;height:60x;text-align:center;border: solid 3px #ffffff;"
        >
          <p
            style="font-family: FZLanTingHei-B-GBK;font-size: 35px;font-weight: normal;font-stretch: normal;line-height: 5px;letter-spacing: 0px;color: #ffffff;"
          >￥{{msg.productPrice}}</p>
        </div>
      </div>
    </div>
    <!--轮播图-->
    <div class="banner">
      <div class="large-img" style="width:550px;height:550px;border:1px solid red;">
        <img src />
      </div>

      <div class="small-box">
        <div
          class="iconleft"
          @click="zuohua()"
          style="font-size:4em;cursor:pointer;margin-right:auto;"
        >
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="li-img">
          <ul :style="{'left':calleft+'px'}">
            <li v-for="(item,index) in imgUrlList" :key="index">
              <img :src="item" style="width:80px;height:80px;border:1px solid red;" />
            </li>
          </ul>
        </div>
        <div
          class="iconright"
          @click="youhua()"
          style="font-size:4em;cursor:pointer;margin-left:auto;"
        >
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>

    <!--详情-->
    <div class="msg-box">
      <label for="number">
        数
        <span style="margin-left:2em;"></span>量：
      </label>
      <input type="text" name="number" id="number" v-model="msg.productSurplus" />
      <button class="modify-btn" @click="modify()">修改数量</button>
      <br />
      <br />
      <br />
      <div style="display:flex">
        <label for="slogan">商品标语：</label>
        <p
          style="margin-top:-5px;font-size: 25px;color: #000000;width:700px;word-wrap:break-word;word-break:break-all;overflow: hidden;"
        >{{msg.ProductLevel}}</p>
      </div>
      <div class="basic-box">
        <label for>
          品
          <span style="margin-left:2em;"></span>牌：
        </label>
        <span class="msg-p">{{msg.productBrand}}</span>
        <br />
        <br />
        <label for>商品产地：</label>
        <span class="msg-p">{{msg.ProductPlace}}</span>
        <br />
        <br />
        <label for>
          单
          <span style="margin-left:2em;"></span>位：
        </label>
        <span class="msg-p">{{msg.productUnit}}</span>
        <br />
        <br />
        <label for>
          保
          <span style="margin-left:0.3em"></span>质
          <span style="margin-left:0.3em"></span>期：
        </label>
        <span class="msg-p">{{msg.ProductDdl}}</span>
        <br />
        <br />
        <label for>
          净
          <span style="margin-left:0.3em"></span>含
          <span style="margin-left:0.3em"></span>量：
        </label>
        <span class="msg-p">哈哈哈</span>
        <br />
        <br />
        <label for>7天无理由退换货：</label>
        <span class="msg-p">{{msg.ProductChange=="true"?"支持":"不支持"}}</span>
        <br />
        <br />
        <div style="display:flex">
          <label for="content">商品描述：</label>
          <p
            style="margin-top:-5px;font-size: 25px;color: #000000;width:700px;word-wrap:break-word;word-break:break-all;overflow: hidden;"
          >{{msg.productDescription}}</p>
        </div>
        <br />
        <br />
      </div>
      <button class="delete-btn" @click="dialogVisible = true">删除商品</button>
      <button class="back-btn" @click="back()">返回全部商品页</button>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>确定要删除该商品吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteGood();dialogVisible = false;">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped>
.bg-box {
  height: 353px;
  background-color: #109abf;
}
.title-box {
  width: 800px;
  float: right;
  margin-right: 20%;
  margin-top: 70px;
}
.title-box-p {
  font-family: FZLanTingHei-R-GBK;
  font-size: 40px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 51px;
  letter-spacing: 0px;
  color: #ffffff;
  width: 900px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.banner {
  border: 1px solid red;
  width: 550px;
  height: 728px;
  margin-top: -200px;
  margin-left: 12%;
}
.msg-box {
  float: right;
  width: 54%;
  margin-top: -500px;
  margin-right: 5%;
}
.msg-box label {
  width: 110px;
  height: 22px;
  font-family: FZLanTingHei-R-GBK;
  font-size: 22px;
  font-weight: normal;
  line-height: 22px;
  color: #b2b2b2;
}
#number {
  width: 145px;
  height: 43px;
  border-radius: 5px;
  border: solid 1px #cdcaca;
  font-family: FZLanTingHei-R-GBK;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 23px;
  letter-spacing: 0px;
  color: #6d6d6d;
}
.modify-btn {
  margin-left: 2em;
  width: 113px;
  height: 29px;
  background-color: #a2c2d7;
  border-radius: 5px;
  border: solid 1px #a2c2d7;
  font-family: FZLanTingHei-R-GBK;
  font-size: 17px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #ffffff;
  cursor: pointer;
}
.msg-p {
  font-family: FZLanTingHei-R-GBK;
  font-size: 25px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 50px;
  letter-spacing: 0px;
  color: #000000;
}
.basic-box {
  margin-top: 1em;
  padding-left: 2em;
  padding-top: 1em;
  background-color: #f8f8f8;
  border-radius: 5px;
  border: solid 1px #f8f8f8;
}
.back-btn {
  float: right;
  margin-top: 60px;
  margin-right: 3em;
  width: 206px;
  height: 55px;
  background-color: #a2c2d7;
  border-radius: 5px;
  border: none;
  border: solid 1px #a2c2d7;
  font-family: FZLanTingHei-R-GBK;
  font-size: 25px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 50px;
  letter-spacing: 0px;
  color: #ffffff;
}
.delete-btn {
  float: right;
  margin-top: 60px;
  width: 206px;
  height: 55px;
  background-color: #224761;
  border: none;
  border-radius: 5px;
  font-family: FZLanTingHei-R-GBK;
  font-size: 25px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 50px;
  letter-spacing: 0px;
  color: #ffffff;
}
.small-box {
  border: 1px solid red;
  display: flex;
  margin-top: 2em;
  width: 100%;
}
.li-img {
  border: 1px solid palevioletred;
  width: 520px;
  height: 80px;
  margin-left: -10px;

  overflow: hidden;
}
.small-box li {
  width: 80px;
  margin-right: 10px;
  margin-top: -15px;
  float: left;
  list-style-type: none;
}
</style>

<script>
export default {
  data() {
    return {
      msg: "",
      imgNameList: [], //图片名数组
      imgUrlList: [], //图片数组
      largeImgUrl: "",
      id: "",
      calleft: 0,
      pageNumber: 0, //图片个数
      dialogVisible: false
    };
  },
  mounted() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      let that = this;
      let name = localStorage.getItem("productName");
      let form = new FormData();
      form.append("ProductName", name);
      that.$axios
        .post("/consumer/showOneProduct/", form, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(res => {
          that.msg = res.data.这个货物;
          that.id = that.msg.productId;
          that.getImgName(that.id);
        })
        .catch(error => {
          console.log(error);
        });
    },
    zuohua() {
      this.calleft -= 100;
      if (this.calleft < -this.pageNumber * 100) {
        this.calleft = 0;
      }
    },
    youhua() {
      this.callleft += 100;
      if (this.calleft > 0) {
        this.calleft = this.pageNumber * 100 - 100;
      }
    },
    getImgName(id) {
      //获取图片名字
      let that = this;
      let form = new FormData();
      form.append("ProductId", id);
      that.$axios
        .post("/consumer/showProductImage/", form, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(res => {
          let img = new Object();
          img = res.data.对应货物的图片;
          that.pageNumber = img.length;
          for (let i = 0; i < that.pageNumber; i++) {
            if (img[i].imageState == "second") {
              that.imgNameList.push(img[i].imageName);
            } else {
              that.imgNameList.unshift(img[i].imageName);
            }
          }
          that.getImgUrl();
        })
        .catch(error => {
          console.log(error);
        });
    },
    getImgUrl() {
      //获取图片链接
      let that = this;

      for (let i = 0; i < that.pageNumber; i++) {
        let form = new FormData();
        form.append("FileName", that.imgNameList[i]);
        that.$axios
          .post("/consumer/showEInvoice/", form, {
            responseType: "arraybuffer"
          })
          .then(res => {
            that.imgUrlList.push(
              "data:image/png;base64," +
                btoa(
                  new Uint8Array(res.data).reduce(
                    (res, byte) => res + String.fromCharCode(byte),
                    ""
                  )
                )
            );
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    back() {
      this.$router.push({ path: "/allgoods" });
    },
    deleteGood() {
      let that = this;
      let form = new FormData();
      form.append("ProductId", that.id);
      this.$axios
        .post("/consumer/soldoutProduct/", form, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(res => {
          if (res.data == "下架完成") {
            that.$message({
              type: "success",
              message: "删除成功！"
            });
            this.$router.push({ path: "/allgoods" });
          } else {
            that.$message({
              type: "warning",
              message: "删除失败，请重试！"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    modify() {
      let that = this;
      let form = new FormData();
      form.append("ProductId", that.id);
      form.append("ProductSurplus", that.msg.productSurplus);

      this.$axios
        .post("/consumer/IncreaseProduct/", form, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(res => {
          that.$message({
            type: "success",
            message: "修改数量成功！"
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>