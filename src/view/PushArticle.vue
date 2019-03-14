<template>
    <div>
        <div id="home_title">
            <span>文章标题</span>
            <select name="title" id="home_select" v-model="choose">
                <template v-for="(data,index) in options">
                    <option :value="(data.value)">{{data.name}}</option>
                </template>
            </select>
            <button type="button" @click="modal1 = true" class="btn btn-info btn-lag " id="upload_btn">上传</button>
        </div>
        <div id="home_title2" style="margin-bottom: 15px;">
            <span>文章标题</span>
            <span><input type="text" v-model="title" name="text_title" id="text_title"></span>
        </div>
        <form class="editorForm">
            <textarea name="editor1" id="editor1" rows="10" cols="0">
            </textarea>

        </form>
        <Modal v-model="modal1" title="您确认上传并发布文章吗" @on-ok="ok" @on-cancel="cancel">
            <p>点击确认将上传文章，并发布文章</p>
            <p>点击取消将不会上传文章</p>
        </Modal>

    </div>
</template>

<script>
export default {
  data() {
    return {
      txt: "",
      title: "",
      modal1: false,
      choose: "",
      options: [
        {
          name: "招生简章",
          value: "招生简章"
        },
        {
          name: "校园动态",
          value: "校园动态"
        }
      ]
    };
  },
  mounted() {
    var editor = CKEDITOR.replace("editor1");
    console.log(editor);
    this.txt = editor;
  },
  methods: {
    ok() {
      this.upload();
    },
    cancel() {},
    upload() {
      let txt = this.txt.getData();
      let title = this.title;
      let choose = this.choose;
      var _this = this;
      if (choose && txt && title) {
        //表单提交
        var parms = new URLSearchParams();
        parms.append("type", choose);
        parms.append("title", title);
        parms.append("content", txt);

        this.$http({
          method: "post",
          url: "http://118.126.117.138:8080/smallprogram/addArticle",
          data: parms
        })
          .then(function(msg) {
            console.log(msg);
            //清空工作区
            _this.txt = "";
            _this.title = "";
            _this.choose = "";
            CKEDITOR.instances.editor1.setData("");
            _this.$Notice.success({
              title: "上传成功"
            });
          })
          .catch(function(msg) {
            console.log(msg);
            _this.$Notice.error({
              title: "上传失败"
            });
          });
        // http://118.126.117.138:8080/smallprogram/getInitData
      } else {
        alert("文章类别和文章标题和文章内容不为空");
      }
    }
  }
};
</script>

<style scoped>
.editorForm {
  margin-right: 180px;
  width: 99%;
}

#upload_btn {
  float: right;
  margin-right: 20px;
}
#home_title,
#home_title2 {
  margin-left: 25px;
}
</style>
