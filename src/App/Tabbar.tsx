import { Link } from "react-router-dom";
import './Tabbar.scss'

import { FaList, FaHome } from "react-icons/fa"

type Props = {
  toggleShowForm: () => void
}

const Content = () => {
  return (
    <div className="tabbar">
      <ul>
        <li><Link to="/"><div className="icon"><FaHome /></div><div className="text">ホーム</div></Link></li>
        {/* <li><Link onClick={props.toggleShowForm} to={""}><div className="icon"><FaComments /></div><div className="text">口コミ投稿</div></Link></li> */}
        <li><Link to="/list"><div className="icon"><FaList /></div><div className="text">一覧</div></Link></li>
      </ul>
    </div>
  );
};

export default Content;
