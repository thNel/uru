import {Button, Nav, NavDropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {userInfoState} from "@/store/userInfo";
import {apiUrls} from "@/constants/api";
import {UserGroup} from "@/constants/enums";

const MainMenu = () => {
  const userInfo = useRecoilValue(userInfoState);

  return (
    <Nav className="flex-column navbar-blue navbar-nav">
      {!userInfo
        ? <Nav.Link
          as={"a"}
          href={apiUrls.host + apiUrls.steamLogin}
        >
          <Button variant="blue">
            Вход
          </Button>
        </Nav.Link>
        : null
      }
      <Nav.Link as={NavLink} to={"/user"} className={`${!userInfo?.username ? 'd-none' : ''}`}>
        Профиль
      </Nav.Link>
      {(userInfo?.userGroup === UserGroup.ADMIN || userInfo?.userGroup === UserGroup.MODERATOR)
        ? <NavDropdown
          title="Админка"
          id="basic-nav-dropdown"
        >
          {userInfo?.userGroup === UserGroup.ADMIN
            ? <>
              <NavDropdown.Item
                as={NavLink}
                to={"/admin/items"}
                className={`${userInfo?.userGroup === UserGroup.ADMIN ? '' : 'd-none'}`}
              >
                Предметы
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to={"/admin/win-groups"}
              >
                Рулетка
              </NavDropdown.Item>
            </>
            : null
          }
          {userInfo?.userGroup === UserGroup.ADMIN
            ? <NavDropdown.Divider
            />
            : null
          }
          <NavDropdown.Item as={NavLink} to={"/admin/skins"}>Скины</NavDropdown.Item>
        </NavDropdown>
        : null
      }
    </Nav>
  )
}

export default MainMenu;