import Main from '@/components/main/main'

const tripSubrouters = [
  { path: '/thirdroutepage', title: '用户', name: 'thirdroute-page', icon: 'edit', belongMenu: 'othermenu', component: () => import('@/pages/login/login.vue') },
  { path: '/thirdroutepage1', title: '订票', name: 'thirdroute-page1', icon: 'edit', belongMenu: 'othermenu', component: () => import('@/pages/login/login.vue') },
  { path: '/thirdroutepage2', title: '订单列表', name: 'thirdroute-page2', icon: 'edit', belongMenu: 'othermenu', component: () => import('@/pages/login/login.vue') }
];
const speciaSubrouters = [
  { path: '/add', title: '用户', name: 'add', icon: 'edit', belongMenu: 'othermenu', component: () => import('@/pages/login/login.vue') },
  { path: '/add1', title: '订票', name: 'add1', icon: 'edit', belongMenu: 'othermenu', component: () => import('@/pages/login/login.vue') },
  { path: '/add2', title: '订单列表', name: 'add2', icon: 'edit', belongMenu: 'othermenu', component: () => import('@/pages/login/login.vue') }
];
const routers = [
  ...tripSubrouters,
  ...speciaSubrouters,
  {
    path: '/',
    name: '_home',
    redirect: '/login',
    component: Main,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home')
      }
    ]
  },
  {
    path: '/component',
    icon: 'ios-pricetag-outline',
    name: 'mainPage',
    component: Main,
    children: [{
      path: 'button',
      name: 'buttonPage',
      icon: 'edit',
      component: () => import('@/pages/trip')
    },
    {
      path: 'filter',
      name: 'filterPage',
      icon: 'edit',
      component: () => import('@/pages/filter')
    },
    {
      path: 'table',
      name: 'tablePage',
      icon: 'edit',
      component: () => import('@/pages/table')
    }
    ]
  },
  {
    path: '/trip',
    icon: 'ios-pricetag-outline',
    name: 'trip',
    component: Main,
    children: [{
      path: 'trip-demo',
      name: 'tripDemo',
      icon: 'edit',
      component: () => import('@/pages/trip')
    }
    ]
  },
  {
    path: '/createpage',
    icon: 'ios-pricetag-outline',
    name: 'createpage',
    component: Main,
    children: [
      {
        path: 'createpage-demo',
        name: 'createpageDemo1',
        icon: 'edit',
        component: () => import('@/pages/demo/create-page')
      },
      {
        path: 'table',
        name: 'tablePage',
        icon: 'edit',
        component: Main,
        subChildren: [
          {
            path: "thirdMenu",
            name: "thirdMenu",
            children: [
              {
                path: "thirdMenu1",
                name: "thirdMenu1",
                component: () => import('@/pages/demo/create-page')
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    icon: 'ios-pricetag-outline',
    name: 'login',
    component: () => import('@/pages/login/login'),
  },
  {
    path: '/backrule',
    icon: '',
    name: 'backrule',
    // title: '三级菜单',
    component: Main,
    children: [
        {
            path: 'backrulefirst',
            title: '',
            name: 'backrule-first',
            icon: '',
            belongMenu: 'othermenu',
            subChildren: tripSubrouters
        },
        {
            path: 'add',
            title: '',
            name: 'add',
            icon: '',
            belongMenu: 'othermenu',
            subChildren: speciaSubrouters
        },
    ]
},
]

export default routers