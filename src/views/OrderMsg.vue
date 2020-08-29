<template>
  <div style="width:100%; background-color: #f8f8f8;">
    <!--订单状态和订单号-->
    <div class="orderId_state">
      <span class="os_title">订单号：</span>
      <span class="os_content">{{msg.orderId}}</span>
      <span class="os_title" style="margin-left:4em;">订单状态：</span>
      <span class="os_content">{{tagName(msg.orderState)}}</span>
    </div>
    <!--主框-->
    <div class="main">
      <!--买家信息-->
      <div class="main_box">
        <p class="main_title">买家信息</p>
        <div class="content_box">
         <div style="height:50px;display:flex;align-items: center;"> <span class="content_box_title">用户头像：</span>
         <img :src="msg.face" style="width:50px;height:50px;border-radius:50%;"></div>
          <br />
          <span class="content_box_title">用户昵称 :</span>
          <span class="content_box_content">{{msg.name}}</span>
        </div>
      </div>
      <!--订单信息-->
      <div class="main_box">
        <p class="main_title">订单信息</p>
        <div class="content_box">
          <span class="content_box_title">订单日期 :</span>
          <span class="content_box_content">{{msg.time}}</span>
          <br />
          <br />
          <span class="content_box_title">自提时间 :</span>
          <span class="content_box_content">{{msg.orderTime}}</span>
          <br />
          <br />
          <span class="content_box_title">物品数量 :</span>
          <span class="content_box_content">{{totalNumber}}</span>
          <br />
          <br />
          <span class="content_box_title">商品总额 :</span>
          <span class="content_box_content">￥{{totalPrice}}</span>
          <br />
          <br />
          <span class="content_box_title">买家留言 :</span>
          <span class="content_box_content">无</span>
        </div>
      </div>
      <!--商品清单-->
      <div class="goods">
        <p class="main_title">商品清单</p>
        <div class="goods_table">
          <div class="caption">
            <p style="flex:5">商品</p>
            <p style="flex:1">价格</p>
            <p style="flex:1">数量</p>
            <p style="flex:1">小计</p>
          </div>
          <div class="good_item" v-for="(item,index) in goods" :key="index">
            <div class="image_box">
              <img :src="imgUrl+JSON.parse(item.product).productState" style="width:4em;height:4em;">
            </div>
            <p
              class="good_content"
              style="flex:5.5;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"
            >{{JSON.parse(item.product).productName}}</p>
            <p class="good_content" style="flex:1.2">￥{{JSON.parse(item.product).productPrice}}</p>
            <p class="good_content" style="flex:0.9">{{item.number}}</p>
            <p class="good_content" style="flex:0.8">￥{{JSON.parse(item.product).productPrice*item.number}}</p>
          </div>
        </div>
      </div>
      <!--总额-->
      <div class="totalPrice">
        <span class="content_box_title">商品总额：</span>
        <span class="content_box_content">￥{{totalPrice}}</span>
        <br />
        <br />
        <span class="content_box_title">优惠券：</span>
        <span class="content_box_content">-￥0</span>
        <br />
        <br />
        <hr style="border: solid 1px #b2b2b2;" />
        <span class="content_box_content">实际支付：</span>
        <span class="content_box_content" style="color:red;">￥{{totalPrice}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orderId_state {
  width: 85%;
  margin-left: 7%;
  height: 4em;
  display: flex;
  align-items: center;
}
.os_title {
  font-family: FZLanTingHei-R-GBK;
  font-size: 1.1em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 1.1em;
  letter-spacing: 0px;
  color: #929090;
}
.os_content {
  margin-left: 0.5em;
  font-family: FZLanTingHei-R-GBK;
  font-size: 1em;
  font-weight: normal;
  letter-spacing: 0px;
  color: #000000;
}
.main {
  width: 85%;
  margin-left: 7%;
  background-color: #ffffff;
}
.main_box {
  width: 80%;
  margin-left: 10%;
  border: 1px solid #ffffff;
}
.main_title {
  font-family: FZLanTingHei-R-GBK;
  font-size: 1em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 1.2em;
  letter-spacing: 0px;
  color: #000000;
}
.content_box {
  background-color: #f8f8f8;
  padding-left: 1.2em;
  padding-top: 1.3em;
  padding-bottom: 1.2em;
}
.content_box_title {
  font-family: FZLanTingHei-R-GBK;
  font-size: 1em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 1em;
  letter-spacing: 0px;
  color: #929090;
}
.content_box_content {
  margin-left: 0.5em;
  font-family: FZLanTingHei-R-GBK;
  font-size: 1em;
  font-weight: normal;
  letter-spacing: 0px;
  color: #000000;
}
.goods {
  width: 80%;
  margin-left: 10%;
  border: 1px solid #ffffff;
}
.goods_table {
  width: 100%;
  border: solid 1px #b2b2b2;
  border-bottom: none;
}
.caption {
  width: 100%;
  height: 2em;
  border-bottom: solid 1px #b2b2b2;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.cation p {
  font-family: FZLanTingHei-B-GBK;
  font-size: 1em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 1em;
  letter-spacing: 0px;
  color: #929090;
}
.good_item {
  width: 100%;
  height: 6em;
  display: flex;
  border-bottom: solid 1px #b2b2b2;
  align-items: center;
}
.image_box {
  margin-left: 1em;
  width: 4em;
  height: 4em;
  background-image: linear-gradient(90deg);
  border: solid 1px #b2b2b2;
}
.good_content {
  font-family: FZLanTingHei-R-GBK;
  font-size: 1em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 1.1em;
  letter-spacing: 0px;
  color: #000000;
  padding-left: 1em;
}
.totalPrice{
    width: 19%;
    margin-left: 71%;
    margin-top: 3em;
    text-align: center;
    padding-bottom: 5em;
}
</style>

<script>
export default {
  data(){
    return{
      goods:[],
      msg:{},
      totalNumber:0,
      totalPrice:0,
       imgUrl:"https://111.230.173.74:7001/consumer/showEInvoice/?FileName="
    }
  },
  methods:{
    getMsg(){
      let that=this;
      let orderid=localStorage.getItem("orderId")
      let id=localStorage.getItem("id")
      let form=new FormData()
      form.append("OrderId",orderid)
      form.append("Id",id)
      that.$axios.post("https://fzulyt.fun:7008/thread/getOrderProduct/",form)
      .then(res=>{
       that.goods=JSON.parse(res.data.这个订单的货物)
      })
      .catch(error=>{
        console.log(error)
      })

      that.$axios.post("https://fzulyt.fun:7008/thread/getOrder/",form)
      .then(res=>{
        that.totalNumber=res.data.totalNumber
        that.totalPrice=res.data.totalPrice
        that.msg=res.data.这个订单的信息
      })
      .catch(error=>{
        console.log(error)
      })
    },
     tagName(e){
      if (e == "yes") {
        return "交易完成";
      } else if (e == "no") {
        return "正在交易";
      } else if (e == "concel") {
        return "订单取消";
      }
    }
  },
  mounted(){
    this.getMsg()
  }
}
</script>