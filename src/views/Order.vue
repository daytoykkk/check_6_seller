<template>
  <div>
    <div style="width:80%;margin-left:10%;">
      <el-table ref="filterTable" :data="tableData" style="width: 100%">
        <el-table-column prop="time" label="订单日期" sortable width="200" column-key="date"></el-table-column>
        <el-table-column prop="face" label="头像" width="110">
          <template slot-scope="scope">
            <el-badge is-dot class="item" :hidden="scope.row.see=='no'?true:false">
              <img :src="scope.row.face" style="width:50px;height:50px;border-radius:50%;" />
            </el-badge>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户昵称" width="180"></el-table-column>
        <el-table-column prop="orderId" label="订单号"></el-table-column>
        <el-table-column prop="orderTime" label="自提时间" sortable width="200" column-key="date"></el-table-column>
        <el-table-column
          prop="orderState"
          label="订单状态"
          width="100"
          :filters="[{ text: '正在交易', value: '正在交易' }, { text: '交易完成', value: '交易完成' }, { text: '订单取消', value: '订单取消' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="tagType(scope.$index,scope.row.orderState)"
              disable-transitions
            >{{tagName(scope.$index,scope.row.orderState)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="详情">
          <template slot-scope="scope">
            <el-button size="mini" @click="toOrderMsg(scope.$index, scope.row.orderId,scope.row.id)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
* {
  background-color: #f8f8f8;
}
.item{
    margin-top: 10px;
  margin-right: 40px;
}
</style>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    //this.initWebSocket();
    this.getMsg();
  },
  methods: {
    getMsg() {
      let that = this;
      that.$axios
        .post("https://fzulyt.fun:7008/thread/getAllOrder/")
        .then((res) => {
          that.tableData = res.data.所有订单;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    initWebSocket() {
      console.log("hhh");
      let _this = this;
      let ws = new WebSocket("wss://fzulyt.fun:7007/websocket/1/1");
      _this.ws = ws;

      ws.onopen = function (e) {
        console.log("服务器连接成功");
      };
      window.onbeforeunload = function (event) {
        alert("您确定离开该网页吗？");
        console.log("关闭WebSocket连接！");
      };
      ws.onerror = function (e) {
        console.log(e.data);
      };
      ws.onmessage = function (e) {
        console.log("订单：" + eval("(" + e.data + ")"));
      };
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterTag(value, row) {
       if (value == "交易完成") {
        value= "yes";
      } else if (value == "正在交易") {
        value= "no";
      } else if (value== "订单取消") {
        value= "concel";
      }
      return row.orderState === value;
    },
    tagType(index, e) {
      if (e == "yes") {
        return "success";
      } else if (e == "no") {
        return "primary";
      } else if (e == "concel") {
        return "danger";
      }
    },
    tagName(index,e){
      if (e == "yes") {
        return "交易完成";
      } else if (e == "no") {
        return "正在交易";
      } else if (e == "concel") {
        return "订单取消";
      }
    },
    toOrderMsg(index, orderid,id) {
      localStorage.setItem("orderId",orderid)
      localStorage.setItem("id",id.replace('\"',''))
      this.$router.push({path:'/ordermsg'})
    }
  }
};
</script>