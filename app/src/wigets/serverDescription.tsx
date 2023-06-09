import Block from "@/components/block";
import {NavLink} from "react-router-dom";

const ServerDescription = () => {
  return (
    <Block className="d-inline-flex flex-before-lg-fill justify-content-center" style={{width: 'min-content'}}>
      <div>
        <h5 className="d-flex w-100 justify-content-center mb-3"><strong>Описание&nbsp;сервера:</strong></h5>
        <div className="d-flex flex-wrap w-100 gap-3">
          <div><strong>IP:</strong>&nbsp;185.189.255.246:36200</div>
          <div className="d-flex flex-wrap gap-2 gap-lg-0">
            <div>Ural&nbsp;Rust&nbsp;University</div>
            <div className="d-lg-none">-</div>
            <div>Уральский&nbsp;Растерский&nbsp;Университет</div>
          </div>
          <div>
            <ul>
              <li><NavLink className="link-info text-decoration-none" to="/help#gather">Увеличенная&nbsp;добыча&nbsp;ресурсов</NavLink></li>
              <li><NavLink className="link-info text-decoration-none" to="/help#stacks">Увеличенные&nbsp;стаки</NavLink></li>
              <li><NavLink className="link-info text-decoration-none" to="/help#kits">Наборы&nbsp;предметов&nbsp;(киты)</NavLink></li>
              <li><NavLink className="link-info text-decoration-none" to="/help#taxi">Такси</NavLink></li>
              <li><NavLink className="link-info text-decoration-none" to="/help#trade">Трейды</NavLink></li>
            </ul>
          </div>
          <div className="d-flex" style={{textAlign: 'justify'}}>
            Здесь должно быть длинное описание, что классного есть у нас на сервере
          </div>
        </div>
      </div>
    </Block>
  )
}

export default ServerDescription;