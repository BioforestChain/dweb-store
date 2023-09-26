import { component$, useSignal, $ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { type appInfo } from '~/type/app'

// 图片
import ImgLogo from '@media/logo.svg'
import ImgPlaceholder from '@media/placeholder.svg'
import ImgBannerFont from '@media/banner_font.svg'
import imgArrow from '@media/icon_arrow.svg'
import ImgInfo from '@media/icon_info.svg'


// export const useAppList = routeLoader$(async () => {
//   // const apps = AppModel.all()
//   // console.log('loadAll', apps)
//   const apps = []
//   try {
//     // 定义多个接口的URL
//     const url_app1 = 'https://walletapi.bfmeta.info/version/en-US.json'
//     const url_app2 = 'https://walletapi.bfmeta.info/version/en-US.json'

//     // 使用Promise.all()并行发起多个fetch请求
//     const [response1, response2] = await Promise.all([
//       fetch(url_app1),
//       fetch(url_app2),
//     ]);

//     // 使用await等待JSON解析
//     const data1 = await response1.json();
//     const data2 = await response2.json();

//     // 在这里处理获取到的数据
//     apps.push(data1, data2)
//   } catch (error) {
//     console.error('请求出错：', error);
//   }
//   // console.log(apps);
//   return apps
// });

export default component$(() => {
  // 导航
  const nav = useNavigate();
  // 获取app列表
  const apps = useSignal([
    {
      name: "这里是一个标题",
      logo: "https://pic.616pic.com/ys_bnew_img/00/03/79/vk864bfefe6HcT.jpg",
      status: 'installed',
      description: "一句简介描述至多18个字",
      metadata_url: 'https://dweb.waterbang.top/game/metadata.json'
    },
    {
      name: "这里是一个标题这里是一个标题这里是一个标题",
      logo: "/src/media/app_logo.png",
      status: 'installed',
      description: "一句简介描述至多18个",
      metadata_url: 'https://dweb.waterbang.top/game/metadata.json'
    },
    {
      name: "这里是一个标题",
      logo: "https://pic.616pic.com/ys_bnew_img/00/03/79/vk864b6HcT.jpg",
      status: 'installed',
      description: "一句简介描述至多18个字一句简介描述至多18个字一句简介描述至多18个字",
      metadata_url: 'https://dweb.waterbang.top/game/metadata.json'
    },
    {
      name: "这里是一个标题这里是一个标题这里是一个标题这里是一个标题",
      logo: "https://pic.616pic.com/ys_bnew_img/00/03/79/vk864b6HcT.jpg",
      status: 'installed',
      description: "一句简介描述至多18个字一句简介描述至多18个字一句简介描述至多18个字",
      metadata_url: 'https://dweb.waterbang.top/game/metadata.json'
    },
  ] as appInfo[])

  const openApp = $((app: appInfo) => {
    const appUrl = `dweb:install?url=${app.metadata_url}`
    nav(appUrl)
  })
  return (
    <div class={['z-10']}> 
      <div class='absolute left-[-140px] top-[-140px] w-[280px] h-[280px] opacity-80 bg-[#34F1FF] filter blur-[150px]'></div>
      <div class='absolute right-[-140px] top-[11px] w-[280px] h-[280px] opacity-80 bg-[#0068FF] filter blur-[150px]'></div>
      <div class='w-[390px] h-[48px] px-[24px] mt-[24px] mb-[12px] flex items-center'>
        {/* <ImgLogo class='w-[48px] h-[48px]'></ImgLogo> */}
        <image src={ImgLogo} class='w-[48px] h-[48px]'></image>
        <span class='text-[28px] font-bold leading-[normal] tracking-normal text-black ml-[4px]'>Plaoc App Store</span>
      </div>

      <div class={['w-[342px] h-[220px] rounded-[16px] opacity-100 ml-[24px] bg-cover bg-center bg-local relative overflow-hidden p-[24px] border-[rgba(0,0,0,0.08)] border-[0.5px]', `bg-[url('/src/media/headerBg.png')]`]}>
        <div class='text-[28px] font-bold leading-[normal] tracking-normal text-black h-[79px] flex justify-between flex-col'>
          <div>欢迎来到</div>
          <div>Plaoc App Store</div>
        </div>

        <div class='mt-[12px] w-[144px] h-[32px] rounded-[18px] opacity-100 bg-[#0068FF] box-border border-[0.5px] border-[rgba(0,0,0,0.06)] flex justify-center items-center'>
          <image src={ImgBannerFont} class='w-[120px] h-[24px]'></image>
        </div>
        
        <div class='absolute pl-[24px] left-0 bottom-0 w-[342px] h-[32px] bg-black/[0.02] box-border backdrop-filter backdrop-blur-lg flex items-center'>
          <image src={ImgInfo} class='w-[16px] h-[16px] mr-[4px]'></image>
          <span class='text-[13px] font-normal leading-[18px] tracking-normal text-black/[0.45]'>应用将安装于 DWeb Browser 中</span>
        </div>
      </div>

      <div class='flex items-center px-[24px] justify-between mt-[24px] mb-[7px]'>
        <span class='text-[22px] font-bold leading-[normal] tracking-normal text-black'>Plaoc App</span>
        <div class='text-[14px] font-medium leading-[normal] text-right tracking-normal text-black/[0.65]'>{'全部 ' + apps.value.length || 0}</div>
      </div>

      <div class='px-[24px] mb-[36px]'>
        {apps.value.length > 0 ? apps.value.map((app) =>  (
          <div class='flex w-[342px] min-h-[92px] relative' key={app.name} onClick$={() => openApp(app as appInfo)}>
            <div class='flex justify-center items-center'>
              <div class='w-[64px] h-[64px] border-[rgba(0,0,0,0.08)] border-[0.5px] rounded-[16px] overflow-hidden bg-white'>
                <image src={app.logo} onerror={`this.src='${ImgPlaceholder}'`} class='w-[64px] h-[64px] rounded-[16px]'></image>
              </div>
              
            </div>
            <div class='w-[182px] ml-[12px] mr-[40px] flex flex-col justify-center'>
              <div class='text-[16px] font-bold leading-[normal] tracking-normal text-[#000000] mb-[4px] line-clamp-2'>{app.name}</div>
              <div class='text-[13px] leading-[normal] tracking-normal text-black/[0.45] line-clamp-2'>{app.description}</div>
            </div>
            <div class='flex items-center'>
              <div class='w-[44px] h-[32px] rounded-[20px] bg-[rgba(0,104,255,0.06)] flex items-center justify-center'>
                <image src={imgArrow} class='w-[20px] h-[20px]'></image>
                {/* <span class='text-[14px] font-medium leading-[normal] tracking-normal text-[#0068FF]'>{app.status === 'installed' ? '打开':'安装'}</span> */}
              </div>
            </div>
            <div class='absolute left-[76px] bottom-0 w-[266px] h-0 opacity-[0.06] border-[0.5px] border-[solid] border-[#000000]'></div>
          </div>
        )) : (
          <div class='flex flex-col items-center pt-[91px]'>
            <image src={ImgPlaceholder} class='w-[120px] h-[120px] mb-[16px]'></image>
            <span class='text-[15px] font-normal leading-[normal] text-center tracking-normal text-black/[0.45]'>没有应用信息，刷新一下试试吧</span>
          </div>
        )}
      </div>
    </div>
  );
});


export const head: DocumentHead = {
  title: "Welcome to BFMeta",
  meta: [],
};

