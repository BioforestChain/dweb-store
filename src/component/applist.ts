import {
  type AppInfo,
  type BaseConfig,
  type ConfigData,
  type ProductSetByType
} from '../type/app.ts'
import versionService from './version.ts'
// import { test_data } from '@/help/data'

class AppList {
  // 获取应用的url地址
  private applistUrl_test: string =
    'https://source.dwebdapp.com/dweb-browser-apps/dweb-apps-test/applist.json'
  private applistUrl_prod: string =
    'https://source.dwebdapp.com/dweb-browser-apps/dweb-apps/applist.json'

  private data: ConfigData | undefined

  private timer: number | undefined

  constructor() {
    // const url = versionService.isTest()
    //  监听页面visibility
    window.addEventListener('visibilitychange', () => {
      console.log('visibile change', document.visibilityState)
      // 监听页面visibility
      if (document.visibilityState === 'hidden' && this.timer) {
        console.log('clear timer')
        // 如果页面隐藏了，则表示唤起成功，这时候需要清除下载定时器
        clearTimeout(this.timer)
      }
    })
  }

  async getApplist() {
    if (this.data === undefined) {
      let url = versionService.isTest() ? this.applistUrl_test : this.applistUrl_prod
      url += `?time=${new Date().getTime()}`
      const [response1] = await Promise.all([
        fetch(url, {
          cache: 'no-cache'
        })
      ])
      const data = (await response1.json()) as ConfigData
      this.data = data
    }
    console.log('接口获取应用信息', this.data)

    const apps_all = this.dataFormat(this.data.base_config, this.data)
    return apps_all
  }

  async getAllProduct() {
    if (this.data === undefined) {
      let url = versionService.isTest() ? this.applistUrl_test : this.applistUrl_prod
      url += `?time=${new Date().getTime()}`
      const [response1] = await Promise.all([
        fetch(url, {
          cache: 'no-cache'
        })
      ])
      const data = (await response1.json()) as ConfigData
      this.data = data
    }
    // this.data = test_data
    console.log('接口获取应用信息', this.data)

    const apps_all = this.formatAppInfo(this.data.base_config, this.data.all_products)
    return apps_all
  }

  /**
   * @param applist 应用列表
   * @param appConfig app配置文件
   * @param isTest  是否测试环境
   * @param isDweb  是否dweb环境
   * @param Browser_bigVersion dweb大版本号
   * @returns
   */
  formatAppInfo = (baseConfg: BaseConfig, allProduct: ProductSetByType[] | undefined) => {
    if (allProduct === undefined) {
      return []
    }
    const isTest = versionService.isTest()
    const isDweb = versionService.isDwebBrowser()
    const Browser_bigVersion = versionService.bigVersion()
    const { base_url, assets_path, app_test_path, app_prod_path } = baseConfg
    const base_url_assent = base_url + assets_path
    const base_url_app = isTest ? base_url + app_test_path : base_url + app_prod_path
    const res: ProductSetByType[] = allProduct.map((item) => {
      return {
        category: item.category,
        name: item.name,
        icon: base_url_assent + item.icon,
        themeColor: item.themeColor,
        applist: item.applist.map((appinfo) => {
          const { name, description, logo, metadata, ...rest } = appinfo
          const appname = metadata && metadata.split('/')[1]

          let version = rest['latest']
          if (isDweb && rest['dwebTarget' + Browser_bigVersion]) {
            version = rest['dwebTarget' + Browser_bigVersion]
          }

          const m =
            metadata && base_url_app + metadata.replace(`/${appname}/`, `/${appname}/${version}/`)
          return {
            name,
            description,
            logo: base_url_assent + logo,
            metadata: m,
            ...rest
          } as AppInfo
        })
      }
    })

    return res
  }

  dataFormat(baseConfg: BaseConfig, data: ConfigData) {
    const isTest = versionService.isTest()
    const isDweb = versionService.isDwebBrowser()
    const Browser_bigVersion = versionService.bigVersion()

    const { base_url, assets_path, app_test_path, app_prod_path } = baseConfg
    const base_url_assent = base_url + assets_path
    const base_url_app = isTest ? base_url + app_test_path : base_url + app_prod_path
    const apps_all = Object.keys(data.applist).map((key) => {
      // eslint-disable-next-line prefer-const
      let { name, description, logo, metadata, ...rest } = data.applist[key]
      const appname = metadata && metadata.split('/')[1]

      let version = rest['latest']
      if (isDweb && rest['dwebTarget' + Browser_bigVersion]) {
        version = rest['dwebTarget' + Browser_bigVersion]
      }

      metadata =
        metadata && base_url_app + metadata.replace(`/${appname}/`, `/${appname}/${version}/`)
      return {
        name,
        description,
        logo: base_url_assent + logo,
        metadata: metadata,
        ...rest
      } as AppInfo
    })

    return apps_all
  }

  /** 跳转官网 */
  jumpWebsite(appInfo: AppInfo) {
    if (!appInfo.website) {
      return
    }

    if (versionService.isDwebBrowser() && versionService.dewebTarget() > 1) {
      const url = 'dweb://openinbrowser?url=' + appInfo.website
      window.open(url)
    } else {
      window.open(appInfo.website, '_blank')
    }
  }

  /** 跳转社区 */
  jumpCommunity(appInfo: AppInfo) {
    if (!appInfo.community) {
      return
    }
    if (versionService.isDwebBrowser() && versionService.dewebTarget() > 1) {
      const url = 'dweb://openinbrowser?url=' + appInfo.community
      window.open(url)
    } else {
      window.open(appInfo.community, '_blank')
    }
  }

  /** 跳转浏览器 */
  jumpBrowser(appInfo: AppInfo) {
    if (!appInfo.tracker) {
      return
    }
    if (versionService.isDwebBrowser() && versionService.dewebTarget() > 1) {
      const url = 'dweb://openinbrowser?url=' + appInfo.tracker
      window.open(url)
    } else {
      window.open(appInfo.tracker, '_blank')
    }
  }

  /** 跳转app */
  jumpApp(appInfo: AppInfo, failCallback: any) {
    // let appUrl = ''
    if (versionService.isDwebBrowser()) {
      // 如果是在dweb中打开，则直接打开应用
      const appUrl = `dweb://install?url=${appInfo.metadata}`
      console.log('跳转app的 url', appUrl)
      window.open(appUrl)
    } else {
      // 如果是在浏览器中打开，直接跳转dewebBrower应用中心页面
      const appUrl = `dweb://openinbrowser?url=${window.location.href}`
      console.log('跳转app的 url', appUrl)
      window.location.href = appUrl
    }

    // 如果是外部浏览器，会拉起下载应用弹窗
    if (versionService.isDwebBrowser() === false) {
      this.timer = setTimeout(() => {
        failCallback && failCallback()
      }, 2000)
    }
  }
}

// 使用示例
const AppListInstance = new AppList()

// 导出单例实例
export default AppListInstance
