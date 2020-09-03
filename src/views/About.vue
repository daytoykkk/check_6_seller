<template>
  <div class="about">
    <p class="name_p">以下是为您搜索到的关于“{{name}}”的内容</p>
    <div class="all-box">
       <div class="good-box" v-for="(item,index) in list" :key="index">
        <div>
          <img
            :src="imgUrl+item.productState"
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
  </div>
</template>

<style scoped>
.about{
  background-color: #f8f8f8;
  padding-bottom: 30px;
  border: 1px solid #f8f8f8;
}
.name_p{
  margin-left:1%;
  width: 80%;
  font-family: FZLanTingHei-R-GBK;
	font-size: 1em;
	font-weight: normal;
	font-stretch: normal;
	line-height: 1.2em;
	letter-spacing: 0px;
	color: #000000;
}
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
</style>>



<script>
export default {
  data() {
    return {
      name: "",
      list: [],
       imgUrl:"https://fzulyt.fun:7001/consumer/showEInvoice/?FileName="
    };
  },
  mounted() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      let that = this;
      that.name = localStorage.getItem("searchName");
      let form=new FormData()
      form.append("ProductName",that.name)
      this.$axios.post('https://fzulyt.fun:7008/thread/getProduct/',form)
      .then(res=>{
        that.list=res.data.这个名字的货物
      })
    },
     toGoodMsg(name, id) {
      localStorage.setItem("productName", name);
      localStorage.setItem("productId", id);
      this.$router.push({ path: "/goodmsg" });
    }
  }
};
</script>
