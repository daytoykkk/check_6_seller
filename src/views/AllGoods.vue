<template>
  <div>
    <div class="all-box">
  <div class="good-box" v-for="(item,index) in goods" :key="index">
      
        <div>
          <img :src="imgs[index]" @click="toGoodMsg(item.productName,item.productId)" title="点我查看详情" style="width:200px;height:200px;cursor:pointer;" />
        </div>
        <div style="margin-left:1em;padding-right:1em;">
          <p class="title-p">{{item.productName}}}</p>
          <p class="price-p">￥{{item.productPrice}}</p>
          <span class="number-span">库存：</span><span class="word-span">{{item.productSurplus}}</span><br>
          <span class="number-span">销量：</span><span class="word-span">哈哈哈</span>
        </div>
      </div>
    </div>
    <div class="block" style="float:right;margin-right:3em;font-size:2em;margin-top:1em;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="12"
        background
        layout="total,  prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<style scoped>
.all-box {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 1em;
  background: #f6f6f6;
}
.good-box {
  width: 25%;
  height: 200px;
  margin-left: 2%;
  margin-top: 2em;
  display: flex;
    background: #ffffff;
}
.title-p{
    width: 160px;
    font-family: FZLanTingHei-L-GBK;
	font-size:20px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 25px;
	letter-spacing: 0px;
	color: #000000;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space:nowrap;
}
.price-p{
    font-family: FZLanTingHei-B-GBK;
	font-size: 1.3em;
	font-weight: normal;
	font-stretch: normal;
	line-height: 28px;
	letter-spacing: 0px;
	color: #224761;
}
.number-span{
    font-family: FZLanTingHei-R-GBK;
	font-size: 1em;
	font-weight: normal;
	font-stretch: normal;
	line-height: 26px;
	letter-spacing: 0px;
	color: #b2b2b2;
}
.word-span{
    font-family: FZLanTingHei-R-GBK;
	font-size: 1em;
	font-weight: normal;
	letter-spacing: 0px;
	color: #224761;
}
</style>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      total: 0,
      goods: [],
      imgs: []
    };
  },
  mounted() {
  this.getMsg();
  },
  methods: {
    getMsg() {
      let that = this;
      this.$axios
        .get("/consumer/showAllProduct/")
        .then(res => {
          that.goods = res.data.所有货物;
          that.total = that.goods.length;
          for(let i=0;i<that.total;i++){
              that.getImg(that.goods[i].productId)
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getImg(id) {
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
              continue;
            } else {
              that.getImgUrl(img[i].imageName);
              break;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getImgUrl(name) {
      //获取图片链接
      let that = this;
      let form = new FormData();
      form.append("FileName", name);
      that.$axios
        .post("/consumer/showEInvoice/", form, {
          responseType: "arraybuffer"
        })
        .then(res => {
          that.imgs.push(
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
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    toGoodMsg(name,id){
        localStorage.setItem("productName",name)
        localStorage.setItem("productId",id)
        this.$router.push({path:'/goodmsg'})
    }
  }
};
</script>