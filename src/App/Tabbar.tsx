import { Link } from "react-router-dom";
import './Tabbar.scss'

import { FaList, FaMap, FaRegStickyNote } from "react-icons/fa"

const Content = () => {
  return (
    <div className="tabbar">
      <ul>
        <li><Link to="/"><div className="icon"><FaMap /></div><div className="text">マップ</div></Link></li>
        <li><Link to="/list"><div className="icon"><FaList /></div><div className="text">一覧</div></Link></li>
        <li><Link to="/request"><div className="icon"><FaRegStickyNote /></div><div className="text">要望</div></Link></li>
      </ul>
    </div>
  );
};

export default Content;
