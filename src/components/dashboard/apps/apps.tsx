import { component$, useContext, useSignal, useStore, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./apps.module.css";
import { QMediaCard } from "../../../integrations/react/card";
import { Link, useNavigate } from '@builder.io/qwik-city';
import {seachBarContext} from '../../../routes/index'

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
  const nav = useNavigate();
  const seachBarText = useContext(seachBarContext);
  const sortApps = useSignal(apps)
  useVisibleTask$(({ track }) => {
    track(() => seachBarText.text);
    sortApps.value = []
    if (seachBarText.text === '') {
      sortApps.value = apps
    } else {
      sortApps.value = apps.filter((app) => {
        return app.name.toLowerCase().includes(seachBarText.text.toLowerCase())
      })
    }    
  });
  return (
    <div class={['flex', 'mt-[50px]', 'flex-wrap', 'ml-[30px]']}>
        {sortApps.value?.map((app) => (
          <div class={['m-[5px]', styles.cardBox]} key={`CompoentApps-${app.name}`}>
            <QMediaCard 
              onClick$={() => (
                nav(`/app?appname=${app.name}`)
              )}
              title={app.name}
              description={app.description}
              image={app.image}
              url={app.url} 
              /> 
          </div>
        ))}
    </div>
  );
});
