<template>
  <div>
    <p
      style="margin-top: 32px;margin-left: 10%;font-size: 1.6em;font-family: FZLanTingHei-B-GBK;"
    >添加新商品</p>
    <div class="add-box">
      <!--商品类目-->
      <div class="types area">
        <p class="title-p">选择商品类目：</p>
       <div style="display:flex;flex-wrap:wrap;">
         <div> <input id="rou" type="checkbox" value="肉蛋家禽" v-model="checkList" />
        <label for="rou">肉蛋家禽</label></div>
       <div> <input id="rou" type="checkbox" value="熟食冻品" v-model="checkList" />
        <label for="rou">熟食冻品</label></div>
        <div><input id="rou" type="checkbox" value="水产海鲜" v-model="checkList" />
        <label for="rou">水产海鲜</label></div>
       <div> <input id="rou" type="checkbox" value="方便食品" v-model="checkList" />
        <label for="rou">方便食品</label></div>
        <div><input id="rou" type="checkbox" value="罐头食品" v-model="checkList" />
        <label for="rou">罐头食品</label></div>
        
       <div> <input id="rou" type="checkbox" value="进口食品" v-model="checkList" />
        <label for="rou">进口食品</label></div>
        <div><input id="rou" type="checkbox" value="地方特产" v-model="checkList" />
        <label for="rou">地方特产</label></div>
       <div> <input id="rou" type="checkbox" value="厨房调料" v-model="checkList" />
        <label for="rou">厨房调料</label></div>
       <div> <input id="rou" type="checkbox" value="火锅专区" v-model="checkList" />
        <label for="rou">火锅专区</label></div>
        <div><input id="rou" type="checkbox" value="速冻包点" v-model="checkList" />
        <label for="rou">速冻包点</label></div>
      
        <div><input id="rou" type="checkbox" value="猜你喜欢" v-model="checkList" />
        <label for="rou">猜你喜欢</label></div>
       <div> <input id="rou" type="checkbox" value="本周热门" v-model="checkList" />
        <label for="rou">本周热门</label></div>
       </div>
      </div>

      <!--基本内容-->
      <div class="basic-msg area" style="position:relative">
        <div style="position:absolute;margin-left:30px;margin-top:-2.6em;background:#FFFFFF;width:320px;">
          <p class="title-p">
            基本内容编辑（
            <span style="color:red;">*</span>表示必填）
          </p>
        </div>
        <br /><br><br>
        <el-form
          :model="basicForm"
          ref="basicForm"
          label-width="220px"
          class="demo-ruleForm"
          size="large"
          :rules="rules"
        >
          <el-form-item
            label="商品名称："
            prop="name"
            class="fontItem"
            style="width:70%;margin-left:10%;"
           
          >
            <el-input
              v-model="basicForm.name"
              style="font-size:1em;"
              maxlength="45"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品标语："
            prop="slogan"
            class="fontItem"
            style="width:70%;margin-left:10%;"
            :rules="[ { min: 1, max: 45, message: '最多45字', trigger: 'blur' }]"
          >
            <el-input
              v-model="basicForm.slogan"
              style="font-size:1em;"
              maxlength="45"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item
            label="品牌："
            prop="brand"
            class="fontItem"
            style="width:70%;margin-left:10%;"
            :rules="[{ required: true, message: '请输入品牌名称',  trigger: 'blur'},{ min: 1, max: 10, message: '最多10字', trigger: 'blur' }]"
          >
            <el-input
              v-model="basicForm.brand"
              style="font-size:1em;"
              maxlength="45"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item
            label="*7天无理由退换货"
            class="redItem"
            style="width:70%;margin-left:10%;font-size:25px;"
          >
            <el-switch v-model="basicForm.isSeven"></el-switch>
          </el-form-item>
        </el-form>
      </div>

      <!--商品属性-->
      <div class="basic-msg area" style="position:relative">
        <div style="position:absolute;margin-left:30px;margin-top:-2.6em;background:#FFFFFF;width:120px;">
          <p class="title-p">商品属性</p>
        </div>
        <br><br><br>
        <el-form
          :model="propForm"
          ref="propForm"
          label-width="220px"
          class="demo-ruleForm"
          size="large"
        >
          <el-form-item
            label="商品产地："
            prop="place"
            class="fontItem"
            style="width:70%;margin-left:10%;"
            :rules="[{ min: 1, max: 20, message: '最多20字', trigger: 'blur' }]"
          >
            <el-input
              v-model="propForm.place"
              style="font-size:1em;"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="单位：" prop="unit" class="fontItem" style="width:70%;margin-left:10%;">
            <el-input v-model="propForm.unit" style="font-size:1em;"></el-input>
          </el-form-item>
          <el-form-item
            label="数量："
            prop="number"
            class="fontItem"
            style="width:70%;margin-left:10%;"
            :rules="[{ required: true, message: '请输入数量',  trigger: 'blur'}, { type: 'number', message: '数量必须为数字值',  trigger: 'blur'}]"
          >
            <el-input v-model.number="propForm.number" style="font-size:1em;"></el-input>
          </el-form-item>
          <el-form-item
            label="价格："
            prop="price"
            class="fontItem"
            style="width:70%;margin-left:10%;"
            :rules="[{ required: true, message: '请输入价格',  trigger: 'blur'}, { type: 'number', message: '价格必须为数字值',  trigger: 'blur'}]"
          >
            <el-input v-model.number="propForm.price" style="font-size:1em;"></el-input>
          </el-form-item>
          <el-form-item
            label="净含量："
            prop="weight"
            class="fontItem"
            style="width:70%;margin-left:10%;"
          >
            <el-input v-model="propForm.weight" style="font-size:1em;"></el-input>
          </el-form-item>
          <el-form-item
            label="保质期："
            prop="ddl"
            class="fontItem"
            style="width:70%;margin-left:10%;"
            :rules="[{ required: true, message: '请输入保质期',  trigger: 'blur'}]"
          >
            <el-input v-model="propForm.ddl" style="font-size:1em;"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!--商品描述-->
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <el-form
          :model="propForm"
          ref="propForm"
          label-width="220px"
          class="demo-ruleForm"
          size="large"
        >
          <el-form-item
            prop="content"
            class="fontItem"
            style="width:90%;margin-left:0"
            :rules="[{ required: true, message: '请输入商品描述', trigger: 'blur'},{ min: 1, max:150, message: '最多150字', trigger: 'blur' }]"
          >
            <span style="color:indianred;font-size:1.5em;">*</span>
            <span style="font-size:1.5em;">商品描述：</span>
            <br />
            <el-input
              type="textarea"
              :autosize="{ minRows: 7, maxRows: 7}"
              placeholder="请输入内容"
              v-model="propForm.content"
              style="font-size:1em;"
              maxlength="150"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <br />
      <br />
      <center>
        <button class="up-btn" v-show="!isUpload" @click="newGood()">发布商品</button>
      </center>

      <!--图片管理-->
      <div class="basic-msg area" v-show="isUpload" style="position:relative">
        <div style="position:absolute;margin-left:1.5em;margin-top:-2.6em;background:#FFFFFF;width:150px;">
          <p class="title-p">图片管理</p>
        </div>
        <br />
        <p style="font-size:1.3em;margin-left:10%;">
          <span style="color:indianred;">*</span>商品图片：
          <button class="addPic" @click="addPic()">本地上传</button>
          <input
            id="uploadInput"
            type="file"
            @change="onFileChange"
            multiple
            style="display: none;"
          />
        </p>

        <div
          v-if="images.length >0"
          style="margin-top:2em;display:flex;flex-wrap:wrap;width:90%;margin-left:5%;"
        >
          <div class="img-box" v-for="(image,key) in images" :key="key" style="margin-left:5%;margin-top:1em;">
            <img :src="image" @click="delImage(key)" style="width:120px;" title="点我删除" />
          </div>
        </div>

        <center>
          <div slot="tip" class="tips">
            提示：1.图片尺寸仅支持jpg,jpeg,png,PNG格式
            <br />
            <span style="margin-left:1.2em;">2.图片质量要清晰，不能虚化，最好为白色背景正面图</span>
            <br />
            <span style="color:indianred;margin-left:1.2em;">3.第一张默认为主图，最多传6张图</span>
          </div>
        </center>

        <center>
          <div v-if="images.length >0" style="margin-top:30px;">
            <button class="addPic" @click="removeImage()">移除全部图片</button>
            <button class="addPic" @click="uploadImage()" style="margin-left:20px;">上传图片</button>
          </div>
        </center>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let that=this;
    let validName=(rule,value,callback)=>{
        let form=new FormData();
        form.append("ProductName",value)
        that.$axios.post('/consumer/showProductUniqueness/',form,{
           headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).then(res=>{
          if(res.data.唯一性!="唯一"){
            callback(new Error('该商品已存在'));
          }
        }).catch(error=>{
          console.log(error)
        })
        
    };
    return {
      isUpload: false, //参数时候上传成功
      checkList: [], //被选中的类目
      basicForm: {
        name: "",
        slogan: "",
        brand: "",
        isSeven: true
      },
      rules:{
          name:[
            { required: true, message: '请输入商品名称', trigger: 'blur'}, 
            { min: 1, max: 45, message: '最多45字', trigger: 'blur' }, 
            {validator:validName,message: '该商品已存在',trigger:'blur'}]
      },
      propForm: {
        place: "",
        unit: "",
        number: "",
        price: "",
        weight: "",
        content: " ",
        ddl: ""
      },
      images: [],
      imagesName: [],
      id: "" ,//商品id，用于上传图片
      isFinish:true
    };
    
  },
  methods: {
    addPic() {
      if (this.images.length >= 6) {
        this.$message({
          type: "warning",
          message: "最多只能上传6张图噢！"
        });
        return;
      }
      document.getElementById("uploadInput").click();
      return false;
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files);
    },
    createImage(file) {
      let that = this;
      if (typeof FileReader === "undefined") {
        that.$message({
          type: "warning",
          message: "您的浏览器不支持图片上传，请升级您的浏览器"
        });
        return false;
      }
      let image = new Image();
      let leng = file.length;
      for (let i = 0; i < leng; i++) {
        let reader = new FileReader();
        reader.fileName = file[i].name;
        let type=reader.fileName.substring(reader.fileName.lastIndexOf(".")+1);
        if(type!="jpg"&&type!="PNG"&&type!="png"&&type!="jpeg"){
          that.$message({
            type:"warning",
            message:"图片类型错误！请重新选择！"
          })
          continue;
        }
        reader.readAsDataURL(file[i]);

        reader.onload = function(e) {
          that.images.push(e.target.result);
          that.imagesName.push(e.target.fileName);
        };
      }
    },
    delImage(index) {
      console.log(index);
      this.images.splice(index, 1);
      this.imagesName.splice(index, 1);
    },
    removeImage(e) {
      this.images = [];
      this.imagesName = [];
    },
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(",");
      //注意base64的最后面中括号和引号是不转译的
      var _arr = arr[1].substring(0, arr[1].length - 2);
      var mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(_arr),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime
      });
    },
    base64ToFile(urlData, fileName) {
        let arr = urlData.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bytes = atob(arr[1]); // 解码base64
        let n = bytes.length
        let ia = new Uint8Array(n);
        while (n--) {
            ia[n] = bytes.charCodeAt(n);
        }
        return new File([ia], fileName, { type: mime });
    },
    uploadImage() {
      //上传图片
      let that = this;
      if (that.images.length > 6) {
        that.$message({
          type: "warning",
          message: "最多只能上传6张图噢！"
        });
        return;
      }
      let len = that.images.length;
      for (let i = 0; i < len; i++) {
        let form = new FormData();
        form.append("ProductId", that.id);
        form.append("imageState", i == 0 ? "main" : "second");
        form.append("files",that.base64ToFile(that.images[i]),that.imagesName[i]);

        that.$axios.post('/consumer/UpLoadFile/',form,{
           headers: {'Content-Type': 'multipart/form-data'}
        }).then(res=>{
         if(res.data!="上传完成"){
           that.isFinish=false
         }
        }).catch(error=>{
          console.log(error)
        })
      }

      if(that.isFinish==false){
        that.$message({
          type:"warning",
          message:"上传图片失败，请重试！"
        })
        return;
      }else{
         that.$message({
          type:"success",
          message:"发布商品成功！"
        })
        localStorage.setItem("productName",that.basicForm.name)
        that.$router.push({path:'/goodmsg'})
      }
    },
    newGood() {
      //发布商品
      let that = this;
      let flag=1;
      this.$refs["basicForm"].validate(valid => {
       if(valid==false){
         flag=0;
          that.$message({
             type:'warning',
             message:"请确认信息正确性"
           })
           return false;
       }
      });
      this.$refs["propForm"].validate(valid => {
        if (!valid) {
          flag=0;
           that.$message({
             type:'warning',
             message:"请确认信息正确性"
           })
          return false;
        }
      });

      if(flag==1){
          let form = new FormData();
      form.append("ProductName", that.basicForm.name);
      form.append("ProductSurplus", that.propForm.number);
      form.append("ProductDescription", that.propForm.content);
      form.append("ProductPrice", that.propForm.price);
      form.append("ProductTag", that.checkList.join(";"));
      form.append("ProductBrand", that.basicForm.brand);
      form.append("ProductUnit", that.propForm.unit);
      form.append("ProductLevel",that.basicForm.slogan)
      form.append("ProductChange",that.basicForm.isSeven)
      form.append("ProductPlace",that.propForm.place)
      //form.append("",that.propForm.weight)
      form.append("ProductDdl",that.propForm.ddl)

      that.$axios
        .post("/consumer/addProduct/", form, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(res => {
         if(res.data == undefined){
           that.$message({
             type:'warning',
             message:"发布失败，请重新尝试！"
           })
         }else{
            that.id = res.data.货物参数.productId;
          that.isUpload = true;
          localStorage.setItem("productName", res.data.货物参数.productName);
         }
        })
        .catch(error => {
          console.log(error);
           that.$message({
             type:'warning',
             message:"发布失败，请重新尝试！"
           })
        });
      }
    }
  }
};
</script>

