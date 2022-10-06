import React from "react";
import Links from './Links'
import './Shop.scss'
import { Link } from "react-router-dom";
import { makeDistanceLabelText } from "./distance-label";
import Header from "./Header";

type Props = {
  shop: Pwamap.ShopData;
  close: Function;
}

const Content = (props: Props) => {
  const mapNode = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<any>(null)
  const { shop } = props

  const clickHandler = () => {
    props.close()
    if(mapNode.current) {
      mapNode.current.remove()
      map.remove()
    }
  }

  React.useEffect(() => {
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
  }, [shop, mapNode])

  const distanceTipText = makeDistanceLabelText(shop.distance)
  const category = shop['カテゴリ']
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

  return (
    <div className="shop-single">
      <Header />
      <div className="shop-container">
        <div className="back"><button onClick={clickHandler}>{'< 戻る'}</button></div>
        {shop?
          <>
            <h2>{shop['スポット名']}</h2>

            <div style={{ margin: "0 0 12px 0" }}>
              <span className="nowrap">
                <Link to={`/list?category=${category}`}>
                  <span onClick={clickHandler} className="category">{category}</span>
                </Link>
              </span>
              <span className="nowrap">{distanceTipText && <span className="distance">現在位置から {distanceTipText}</span> }</span>
            </div>

            <div style={{ display: 'flex' }}>
              <img src="/heart-outline.png" alt="" width='28px' />
              <p style={{ margin: '2px' }}>143</p>
            </div>

            <div style={{margin: "24px 0"}}><Links data={shop} /></div>

            { shop['画像'] && <img src={shop['画像']} alt={shop['スポット名']} style={{width: "100%"}} />}

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
