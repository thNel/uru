import Block from "../components/block";
import {useEffect, useState} from "react";
import {Wheel} from "@/components/spinRoulette";
import {getRouletteItemList, getWin} from "@/api/roulette";
import {Item, ServerMessage} from "@/interfaces/server";
import {CloseButton, Container, Modal} from "react-bootstrap";
import RustItem from "@/components/rustItem";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {userInfoState} from "@/store/userInfo";
import {useOutletContext} from "react-router-dom";
import {RootContextType} from "@/pages/root";
import WinPossibility from "@/components/winPossibility";
import groupBy from "@/utils/groupBy";
import {Dict} from "@/interfaces";

const numberRustRouletteList = ['20', '1', '3', '1', '5', '1', '3', '1', '10', '1', '3', '1',
  '5', '1', '5', '3', '1', '10', '1', '3', '1', '5', '1', '3', '1',];

const outerRadius = 750;

const Roulette = (
  {
    children,
    isAllowedRoll
  }: {
    children: JSX.Element,
    isAllowedRoll: boolean,
  }
) => {
  const {addToast} = useOutletContext<RootContextType>();
  const userInfo = useRecoilValue(userInfoState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const [isSpinning, setIsSpinning] = useState(false);
  const [nextPrize, setNextPrize] = useState(0);
  const [winItem, setWinItem] = useState<Item | null>(null);
  const [show, setShow] = useState(false);
  const [spinned, setSpinned] = useState(false);
  const [user, setUser] = useState(userInfo);
  const [items, setItems] = useState<Item[] | undefined>(undefined);

  useEffect(() => {
    getRouletteItemList()
      .then((data) => {
        if (!!data) {
          setItems(data);
        }
      })
      .catch((e) => addToast({error: true, message: 'Что-то пошло не так', delay: 5000, ...e}));
  }, []);

  const handleSpin = () => {
    if (!isAllowedRoll || isSpinning)
      return
    getWin().then(data => {
      if (!!data) {
        setNextPrize(data.sector);
        setIsSpinning(true);
        setSpinned(true);
        setWinItem(data.item);
        setUser(data.user);
      }
    }).catch((e: ServerMessage) => {
      addToast(e);
    })
  }
  const handleStopSpin = () => {
    setIsSpinning(false);
    setTimeout(() => {
      setUserInfo(user);
      setShow(true);
    }, 100);
  }
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="text-URU-color"
        centered
      >
        <Modal.Body className="bg-blue-08 rounded-2">
          <div className="position-absolute end-0 top-0 justify-content-end align-items-end me-2 mt-2">
            <CloseButton variant="white" onClick={handleClose}/>
          </div>
          <Container className="d-flex flex-column justify-content-center align-items-center">
            <h5 className="text-center">Поздравляем, вы получаете:</h5>
            {winItem && <RustItem
              {...{
                itemShortname: winItem.shortname,
                itemTitle: winItem.title,
                itemId: 0,
                style: {maxWidth: 300, fontSize: 20},
                itemCount: winItem.winCount,
              }}
              key={winItem.shortname}
            />}
          </Container>
        </Modal.Body>
      </Modal>
      <Block
        className="d-flex flex-fill mh-100 flex-wrap justify-content-center align-items-center position-relative w-before-lg-100"
        style={{width: 'max-content'}}>
        <>
          <div
            className={!!userInfo ? 'd-none' : "d-flex flex-fill justify-content-center align-items-center position-absolute bg-dark-08  w-100 h-100 start-0 top-0"}
            style={{zIndex: 99}}
          >
            <h5 className="text-center">Необходима авторизация для использования рулетки.</h5>
          </div>
          <div
            className="d-flex flex-fill flex-wrap align-items-center justify-content-center gap-3 gap-md-5 p-2 mw-100"
            style={{height: 'min-content', width: 'min-content'}}>
            <div
              className="d-flex flex-fill justify-content-end"
            >
              <div
                onClick={handleSpin}
                className="d-flex justify-content-center align-items-center rounded-circle position-relative shadow-URU pointer flex-fill"
                style={{maxWidth: outerRadius, maxHeight: outerRadius, aspectRatio: '1/1'}}
              >
                {!isAllowedRoll && !isSpinning ? children : null}
                <Wheel
                  data={numberRustRouletteList.map(option => ({option}))}
                  mustStartSpinning={isSpinning}
                  prizeNumber={nextPrize}
                  startingOptionIndex={spinned ? undefined : userInfo?.lastPrize}
                  onStopSpinning={handleStopSpin}
                  pointerProps={{
                    src: '/media/wheel-pointer.png',
                    style: {
                      top: 0,
                      right: '50%',
                      translate: '50% -30%',
                      width: 40,
                      zIndex: 6,
                      filter: (!isAllowedRoll ? 'brightness(0.4) grayscale(0.7) contrast(0.8)' : undefined),
                    }
                  }}
                  innerBorderWidth={0}
                  outerBorderWidth={0}
                  radiusLineWidth={1}
                  backgroundColors={['rgba(0,0,0,0)']}
                  radiusLineColor={'rgba(0,0,0,0)'}
                  innerBorderColor={'rgba(0,0,0,0)'}
                  outerBorderColor={'rgba(0,0,0,0)'}
                  textColors={['rgba(0,0,0,0)']}
                  outerRadius={outerRadius}
                  innerRadius={50}
                  fontSize={14}
                  textDistance={80}
                  rotationContainerStyle={{
                    backgroundImage: `url('/media/fortuna.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: "contain",
                    overflow: 'hidden'
                  }}
                  perpendicularText
                />
              </div>
            </div>
            <div className="d-flex flex-fill justify-content-center">
              <div className="d-flex flex-column justify-content-between flex-fill gap-2 gap-xl-5">
                <div className="d-flex flex-row justify-content-center">
                  <h3 className="text-center">Что можно выиграть:</h3>
                </div>
                <div
                  className="d-flex flex-wrap align-items-center flex-fill justify-content-center gap-3"
                >
                  {!items && Object.entries({'1': [], '3': [], '5': [], '10': [], '20': []} as Dict<Item[]>).map(([winGroup, itemList]) =>
                    <WinPossibility winGroup={winGroup} itemList={itemList} key={winGroup}/>
                  )}
                  {items && Object.entries(groupBy(items.sort(() => Math.random() - 0.5), 'winGroup')).map(([winGroup, itemList]) =>
                    <WinPossibility winGroup={winGroup} itemList={itemList} key={winGroup}/>
                  )}
                </div>
                <div/>
              </div>
            </div>
          </div>
        </>
      </Block>
    </>
  )
}

export default Roulette;