import React from "react";
// @ts-ignore
import geojsonExtent from '@mapbox/geojson-extent'
import toGeoJson from './toGeoJson'
import setCluster from './setCluster'
import Shop from './Shop'
import Header from './Header'
import MapSearch from "./MapSearch"
import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'
import { FaExternalLinkAlt } from 'react-icons/fa'
import './Map.scss'

type Props = {
  data: Pwamap.ShopData[];
  useZLatLngString: [string, React.Dispatch<React.SetStateAction<string>>]
};

const CSS: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
}


// const schoolListFeatures = schoolList.data.map((school) => {
//   return {
//     name: school["\uFEFF\"\u540D\u524D\""]
//   }
// })


const hidePoiLayers = (map: any) => {

  const hideLayers = [
    'poi',
    'poi-primary',
    'poi-r0-r9',
    'poi-r10-r24',
    'poi-r25',
    'poi-bus',
    'poi-entrance',
  ]

  for (let i = 0; i < hideLayers.length; i++) {
    const layerId = hideLayers[i];
    map.setLayoutProperty(layerId, 'visibility', 'none')
  }
}

const parseHash = (url?: Location | URL) => {
  const qstr = (url || window.location).hash.substring(2);
  const q = new URLSearchParams(qstr);
  return q;
};

const updateHash = (q: URLSearchParams) => {

  const hash = q.toString();
  if (hash) {
    window.location.hash = `#/?${q.toString().replace(/%2F/g, '/')}`;
  }
};

