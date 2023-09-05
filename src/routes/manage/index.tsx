import { component$, useSignal, useContext, $, useStore, Signal } from '@builder.io/qwik';
import { Link, useNavigate, type DocumentHead, Form } from '@builder.io/qwik-city';
import { useAppList, serverDeleteApp, editorFormContext } from './layout'
import { appInfo } from '~/type/app'
import { log } from '~/utils';

export default component$(() => {
    const nav = useNavigate();
    const appInfoFromLoader = useAppList() // 因为是只读
    const apps = useSignal(appInfoFromLoader.value)
    const onDelete = $(async(appName: string) => {
        const response = await serverDeleteApp(appName)
        log('response', response)
        if(response.isRemove) {
            apps.value = apps.value.filter((item) => item.name !== appName)
        }        
    })

    const editForm = useContext(editorFormContext);

    const onEdit = $((app: appInfo) => {
        editForm.name = app.name
        editForm.url = app.url
        editForm.image = app.image
        editForm.description = app.description
        nav('/manage/edit')
    })
    return (
        <div class="p-[20px] w-[auto] mx-[auto] my-[0] text-left text-white">
            <table class='border-[1px] border-[solid] m-auto w-[500px]'>
                <caption class='pb-3 text-lg'>所有应用</caption>
                <thead>
                    <th class='text-center border-[1px] border-[solid] p-[5px] whitespace-nowrap'>应用名称</th>
                    <th class='text-center border-[1px] border-[solid] p-[5px] whitespace-nowrap'>应用url</th>
                    <th class='text-center border-[1px] border-[solid] p-[5px] whitespace-nowrap'>应用图片</th>
                    <th class='text-center border-[1px] border-[solid] p-[5px] whitespace-nowrap'>应用描述</th>
                    <th class='text-center border-[1px] border-[solid] p-[5px] whitespace-nowrap'>操作</th>
                </thead>
                {apps.value?.map((app) => (
                    <tbody key={app.name}>
                        <td class='text-center border-[1px] border-[solid] p-[5px]'>{app.name}</td>
                        <td class='text-center border-[1px] border-[solid] p-[5px]'>{app.url}</td>
                        <td class='text-center border-[1px] border-[solid] p-[5px]'>{app.image}</td>
                        <td class='text-center border-[1px] border-[solid] p-[5px]'>{app.description}</td>
                        <td class='text-center border-[1px] border-[solid] p-[5px]'>
                            <a class='cursor-pointer my-[5px]' 
                                onClick$={$(() => {
                                    onDelete(app.name)
                                })}
                            >删除</a>
                            <a class='cursor-pointer my-[5px]'
                                onClick$={$(() => {
                                    onEdit(app)
                                })}
                            >修改</a>
                        </td>
                    </tbody>
                ))}
            </table>
        </div>
    )
});

export const head: DocumentHead = {
    title: "Welcome to appcenter manage",
    meta: [],
};