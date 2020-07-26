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
      var ws = new WebSocket("wss://fuzlyt.fun:7004/websocket/test");
      _this.ws = ws;

      ws.onopen = function (e) {
        console.log("服务器连接成功");
      };
      window.onbeforeunload = function (event) {
        alert("您确定离开该网页吗？");
        console.log("关闭WebSocket连接！");
      };
      ws.onerror = function (e) {
        console.log(e);
      };
      ws.onmessage = function (e) {
        console.log("订单：" + e);
      };
    },
  },
};
</script>