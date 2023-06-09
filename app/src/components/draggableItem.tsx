import {ReactElement} from "react";
import {useDrag} from 'react-dnd'
import {ItemInfo} from "@/interfaces/server";

const DraggableItem = ({children, item}: { children?: ReactElement, item: ItemInfo }) => {
  const [{opacity}, dragRef] = useDrag({
    type: 'rustItem',
    item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <div ref={dragRef} style={{opacity}}>
      {children}
    </div>
  )
}

export default DraggableItem;