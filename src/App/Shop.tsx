import { useState, useEffect, useRef } from "react"
import './Shop.scss'
import { Link } from "react-router-dom";
import { makeDistanceLabelText } from "./distance-label";
import Header from "./Header";
// import { postLike, postUnlike } from "../api"
// import { CircularProgress } from "@mui/material"

type Props = {
  shop: Pwamap.ShopData;
  close: Function;
}

const Content = (props: Props) => {
  const mapNode = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  // const [total, setTotal] = useState<number>(0)
  // const [isLiked, setIsLiked] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)

  const { shop } = props

  const clickHandler = () => {
    props.close()
    if(mapNode.current) {
      mapNode.current.remove()
      map.remove()
    }
  }

  useEffect(() => {
    if (!mapNode.current) {
      return
    }

    // @ts-ignore
    const nextMap = new window.geolonia.Map({
      container: mapNode.current,
      interactive: false,
      zoom: 14,
      style: `geolonia/gsi`,
    });
    setMap(nextMap)

    // setIsLiked(!!localStorage.getItem(`like:${shop['index']}`))
  }, [shop, mapNode])

  const distanceTipText = makeDistanceLabelText(shop.distance)
  const categoryList = shop['カテゴリリスト']
  const content = shop['紹介文']

  const toBreakLine = (text: string) => {

    return text.split(/(\r\n)|(\n)|(\r)/g).map((line, i) => {

      let result: any = '';

      if (line === '\r\n' || line === '\n' || line === '\r') {
        result = <br key={i} />
      } else if (line !== undefined) {
        result = line
      }

      return result
    })
  }

  // const onPostLike = async () => {
  //   setIsLoading(true)
  //   const res = await postLike({ index: shop['index'] })
  //   setTotal(res)
  //   localStorage.setItem(`like:${shop['index']}`, 'true')
  //   setIsLiked(true)
  //   setIsLoading(false)
  // }

  // const onPostUnlike = async () => {
  //   setIsLoading(true)
  //   const res = await postUnlike({ index: shop['index'] })
  //   setTotal(res)
  //   localStorage.removeItem(`like:${shop['index']}`)
  //   setIsLiked(false)
  //   setIsLoading(false)
  // }

  return (
    <div className="shop-single">
      <Header />
      <div className="shop-container">
        <div className="back"><button onClick={clickHandler}>{'< 戻る'}</button></div>
        {shop?
          <>
            <h2>交通事故詳細</h2>

            <div style={{ margin: "0 0 12px 0" }}>
              {
                // @ts-ignore
                JSON.parse([categoryList]).map((category, i) => {
                  return (
                    <span key={i} className="nowrap">
                      <Link to={`/list?category=${category}`}>
                        <span onClick={clickHandler} className="category">{category}</span>
                      </Link>
                    </span>
                  )
                })
              }
              <span className="nowrap">{distanceTipText && <span className="distance">現在位置から {distanceTipText}</span> }</span>
            </div>

            {/* {shop['いいね数'] === 0 || shop['いいね数'] > 0 ? <div style={{ display: 'flex' }}>
              {isLoading ? <CircularProgress /> : <img src={isLiked ? 'thumb-up.png' : 'thumb-up-outline.png'} alt="いいね" width='28px' className="like-button" onClick={isLiked ? onPostUnlike : onPostLike} />}
              <p style={{ margin: '2px' }}>{total || shop['いいね数']}</p>
            </div> : <></>} */}

            <p style={{margin: "24px 0", wordBreak: "break-all"}}>{toBreakLine(content)}</p>

            <div
              ref={mapNode}
              style={{width: '100%', height: '200px', marginTop: "24px"}}
              data-lat={shop['緯度']}
              data-lng={shop['経度']}
              data-navigation-control="off"
            ></div>
          </>
          :
          <></>
        }
      </div>
    </div>
  );
};

export default Content;
