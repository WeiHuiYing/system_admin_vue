import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        hideInMenu: true,
        title: '首页',
        notCache: true,
        icon: 'md-home'
      },
      component: () => import('@/view/single-page/home')
    }]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: false,
      hideInMenu: true
    },
    children: [{
      path: 'message_page',
      name: 'message_page',
      meta: {
        icon: 'md-notifications',
        title: '消息中心'
      },
      component: () => import('@/view/single-page/message/index.vue')
    }]
  },
  {

    path: '/baseSet',
    name: 'baseSet',
    meta: {
      icon: 'logo-buffer',
      title: '基础设置'
    },
    component: Main,
    children: [{
        path: 'userManage',
        name: 'userManage',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          notCache: false,
          title: '用户信息'
        },
        component: () => import('@/view/User/List.vue')
      },
      {
        path: 'roleManage',
        name: 'roleManage',
        meta: {
          icon: 'md-trending-up',
          title: '角色信息'
        },
        component: () => import('@/view/Role/List.vue')
      },
      {
        path: 'resourceManage',
        name: 'resourceManage',
        meta: {
          icon: 'ios-infinite',
          title: '资源信息'
        },
        component: () => import('@/view/Resource/List.vue')
      },
      {
        path: 'companyManage',
        name: 'companyManage',
        meta: {
          icon: 'ios-people',
          title: '组织结构'
        },
        component: () => import('@/view/Dept/List.vue')
      },
      {
        path: 'taskManage',
        name: 'taskManage',
        meta: {
          icon: 'ios-people',
          title: '任务管理'
        },
        component: () => import('@/view/taskManage/List.vue')
      }
    ]
  },
  {

    path: '/Analysis',
    name: 'Analysis',
    meta: {
      icon: 'md-grid',
      title: '销售类报表'
    },
    component: Main,
    children: [{
        path: 'salesAnalysis',
        name: 'salesAnalysis',
        meta: {
          title: '销售报表'
        },
        component: () => import('@/view/Analysis/SalesAnalysis/List.vue')
      },
      {
        path: 'SalesTotal',
        name: 'SalesTotal',
        meta: {
          title: '销售汇总报表'
        },
        component: () => import('@/view/Analysis/SalesTotalAnalysis/List.vue')
      },
      {
        path: 'WeavingBlock',
        name: 'WeavingBlock',
        meta: {
          title: '发帘发块分产品尺寸销售占比'
        },
        component: () => import('@/view/Analysis/WeavingBlock/List.vue')
      },
      {
        path: 'HairWeftStyleSale',
        name: 'HairWeftStyleSale',
        meta: {
          title: '发帘发块分款式销售占比报表'
        },
        component: () => import('@/view/Analysis/HairWeftStyleSale/List.vue')
      },
      {
        path: 'GetDensity',
        name: 'GetDensity',
        meta: {
          title: '头套产品销售明细'
        },
        component: () => import('@/view/Analysis/GetDensity/List.vue')
      },
      {
        path: 'OrderRatio',
        name: 'OrderRatio',
        meta: {
          title: '单条订单与多条订单对比'
        },
        component: () => import('@/view/Analysis/OrderRatio/List.vue')
      },
      {
        path: 'ChannelLevelSalesCount',
        name: 'ChannelLevelSalesCount',
        meta: {
          title: '各店铺各等级产品销量汇总'
        },
        component: () => import('@/view/Analysis/ChannelLevelSalesCount/List.vue')
      }

    ]
  },
  {
    path: '/BnsUsBaseInventory',
    name: 'BnsUsBaseInventory',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [{
      path: 'BnsUsBaseInventory_page',
      name: 'BnsUsBaseInventory_page',
      meta: {
        icon: 'md-grid',
        title: '美国仓仓底维护'
      },
      component: () => import('@/view/Analysis/BnsUsBaseInventory/List.vue')
    }]
  },
  {
    path: '/UsTagTypeInventory',
    name: 'UsTagTypeInventory',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [{
      path: 'UsTagTypeInventory_page',
      name: 'UsTagTypeInventory_page',
      meta: {
        icon: 'md-grid',
        title: '美国仓类型报表'
      },
      component: () => import('@/view/Analysis/UsTagTypeInventory/List.vue')
    }]
  },
  {
    path: '/omsAnsList',
    name: 'omsAnsList',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [{
      path: 'omsAnsList_page',
      name: 'omsAnsList_page',
      meta: {
        icon: 'md-grid',
        title: 'Oms入库单'
      },
      component: () => import('@/view/Analysis/OmsAnsList/List.vue')
    }]
  },
  {
    path: '/ECShipBatch',
    name: 'ECShipBatch',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [{
      path: 'ECShipBatch_page',
      name: 'ECShipBatch_page',
      meta: {
        icon: 'md-grid',
        title: '头程出库单'
      },
      component: () => import('@/view/Analysis/ECShipBatch/List.vue')
    }]
  },
]
