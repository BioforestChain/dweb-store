// 判断手机品牌
export const verifyBrand = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  const isIphone = userAgent.match(/(iphone|ipad|ipod)/i)
  const isHuawei = userAgent.match(/huawei/i)
  const isHonor = userAgent.match(/honor/i)
  const isOppo = userAgent.match(/oppo/i)
  const isOppoR15 = userAgent.match(/PACM00/i)
  const isVivo = userAgent.match(/vivo/i)
  const isXiaomi = userAgent.match(/mi\s/i)
  const isXIAOMI = userAgent.match(/xiaomi/i)
  const isXiaomi2s = userAgent.match(/mix\s/i)
  const isRedmi = userAgent.match(/redmi/i)

  if (isIphone) {
    return 'iphone'
  } else if (isHuawei || isHonor) {
    return 'huawei'
  } else if (isOppo || isOppoR15) {
    return 'oppo'
  } else if (isVivo) {
    return 'vivo'
  } else if (isXiaomi || isRedmi || isXiaomi2s || isXIAOMI) {
    return 'xiaomi'
  } else {
    return 'other'
  }
}

// hex转rgb
export const hexToRgb = (hex: string, opacity: number = 1) => {
  hex = hex.replace(/^#/, '')
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

// 下载应用
export const downloadApp = (packagename: string, iosLinkUrl: string) => {
  // const androidLinkurl ="安卓链接";
  const huaweiUrl = `appmarket://details?id=${packagename}`
  const oppoUrl = `oppomarket://details?packagename=${packagename}`
  const vivoUrl = `vivomarket://details?id=${packagename}`
  const xiaomiUrl = `mimarket://details?id=${packagename}`
  const defaultUrl = `market://details?id=${packagename}`
  switch (verifyBrand()) {
    case 'iphone':
      window.location.href = iosLinkUrl
      break
    case 'xiaomi':
      window.location.href = xiaomiUrl
      break
    case 'huawei':
      window.location.href = huaweiUrl
      break
    case 'vivo':
      window.location.href = vivoUrl
      break
    case 'oppo':
      window.location.href = oppoUrl
      break
    default:
      window.location.href = defaultUrl
      break
  }
}
