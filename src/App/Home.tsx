import Map from "./Map"
import './Home.scss'
import { Link, useLocation } from "react-router-dom"
import React, { lazy, Suspense, useEffect, useState } from "react"
import { Tooltip } from "@material-ui/core"
import axios from "axios"

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const CustomizedSnackbars = lazy(() => sleep(1000).then(() => import('./Snackbars')));

type Props = {
  data: Pwamap.ShopData[];
}

const Content = (props: Props) => {
  const [isSuginami, setSuginami] = useState(false)

  useEffect(() => {
    (async () => {
      const zlatlng = window.location.hash.split('/')
      const lat = zlatlng[2]
      const lon = zlatlng[3]
      if (lat && lon) {
        const res = await axios.get(
          "https://nominatim.openstreetmap.org/reverse",
          {
            params: {
              lat,
              lon,
              format: "json",
              zoom: 18
            }
          }
        )
        const { address: city } = res.data
        setSuginami(city.city === 'Suginami')
      }
    })()
  })

  const location = useLocation();
  const useZLatLngString = useState<string>('')
  const [showPin, setShowPin] = useState<boolean>(false)
  return (
    <div className="home-container">
      <Link to={`/post?${useZLatLngString['0']}`}>
        {showPin ? <Tooltip
          className="center"
          title={isSuginami ? 'この位置に危険箇所を投稿' : ''}
          placement="top"
          arrow
          open={true}
        >
          <div><img src='map-pin.png' alt="map pin" className="map-pin" /></div>
        </Tooltip> : ''}
      </Link>
      <Map data={props.data} useZLatLngString={useZLatLngString} />
      <button className="map-pin-button" onClick={() => setShowPin(!showPin)}>
        <img className="map-pin-button__plus-math" src={`${showPin ? 'multiply' : 'plus-math'}.png`} alt="plus math" />
      </button>
      <Suspense fallback=''>
        {location.search.includes('success') ? <CustomizedSnackbars /> : ''}
      </Suspense>
    </div>
  );
};

export default Content;
