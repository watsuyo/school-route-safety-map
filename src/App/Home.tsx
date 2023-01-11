import Map from "./Map"
import './Home.scss'
import { Link, useLocation } from "react-router-dom"
import React, { lazy, Suspense } from "react"
import { Tooltip } from "@material-ui/core"

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const CustomizedSnackbars = lazy(() => sleep(1000).then(() => import('./Snackbars')));

type Props = {
  data: Pwamap.ShopData[];
}

const Content = (props: Props) => {
  const location = useLocation();
  const useZLatLngString = React.useState<string>('')
  const [showPin, setShowPin] = React.useState<boolean>(false)
  return (
    <div className="home-container">
      <Link to={`/post?${useZLatLngString['0']}`}>
        {showPin ? <Tooltip
          className="center"
          title="この位置に要望を投稿"
          placement="top"
          arrow
          open={true}
        >
          <div><img src='map-pin.png' alt="map pin" className="map-pin" /></div>
        </Tooltip> : ''}
      </Link>
      <Map data={props.data} useZLatLngString={useZLatLngString} />
      {/* マップ上にピンを立てるボタンを非表示 */}
      {/* <button className="map-pin-button" onClick={() => setShowPin(!showPin)}>
        <img className="map-pin-button__plus-math" src={`${showPin ? 'multiply' : 'plus-math'}.png`} alt="plus math" />
      </button> */}
      <Suspense fallback=''>
        {location.search.includes('success') ? <CustomizedSnackbars /> : ''}
      </Suspense>
    </div>
  );
};

export default Content;
