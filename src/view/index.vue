<template>
    <div>
        <div class="container-fluid">
            <!-- 顶部 -->
            <div id="title">
                <div class="title">
                    <h2>后台文章发布系统</h2>
                </div>
            </div>

            <div id="main">
                <div id="leftTitle">
                    <!-- 左侧导航栏 -->
                    <ul class="leftList" role="tablist" v-if="(!isShow)">
                        <li role="presentation">
                            <a class="tab_a" style="text-decoration: none;" href="#home" aria-controls="home" role="tab" data-toggle="tab">
                                <router-link to="/pushArticle">
                                    <p class="font" id="p1">发布文章</p>

                                </router-link>
                            </a>
                        </li>
                        <li role="presentation">
                            <a class="tab_a" style="text-decoration: none;" href="#profile" aria-controls="profile" role="tab" data-toggle="tab">

                                <router-link to="/manageArticle">
                                    <p class="font" id="p2">管理文章</p>
                                </router-link>
                            </a>
                        </li>
                        <li role="presentation">
                            <a class="tab_a" style="text-decoration: none;" href="#messages" aria-controls="messages" role="tab" data-toggle="tab">
                                <router-link to="/recycle">
                                    <p class="font" id="p3">回收站</p>

                                </router-link>
                            </a>
                        </li>
                        <li role="presentation">
                            <a class="tab_a" style="text-decoration: none;" href="#settings" aria-controls="settings" role="tab" data-toggle="tab">
                                <router-link to="/upload">
                                    <p class="font" id="p4">上传数据</p>
                                </router-link>
                            </a>
                        </li>
                        <li role="presentation">
                            <a class="tab_a" style="text-decoration: none;" href="#settings" aria-controls="settingss" role="tab" data-toggle="tab">
                                <router-link to="/changeData">
                                    <p class="font" id="p5">招生信息更改</p>
                                </router-link>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- 中间内容区域 -->
                <div id="text">
                    <LoginItem v-if="isShow" v-model="isShow"></LoginItem>
                    <router-view v-if="(!isShow)"></router-view>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import LoginItem from "./Login";
export default {
  components: {
    LoginItem
  },
  data() {
    return {
      password: "",
      isShow: true
    };
  },
  mounted() {
    // CKEDITOR.replace("editor", {
    //   height: "300px",
    //   width: "100%",
    //   toolbar: "Full"
    // });
    // var editor = CKEDITOR.instances.editor2;

    if (window.sessionStorage.getItem("loginStatus") == "1") {
      this.isShow = false;
    }
    // this.$router.push({path:'/pushArticle'})
  }
};
</script>

<style scoped>
.container-fluid {
  margin: 0px !important;
  padding: 0px !important;
}
.title h2 {
  line-height: 100px;
  margin-left: 80px;
}
#title {
  position: fixed;
  margin: 0px;
  padding: 0px;
  height: 100px;
  width: 100%;
  color: #ffffff;
  z-index: 10;
  background-color: #333;
}
#leftTitle {
  width: 150px;
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  background-color: #444;
  z-index: 9;
  padding-top: 170px;
  box-sizing: border-box;
  bottom: 0px;
  color: white;
  overflow: hidden;
}

a {
  text-decoration: none;
  line-height: 20px;
}

li{
    list-style: none;
}
#main {
  margin: 0px;
  padding: 0px;
}

#text { 
    padding-top: 110px;
    padding-left:160px; 
  width: 99%;      

}

.font {
  color: white;
}

.font:hover {
  font-size: 20px;
}

li {
  /* padding-top: 100px;
        */
  height: 45px;
  list-style: none;
  text-align: center;
  margin-left: -40px;
}
.router-link-active {
  font-size: 20px;
}
</style>
