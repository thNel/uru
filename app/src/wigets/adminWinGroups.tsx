import Block from "../components/block";
import {useEffect, useState} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {Button, Container, Row} from "react-bootstrap";
import {getItemList, sendItemList} from "@/api/items";
import {useNavigate} from "react-router-dom";
import {userInfoState} from "@/store/userInfo";
import {itemsState} from "@/store/items";
import {ItemWinGroup} from "@/constants/enums";
import WinGroup from "@/components/winGroup";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const AdminWinGroups = () => {
  const redirect = useNavigate();
  const [isChanged, setIsChanged] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const items = useRecoilValue(itemsState);
  const setItems = useSetRecoilState(itemsState);


  useEffect(() => {
    if (!userInfo) {
      redirect('/login/?from=/admin/win-groups');
      return
    }
  }, [userInfo])

  useEffect(() => {
    if (!items.length)
      getItemList().then((data) => {
        setItems(data ?? []);
      })
  }, [items]);

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <Block className="mt-3">
        <Container className="d-flex flex-column justify-content-center align-items-center gap-4"
                   style={{minWidth: 820}}>
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
          <Row
            className="d-flex flex-row justify-content-center
            align-items-start gap-3 h-100 position-relative align-items-stretch"
          >
            <DndProvider backend={HTML5Backend}>
            <WinGroup
              setIsChanged={setIsChanged}
              group={ItemWinGroup.COMMON}
              items={items}
              setItems={setItems}
            />
            <WinGroup
              setIsChanged={setIsChanged}
              group={ItemWinGroup.RARE}
              items={items}
              setItems={setItems}
            />
            <WinGroup
              setIsChanged={setIsChanged}
              group={ItemWinGroup.EPIC}
              items={items}
              setItems={setItems}
            />
            <WinGroup
              setIsChanged={setIsChanged}
              group={ItemWinGroup.LEGENDARY}
              items={items}
              setItems={setItems}
            />
            <WinGroup
              setIsChanged={setIsChanged}
              group={ItemWinGroup.SPECIAL}
              items={items}
              setItems={setItems}
            />
            <WinGroup
              setIsChanged={setIsChanged}
              group={null}
              items={items}
              setItems={setItems}
            />
            </DndProvider>
          </Row>
        </Container>
      </Block>
    </div>
  )
}

export default AdminWinGroups;