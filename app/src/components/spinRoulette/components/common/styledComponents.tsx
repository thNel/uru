import {ImgHTMLAttributes} from "react";
import './styledComponents.css';

export const NonDraggableImage = ({style, alt, ...props}: ImgHTMLAttributes<HTMLImageElement>) => {
  return <img className="non-draggable" style={style} alt={alt} {...props}/>
}
