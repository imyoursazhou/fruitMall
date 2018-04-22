import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import AdminIndex from '../components/adminPage/adminIndex'
import GoodsList from '../components/adminPage/goodsList'
import UserList from '../components/adminPage/usersList'
import OrderList from '../components/adminPage/ordersList'
import AdminInfo from '../components/adminPage/adminInfo'
import MessageList from '../components/adminPage/messageList'

Vue.use(Router);

export default new Router({
  linkActiveClass: "active",
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminIndex,
      children:[
        {
          path:'index',
          component:GoodsList
        },
        {
          path:'user_list',
          component:UserList
        },
        {
          path:'order_list',
          component:OrderList
        },
        {
          path:'admin_info',
          component:AdminInfo
        },
        {
          path:'message_list',
          component:MessageList
        }
      ]
    }
  ]
})
