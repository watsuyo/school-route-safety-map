import './About.scss'
import Qrcode from './Qrcode'
import config from './config.json'

const Content = () => {

  const logoUrl = config.logo_image_url || `${process.env.PUBLIC_URL}/logo.svg`

  return (
    <div className="about">
      <div className="branding">
        <img className="image" src={logoUrl} alt=""/>
      </div>

      <div className="title">{config.title}</div>
      <div className="description">スマホで確認ができます 👇</div>
      <div className="qrcode"><Qrcode url={'https://school-zone-safety-map.site/#/?map=16/35.703734/139.619857'} /></div>
    </div>
  );
};

export default Content;
