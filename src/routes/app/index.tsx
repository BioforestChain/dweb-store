import { component$, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

interface appTs {
  name: string;
  url: string;
  image: string;
  description: string;
}

const apps:appTs[] = [
  {
    "name": "TravelPal",
    "url": "https://www.travelpalapp.com",
    "image": "app_image_url_1",
    "description": "TravelPal 是您的旅行伙伴，提供旅游目的地信息、景点推荐、导航和旅行日志功能。无论您是探险家还是休闲旅行者，TravelPal 都将确保您的旅行体验无忧无虑。"
  },
  {
    "name": "FitTrack",
    "url": "https://www.fittrackapp.com",
    "image": "app_image_url_2",
    "description": "FitTrack 是您的健康追踪器，帮助您记录日常运动、饮食和睡眠习惯。通过实时数据和图表，您可以跟踪健康状况，设定目标并改善生活方式。"
  },
  {
    "name": "CookMastery",
    "url": "https://www.cookmasteryapp.com",
    "image": "app_image_url_3",
    "description": "CookMastery 是您的烹饪大师，提供食谱、烹饪技巧和定制菜单。从家常菜到精致美食，CookMastery 将带领您走向烹饪的极致。"
  },
  {
    "name": "LanguageLink",
    "url": "https://www.languagelinkapp.com",
    "image": "app_image_url_4",
    "description": "LanguageLink 连接您与世界，提供多种语言学习资源、语音翻译和跨文化交流。无论您是学生、旅行者还是全球商务人士，LanguageLink 将帮助您打破语言障碍。"
  },
  {
    "name": "ShopSaver",
    "url": "https://www.shopsaverapp.com",
    "image": "app_image_url_5",
    "description": "ShopSaver 是您的购物助手，提供价格比较、优惠券和购物清单管理。无论您购物的地点和方式如何，ShopSaver 都将帮您节省时间和金钱。"
  },
  {
    "name": "MindfulMeditation",
    "url": "https://www.mindfulmeditationapp.com",
    "image": "app_image_url_6",
    "description": "MindfulMeditation 是您的冥想指南，帮助您在繁忙的生活中找到平静和内心宁静。通过音乐、冥想练习和呼吸控制，MindfulMeditation 将引导您走向心灵的和谐。"
  }
]

export default component$(() => {
  const appInfo = useStore({
    name: '',
    url: '',
    image: '',
    description: '',
  });
  useVisibleTask$(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const appname = urlParams.get('appname');
    apps.forEach((app) => {
      if (app.name.toLocaleLowerCase === appname?.toLocaleLowerCase) {
        appInfo.name = app.name;
        appInfo.url = app.url;
        appInfo.image = app.image;
        appInfo.description = app.description;
      }
    })
  })

  return (
    <>
      <div class={['h-[2000px]']}>
        <h1>{appInfo.name}</h1>
        <h1>{appInfo.description}</h1>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik React",
};
