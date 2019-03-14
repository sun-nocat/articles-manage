<template>
    <div>
        <p></p>
        <div class="center">
            <div class="item left">
                <ul>
                    <li>
                        修改QQ群号码
                    </li>
                    <li>
                        修改电话1
                    </li>
                    <li>
                        修改电话2
                    </li>
                </ul>
            </div>
            <div class="item right">
                <ul>
                    <li>
                        <Input size="small" v-model="qq_data" style="width: 200px" />
                    </li>
                    <li>
                        <Input size="small" v-model="tel_data1" style="width: 200px" />
                    </li>
                    <li>
                        <Input size="small" v-model="tel_data2" style="width: 200px" />
                    </li>
                    <li>
                        <Button v-on:click="submit" style="width:200px;">修改</Button>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      qq_data: "",
      tel_data1: "",
      tel_data2: "",
      qq_url: "http://127.0.0.1/11",
      tel_url1: "http://127.0.0.1/22",
      tel_url2: "http://127.0.0.1/33",
      url_send_qq: "http://127.0.0.1/44",
      url_send_tel1: "http://127.0.0.1/55",
      url_send_tel2: "http://127.0.0.1/66",
      old_qq_data: "",
      old_tel_data1: "",
      old_tel_data2: ""
    };
  },

  created() {
    this.getData(this.qq_url, "qq_data", "old_qq_data", { type: "qq" });
    this.getData(this.tel_url1, "tel_data1", "old_tel_data1", { type: "tel1" });
    this.getData(this.tel_url2, "tel_data2", "old_tel_data2", { type: "tel2" });
  },
  methods: {
    /**
     * url:请求的地址
     * type:请求的类型
     */
    getData(url, type, old_data, params) {
      var _this = this;
      this.$http
        .get(url, {
          params: params
        })
        .then(res => {
          console.log(res);

          // _this[type] = res.data
        })
        .catch(err => {
          _this[type] = "888888888";
          _this[old_data] = "888888888";
        });
    },

    /**
     *  url 发送数据的接口
     *  params  发送请求你的参数
     */

    sendData(url, params, data, old_data) {
      var _this = this;
      if (_this[data] != _this[old_data]) {
        this.$http
          .get(url, {
            params: params
          })
          .then(res => {

            _this[old_data] = _this[data];
          })
          .catch(err => {

            _this[old_data] = _this[data];
          });
      }
    },

    /**
     *
     */

    submit() {
      var _this = this;
      if (_this.qq_data && _this.tel_data1 && _this.tel_data2) {
        _this.sendData(
          _this.url_send_qq,
          {
            type: "qq",
            data: _this.qq_data
          },
          "qq_data",
          "old_qq_data"
        );

        _this.sendData(
          _this.url_send_tel1,
          {
            type: "tel1",
            data: _this.tel_data1
          },
          "tel_data1",
          "old_tel_data1"
        );

        _this.sendData(
          _this.url_send_tel2,
          {
            type: "tel2",
            data: _this.tel_data2
          },
          "tel_data2",
          "old_tel_data2"
        );
      } else {
        alert("提交数据不能为空！");
      }
    }
  },
  watch: {
    qq_data: function() {}
  }
};
</script>

<style scoped>
.center {

  margin:auto;
  margin-top: 100px;
  width: 500px;
  height: 400px;
  /* background-color: aqua */
}
.item {
  float: left;
  /* margin-left: 0px !important; */
  width: 50%;
  height: 100%;
}

.right{
  position: relative; 
   left: -100px;
}
.left ul li {
  /* margin-left: 100px; */
  text-align: left;
  /* height: 100px; */
 
  
  
}
li{
   list-style-type: none;
   height: 30px;
}
</style>
