import { component$, Slot } from '@builder.io/qwik';
import { routeAction$, zod$, z, Link, routeLoader$ } from '@builder.io/qwik-city';

import AppModel from '~/model/app'; // 从model中导入App

const validForm = () => {
    return zod$({
        name: z.string().min(1),
        image: z.string().min(1),
        url: z.string().min(1),
        description: z.string().min(1)
    })
}

export const useAddApp = routeAction$(async (appInfo) => {
    // console.log('appInfo', appInfo)
    const instance = AppModel.create(appInfo);
    if (instance === null) {
        return {
            success: false,
            fieldErrors: {
                name: 'app 名字重复了'
            },
        }
    } else {
        // 假数据
        instance.url = 'https://www.travelpalapp.com';
        instance.image = 'app_image_url_1';
        instance.save();
        return {
            success: true,
        };
    }
}, validForm());

export const useAppList = routeLoader$(async (requestEvent) => {
    const apps = AppModel.all()
    // console.log('loadAll', apps)
    return apps
});

export default component$(() => {
    return (
        <>
            <div class={['bg-[#19176D] h-screen']}>
                <div class='list-none p-0 m-0 text-center py-[100px]'>
                    <ul class='inline-block mx-[10px] my-[0 hover:text-[#ff5733]'>
                        <Link class='no-underline ml-[20px]' href='/manage/add'>添加应用</Link>
                        <Link class='no-underline ml-[20px]' href='/manage'>返回首页</Link>
                    </ul>
                </div>
                <Slot />
            </div>
        </>
    )
});