
export default [
  {
    path: '/',
    name: 'index',
    component: () => import('pages/index')
  }, {
    path: '/download',
    name: 'download',
    component: () => import('pages/download')
  }, { // Always leave this as last one
    path: '*',
    name: 'notFound',
    component: () => import('pages/404')
  }
]
