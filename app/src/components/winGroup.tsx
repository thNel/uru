import {ItemWinGroup} from "@/constants/enums";
import RustItem from "@/components/rustItem";
import {Col} from "react-bootstrap";
import {SetterOrUpdater} from "recoil";
import {Dispatch, SetStateAction} from "react";
import DraggableItem from "@/components/draggableItem";
import {useDrop} from "react-dnd";
import {ItemInfo} from "@/interfaces/server";

const WinGroup = (
  {group, setIsChanged, items, setItems}:
    {
      group: ItemWinGroup | null,
      setIsChanged: Dispatch<SetStateAction<boolean>>,
      items: ItemInfo[],
      setItems: SetterOrUpdater<ItemInfo[]>,
    }
) => {

  const setWinGroup = (id: number, group: ItemWinGroup | null) => {
    setItems(items.map(item => {
      if (item.id === id) {
        setIsChanged(true);
        return {...item, winGroup: group}
      } else {
        return item
      }
    }));
  };

  const handleChangeCount = (id: number, count: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        setIsChanged(true);
        return {...item, winCount: count}
      } else {
        return item
      }
    }));
  }

  const [, dropRef] = useDrop({
    accept: 'rustItem',
    canDrop: (item: ItemInfo) => {
      return item.winGroup !== group
    },
    drop: (item) => {
      setWinGroup(item.id, group);
    },
  });

  return (
    <Col
      className="d-flex flex-column flex-grow-0 flex-shrink-0 justify-content-start align-items-center gap-3 border border-2 border-top-0 border-bottom-0 border-dark px-0"
      ref={dropRef}
    >
      <h5
        className="sticky-top border-dark border-bottom border-2 d-flex w-100 flex-row bg-dark-08 justify-content-center"
      >
        {group ?? 'Not Ranked'}:
      </h5>
      <div
        className="d-flex flex-row flex-wrap justify-content-start align-items-center gap-2 mx-2"
        style={{minWidth: 120}}
      >
        {items.filter(item => item.winGroup === group).map(item => (
          <DraggableItem key={item.id} item={item}>
            <>
              <RustItem {...{
                itemShortname: item.shortname,
                itemTitle: item.title,
                itemId: item.id,
              }}/>
              <input
                type="number"
                defaultValue={item.winCount}
                style={{maxWidth: 120, textAlign: "center"}}
                className={item.winGroup === null ? "d-none" : "mt-2"}
                onChange={(e) => {handleChangeCount(item.id, Number(e.target.value))}}
              />
            </>
          </DraggableItem>
        ))}
      </div>
    </Col>
  )
}

export default WinGroup;