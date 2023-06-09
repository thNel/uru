import {useRecoilValue, useSetRecoilState} from "recoil";
import {userInfoState} from "@/store/userInfo";
import Block from "../components/block";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate, useOutletContext} from "react-router-dom";
import {Pencil} from "react-bootstrap-icons";
import {useEffect} from "react";
import {apiLogout} from "@/api/user";
import {RootContextType} from "@/pages/root";

const Profile = () => {
  const {addToast} = useOutletContext<RootContextType>();
  const userInfo = useRecoilValue(userInfoState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const redirect = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      redirect('/login/?from=/user');
      return
    }
  }, [userInfo]);

  return (
      <Block>
        <>
          <Container className='d-flex justify-content-center gap-4'>
            <h5 className="mb-5">Информация о пользователе</h5>
          </Container>
          <Row>
            <Col xs="auto">
              <Container>
                <p>Имя пользователя:<span className="mx-3">{userInfo?.username}</span></p>
                <p>Пароль:<Button variant="outline-blue" className="mx-3" size="sm" style={{maxHeight: 20}}>Сменить
                  пароль</Button></p>
                <p>Эл. почта:<span className="mx-3">{userInfo?.email ?? '—'}<Pencil
                  className="mx-3 text-muted-blue pointer"/></span></p>
              </Container>
            </Col>
            <Col xs="auto">
              <Container>
                <p>SteamId:<span className="mx-3">{userInfo?.steamId ?? '—'}<Pencil
                  className="mx-3 text-muted-blue pointer"/></span></p>
                <p>Telegram:<span className="mx-3">{userInfo?.telegram ?? '—'}<Pencil
                  className="mx-3 text-muted-blue pointer"/></span></p>
                <p>VK:<span className="mx-3">{userInfo?.vk ?? '—'}<Pencil
                  className="mx-3 text-muted-blue pointer"/></span></p>
              </Container>
            </Col>
          </Row>
          <Container className='d-flex justify-content-end gap-4 mt-4'>
            <Button
              variant="outline-light"
              onClick={(e) => {
                e.preventDefault();
                apiLogout().then((data) => {
                  setUserInfo(undefined);
                  addToast(data);
                  redirect('/');
                });
              }}
            >
              Выйти
            </Button>
          </Container>
        </>
      </Block>
  )
}

export default Profile;