<style scoped>
.title-p {
  width: 100%;
  font-family: FZLanTingHei-R-GBK;
  font-size: 1.5em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 35px;
  letter-spacing: 0px;
  color: #000000;
}
.add-box {
  width: 80%;
  margin-left: 10%;
  padding-bottom: 64px;
  background-color: #ffffff;
  border: 1px solid #ececec;
  border-top: 13px solid #a2c2d7;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
}
.area {
  width: 90%;
  margin-left: 5%;
}
.types {
  margin-top: 43px;
}
.types input {
  width: 1.4em;
  height: 1.4em;
  background-image: linear-gradient(0deg, #cdcaca 0%, #ffffff 100%);
  border-radius: 5px;
  border: solid 1px #707070;
  margin-top: 1em;
}
.types input + label {
  width: 90px;
  height: 26px;
  font-family: FZLanTingHei-R-GBK;
  font-size: 1.2em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 28px;
  letter-spacing: 0px;
  color: #000000;
  padding-right: 170px;
}
.types input + label::before {
  width: 25px;
  height: 21px;
  background-color: #000000;
}
.basic-msg {
  margin-top: 117px;
  border: solid 1px #707070;
  border-radius: 20px;
  padding-bottom: 60px;
}
.up-btn {
  width: 150px;
  height: 50px;
  background-color: #a2c2d7;
  border: none;
  border-radius: 5px;
  font-family: FZLanTingHei-R-GBK;
  font-size: 1.5em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 35px;
  letter-spacing: 0px;
  color: #ffffff;
  cursor: pointer;
}
.addPic {
  background-color: #a2c2d7;
  border: none;
  border-radius: 5px;
  font-family: FZLanTingHei-R-GBK;
  font-size: 1em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 35px;
  letter-spacing: 0px;
  color: #ffffff;
  cursor: pointer;
}
.tips {
  margin-top: 50px;
  font-family: FZLanTingHei-R-GBK;
  font-size: 1.2em;
  font-weight: normal;
  font-stretch: normal;
  line-height: 50px;
  letter-spacing: 0px;
  color: #6d6d6d;
}
.img-box {
  border: solid 2px #a2c2d7;
}
.img-box img {
  cursor: pointer;
}
</style>
<style>
.redItem .el-form-item__label {
  color: indianred;
  font-size: 0.8em;
}
.fontItem .el-form-item__label {
  font-size: 1.2em;
}
.el-textarea .el-textarea__inner {
  resize: none;
}
</style>