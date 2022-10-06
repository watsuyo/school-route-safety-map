import React from "react"
import { Routes, Route } from "react-router-dom";
import "./App.scss";

import Home from './App/Home'
import List from './App/List'
import Tabbar from './App/Tabbar'
import table2json from "./lib/table2json";
import Post from './App/Post'

const sortShopList = async (shopList: Pwamap.ShopData[]) => {

  // 新着順にソート
  return shopList.sort(function (item1, item2) {
    return Date.parse(item2['タイムスタンプ']) - Date.parse(item1['タイムスタンプ'])
  });

}

const App = () => {
  const [shopList, setShopList] = React.useState<Pwamap.ShopData[]>([])

  React.useEffect(() => {
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

        let features = table2json(data.values);

        const nextShopList: Pwamap.ShopData[] = []
        for (let i = 0; i < features.length; i++) {
          const feature = features[i] as Pwamap.ShopData

          if (!feature['緯度'] || !feature['経度'] || !feature['スポット名']) {
            continue;
          }
          if (!feature['緯度'].match(/^-?[0-9]+(\.[0-9]+)?$/)) {
            continue
          }
          if (!feature['経度'].match(/^-?[0-9]+(\.[0-9]+)?$/)) {
            continue
          }

          const shop = {
            ...feature,
            index: i
          }

          nextShopList.push(shop)
        }

        sortShopList(nextShopList).then((sortedShopList) => {
          setShopList(sortedShopList)
        })

      });
  }, [])

  return (
    <div className="app">
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
    </div>
  );
}

export default App;