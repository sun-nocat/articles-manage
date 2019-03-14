<template>
    <div>
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
      currents: 1,
      totals: 0,
      getNonArticleUrl:
        "http://118.126.117.138:8080/smallprogram/getNonArticle",
      updateArticleUrl:
        "http://118.126.117.138:8080/smallprogram/updateArticle",
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
          title: "文章类型",
          key: "type",
          width: 90,
          align:"center",
          
        },
        {
          title: "文章标题",
          align:"center",
          
          key: "title"
        },
        {
          title: "发布日期",
          align:"center",
          
          key: "time",
          width: 150
        },
        {
          title: "阅读数",
          align:"center",
          
          key: "number"
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
          width: 80,
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
                      this.show(params.row.id); //提升优先级
                    }
                  }
                },
                "恢复"
              )
            ]);
          }
        }
      ],
      allData: [], //获取到的所有的数据
      datas: [] //需要显示的数据
    };
  },
  created() {
    this.getData(this.getNonArticleUrl);
  },

  methods: {
    pagechange(page) {
        console.log('pagechange')
       console.log(page||1);
        let left = ((page ||1) -1 )  //1,2,
        let right = (left+1)*10  // 9
        this.datas = this.allData.slice(left*10 , right)


    },
    show(id) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否恢复文章</p>",
        onOk: () => {
          var _this = this;
          this.$http
            .get(this.updateArticleUrl, {
              params: {
                id: id,
                status: 1
              }
            })
            .then(function(msg) {
              console.log(msg.data.status);
              if (msg.data.status == "200") {
                _this.$Message.success("操作成功！");
                _this.getData( _this.getNonArticleUrl);
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
    },
    getData(url) {
      var _this = this;
      let types = this.choose;
      //发送get请求
      this.$http
        .get(url, {
          params: {}
        })
        .then(function(msg) {
          console.log(msg.data.data);
          _this.allData = msg.data.data;
          console.log(msg.data.data.length)
          _this.totals = msg.data.data.length
          _this.pagechange()
        })
        .catch(function(msg) {
          alert("数据获取失败！");
        });
    }
  }
};
</script>

<style>
</style>
