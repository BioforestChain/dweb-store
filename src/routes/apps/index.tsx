import { component$, useContext, useSignal, useStore, useTask$, useVisibleTask$, createContextId, useContextProvider } from "@builder.io/qwik";
import styles from "./apps.module.css";
import { isServer } from '@builder.io/qwik/build';
import ImgLogo from '~/media/logo.png?jsx'
import Placeholder from '~/media/placeholder.svg?jsx'
import { Link, useNavigate, type DocumentHead } from '@builder.io/qwik-city';
// import type { DocumentHead } from "@builder.io/qwik-city";

// import { appInfo, apps } from '~/routes/api/appInfo/index'
import { useAppList} from '~/routes/apps/layout'
import { appInfo } from '~/type/app'


export default component$(() => {
  // 导航
  const nav = useNavigate();
  // 获取app列表
  const apps = useSignal([
    {
      title: "这里是一个标题",
      url: "https://www.travelpalapp.com",
      image: "app_image_url_1",
      status: 'installed',
      description: "一句简介描述至多18个字"
    },
    {
      title: "这里是一个标题这里是一个标题这里是一个标题",
      url: "https://www.travelpalapp.com",
      image: "app_image_url_1",
      status: 'installed',
      description: "一句简介描述至多18个"
    },
    {
      title: "这里是一个标题",
      url: "https://www.travelpalapp.com",
      image: "app_image_url_1",
      status: 'installed',
      description: "一句简介描述至多18个字一句简介描述至多18个字一句简介描述至多18个字"
    },
    {
      title: "这里是一个标题这里是一个标题这里是一个标题这里是一个标题",
      url: "https://www.travelpalapp.com",
      image: "app_image_url_1",
      status: 'installed',
      description: "一句简介描述至多18个字一句简介描述至多18个字一句简介描述至多18个字"
    },
  ])
  return (
    <div class={['z-10']}> 
      <div class='w-[390px] h-[48px] px-[24px] mt-[24px] mb-[12px] flex items-center'>
        <ImgLogo class='w-[48px] h-[48px]'></ImgLogo>
        <span class='text-[28px] font-bold leading-[normal] tracking-normal text-[#000000] ml-[4px]'>Plaoc App Store</span>
      </div>
      <div class={['w-[342px] h-[220px] rounded-[16px] opacity-100 ml-[24px] bg-cover bg-center bg-local relative overflow-hidden p-[24px]', `bg-[url('../../src/media/headerBg.png')]`]}>
        <div class='text-[28px] font-bold leading-[normal] tracking-normal text-[#000000] h-[82px] flex justify-between flex-col'>
          <div>欢迎来到</div>
          <div>Plaoc App Store</div>
        </div>

        <div class='mt-[12px] w-[144px] h-[32px] rounded-[18px] opacity-100 bg-[#0068FF] box-border border-[0.5px] border-[rgba(0,0,0,0.06)] text-[20px] font-normal leading-[normal] tracking-normal text-[#FFFFFF] text-center font-[DingTalk-JinBuTi-Regular]'>探索无限可能</div>
        
        <div class='absolute pl-[24px] left-0 bottom-0 w-[342px] h-[32px] bg-[rgba(0,_0,_0,_0.06)] box-border backdrop-filter backdrop-blur-lg flex items-center'>
          <image src='../../src/media/icon_info.png' class='w-[18px] h-[18px] ml-[4px]'></image>
          <span class='text-[14px] font-normal leading-[normal] tracking-normal text-[rgba(0, 0, 0, 0.45)]'>应用将安装于 DWeb Browser 中</span>
        </div>
      </div>

      <div class='flex items-center px-[24px] justify-between mt-[24px] mb-[7px]'>
        <span class='text-[22px] font-bold leading-[normal] tracking-normal text-[#000000]'>Plaoc App</span>
        <div class='text-[14px] font-medium leading-[normal] text-right tracking-normal text-[rgba(0, 0, 0, 0.65)]'>{'全部 ' + apps.value?.length || 0}</div>
      </div>

      <div class='px-[24px]'>
        {apps.value?.map((app) =>  (
          <div class='flex w-[342px] min-h-[92px] relative' key={app.title}>
            <div class='flex justify-center items-center'>
              <image src='../../src/media/logo.png' class='w-[64px] h-[64px] rounded-[16px] border-[0.5px] border-[solid] border-[rgba(0,0,0,0.08)]'></image>
            </div>
            <div class='w-[182px] mx-[12px] flex flex-col justify-center'>
              <div class='text-[16px] font-bold leading-[normal] tracking-normal text-[#000000] mb-[4px] line-clamp-2'>{app.title}</div>
              <div class='text-[13px] leading-[normal] tracking-normal text-[#000000] line-clamp-2'>{app.description}</div>
            </div>
            <div class='flex items-center'>
              <div class='w-[72px] h-[32px] rounded-[20px] bg-[#E8EFFD] flex items-center justify-center'>
                <image src='../../src/media/icon_download.png' class='w-[18px] h-[18px] mr-[2px]'></image>
                <span class='text-[14px] font-medium leading-[normal] tracking-normal text-[#0068FF]'>安装</span>
              </div>
            </div>
            <div class='absolute left-[76px] bottom-0 w-[266px] h-0 opacity-[0.06] border-[0.5px] border-[solid] border-[#000000]'></div>
          </div>
        ))}
        
      </div>
    </div>
  );
});


export const head: DocumentHead = {
  title: "Welcome to BFMeta",
  meta: [],
};

