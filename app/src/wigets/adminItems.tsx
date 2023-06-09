import Block from "../components/block";
import {useEffect, useState} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Image, Modal, Row} from "react-bootstrap";
import RustItem from "../components/rustItem";
import {getExcludedItemList, getItemList, sendItemList} from "@/api/items";
import {useNavigate, useOutletContext} from "react-router-dom";
import {userInfoState} from "@/store/userInfo";
import {itemsState} from "@/store/items";
import {RootContextType} from "@/pages/root";
import {ItemShortObject} from "@/interfaces";
import {apiUrls} from "@/constants/api";

const AdminItemList = () => {
  const redirect = useNavigate();
  const {addToast} = useOutletContext<RootContextType>();
  const [isChanged, setIsChanged] = useState(false);
  const [show, setShow] = useState(false);
  const [shortName, setShortName] = useState('');
  const [title, setTitle] = useState('');
  const userInfo = useRecoilValue(userInfoState);
  const items = useRecoilValue(itemsState);
  const setItems = useSetRecoilState(itemsState);

  const toggleSkinsAvailable = (id: number): void => {
    setItems(items.map(item => {
      if (item.id === id) {
        setIsChanged(true);
        return {...item, skinsAvailable: !item.skinsAvailable}
      } else {
        return item
      }
    }));
  };

  const addItem = (item: ItemShortObject) => {
    if (!items.find(it => it.shortname === item.shortname)) {
      setItems([{...item, skinsAvailable: false, skins: [], id: 0, winGroup: null, winCount: 1}, ...items]);
      setIsChanged(true);
      handleClose();
    } else {
      addToast({error: true, message: 'Такой предмет уже существует!'});
    }
  }

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (!userInfo) {
      redirect('/login/?from=/admin/items');
      return
    }
    if (!items.length)
      getItemList().then((data) => {
        setItems(data ?? []);
      })
  }, [userInfo])

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <Block className="mt-3">
        <Container className="d-flex flex-column justify-content-center align-items-center gap-4">
          <Container className="d-flex flex-row justify-content-center align-items-center gap-5">
            <Modal
              show={show}
              onHide={handleClose}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Введите данные предмета</Modal.Title>
              </Modal.Header>
              <Modal.Body className="d-flex flex-row gap-3">
                <div className="d-flex flex-column gap-3">
                  <Form className="d-flex flex-column gap-3">
                    <FormGroup>
                      <FormLabel htmlFor="shortname">Shortname: </FormLabel>
                      <FormControl
                        required
                        id="shortname"
                        placeholder="Кодовое название"
                        onChange={(e) => setShortName(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="title">Title: </FormLabel>
                      <FormControl
                        required
                        id="title"
                        placeholder="Наименование"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormGroup>
                  </Form>
                  <span>Не забудь добавить картинку на сервак!</span>
                  <Button
                    onClick={() => addItem({shortname: shortName, title})}
                  >
                    Добавить
                  </Button>
                </div>
                <Image
                  alt="Здесь будет картинка"
                  src={apiUrls.itemSteamIconUrl + shortName + apiUrls.defaultIconExtension}
                  style={{width: 200, height: 200}}
                />
              </Modal.Body>
            </Modal>
            <Button
              variant="outline-blue"
              disabled={!isChanged}
              onClick={() => {
                setIsChanged(false);
                sendItemList(items).then((data) => {
                  setItems(data);
                }).catch(() => setIsChanged(true));
              }}
            >
              Сохранить
            </Button>
            <Button
              variant="outline-blue"
              onClick={() => {
                setShow(true);
                getExcludedItemList();
              }}
            >
              Добавить предмет
            </Button>
          </Container>
          <Row className="d-flex flex-row justify-content-center align-items-start gap-5">
            <Col className="d-flex flex-column justify-content-start align-items-center gap-3">
              <h5>Skins&nbsp;available:</h5>
              <div className="wrapper">
                {items?.filter(item => item.skinsAvailable).map(item => (
                  <RustItem {...{
                    itemShortname: item.shortname,
                    itemTitle: item.title,
                    itemId: item.id,
                    handleDoubleClick: toggleSkinsAvailable
                  }} key={item.id}/>
                ))}
              </div>
            </Col>
            <Col className="d-flex flex-column justify-content-start align-items-center gap-3">
              <h5>Skins&nbsp;unavailable:</h5>
              <div className="wrapper">
                {items?.filter(item => !item.skinsAvailable).map(item => (
                  <RustItem {...{
                    itemShortname: item.shortname,
                    itemTitle: item.title,
                    itemId: item.id,
                    handleDoubleClick: toggleSkinsAvailable
                  }} key={item.id}/>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </Block>
    </div>
  )
}

export default AdminItemList;