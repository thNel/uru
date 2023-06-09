import {Dispatch, SetStateAction, useState} from "react";
import {ChevronDown, ChevronUp} from "react-bootstrap-icons";
import {Button, CloseButton, Image, Table} from "react-bootstrap";
import groupBy from "@/utils/groupBy";
import RustItem from "@/components/rustItem";
import {addSkin, delSkin} from "@/api/items";
import SteamItem from "@/components/steamItem";
import {SkinInfo, SkinsCollection} from "@/interfaces/server";
import {Dict} from "@/interfaces";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {skinsState} from "@/store/skins";
import {useOutletContext} from "react-router-dom";
import {RootContextType} from "@/pages/root";

interface Props {
  permission: string,
  permissionGrouped: SkinInfo[],
  handleShowDefault: (shortname: string, permission: string, collection: SkinsCollection | null) => void,
  setSelectedPermission: Dispatch<SetStateAction<string>>,
  setShow: Dispatch<SetStateAction<boolean>>,
  collection: SkinsCollection | null,
}

const AdminSkinsKit = (
  {
    permission,
    permissionGrouped,
    handleShowDefault,
    setSelectedPermission,
    collection,
    setShow
  }: Props
) => {
  const [shown, setShown] = useState(false);
  const [skinId, setSkinId] = useState<Dict>({});
  const skins = useRecoilValue(skinsState);
  const setSkins = useSetRecoilState(skinsState);
  const {addToast} = useOutletContext<RootContextType>();

  const handleAddSkin = (skin: SkinInfo) => {
    setSkins([...skins, skin])
  };
  const handleShow = (permission: string) => {
    setSelectedPermission(permission);
    setShow(true)
  };

  return (
    <tr className="border-bottom">
      <td className="border-end">
        <div
          className="d-flex flex-wrap flex-fill gap-3 justify-content-end pointer position-sticky top-0"
          onClick={() => setShown(!shown)}
        >
          <div className="d-flex w-100 flex-nowrap justify-content-end text-nowrap gap-3 align-items-center">
            <span className="text-info">Title:</span><h5>{permissionGrouped[0]?.collection?.title ?? 'NONE'}:</h5>{!shown ? <ChevronDown/> : <ChevronUp/>}
          </div>
          <div
            className="d-flex flex-fill justify-content-end flex-nowrap text-nowrap align-items-center text-end"
            style={{width: 'min-content', height: 'min-content', maxHeight: 150, aspectRatio: '1/1'}}
          >
            <span className="text-info">Thumb:</span>
            <div
              className="d-flex justify-content-center flex-nowrap text-nowrap"
              style={{maxHeight: 150, aspectRatio: '1/1'}}
            >
              <Image
                fluid
                src={permissionGrouped[0]?.collection?.thumbnailUrl}
                alt={permissionGrouped[0]?.collection?.title ?? 'NONE'}
              />
            </div>
          </div>
          <div className="d-flex w-100 flex-nowrap justify-content-end gap-3 align-items-center text-nowrap">
            <span className="text-info">permission:</span> {permission}
          </div>
        </div>
      </td>
      <td>
        <Table className={"text-URU-color " + (!shown ? 'd-none' : '')}>
          <tbody>
          {Object.entries(groupBy(permissionGrouped, 'item.id')).map(([id, groupedByItem]) => {
            const shortname = groupedByItem[0].item.shortname;
            const title = groupedByItem[0].item.title;
            return (
              <tr key={permission + shortname} className={!Number(id) || !shown ? 'd-none' : ''}>
                <td className="border-end">
                  <RustItem itemShortname={shortname} itemTitle={title} itemId={Number(id)}/>
                </td>
                <td className="border-end">
                  <div className="wrapper">
                    {groupedByItem.map((skin) => (
                      <div key={permission + shortname + skin.skinId} className={!skin.id ? 'd-none' : ''}>
                        <div className="position-absolute d-flex justify-content-end align-items-end"
                             style={{width: 100}}>
                          <CloseButton
                            onClick={() => delSkin(skin).then((data) => setSkins(data))}
                          />
                        </div>
                        <SteamItem skin={skin}/>
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="d-flex flex-column gap-2">
                    <label htmlFor={"skinId-" + permission + shortname}>SkinId:</label>
                    <input
                      type="text"
                      id={"skinId-" + permission + shortname}
                      style={{width: 100}}
                      defaultValue={skinId["skinId-" + permission + shortname]}
                      onChange={(e) => {
                        setSkinId({...skinId, ["skinId-" + permission + shortname]: e.target.value});
                      }}
                    />
                    <Button
                      variant="outline-blue"
                      disabled={!skinId["skinId-" + permission + shortname]}
                      onClick={() => {
                        if (!skins.find(item => (Number(item.skinId) === Number(skinId)) && item.requiredPermission === permission))
                          addSkin({
                            item: groupedByItem[0].item,
                            skinId: Number(skinId["skinId-" + permission + shortname]),
                            skinTitle: '',
                            id: 0,
                            requiredPermission: permission,
                            previewUrl: '',
                            collection: collection,
                          }).then((data) => {
                            if (data)
                              handleAddSkin(data);
                          });
                        else
                          addToast({
                            error: true,
                            message: 'Скин уже есть в наборе',
                            delay: 5000,
                          })
                        setSkinId({...skinId, ["skinId-" + permission + shortname]: ''});
                        const input = document.getElementById("skinId-" + permission + shortname) as HTMLInputElement;
                        if (input)
                          input.value = '';
                      }}
                    >
                      Добавить
                    </Button>
                    <Button variant="outline-blue" onClick={() => handleShowDefault(shortname, permission, collection)}>
                      Выбрать
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })}
          <tr>
            <td className="border-bottom-0">
              <Button
                variant="outline-blue"
                onClick={() => handleShow(permission)}
              >
                Добавить предмет
              </Button>
            </td>
            <td className="border-bottom-0"/>
            <td className="border-bottom-0"/>
          </tr>
          </tbody>
        </Table>
      </td>
    </tr>
  )
}

export default AdminSkinsKit;