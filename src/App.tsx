import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom";
import "./App.scss";

import Home from './App/Home'
import List from './App/List'
import Tabbar from './App/Tabbar'
import Post from './App/Post'
import { getSafetyData } from "./api"

const sortShopList = async (shopList: Pwamap.ShopData[]) => {

  // 新着順にソート
  return shopList.sort(function (item1, item2) {
    return Date.parse(item2['タイムスタンプ']) - Date.parse(item1['タイムスタンプ'])
  });

}

const App = () => {
  const [shopList, setShopList] = useState<Pwamap.ShopData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data.json?timestamp=${new Date().getTime()}`)
      .then((response) => {
        return response.ok ? response.text() : Promise.reject(response.status);
      })
      .then((fetchedData) => {

        const data = JSON.parse(fetchedData)

        if ('values' in data === false) {
          console.log("No Data Found at Spreadsheet")
          setShopList([])
          return
        }

        (async () => {
          const res = await getSafetyData()
          const features = JSON.parse(res)

          setIsLoading(false)

          if (features.length) {
            const nextShopList: Pwamap.ShopData[] = []
            for (let i = 0;i < features.length;i++) {
              const feature = features[i] as Pwamap.ShopData
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
