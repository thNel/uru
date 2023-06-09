import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {userInfoState} from "@/store/userInfo";
import {leadingZero} from "@/utils/leadingZero";

const RouletteOverlay = (
  {
    setIsAllowedRoll
  }: {
    setIsAllowedRoll: Dispatch<SetStateAction<boolean>>,
    isAllowedRoll: boolean,
  }
) => {
  const [whenAllowedRoll, setWhenAllowedRoll] = useState<string | null>('');
  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastRoll = new Date(userInfo?.lastRoll ?? 0).getTime();
      const time = (new Date()).getTime() - (lastRoll);
      const when = {
        sec: 59 - Math.floor((time / 1000) % 60),
        min: 59 - Math.floor((time / (1000 * 60)) % 60),
        hour: 11 - Math.floor(time / (1000 * 60 * 60)),
      }
      setWhenAllowedRoll(when.sec > 60 ? null : `${leadingZero(2, when.hour)}:${leadingZero(2, when.min)}:${leadingZero(2, when.sec)}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (whenAllowedRoll === null)
      setIsAllowedRoll(true);
  }, [whenAllowedRoll]);

  return (
    <div
      className="d-flex flex-column rounded-circle justify-content-center align-items-center bg-dark-08 position-absolute w-100 h-100 non-draggable"
      style={{zIndex: 5, aspectRatio: '1/1'}}
    >
      <h5 className="text-center">До следующей прокрутки:</h5>
      <h4 className="text-center">{whenAllowedRoll}</h4>
    </div>
  )
}

export default RouletteOverlay;