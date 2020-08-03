import DefaultLayout from '~/layouts/Default.vue'
import 'prismjs/themes/prism-tomorrow.css'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
