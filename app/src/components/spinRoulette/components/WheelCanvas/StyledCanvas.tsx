import {CanvasHTMLAttributes, forwardRef} from "react";

const WheelCanvasStyle = forwardRef<HTMLCanvasElement, CanvasHTMLAttributes<HTMLCanvasElement>>(
  (props, ref) => {
    return <canvas ref={ref} {...props} />
  }
)


export default WheelCanvasStyle;