import {Outlet, Link, useNavigation} from "react-router-dom";
import {Col, Container, Image, Navbar, Offcanvas, Row, Spinner, Toast, ToastContainer} from "react-bootstrap";
import {ReactElement, useCallback, useEffect, useState} from "react";
import MainMenu from "../components/mainMenu";
import Block from "../components/block";
import TimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru.json';
import ReactTimeAgo from "react-time-ago";
import {toastState} from "@/store/toasts";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {userInfoState} from "@/store/userInfo";
import useWindowSize from "../hooks/useWindowSize";
import {getUserInfo} from "@/api/user";
import {ServerMessage} from "@/interfaces/server";

TimeAgo.addDefaultLocale(ru);

export type RootContextType = { addToast: (toast: ServerMessage) => void };

const Root = ({children}: { children?: ReactElement }) => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [windowWidth, windowHeight] = useWindowSize();
  const [bgImageWidth, bgImageHeight] = [2048, 1152];
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toastList = useRecoilValue(toastState);
  const userInfo = useRecoilValue(userInfoState);
  const setToastList = useSetRecoilState(toastState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const deleteToast = (id: number) => {
    const index = toastList.findIndex(elem => elem.id === id)
    const newList = [...toastList.slice(0, index), ...toastList.slice(index + 1)];
    setToastList(newList);
  };
  const addToast = (toast: ServerMessage) => {
    setToastList([
      ...toastList,
      {
        ...toast,
        id: (toastList[(toastList.length ?? 1) - 1]?.id ?? 0) + 1,
        time: new Date(),
      }
    ])
  }

  useEffect(() => {
    const proportion = (windowWidth / bgImageWidth);
    const startPercent = ((proportion * bgImageHeight) / windowHeight) * 20;
    const endPercent = ((proportion * bgImageHeight) / windowHeight) * 99;
    document.getElementById('bg-image')?.setAttribute('style',
      `background-image: linear-gradient(to bottom, rgba(6,31,51,0) -${startPercent}%, rgba(6,31,51,1) ${Math.round(endPercent)}%, rgba(6,31,51,1) 100%), url("/media/BG.jpg")`
    );
  }, [windowWidth, windowHeight]);



  const fetchUser = useCallback(async () => {
    if (!userInfo) {
      setIsPreloader(true);
      try {
        setUserInfo(await getUserInfo());
        setIsPreloader(false);
      } catch (e) {
        console.error(e);
        setIsPreloader(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchUser().then(() => null);
  }, [fetchUser]);

  return (
    <Container
      fluid
      className="d-flex flex-row min-vh-100 w-100 gap-2 ps-0"
    >
      <Col>
        <Offcanvas show={show} onHide={handleClose} className="bg-blue rounded-top-right-4" style={{width: 151}}>
          <Offcanvas.Header closeButton closeVariant="white" className="align-items-start">
            <Offcanvas.Title className="d-flex justify-content-center mt-5">
              <Link to={"/"}>
                <Image alt="logo" src="/media/URU(256).png" className="ps-3" height={30}/>
              </Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex justify-content-center">
            {isPreloader
              ? <Spinner variant="primary" animation="border"/>
              : <MainMenu/>
            }
          </Offcanvas.Body>
        </Offcanvas>
        <Navbar
          collapseOnSelect
          expand="sm"
          variant="dark"
          sticky="top"
          as={Col}
          xs="auto"
          className="d-none d-ssm-flex flex-column justify-content-start h-100 wh-100 position-fixed start-0 ps-1 ps-sm-3 pe-1 pe-sm-2 rounded-top-right-4 mt-3 shadow-URU bg-blue"
          style={{width: 150}}
        >
          <Navbar.Brand as={Link} to={"/"} className="mt-5 pb-3">
            <Image alt="logo" src="/media/URU(256).png" className="ps-2" height={30}/>
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav" className="flex-column pt-3" style={{flexBasis: 'auto'}}>
            {isPreloader
              ? <Spinner variant="primary" animation="border"/>
              : <MainMenu/>
            }
          </Navbar.Collapse>
        </Navbar>
        <Navbar
          expand="md"
          className="position-absolute mt-3 bg-blue d-ssm-none"
          sticky="top"
          variant="dark"
        >
          <Navbar.Toggle onClick={handleShow} className="position-absolute bg-blue"/>
        </Navbar>
      </Col>
      <Col xs={12} id="detail" className="d-flex mw-100 justify-content-center min-vh-100">
        <div className={navigation.state === "loading" ? "fade show offcanvas-backdrop" : ""}/>
        <ToastContainer position="top-end" className="p-3">
          {toastList.map((item) => (
            <Toast
              key={item.id}
              bg={item.success ? "success" : item.error ? "danger" : "secondary"}
              onClose={() => {
                deleteToast(item.id);
              }} delay={item.delay} autohide={!!item?.delay}
            >
              <Toast.Header>
                <strong className="me-auto">{item.sender ?? 'URU'}</strong>
                <small className="text-muted"><ReactTimeAgo date={item.time} timeStyle="round"/></small>
              </Toast.Header>
              <Toast.Body>{item.message}</Toast.Body>
            </Toast>
          ))}
        </ToastContainer>
        <Container
          className={"d-flex flex-column justify-content-start ms-sm-150p mw-100"}
        >
          <div className="d-flex justify-content-around container-fluid">
            <Block
              className="d-flex flex-column container-fluid justify-content-center align-items-center px-5 gap-4 mt-5-5 mt-ssm-3">
              <>
              <span style={{fontSize: 'max(2.5vw, 3.5vh)'}} className="text-center">
                Ural Rust University&nbsp;
                <span className="d-none d-md-inline-block">
                  |&nbsp;Rate&nbsp;x2 |&nbsp;Large&nbsp;Stacks |&nbsp;Taxi |&nbsp;Max&nbsp;5
                </span>
              </span>
                <Row
                  className="d-flex flex-row justify-content-center align-items-center flex-fill container-fluid gap-4">
                  <Col className="d-none d-lg-flex justify-content-center align-items-center">
                    <a href="steam://run/252490//+connect 185.189.255.246:36200" className="rounded-4 text-decoration-none">
                      <div
                        className="shadow-URU-0 position-relative rounded-4 h-10 d-flex flex-fill align-items-center justify-content-center overflow-hidden"
                        style={{backgroundColor: '#454545', minWidth: 188}}>
                        <Image src="/media/steam-connect.png" className="position-absolute w-100"
                               alt='steam-connect'/>
                        <div
                          className="d-flex justify-content-center align-items-center steam-btn steam-from-left p-3 rounded-4">
                          <strong style={{fontSize: '0.88em'}}>Подключиться к серверу</strong>
                        </div>
                      </div>
                    </a>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center"
                       style={{fontSize: 'max(1.5vw, 2.5vh)'}}>
                    <span className="text-center">Игроков на сервере:&nbsp;20&nbsp;/&nbsp;100</span>
                  </Col>
                </Row>
              </>
            </Block>
          </div>
          <Container fluid className="d-flex flex-row mh-100 mw-100 flex-fill pt-3">
          {isPreloader
            ? <Container
              fluid
              className="gap-3 d-flex flex-column align-items-center justify-content-center mt-3"
            >
              <Spinner variant="primary" animation="border"/>
            </Container>
            : (children ?? <Outlet context={{addToast}}/>)
          }
          </Container>
        </Container>
      </Col>
    </Container>
  )
    ;
}

export default Root;