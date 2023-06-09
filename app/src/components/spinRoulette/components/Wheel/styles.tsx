import {NonDraggableImage} from '../common/styledComponents';
import {HTMLAttributes, ImgHTMLAttributes} from "react";


export const RouletteContainer = ({style, ...props}: HTMLAttributes<HTMLDivElement>) => {
  return <div
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      flexShrink: 0,
      pointerEvents: 'none',
      display: 'flex',
      aspectRatio: '1/1',
      ...style
    }} {...props} />
}

interface IProps extends HTMLAttributes<HTMLDivElement> {
  startRotationDegrees: number,
  classKey: string,
  startSpinningTime: number,
  continueSpinningTime: number,
  stopSpinningTime: number,
  finalRotationDegrees: number,
}

export const RotationContainer = (
  {
    startRotationDegrees,
    classKey,
    startSpinningTime,
    continueSpinningTime,
    stopSpinningTime,
    finalRotationDegrees,
    style,
    ...props
  }: IProps
) => {

  const animation =
    `spin-${classKey} ${startSpinningTime}ms cubic-bezier(0.71, -0.29, 0.96, 0.9) 0s 1 normal forwards running,
  continueSpin-${classKey} ${continueSpinningTime}ms linear ${startSpinningTime}ms 1 normal forwards running,
  stopSpin-${classKey} ${stopSpinningTime}ms cubic-bezier(0, 0, 0.35, 1.02) ${startSpinningTime + continueSpinningTime}ms 1 normal forwards running`

  return (<>
    <style>
      {
        `@keyframes spin-${classKey} {
          from {
            transform: rotate(${startRotationDegrees}deg);
          }
          to {
            transform: rotate(${startRotationDegrees + 360}deg);
          }
        }
        @keyframes continueSpin-${classKey} {
          from {
            transform: rotate(${startRotationDegrees}deg);
          }
          to {
            transform: rotate(${startRotationDegrees + 360}deg);
          }
        }
        @keyframes stopSpin-${classKey} {
          from {
            transform: rotate(${startRotationDegrees}deg);
          }
          to {
            transform: rotate(${1440 + finalRotationDegrees}deg);
          }
        }`
      }
    </style>
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        aspectRatio: '1/1',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `rotate(${startRotationDegrees}deg)`,
        animation: props.className?.includes('started-spinning') ? animation : undefined,
        ...style
      }} {...props}/>
  </>)
}

export const RoulettePointerImage = ({style, ...props}: ImgHTMLAttributes<HTMLImageElement>) => {
  return <NonDraggableImage style={{
    position: 'absolute',
    zIndex: 5,
    width: '17%',
    right: 6,
    top: 15,
    ...style
  }}  {...props}/>
}
