import React from "react";
import ShopListItem from './ShopListItem'
import Shop from './Shop'
import './List.scss'
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import { askGeolocationPermission } from '../geolocation'
import * as turf from "@turf/turf"
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import Header from './Header'

type Props = {
  data: Pwamap.ShopData[];
}

const sortShopList = async (shopList: Pwamap.ShopData[]) => {
  const currentPosition = await askGeolocationPermission()
  if(currentPosition) {
    const from = turf.point(currentPosition);
    const sortingShopList = shopList.map((shop) => {
      const lng = parseFloat(shop['経度'])
      const lat = parseFloat(shop['緯度'])
      if(Number.isNaN(lng) || Number.isNaN(lat)) {
        return shop
      } else {
        const to = turf.point([lng, lat])
        const distance = turf.distance(from, to, {units: 'meters' as 'meters'});
        return { ...shop, distance }
      }
    })
    sortingShopList.sort((a,b) => {
      if(typeof a.distance !== 'number' || Number.isNaN(a.distance)) {
        return 1
      } else if (typeof b.distance !== 'number' || Number.isNaN(b.distance)) {
        return -1
      } else {
        return a.distance - b.distance
      }
    })
    return sortingShopList
  } else {
    return shopList
  }
}

const Content = (props: Props) => {
  const navigate = useNavigate();

  const [shop, setShop] = React.useState<Pwamap.ShopData | undefined>()
  const [data, setData] = React.useState<Pwamap.ShopData[]>(props.data)
  const [list, setList] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(10);
  const [hasMore, setHasMore] = React.useState(true);
  const [categoryList, setCategoryList] = React.useState<string[]>([]);


  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get('category')

  React.useEffect(() => {

    let categories: string[] = []

    for (let i = 0;i < props.data.length;i++) {
      const shop = props.data[i]
      const categoryList = shop['カテゴリリスト']
      for (let j = 0;j < categoryList.length;j++) {
        const category = categoryList[j]
        if (!categories.includes(category)) {
          categories.push(category)
        }
      }
    }

    setCategoryList(categories)


    let data = props.data;

    if (queryCategory) {
      data = props.data.filter((shop) => {
        return categories && categories.includes(queryCategory)
      })
    }

    let isMounted = true
    // prevent memory leak
    if (isMounted) {

      const orderBy = process.env.REACT_APP_ORDERBY

      if (orderBy === 'distance') {

        sortShopList(data)
          .then(sortedData => {
            // prevent memory leak
            if (isMounted) {
              setList(sortedData.slice(0, page))
              setData(sortedData)
            }
          })

      } else {
        setList(data.slice(0, page))
        setData(data)
      }
    }

    return () => {
      isMounted = false
    }
  }, [props.data, queryCategory, page])


  const popupHandler = (shop: Pwamap.ShopData) => {
    if (shop) {
      setShop(shop)
    }
  }

  const closeHandler = () => {
    setShop(undefined)
  }

    //項目を読み込むときのコールバック
    const loadMore = () => {

      //データ件数が0件の場合、処理終了
      if (list.length >= data.length) {
        setHasMore(false);
        return;
      }

      setList([...list, ...data.slice(page, page + 10)])
      setPage(page + 10)
    }

  const loader = <div
    className="loader"
    key={0}
    style={{
      width: '100%',
      height: '200px',
      textAlign: 'center',
      position: 'relative',
      top: '100px'
    }}
  >場所一覧を読み込み中です...</div>;

  return (
    <div id="shop-list" className="shop-list">
      <Header />
      <div className="category-item">
        <div className="category-container">
          <label htmlFor="category-select">カテゴリリストから選ぶ</label>
          <Select
            onChange={(e) => {
              if (e) {
                navigate(`/list?category=${e.value}`)
              }
            }}
            options={
              categoryList.map(category => {
                return {
                  value: category,
                  label: category
                }
              })
            }
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={list.length}
        next={loadMore}
        hasMore={hasMore}
        loader={loader}
        scrollableTarget="shop-list"
      >
        {
          list.map((item, index) => {
            return (<div key={index} className="shop">
              <ShopListItem
                data={item}
                popupHandler={popupHandler}
              />
            </div>)

          })
        }
      </InfiniteScroll>
      {shop ?
        <Shop shop={shop} close={closeHandler} />
        :
        <></>
      }
    </div>
  );
};

export default Content;
