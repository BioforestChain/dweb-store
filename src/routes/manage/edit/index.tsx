import { component$, useStore, useSignal, $ } from '@builder.io/qwik';
import { useAddApp } from '../layout'

enum FormStatus {
    'default',
    'submitting',
    'success',
    'error'
}

export default component$(() => {
    const formAction = useAddApp()
    const formStatus = useSignal(FormStatus.default)


    const formItems = useStore({
        name: '',
        image: '',
        url: '',
        description: ''
    });

    const clearForm = $(() => {
        console.log('clearForm')
        formStatus.value = FormStatus.default
        formItems.name = ''
        formItems.image = ''
        formItems.url = ''
        formItems.description = ''
    });

    const onSubmit = $(async () => {
        if (formStatus.value !== FormStatus.default) {
            return
        }
        console.log('onSubmit', formItems)

        formStatus.value = FormStatus.submitting
        const { value } = await formAction.submit(formItems);
        console.log('onSubmit end', value)
        if (value?.success) {
            formStatus.value = FormStatus.success
        } else {
            formStatus.value = FormStatus.error
            if (value.fieldErrors) {
                let faileMessage = Object.entries(value.fieldErrors).map(([key, value]) => {
                    return `${key}: ${value}`
                }).join('\n')
                alert('添加失败\n' + faileMessage)
            }
        }

        setTimeout(() => {
            clearForm()
        }, 2000);
        // console.log('onSubmit end', value)
    });

    const buttonsInfo = {
        [FormStatus.default]: '提交',
        [FormStatus.submitting]: '正在添加..',
        [FormStatus.success]: '添加成功',
        [FormStatus.error]: '添加失败',
    }

    const buttons = (() => {
        return <>
            <button 
                class='inline-block w-[45%] p-[10px] mr-[10px] !bg-[#007bff] text-[#fff] border-none rounded-[4px] cursor-pointer'
                type="submit" onClick$={onSubmit}>{buttonsInfo[formStatus.value]}</button>
            <button class='inline-block w-[45%] p-[10px] mr-[10px] !bg-[#007bff] text-[#fff] border-none rounded-[4px] cursor-pointer'
                onClick$={clearForm}>取消</button>
        </>
    })
  return <>
        <div class='flex justify-center items-center'>
            <div class='bg-[#f0f0f0] p-[20px] rounded-[5px] [box-shadow:0_0_10px_rgba(0,_0,_0,_0.2)]'>
                <label class='block mb-[10px]'>
                    应用名称:
                    <input 
                        class='w-full p-[8px] mt-[4px] border-[1px] border-solid border-[#ccc] rounded-[4px]'
                        type="text" value={formItems.name}  onInput$={(e: Event) => (formItems.name = (e.target as HTMLInputElement).value)} name="name" />
                </label>
                <label class='block mb-[10px]'>
                    应用图片:
                    <input  
                        class='w-full p-[8px] mt-[4px] border-[1px] border-solid border-[#ccc] rounded-[4px]'
                        type="text" value={formItems.image}  onInput$={(e: Event) => (formItems.image = (e.target as HTMLInputElement).value)} name="image" />
                </label>
                <label class='block mb-[10px]'>
                    应用地址:
                    <input  
                        class='w-full p-[8px] mt-[4px] border-[1px] border-solid border-[#ccc] rounded-[4px]'
                        type="text" value={formItems.url} onInput$={(e: Event) => (formItems.url = (e.target as HTMLInputElement).value)} name="image" />
                </label>
                <label class='block mb-[10px]'>
                    应用描述:
                    <textarea  
                        class='w-full p-[8px] mt-[4px] border-[1px] border-solid border-[#ccc] rounded-[4px]'
                        name="description" value={formItems.description}  onInput$={(e: Event) => (formItems.description = (e.target as HTMLInputElement).value)} />
                </label>
                <div class={['text-center']}>
                    {buttons()}
                </div>
            </div>
        </div>
  </>
});