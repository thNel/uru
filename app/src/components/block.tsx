import {HTMLAttributes, ReactElement} from "react";

interface IProps extends HTMLAttributes<HTMLDivElement>{
  children: ReactElement,
  className?: string,
}

const Block = ({children, className = '', ...props}: IProps) => {
  return (
    <div className={className + " rounded-4 bg-blue-08 shadow-URU text-URU-color p-3"} {...props}>
      {children}
    </div>
  )
}

export default Block;