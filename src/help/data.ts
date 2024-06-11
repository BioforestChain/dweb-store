import { type AppInfo, type ConfigData, type BaseConfig } from '../type/app'

export const dataFormat = (
  data: ConfigData,
  isTest: boolean,
  isDweb: boolean = false,
  Browser_bigVersion: any = 0
) => {
  const base_config = data.base_config
  const base_url_assent = base_config.base_url + base_config.assets_path
  const base_url_app = isTest
    ? base_config.base_url + base_config.app_test_path
    : base_config.base_url + base_config.app_prod_path
  const apps_all = Object.keys(data.applist).map((key) => {
    // eslint-disable-next-line prefer-const
    let { name, description, logo, metadata, ...rest } = data.applist[key]
    const appname = metadata && metadata.split('/')[1]

    let version = rest['latest']
    if (isDweb && rest['dwebTarget' + Browser_bigVersion]) {
      version = rest['dwebTarget' + Browser_bigVersion]
    }

    metadata = metadata && metadata.replace(`/${appname}/`, `/${appname}/${version}/`)
    return {
      name,
      description,
      logo: base_url_assent + logo,
      metadata: base_url_app + metadata,
      ...rest
    } as AppInfo
  })

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
export const formatAppInfo = (
  applist: AppInfo[],
  baseConfg: BaseConfig,
  isTest: boolean,
  isDweb: boolean = false,
  Browser_bigVersion: any = 0
) => {
  const { base_url, assets_path, app_test_path, app_prod_path } = baseConfg
  const base_url_assent = base_url + assets_path
  const base_url_app = isTest ? base_url + app_test_path : base_url + app_prod_path
  const apps_all = applist.map((item) => {
    // eslint-disable-next-line prefer-const
    let { name, description, logo, metadata, ...rest } = item
    const appname = metadata && metadata.split('/')[1]

    let version = rest['latest']
    if (isDweb && rest['dwebTarget' + Browser_bigVersion]) {
      version = rest['dwebTarget' + Browser_bigVersion]
    }

    metadata = metadata && metadata.replace(`/${appname}/`, `/${appname}/${version}/`)
    return {
      name,
      description,
      logo: base_url_assent + logo,
      metadata: base_url_app + metadata,
      ...rest
    } as AppInfo
  })

  return apps_all
}

// export const test_data = {
//   base_config: {
//     base_url: 'https://source.dwebdapp.com/dweb-browser-apps',
//     assets_path: '/dweb-app-assets',
//     app_test_path: '/dweb-apps-test',
//     app_prod_path: '/dweb-apps',
//     app_path: '/dweb-apps-test'
//   },
//   applist: {
//     ethmeta: {
//       name: 'ETHMeta',
//       logo: '/ethmeta/logo.svg',
//       description: 'ETHMeta应用',
//       metadata: '/ethmeta/metadata.json',
//       dwebTarget1: '1-1.20240104.0',
//       dwebTarget2: '2-1.20240110.0',
//       latest: '2-1.20240110.0'
//     },
//     btcmeta: {
//       name: 'BTCMeta',
//       logo: '/btcmeta/logo.svg',
//       description: 'BTCMeta应用',
//       metadata: '/btcmeta/metadata.json',
//       dwebTarget1: '1-1.20240104.0',
//       dwebTarget2: '2-1.20240110.0',
//       latest: '2-1.20240110.0'
//     },
//     plusmeta: {
//       name: 'PlusMeta',
//       logo: '/plusmeta/logo.svg',
//       description: 'PlusMeta应用',
//       metadata: '/plusmeta/metadata.json',
//       dwebTarget1: '1-1.20231212.5',
//       dwebTarget2: '2-1.20231222.0',
//       latest: '2-1.20231222.0'
//     },
//     cot: {
//       name: 'COT',
//       logo: '/cot/logo.jpg',
//       description: 'COT应用',
//       metadata: '/cot/metadata.json',
//       dwebTarget1: '1-1.20240110.1',
//       dwebTarget2: '2-1.20240110.1',
//       latest: '2-1.20240110.1'
//     },
//     metabox: {
//       name: 'MetaBox',
//       logo: '/metabox/logo.svg',
//       description: 'MetaBox应用',
//       metadata: '/metabox/metadata.json',
//       dwebTarget1: '1-1.20240104.0',
//       dwebTarget2: '2-1.20240110.0',
//       latest: '2-1.20240110.0'
//     },
//     btcswap: {
//       name: 'BTCSwap',
//       logo: '/btcswap/logo.svg',
//       description: 'BTCSwap应用',
//       metadata: '/btcswap/metadata.json',
//       dwebTarget1: '1-1.20240119.4',
//       dwebTarget2: '2-1.20240119.4',
//       latest: '2-1.20240119.4'
//     },
//     cosmicdp: {
//       name: 'CosmicDP',
//       logo: '/cosmicdp/logo.svg',
//       description: 'CosmicDP应用',
//       metadata: '/cosmicdp/metadata.json',
//       dwebTarget1: '1-1.20240120.2',
//       dwebTarget2: '2-1.20240123.3',
//       latest: '2-1.20240123.3'
//     },
//     metalord: {
//       name: 'MetaLord',
//       logo: '/metalord/logo.svg',
//       description: 'MetaLord应用',
//       metadata: '/metalord/metadata.json',
//       dwebTarget2: '2-1.20240122.1',
//       latest: '2-1.20240122.1'
//     }
//   },
//   all_products: [
//     {
//       category: 'chain',
//       applist: [
//         {
//           name: 'BFChain',
//           logo: '/all-logo/BFChain.png',
//           description: 'BFChain',
//           website: 'https://www.bfchain.com/',
//           tracker: 'https://www.bfchain.info/',
//           community: 'https://developer.bfchain.com/'
//         },
//         {
//           name: 'BFChainV2',
//           logo: '/all-logo/BFChainV2.png',
//           description: 'BFChainV2',
//           tracker: 'https://tracker.bfchainv2.com/',
//           community: 'https://developer.bfchainv2.com/'
//         },
//         {
//           name: 'PayMetaChain',
//           logo: '/all-logo/PayMetaChain.png',
//           description: 'PayMetaChain',
//           tracker: 'https://tracker.pmchainbox.info/'
//         }
//       ]
//     },
//     {
//       category: 'wallet',
//       applist: [
//         {
//           name: 'ETHMeta',
//           logo: '/all-logo/ETHMeta.png',
//           description: 'ETHMeta应用',
//           metadata: '/ethmeta/metadata.json',
//           dwebTarget1: '1-1.20240104.0',
//           dwebTarget2: '2-1.20240110.0',
//           latest: '2-1.20240110.0',
//           website: 'https://eth-metaverse.com/'
//         },
//         {
//           name: 'BTCMeta',
//           logo: '/all-logo/BTCMeta.png',
//           description: 'BTCMeta应用',
//           metadata: '/btcmeta/metadata.json',
//           dwebTarget1: '1-1.20240104.0',
//           dwebTarget2: '2-1.20240110.0',
//           latest: '2-1.20240110.0',
//           website: 'https://btc-metaverse.com/'
//         },
//         {
//           name: 'COT',
//           logo: '/all-logo/COT.png',
//           description: 'COT应用',
//           metadata: '/cot/metadata.json',
//           dwebTarget1: '1-1.20240110.1',
//           dwebTarget2: '2-1.20240110.1',
//           latest: '2-1.20240110.1',
//           website: 'https://www.bfmeta.info/'
//         },
//         {
//           name: 'MetaBox',
//           logo: '/all-logo/MetaBox.png',
//           description: 'MetaBox应用',
//           metadata: '/metabox/metadata.json',
//           dwebTarget1: '1-1.20240104.0',
//           dwebTarget2: '2-1.20240110.0',
//           latest: '2-1.20240110.0',
//           website: 'https://www.pmchainbox.com/'
//         }
//       ]
//     },
//     {
//       category: 'digital-product',
//       applist: [
//         {
//           name: 'CosmicDP',
//           logo: '/all-logo/CosmicDP.png',
//           description: 'CosmicDP应用',
//           metadata: '/cosmicdp/metadata.json',
//           dwebTarget1: '1-1.20240120.2',
//           dwebTarget2: '2-1.20240123.3',
//           latest: '2-1.20240123.3',
//           website: 'https://www.cosmicdp.com/'
//         },
//         {
//           name: 'MetaLord',
//           logo: '/all-logo/MetaLord.png',
//           description: 'MetaLord应用',
//           metadata: '/metalord/metadata.json',
//           dwebTarget2: '2-1.20240122.1',
//           latest: '2-1.20240122.1'
//         }
//       ]
//     },
//     {
//       category: 'universe-social',
//       applist: [
//         {
//           name: '碳元域',
//           logo: '/all-logo/Tansocc.png',
//           description: '碳元域',
//           website: 'https://www.tansocc.com/'
//         }
//       ]
//     },
//     {
//       category: 'trading',
//       applist: [
//         {
//           name: 'BTCSwap',
//           logo: '/all-logo/BTCSwap.png',
//           description: 'BTCSwap应用',
//           metadata: '/btcswap/metadata.json',
//           dwebTarget1: '1-1.20240119.4',
//           dwebTarget2: '2-1.20240119.4',
//           latest: '2-1.20240119.4',
//           website: 'https://www.btcmetaswap.com/'
//         },
//         {
//           name: 'PlusMeta',
//           logo: '/all-logo/PlusMeta.png',
//           description: 'PlusMeta应用',
//           metadata: '/plusmeta/metadata.json',
//           dwebTarget1: '1-1.20231212.5',
//           dwebTarget2: '2-1.20231222.0',
//           latest: '2-1.20231222.0',
//           website: 'https://www.plus-meta.com/'
//         }
//       ]
//     },
//     {
//       category: 'node',
//       applist: [
//         {
//           name: '节点管理器',
//           logo: '/all-logo/NodeManage.png',
//           description: '节点管理器',
//           website: 'https://developer.bfchainv2.com/bfchainv2-node-manager/'
//         },
//         {
//           name: '实施平台',
//           logo: '/all-logo/Platform.png',
//           description: '实施平台',
//           website: 'https://instinct.one/home'
//         }
//       ]
//     },
//     {
//       category: 'other',
//       applist: [
//         {
//           name: 'DwebBrowser',
//           logo: '/all-logo/DwebBrowser.png',
//           description: 'DwebBrowser',
//           website: 'https://dweb-browser.bagen.info/'
//         }
//       ]
//     }
//   ]
// } as ConfigData
