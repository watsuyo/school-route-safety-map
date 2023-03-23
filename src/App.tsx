import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom";
import "./App.scss";

import Home from './App/Home'
import List from './App/List'
import Tabbar from './App/Tabbar'
import Post from './App/Post'
import Request from './App/Request'
import honhyo2019List from './lib/honhyo_2019.json'
import honhyo2020List from './lib/honhyo_2020.json'
import honhyo2021List from './lib/honhyo_2021.json'

const weather = (item: string) => {
  switch (item) {
    case '1':
      return '晴'
    case '2':
      return '曇'
    case '3':
      return '雨'
    case '4':
      return '雪'
    default:
      return ''
  }
}

const trafficLight = (item: string) => {
  switch (item) {
    case '1':
      return '点灯'
    case '8':
      return '点灯'
    case '2':
      return '点灯'
    case '3':
      return '点滅'
    case '4':
      return '点滅'
    case '5':
      return '消灯'
    case '6':
      return '故障'
    default:
      return '設置なし'
  }
}

const municipality = (item: string) => {
  switch (item) {
    case '115':
      return '杉並区'
    default:
      return ''
  }
}


const sortShopList = async (shopList: Pwamap.ShopData[]) => {

  // 新着順にソート
  return shopList.sort(function(item1, item2) {
    return Date.parse(item2['タイムスタンプ']) - Date.parse(item1['タイムスタンプ'])
  })

}

const App = () => {
  const [shopList, setShopList] = useState<Pwamap.ShopData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data.json?timestamp=${new Date().getTime()}`)
      .then((response) => {
        return response.ok ? response.text() : Promise.reject(response.status)
      })
      .then((fetchedData) => {

        const data = JSON.parse(fetchedData)

        if ('values' in data === false) {
          console.log("No Data Found at Spreadsheet")
          setShopList([])
          return
        }

        (async () => {

          const honhyoListFeatures = honhyo2019List.data.concat(honhyo2020List.data).concat(honhyo2021List.data).filter((item) => {
            const timestamp = new Date(item['発生日時　　年'] + '/' + item['発生日時　　月'] + '/' + item['発生日時　　日'] + ' ' + item['発生日時　　時'] + ':' + item['発生日時　　分'])
            const hours = timestamp.getHours()
            const minutes = timestamp.getMinutes()

            const isWithinMorningRange = (hours === 7 && minutes >= 30) || (hours === 8 && minutes < 30)
            const isWithinAfternoonRange = (hours >= 14 && hours < 18)

            if (isWithinMorningRange || isWithinAfternoonRange) {
              return item['曜日(発生年月日)'] !== '土' && item['曜日(発生年月日)'] !== '日' && item['祝日(発生年月日)'] !== '1'
            } else {
              return false
            }
          }).filter((item) => {
            return item['事故類型'] === '21' && (item['年齢（当事者A）'] === '01' || item['年齢（当事者B）'] === '01')
          }).map((item) => {
            const lat = () => {
              const lat = String(Number(item['地点　緯度（北緯）']) / 1000)
              const latDegrees = lat.slice(0, 2)
              const latMinutes = lat.slice(2, 4)
              const latSeconds = lat.slice(4)
              return (Number(latDegrees) + (Number(latMinutes) / 60) + (Number(latSeconds) / 60 / 60)).toFixed(7)
            }

            const lng = () => {
              const lng = String(Number(item['地点　経度（東経）']) / 1000)
              const lngDegrees = lng.slice(0, 3)
              const lngMinutes = lng.slice(3, 5)
              const lngSeconds = lng.slice(5)
              return (Number(lngDegrees) + (Number(lngMinutes) / 60) + (Number(lngSeconds) / 60 / 60)).toFixed(7)
            }

            const timestamp = () => {
              return item['発生日時　　年'] + '/' + item['発生日時　　月'] + '/' + item['発生日時　　日'] + ' ' + item['発生日時　　時'] + ':' + item['発生日時　　分']
            }
            return {
              // eslint-disable-next-line no-useless-concat
              'スポット名': '交通事故' + ' ' + item['発生日時　　年'] + '/' + item['発生日時　　月'] + '/' + item['発生日時　　日'] + ' ' + item['発生日時　　時'] + ':' + item['発生日時　　分'],
              '緯度': lat(),
              '経度': lng(),
              'タイムスタンプ': timestamp(),
              'カテゴリリスト': [municipality(item['市区町村コード']), '信号機: ' + trafficLight(item['信号機']), '天気: ' + weather(item['天候'])],
              '紹介文': '',
              'いいね数': 0,
            }
          })


          setIsLoading(false)
          if (honhyoListFeatures.length) {
            const nextShopList: Pwamap.ShopData[] = []
            for (let i = 0;i < honhyoListFeatures.length;i++) {
              const feature = honhyoListFeatures[i]
              if (!feature['緯度'] || !feature['経度'] || !feature['スポット名']) {
                continue
              }

              const pattern = /^-?[0-9]+(\.[0-9]+)?$/

              if (!pattern.test(feature['緯度'])) {
                console.log('緯度が不正です')
                continue
              }
              if (!pattern.test(feature['経度'])) {
                console.log('経度が不正です')
                continue
              }

              const shop = {
                ...feature,
                index: i
              }

              nextShopList.push(shop)

              sortShopList(nextShopList).then((sortedShopList) => {
                setShopList(sortedShopList)
              })
            }
          }
        })()
      });
  }, [])

  return (
    <>
      {!isLoading ? <div className="app">
        <div className="app-body">
          <Routes>
            <Route path="/" element={<Home data={shopList} />} />
            <Route path="/post" element={<Post />} />
            <Route path="/list" element={<List data={shopList} />} />
            <Route path="/request" element={<Request />} />
          </Routes>
        </div>
        <div className="app-footer">
          <Tabbar />
        </div>
      </div> : ''}
    </>
  );
}

export default App;
