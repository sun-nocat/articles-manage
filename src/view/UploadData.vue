<template>
    <div>
        <p class="tip">*请按照规定格式上传文件</p>
        <div class="mian">
            <div class="item item1" type="file">
                <input type="file" class="ins 1" @change="upload1('0')">
            </div>
            <div class="item item2" type="file">
                <input type="file" class="ins 2" @change="upload1('1')">
            </div>
            <div class="item item3" type="file">
                <input type="file" class="ins 3" @change="upload1('2')">
            </div>
        </div>
        <div class="msg">
          <span class="spanItem">招生计划</span>
          <span class="spanItem">学生信息</span>
          <span class="spanItem">历年数据</span>
        </div>
    </div>
</template>



<script>
export default {
  data() {
    return {
      url:[ //上传的接口数组
        'http://118.126.117.138:8080/smallprogram/addPlanInfor',
        'http://118.126.117.138:8080/smallprogram/addStudentInfor',
        'http://118.126.117.138:8080/smallprogram/addDataInfor'
      ]
      
    };
  },
  mounted() {},
  methods: {
    //上传文件函数
    upload1(id) {
      console.log(id)
      console.log(document.getElementsByClassName('ins'))
      // console.log(document.getElementsByClassName('ins')[id])

      let inputDOM = document.getElementsByClassName('ins')[id].files[0];
      console.log('上传的文件是') //获取用户上传的文件
      console.log(inputDOM)

      if (inputDOM != undefined) {
        //如果用户选择文件
        // this.file = inputDOM; //获取文件对象,将文件保存在data中
        var exts = inputDOM.name.split(".");
        let ext = exts[exts.length - 1].toLowerCase();
        if (!(ext == "xlsx" || ext == "xls")) {
          console.log("文件格式不正确");
          alert('文件格式不正确')
          document.getElementsByClassName('ins')[id].value = null  //重置

        } else {
          console.log("文件格式正确" + ext);
          this.show(this.url[id],inputDOM,id);
        }
      }
    },
    show(url,inputDOM,id) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否上传</p>",
        onOk: () => {
          var _this = this;

          var formdata = new FormData(); //声明一个formData对象
          formdata.append('file', inputDOM);
          console.log(formdata)

          _this.$http({
            method: "post",
            headers:{
              'Content-Type':'multipart/form-data'
            },
            url: url,
            data: formdata
          })
            .then(function(msg) {
              console.log(msg.data.status);
              if (msg.data.status == "200") {
                _this.$Message.success("操作成功！");
                document.getElementsByClassName('ins')[id].value = null  //重置

              } else {
                _this.$Message.error("操作失败1！");
                document.getElementsByClassName('ins')[id].value = null  //重置
                
              }
            })
            .catch(function(msg) {
              _this.$Message.error("操作失败2！");
              document.getElementsByClassName('ins')[id].value = null  //重置
              
            });
        },
        onCancel: () => {
          console.log('dianji1')
          this.$Message.info("操作失败3！");
          document.getElementsByClassName('ins')[id].value = null  //重置
          
        }
      });
    }
  }
};
// 亮色对眼睛更好

</script>

<style scoped>
.tip {
  font-size: 18px;
}
.mian {
  width: 100%;
  height: 200px;
  position: relative;
  top: 150px;
  left: 200px;
  overflow: hidden;
}
.item {
  float: left;
  width: 200px;
  height: 200px;
  margin-left: 100px;
  background: url("../assets/logo.jpg");
}
.item1 {
  background-color: #188;
}
.item2 {
  background-color: #db9;
}
.item3 {
  background-color: #17f;
}
.ins {
  overflow: hidden;
  height: 190px;
  cursor: pointer;
  opacity: 0;
}
.msg{
  position: relative;
  top:180px;
  height: 20px;
  overflow: hidden;
  margin-left: 270px;
}
.spanItem{
  width: 200px;
  margin-left: 100px;
  float: left;
}
</style>
