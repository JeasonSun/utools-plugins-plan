import type { App } from 'vue'
import { Input, Select, Spin, Dropdown } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

export function setupAntd(app: App<Element>) {
  app.use(Input)
  app.use(Select)
  app.use(Spin)
  app.use(Dropdown)
}