const Content = (props: Props) => {
  const mapNode = React.useRef<HTMLDivElement>(null);
  const [mapObject, setMapObject] = React.useState<any>()
  const [shop, setShop] = React.useState<Pwamap.ShopData | undefined>(undefined)
  const [zLatLngString, setZLatLngString] = props.useZLatLngString
  const addMarkers = (mapObject: any, data: any) => {

    if (!mapObject || !data) {
      return
    }

    mapObject.on('render', () => {

      // nothing to do if shops exists.
      if (mapObject.getSource('shops')) {
        return
      }

      hidePoiLayers(mapObject)

      const textColor = '#000000'
      const textHaloColor = '#FFFFFF'

      const geojson = toGeoJson(data)

      mapObject.addSource('shops', {
        type: 'geojson',
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 25,
      })

      mapObject.addLayer({
        id: 'shop-points',
        type: 'circle',
        source: 'shops',
        filter: ['all',
          ['==', '$type', 'Point'],
        ],
        paint: {
          'circle-radius': 13,
          'circle-color': '#FF0000',
          'circle-opacity': 0.4,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#FFFFFF',
          'circle-stroke-opacity': 1,
        },
      })

      mapObject.addLayer({
        id: 'shop-symbol',
        type: 'symbol',
        source: 'shops',
        filter: ['all',
          ['==', '$type', 'Point'],
        ],
        paint: {
          'text-color': textColor,
          'text-halo-color': textHaloColor,
          'text-halo-width': 2,
        },
        layout: {
          'text-field': "{スポット名}",
          'text-font': ['Noto Sans Regular'],
          'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
          'text-radial-offset': 0.5,
          'text-justify': 'auto',
          'text-size': 12,
          'text-anchor': 'top',
          'text-max-width': 12,
          'text-allow-overlap': false,
        },
      })

      mapObject.on('mouseenter', 'shop-points', () => {
        mapObject.getCanvas().style.cursor = 'pointer'
      })

      mapObject.on('mouseleave', 'shop-points', () => {
        mapObject.getCanvas().style.cursor = ''
      })

      mapObject.on('mouseenter', 'shop-symbol', () => {
        mapObject.getCanvas().style.cursor = 'pointer'
      })

      mapObject.on('mouseleave', 'shop-symbol', () => {
        mapObject.getCanvas().style.cursor = ''
      })

      mapObject.on('click', 'shop-points', (event: any) => {
        if (!event.features[0].properties.cluster) {
          setShop(event.features[0].properties)
        }
      })

      mapObject.on('click', 'shop-symbol', (event: any) => {
        if (!event.features[0].properties.cluster) {
          setShop(event.features[0].properties)
        }
      })

      setCluster(mapObject)
    });

  }

  React.useEffect(() => {

    addMarkers(mapObject, props.data)

  }, [mapObject, props.data])

  React.useEffect(() => {
    const hash = parseHash();
    if (zLatLngString) {
      hash.set('map', zLatLngString);
    }
    updateHash(hash);

  }, [ zLatLngString ]);

  const hash = parseHash()
  const latLngString = hash.get('map') || ''
  const zlatlng = latLngString.split('/')
  const [inputLat, setLat] = useState(zlatlng[1])
  const [inputLng, setLng] = useState(zlatlng[2])
  const [place, setPlace] = useState()

  // @ts-ignore
  const { geolonia } = window

  const geojson = toGeoJson(props.data)
  const bounds = geojsonExtent(geojson)

  const geocode = () => {
    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ address: place }, (results, status) => {
      if (status === 'OK' && results) {
        const lat = results[0].geometry.location.lat().toString()
        const lng = results[0].geometry.location.lng().toString()

        if (!results[0].address_components.some((component: any) => {
          return component.long_name === '杉並区' || component.long_name === 'Suginami City'
        })) {
          alert('対象エリアは、杉並区内のみとなります。')
          return
        }

        setLat(lat)
        setLng(lng)

        const map = new geolonia.Map({
          container: mapNode.current,
          style: 'geolonia/gsi',
          bounds: bounds,
          fitBoundsOptions: { padding: 50 },
        });

        map.flyTo({ center: [lng, lat], zoom: 16 })
      } else {
        alert('結果が見つかりませんでした。\n対象エリアは、杉並区内のみとなります')
      }
    })
  }

  React.useEffect(() => {
    // Only once reder the map.
    if (!mapNode.current || mapObject) {
      return
    }

    const map = new geolonia.Map({
      container: mapNode.current,
      style: 'geolonia/gsi',
      bounds: bounds,
      fitBoundsOptions: { padding: 50 },
    })

    const hash = parseHash()
    if (hash && hash.get('map')) {
      const latLngString = hash.get('map') || ''
      const zlatlng = latLngString.split('/')
      const zoom = zlatlng[0]
      const lat = zlatlng[1]
      const lng = zlatlng[2]

      map.flyTo({ center: [lng, lat], zoom });

    } else if (bounds) {

      map.fitBounds(bounds, { padding: 50 })

    }

    const onMapLoad = () => {
      hidePoiLayers(map)
      setMapObject(map)

      map.on('moveend', () => {
        // see: https://github.com/maplibre/maplibre-gl-js/blob/ba7bfbc846910c5ae848aaeebe4bde6833fc9cdc/src/ui/hash.js#L59
        const center = map.getCenter(),
          rawZoom = map.getZoom(),
          zoom = Math.round(rawZoom * 100) / 100,
          // derived from equation: 512px * 2^z / 360 / 10^d < 0.5px
          precision = Math.ceil((zoom * Math.LN2 + Math.log(512 / 360 / 0.5)) / Math.LN10),
          m = Math.pow(10, precision),
          lng = Math.round(center.lng * m) / m,
          lat = Math.round(center.lat * m) / m,
          zStr = Math.ceil(zoom);

        setZLatLngString(`${zStr}/${lat}/${lng}`);
      });
    }

    const orienteationchangeHandler = () => {
      map.resize()
    }

    // attach
    map.on('load', onMapLoad)

    window.addEventListener('orientationchange', orienteationchangeHandler)

    return () => {
      // detach to prevent memory leak
      window.removeEventListener('orientationchange', orienteationchangeHandler)
      map.off('load', onMapLoad)
    }
  })

  const closeHandler = () => {
    setShop(undefined)
  }

  const [showAlert, setShowAlert] = useState(true)

  const closeAlert = () => {
    setShowAlert(false)
  }


  return (
    <div style={CSS}>
      <Header />

      {
        showAlert ?
          <div>
            <Alert severity="info">
              <div className="alert-container">
                <div>
                  <p>杉並区以外のエリアも対応予定です。</p>
                  <Link target="_blank" href="https://aback-dragonfly-1d3.notion.site/ee75f8b41aa046dc9f5edeb4007a3d9b">サービスに関する情報はこちら<FaExternalLinkAlt /></Link>
                </div>
                <button className="btn" onClick={closeAlert}>
                  ×
                </button>
              </div>
            </Alert>
          </div>
          : ''
      }

      <MapSearch geocode={geocode} setPlace={setPlace} />

      {/* <div className="chip-wrapper">
        {
          schoolListFeatures.map((school) => {
            return (
              <Chip label={school.name} />
            )
          })
        }
      </div> */}

      <div
        ref={mapNode}
        style={CSS}
        data-lat={inputLat}
        data-lng={inputLng}
        data-geolocate-control="on"
        data-marker="off"
      ></div>
      {shop ?
        <Shop shop={shop} close={closeHandler} />
        :
        <></>
      }
    </div>
  );
};

export default Content;
