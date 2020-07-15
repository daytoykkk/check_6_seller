<template>
  <div>
    <div class="all-box">
      <div class="good-box" v-for="(item,index) in goods" :key="index">
        <div>
          <img
            :src="imgs[index]"
            @click="toGoodMsg(item.productName,item.productId)"
            title="点我查看详情"
            style="width:180px;height:180px;cursor:pointer;"
          />
        </div>
        <div style="margin-left:0.5em;padding-right:0.5em;">
          <p class="title-p">{{item.productName}}}</p>
          <p class="price-p">￥{{item.productPrice}}</p>
          <span class="number-span">库存：</span>
          <span class="word-span">{{item.productSurplus}}</span>
          <br />
          <span class="number-span">销量：</span>
          <span class="word-span">哈哈哈</span>
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
  width: 22%;
  height: 180px;
  margin-left: 2%;
  margin-top: 1.2em;
  display: flex;
  background: #ffffff;
}
.title-p {
  width: 140px;
  font-family: FZLanTingHei-L-GBK;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #000000;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.price-p {
  font-family: FZLanTingHei-B-GBK;
  font-size: 1.2em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 28px;
  letter-spacing: 0px;
  color: #224761;
}
.number-span {
  font-family: FZLanTingHei-R-GBK;
  font-size: 1em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 26px;
  letter-spacing: 0px;
  color: #b2b2b2;
}
.word-span {
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
      allPage: 0,
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
      that.goods = [];
      this.$axios
        .get("/consumer/showAllProduct/")
        .then(res => {
          that.total = res.data.所有货物.length;
          that.allPage = Math.ceil(that.total / 12);
          if (that.total <= 12) {
            for (let i = 0; i < that.total; i++) {
              that.goods.push(res.data.所有货物[i]);
              that.getImg(that.goods[i].productId);
            }
          } else if (that.currentPage != that.allPage) {
            for (let i = that.currentPage * 12-12;i < that.currentPage * 12;i++) {
                that.goods.push(res.data.所有货物[i]);
            }
             for(let j=0;j<12;j++){
               that.getImg(that.goods[j].productId);
            }
          }else{
            for(let i=(that.allPage-1)*12;i<that.total;i++){
                that.goods.push(res.data.所有货物[i]);
            }
            let len=that.goods.length
            for(let j=0;j<len;j++){
               that.getImg(that.goods[j].productId);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getImg(id) {
      //获取图片名字
      let that = this;
      that.imgs = [];
      that.$axios
        .get(
          "/consumer/showProductImage/",
          { params: { ProductId: id } },
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          }
        )
        .then(res => {
          let img = new Object();
          img = res.data.对应货物的图片;
          that.pageNumber = img.length;
          for (let i = 0; i < that.pageNumber; i++) {
            if (img[i].imageState == "second") {
              continue;
            } else {
              that.imgs.push(
                "http://111.230.173.74:7001/consumer/showEInvoice/?FileName=" +
                  img[i].imageName
              );
              break;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getMsg()
    },
    toGoodMsg(name, id) {
      localStorage.setItem("productName", name);
      localStorage.setItem("productId", id);
      this.$router.push({ path: "/goodmsg" });
    }
  }
};
</script>