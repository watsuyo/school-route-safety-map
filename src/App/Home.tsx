import Map from "./Map"
import './Home.scss'
import { Link } from "react-router-dom"
import React from "react"
import { Tooltip } from "@material-ui/core"

type Props = {
  data: Pwamap.ShopData[];
}

const Content = (props: Props) => {
  const useZLatLngString = React.useState<string>('')
  const [showPin, setShowPin] = React.useState<boolean>(false)
  return (
    <div className="home-container">
      <Link to={`/post?${useZLatLngString['0']}`}>
        {showPin ? <Tooltip
          className="center"
          title="この位置で要望を投稿"
          placement="top"
          arrow
          open={true}
        >
          <div><img src='map-pin.png' alt="map pin" className="map-pin" /></div>
        </Tooltip> : ''}
      </Link>
      <Map data={props.data} useZLatLngString={useZLatLngString} />
      <button className="map-pin-button" onClick={() => setShowPin(!showPin)}>
        <img className="map-pin-button__plus-math" src={`/${showPin ? 'multiply' : 'plus-math'}.png`} alt="plus math" />
      </button>
    </div>
  );
};

export default Content;
