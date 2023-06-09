import {Container} from "react-bootstrap";
import Roulette from "@/wigets/roulette";
import {useEffect, useState} from "react";
import RouletteOverlay from "@/components/rouletteOverlay";
import Block from "@/components/block";
import ServerDescription from "@/wigets/serverDescription";
import {useRecoilValue} from "recoil";
import {userInfoState} from "@/store/userInfo";

const MainPage = () => {
  const [isAllowedRoll, setIsAllowedRoll] = useState(false);
  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    const lastRoll = new Date(userInfo?.lastRoll ?? 0).getTime();
    setIsAllowedRoll(
      !!userInfo?.rollCount ||
      ((new Date()).getTime() - (lastRoll)) > (1000 * 60 * 60 * 12)
    );
  }, [userInfo]);

  return (
    <Container className="d-flex flex-fill flex-row flex-wrap p-0 gap-3 m-0 mw-100">
      <Roulette {...{isAllowedRoll}}>
        <RouletteOverlay {...{setIsAllowedRoll, isAllowedRoll}}/>
      </Roulette>
      <ServerDescription/>
      <Block className="d-flex flex-fill flex-wrap w-100">
        <div className="d-flex flex-fill w-100 flex-column">
          <div className="d-flex flex-fill w-100 flex-row justify-content-center">
            <h5>Тут будет магазин</h5>
          </div>
        </div>
      </Block>
    </Container>
  )
}

export default MainPage;
