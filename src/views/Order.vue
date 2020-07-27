<template>
  <div>hhhhh</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.initWebSocket();
  },
  methods: {
    initWebSocket () {
        console.log("hhh")
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
  },
};
</script>