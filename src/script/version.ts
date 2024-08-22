import { isDweb, dwebTarget } from '@plaoc/is-dweb'

enum Environment {
  Production = 'production',
  Test = 'test',
  Development = 'development'
}

const log = (...args: any[]): void => {
  const formattedArgs = args.map((arg: any) => `(${arg})`).join(' ')
  console.log(formattedArgs)
}

class EnvironmentConfig {
  // 当前环境
  private currentEnv: Environment

  // us
  private us: string

  // dweb
  private isDweb: boolean

  // 是否苹果
  private isIos: boolean

  // dweb 大版本号
  private Browser_bigVersion: number = 0

  constructor() {
    const domain = window.location.href.split('/')[2]
    const isTest = domain.indexOf('test') > -1
    // const isLocalTest = domain.indexOf('localhost') > -1 || domain.indexOf('172.30.95.6') > -1

    this.currentEnv = isTest ? Environment.Test : Environment.Production
    this.us = navigator.userAgent
    this.isDweb = isDweb()
    this.isIos = /iPhone|iPad|iPod|iOS/i.test(navigator.userAgent)

    if (this.isDweb) {
      this.Browser_bigVersion = dwebTarget()
    }


    this.logAll()
  }

  isTest(): boolean {
    return this.currentEnv === Environment.Test
  }

  isDwebBrowser(): boolean {
    return this.isDweb
  }

  bigVersion(): number | undefined {
    return this.Browser_bigVersion
  }

  dewebTarget():number {
    return dwebTarget()
  }

  logAll() {
    log('us', this.us)
    log('isTest', this.currentEnv, 'isLocalTest', this.currentEnv)
    log('isIos', this.isIos)
    log('判断是否dweb', this.isDweb)
    log('获取大版本号', this.Browser_bigVersion)
  }
}

// 使用示例
const envConfig = new EnvironmentConfig()

// 导出单例实例
export default envConfig
