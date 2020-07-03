<template>
    <div>
        <div class="bg-box">
            <div class="title-box">
                <p class="title-box-p">hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
                <div style="float:right;width:280px;height:60x;text-align:center;border: solid 3px #ffffff;">
                    <p style="font-family: FZLanTingHei-B-GBK;font-size: 35px;font-weight: normal;font-stretch: normal;line-height: 5px;letter-spacing: 0px;color: #ffffff;">
                        ￥666</p>
                </div>
            </div>
        </div>
        <!--轮播图-->
        <div class="banner"></div>

        <!--详情-->
        <div class="msg-box">
            <label for="number">数<span style="margin-left:2em;"></span>量：</label>
            <input type="text" name="number" id="number" value="666"> <button class="modify-btn">修改数量</button>
            <br><br><br>
           <div style="display:flex">
                 <label for="slogan">商品标语：</label>
                <p style="margin-top:-5px;font-size: 25px;color: #000000;width:700px;word-wrap:break-word;word-break:break-all;overflow: hidden;">
                    hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
           </div>
           <div class="basic-box">
               <label for="">品<span style="margin-left:2em;"></span>牌：</label>
               <span class="msg-p">哈哈哈</span>
               <br><br>
                <label for="">商品产地：</label>
               <span class="msg-p">哈哈哈</span>
               <br><br>
                <label for="">单<span style="margin-left:2em;"></span>位：</label>
               <span class="msg-p">哈哈哈</span>
               <br><br>
                <label for="">保<span style="margin-left:0.3em"></span>质<span style="margin-left:0.3em"></span>期：</label>
               <span class="msg-p">哈哈哈</span>
               <br><br>
                <label for="">7天无理由退换货：</label>
               <span class="msg-p">哈哈哈</span>
               <br><br>
           </div>
        </div>
    </div>
</template>

<style scoped>
.bg-box{
    height: 353px;
	background-color: #109abf;
}
.title-box{
    width:800px;
    float: right;
    margin-right: 20%;
    margin-top: 120px;
}
.title-box-p{
    font-family: FZLanTingHei-R-GBK;
	font-size: 45px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 51px;
	letter-spacing: 0px;
	color: #ffffff; 
    width:700px;
    text-overflow:ellipsis; 
    overflow:hidden;
}
.banner{
    border: 1px solid red;
    width: 550px;
    height: 728px;
    margin-top: -200px;
    margin-left: 12%;
}
.msg-box{
    float: right;
    width: 54%;
    margin-top: -500px;
    margin-right: 5%;
}
.msg-box label{
    width: 110px;
    height: 22px;
    font-family: FZLanTingHei-R-GBK;
	font-size: 22px;
	font-weight: normal;
    line-height:22px;
	color: #b2b2b2;
}
#number{
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
.modify-btn{
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
}
.msg-p{
    font-family: FZLanTingHei-R-GBK;
	font-size: 25px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 50px;
	letter-spacing: 0px;
	color: #000000;
}
.basic-box{
    margin-top: 1em;
	background-color: #f8f8f8;
	border-radius: 5px;
	border: solid 1px #f8f8f8;
}
</style>

<script>
export default {
    data(){
        return{
            msg:""
        }
    },
    mounted(){
        this.getMsg()
    },
    methods:{
        getMsg(){
            let that=this;
            let name=localStorage.getItem("productName")
            let form =new FormData()
            form.append("ProductName",name)
            that.$axios.post("/consumer/showOneProduct/",form)
            .then(res=>{
                console.log(res.data)
            })
            .catch(error=>{
                console.log(error)
            })
        }
    }
}
</script>