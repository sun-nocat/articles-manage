<template>
  <div>
    <RadioGroup v-model="choose" type="button">
      <Radio label="招生简章"></Radio>
      <Radio label="校园动态"></Radio>
    </RadioGroup>
    <Table border :columns="columns" :data="datas"></Table>
    <div class="page">
      <Page :current="currents" :total="totals" @on-change="pagechange" simple />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currents: 1, //当前页数
      totals: 0, //总页数
      choose: "招生简章",
      cancelArticlePri:'http://118.126.117.138:8080/smallprogram/cancelArticlePri',
      getInitDataUrl: "http://118.126.117.138:8080/smallprogram/getInitData",
      updateArticleUrl:
        "http://118.126.117.138:8080/smallprogram/updateArticle",
      updateArticlePriUrl:
        "http://118.126.117.138:8080/smallprogram/updateArticlePri",
      columns: [
        {
          title: "编号",
          key: "id",
          width: 80,
          align:"center",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.id)
            ]);
          }
        },
        {
          title: "文章标题",
          key: "title",
          align:"center",

        },
        {
          title: "发布日期",
          key: "time",
          align:"center",
          
        },
        {
          title: "阅读数",
          key: "number",
          align:"center",
          
        },
        {
          title: "状态",
          key: "status",
          align:"center",
          
          render: (h, params) => {
            if (params.row.status) {
              return h("div", [
                h("Icon", {
                  props: {
                    type: "person"
                  }
                }),
                h("strong", "已发布")
              ]);
            } else {
              return h("div", [
                h("Icon", {
                  props: {
                    type: "person"
                  }
                }),
                h("strong", "未发布")
              ]);
            }
          }
        },
        {
          title: "是否置顶",
          key: "priority",
          width:100,
          align:"center",
          render: (h, params) => {
            if (params.row.priority == "2") {
              return h("div", [
                h("Icon", {
                  props: {
                    type: "md-checkmark-circle",
                    color:'green'
                  }
                }),
                // h("strong", "是")
              ]);
            } else {
              return h("div", [
                h("Icon", {
                  props: {
                    type: "md-checkmark-circle-outline",
                    color:'grenn'
                  }
                }),
                // h("strong", "否")
              ]);
            }
          }
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.row.priority, params.row.id); //提升优先级
                    }
                  }
                },
                "置顶/取消置顶"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.id); //删除
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],

      datas: []
    };
  },
  created() {
    this.getData(this.getInitDataUrl);
  },
  methods: {
    //切换优先级按钮事件
    pagechange(msg) {
      //分页按钮事件

      this.currents = msg;
      this.getData(this.getInitDataUrl);
    },
    show(status, id) {
      console.log(status)
      if (status == "1") {

        this.$Modal.confirm({
          title: "提示",
          content:
            "<p>是否置顶文章</p><p>被置顶的文章将优先被展示</p>",
          onOk: () => {
            var _this = this;
            this.$http
              .get(this.updateArticlePriUrl, {
                params: {
                  id: id
                }
              })
              .then(function(msg) {
                console.log(msg.data.status);
                if (msg.data.status == "200") {
                  _this.$Message.success("操作成功！");
                  _this.getData(_this.getInitDataUrl);
                } else {
                  _this.$Message.error("操作失败！");
                }
              })
              .catch(function(msg) {
                _this.$Message.error("操作失败！");
              });
          },
          onCancel: () => {
            _this.$Message.info("操作失败！");
          }
        });

        /////////////////////////////
      } else{
        console.log('222')
          //取消置顶功能
          this.$Modal.confirm({
          title: "提示",
          content:
            "<p>是否取消文章置顶</p>",
          onOk: () => {
            var _this = this;
            this.$http
              .get(this.cancelArticlePri, {
                params: {
                  id: id
                }
              })
              .then(function(msg) {
                console.log(msg.data.status);
                if (msg.data.status == "200") {
                  _this.$Message.success("操作成功！");
                  _this.getData(_this.getInitDataUrl);
                } else {
                  _this.$Message.error("操作失败！");
                }
              })
              .catch(function(msg) {
                _this.$Message.error("操作失败！");
              });
          },
          onCancel: () => {
            _this.$Message.info("操作失败！");
          }
        });

      }
    },
    remove(id) {
      //删除数据

      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否删除</p><p>被删除的文章将保存在回收站里</p>",
        onOk: () => {
          var _this = this;
          this.$http
            .get(this.updateArticleUrl, {
              params: {
                id: id,
                status: 0
              }
            })
            .then(function(msg) {
              if (msg.data.status == 200) {
                _this.$Message.info("操作成功！");
                _this.getData(_this.getInitDataUrl);
              } else {
                _this.$Message.error("操作失败！");
              }
            })
            .catch(function(msg) {
              _this.$Message.error("操作失败！");
            });
        },
        onCancel: () => {
          _this.$Message.info("取消操作！");
        }
      });
    },


    //page每页显示的个数  url 数据地址
    getData(url) {
      var _this = this;
      let types = this.choose;
      //发送get请求
      this.$http
        .get(url, {
          params: {
            row: 10, //每页显示的个数
            page: _this.currents, //第几页
            type: types
          }
        })
        .then(function(msg) {
          _this.totals = msg.data.data.total; //设置分页的总页数
          _this.datas = msg.data.data.rows;
        })
        .catch(function(msg) {
          alert("数据获取失败！");
        });
    }
  },
  watch: {
    choose() {
      this.getData(this.getInitDataUrl);
    },
    // currents(){
    //   console.log('change')
    //         this.getData(this.getInitDataUrl);
    // },
    deep: true
  }
};
</script>

<style scoped>
.page {
  text-align: center;
  margin-left: -100px;
}
</style>
