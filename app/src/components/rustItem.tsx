import {Image} from "react-bootstrap";
import {apiUrls} from "@/constants/api";
import {HTMLAttributes} from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  itemShortname: string,
  itemTitle: string,
  itemId: number,
  handleDoubleClick?: (id: number) => void,
  handleClick?: (id: number) => void
  itemCount?: number,
}

const RustItem = (
  {
    itemShortname,
    itemTitle,
    itemId,
    handleDoubleClick,
    handleClick,
    itemCount,
    ...props
  }: IProps
) => {
  const click = handleClick ? () => handleClick(itemId) : undefined;
  const doubleClick = handleDoubleClick ? () => handleDoubleClick(itemId) : undefined;

  return (
    <div className="d-flex flex-column align-items-center" style={{maxWidth: 100}} {...props}>
      <div className="position-relative">
        <strong
          className={!itemCount ? 'd-none' : 'position-absolute bottom-0 end-0 mb-4 me-4 h1 text-shadow'}>{itemCount}</strong>
        <Image
          src={apiUrls.itemDefaultIconUrl + itemShortname + apiUrls.defaultIconExtension}
          width={props.style?.maxWidth ?? 100}
          height={props.style?.maxWidth ?? 100}
          alt={itemTitle ?? itemShortname}
          onClick={click}
          onDoubleClick={doubleClick}
          className="pointer"
        />
      </div>
      <span style={{fontSize: props.style?.fontSize ?? '.7rem'}}
            className="float-end text-center text-nowrap">{itemTitle ?? itemShortname}</span>
    </div>
  )
}

export default RustItem;