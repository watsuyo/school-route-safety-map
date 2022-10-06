import { Link } from "react-router-dom";
import './Tabbar.scss'

import { FaList, FaHome } from "react-icons/fa"

const Content = () => {
  return (
    <div className="tabbar">
      <ul>
        <li><Link to="/"><div className="icon"><FaHome /></div><div className="text">ホーム</div></Link></li>
        <li><Link to="/list"><div className="icon"><FaList /></div><div className="text">一覧</div></Link></li>
      </ul>
    </div>
  );
};

export default Content;
