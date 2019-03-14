import Vue from 'vue'
import Router from 'vue-router'
import IndexItem from '../view/index.vue'
import  LoginItem from '../view/Login.vue'
import PushArticle from '../view/PushArticle.vue'
import ManageArticle from '../view/ManageArticle.vue'
import RecycleItem from '../view/recycle.vue'
import UploadData from '../view/UploadData.vue'
import ChangeData from '../view/ChangeData.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexItem',
      component: IndexItem,
      redirect:'/pushArticle',
      children:[
        {
          path:'/pushArticle',
          name:"PushArticle",
          component:PushArticle
        },
        {
          path:'/manageArticle',
          name:"ManageArticle",
          component:ManageArticle
        },
        {
          path:'/recycle',
          name:"RecycleItem",
          component:RecycleItem
        },
        {
          path:'/upload',
          name:"UploadData",
          component:UploadData
        },
        {
          path:'/changeData',
          name:"ChangeData",
          component:ChangeData
        }
      ]
    }
  ]
})
