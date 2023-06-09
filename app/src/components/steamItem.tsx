import {SkinDefault, SkinInfo} from "@/interfaces/server";
import {Image} from "react-bootstrap";

const SteamItem = ({skin, handleClick}:{skin: SkinInfo | SkinDefault, handleClick?: (skin: SkinInfo | SkinDefault) => void}) => {
  const click = handleClick ? () => handleClick(skin): undefined;
  return (
    <div className="d-flex flex-column align-items-center" style={{maxWidth: 100}}>
      <Image
        src={skin.previewUrl}
        width={100}
        height={100}
        alt={skin.skinTitle}
        onClick={click}
        className="pointer"
      />
      <span style={{fontSize: '.7rem'}} className="float-end">{skin.skinTitle}</span>
    </div>
  )
}

export default SteamItem;