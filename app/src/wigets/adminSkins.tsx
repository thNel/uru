import {useEffect, useState} from "react";
import {Item, SkinInfo, SkinsCollection} from "@/interfaces/server";
import {useRecoilValue, useSetRecoilState} from "recoil";
import Block from "../components/block";
import {Button, Col, Container, Modal, Row, Table} from "react-bootstrap";
import groupBy from "../utils/groupBy";
import RustItem from "../components/rustItem";
import SteamItem from "../components/steamItem";
import {addSkin, delSkin, getDefaultSkinList, getItemList, getSkinList} from "@/api/items";
import {useNavigate, useOutletContext} from "react-router-dom";
import {RootContextType} from "@/pages/root";
import {userInfoState} from "@/store/userInfo";
import {itemsState} from "@/store/items";
import {skinsDefaultState, skinsState} from "@/store/skins";
import {Dict, ItemShortObject} from "@/interfaces";
import AdminSkinsKit from "@/components/adminSkinsKit";

const AdminSkins = () => {
  const redirect = useNavigate();
  const {addToast} = useOutletContext<RootContextType>();
  const [groupedByPermission, setGroupedByPermission] = useState<Dict<SkinInfo[]>>({'permission': []});
  const [usedItems, setUsedItems] = useState<Dict<ItemShortObject[]>>({'permission': []});
  const [unusedItems, setUnusedItems] = useState<Dict<ItemShortObject[]>>({'permission': []});
  const [show, setShow] = useState(false);
  const [showDefault, setShowDefault] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<SkinsCollection | null>(null);
  const [selectedShortname, setSelectedShortname] = useState('');
  const [newCollection, setNewCollection] = useState<{title?: string, thumb?: string, perm?: string} | null>(null);
  const userInfo = useRecoilValue(userInfoState);
  const items = useRecoilValue(itemsState);
  const setItems = useSetRecoilState(itemsState);
  const skins = useRecoilValue(skinsState);
  const setSkins = useSetRecoilState(skinsState);
  const defaultSkins = useRecoilValue(skinsDefaultState);
  const setDefaultSkins = useSetRecoilState(skinsDefaultState);

  const handleClose = () => {
    setShow(false);
    setShowDefault(false);
  };

  const handleShowDefault = (shortname: string, permission: string, collection: SkinsCollection | null) => {
    setSelectedShortname(shortname);
    setSelectedPermission(permission);
    setSelectedCollection(collection);
    setShowDefault(true);
  }

  const handleAddSkin = (skin: SkinInfo) => {
    setSkins([...skins, skin])
  };

  const handleAddItem = (collection: {title?: string, thumb?: string, perm?: string} | null, item: Item) => {
    handleAddSkin({
      item: item,
      skinId: 0,
      requiredPermission: collection?.perm ?? 'skins.none',
      previewUrl: '',
      skinTitle: 'НЕ ТРОГАТЬ',
      id: 0,
      collection: {id: 0, title: collection?.title ?? 'NONE', thumbnailUrl: collection?.thumb ?? 'NONE'},
    })
  }

  const handleItemOperation = (itemShortname: string) => {
    const used = usedItems[selectedPermission].find(item => item.shortname === itemShortname);
    const unUsed = unusedItems[selectedPermission].find(item => item.shortname === itemShortname);
    if (used) {
      skins
        .filter(skin => skin.requiredPermission === selectedPermission)
        .filter(skin => skin.item.shortname === itemShortname)
        .forEach(skin => delSkin(skin));
      setSkins([...skins.filter(skin => !(skin.requiredPermission === selectedPermission && skin.item.shortname === itemShortname))]);
    }
    if (unUsed) {
      const item = items?.find(item => item.shortname === itemShortname);
      if (!!item)
        handleAddItem({
          perm: selectedPermission,
          thumb: selectedCollection?.thumbnailUrl ?? 'NONE',
          title: selectedCollection?.title ?? 'NONE'
        }, {...item, skins: false});
    }

  };

  const handleAddCollection = () => {
    const input = document.getElementById("addCollectionTitle") as HTMLInputElement;
    const input2 = document.getElementById("addCollectionThumb") as HTMLInputElement;
    const input3 = document.getElementById("addCollectionPerm") as HTMLInputElement;
    if (input) input.value = '';
    if (input2) input2.value = '';
    if (input3) input3.value = '';
    handleAddItem(newCollection, {id: 0, shortname: '', skinsAvailable: false, title: '', winGroup: null, winCount: 1});
    setNewCollection(null);
  }

  useEffect(() => {
    if (!userInfo) {
      redirect('/login/?from=/admin/skins');
      return
    }
    if (!items.length)
      getItemList().then((data) => {
        setItems(data?.filter(item => item.skinsAvailable) ?? []);
      })
    if (!skins.length)
      getSkinList().then((data) => {
        setSkins(data ?? []);
      })
    if (!defaultSkins.length)
      getDefaultSkinList().then((data) => {
        setDefaultSkins(data ?? []);
      })
  }, [userInfo, items, skins, defaultSkins])

  useEffect(() => {
    const grouped = groupBy(skins, 'requiredPermission');
    setGroupedByPermission(grouped);
    const calculatedUsedItems = {} as Dict<{ title: string, shortname: string }[]>;
    const calculatedUnusedItems = {} as Dict<{ title: string, shortname: string }[]>;
    Object.entries(grouped).map(([permission, groupedByPermission]) => {
      const abc = calculatedUsedItems[permission] ?? [];
      abc.push(
        ...groupedByPermission.map(skin => ({shortname: skin.item.shortname, title: skin.item.title}))
          .filter((item, index, self) => index === self.findIndex(itm => itm.shortname === item.shortname))
      );
      calculatedUsedItems[permission] = abc;
      Object.entries(calculatedUsedItems).map(([permission, groupedByPermission]) => {
        const abc = calculatedUnusedItems[permission] ?? [];
        abc.push(...items
          .map(it => ({shortname: it.shortname, title: it.title}))
          .filter((it2) => abc.findIndex(itm => itm.shortname === it2.shortname) === -1)
          .filter(it => groupedByPermission.findIndex(itm2 => itm2.shortname === it.shortname) === -1)
        );
        calculatedUnusedItems[permission] = abc;
      })
    })
    setUsedItems(calculatedUsedItems);
    setUnusedItems(calculatedUnusedItems);
  }, [skins])

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <Block className="mt-3">
        <Container className="d-flex flex-column justify-content-center align-items-center gap-4">
          <Modal
            show={show}
            onHide={handleClose}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Выбери какие предметы добавить</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="d-flex flex-row justify-content-center align-items-start gap-5">
                <Col className="d-flex flex-column justify-content-start align-items-center gap-3">
                  <h5>Included:</h5>
                  <div className="wrapper">
                    {usedItems[selectedPermission]?.map(item => (
                      <RustItem
                        {...{
                          itemShortname: item.shortname,
                          itemTitle: item.title,
                          itemId: 0,
                          handleDoubleClick: () => handleItemOperation(item.shortname)
                        }}
                        key={item.shortname}
                        className={!item ? 'd-none' : ''}
                      />
                    ))}
                  </div>
                </Col>
                <Col className="d-flex flex-column justify-content-start align-items-center gap-3">
                  <h5>Excluded:</h5>
                  <div className="wrapper">
                    {unusedItems[selectedPermission]?.map(item => (
                      <RustItem
                        {...{
                          itemShortname: item.shortname,
                          itemTitle: item.title,
                          itemId: 0,
                          handleDoubleClick: () => handleItemOperation(item.shortname)
                        }}
                        key={item.shortname}
                        className={!item ? 'd-none' : ''}
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
          <Modal
            show={showDefault}
            onHide={handleClose}
            dialogClassName="modal-50w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Выбери какой скин добавить</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="d-flex flex-row justify-content-center align-items-start gap-5">
                <Col className="d-flex flex-column justify-content-start align-items-center gap-3">
                  <div className="wrapper">
                    {defaultSkins
                      .filter(skin => skin.itemShortname === selectedShortname)
                      .filter(skin => !groupedByPermission[selectedPermission].find(elem => elem.skinId === skin.skinId))
                      .map(item => {
                        const itemObj = items.find(elem => elem.shortname === item.itemShortname);
                        return itemObj ? (
                            <SteamItem
                              key={item.id}
                              skin={item}
                              handleClick={() => {
                                handleAddSkin({
                                  ...item,
                                  requiredPermission: selectedPermission,
                                  item: {...itemObj, skins: false},
                                  collection: null,
                                });
                                addSkin({
                                  item: {...itemObj, skins: false},
                                  skinId: item.skinId,
                                  skinTitle: item.skinTitle,
                                  id: 0,
                                  requiredPermission: selectedPermission,
                                  previewUrl: item.previewUrl,
                                  collection: selectedCollection,
                                });
                              }}
                            />
                          )
                          : null
                      })}
                  </div>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
          <Button
            variant="blue"
            onClick={() => {
              const json: {
                "Item Shortname": string,
                "Permission": string,
                "Skins": number[]
              }[] = [];
              Object.entries(groupedByPermission).map(([permission, permissionGrouped]) => {
                Object.entries(groupBy(permissionGrouped, 'item.shortname')).map(([shortname, groupedByItem]) => {
                  json.push({
                    "Item Shortname": shortname,
                    "Permission": permission,
                    "Skins": groupedByItem.map(skin => Number(skin.skinId))
                  })
                });
              });
              navigator.clipboard.writeText(JSON.stringify(json))
                .then(() => addToast({message: 'Скопировано!', success: true, delay: 3000}));
            }}
          >
            Получить JSON
          </Button>
          <Table className="text-URU-color">
            <tbody>
            {Object.entries(groupedByPermission).map(([permission, permissionGrouped]) =>
              <AdminSkinsKit key={permission} {...{
                permission,
                permissionGrouped,
                handleShowDefault,
                setSelectedPermission,
                setShow,
                collection: permissionGrouped[0]?.collection,
              }} />
            )}
            <tr className="border-bottom-0">
              <td className="border-end border-bottom-0">
                <div className="d-flex justify-content-end flex-column gap-2 text-nowrap">
                  <div className="d-flex flex-nowrap flex-fill justify-content-end">
                    <label htmlFor="addCollectionTitle">
                      Title:&nbsp;&nbsp;
                    </label>
                    <input
                      type="text"
                      id="addCollectionTitle"
                      style={{width: 100}}
                      onChange={(e) => setNewCollection({...newCollection, title: e.target.value})}
                    />
                  </div>
                  <div className="d-flex flex-nowrap flex-fill justify-content-end">
                    <label htmlFor="addCollectionThumb">
                      Thumbnail:&nbsp;&nbsp;<span className="text-info">/media/collections/</span>
                    </label>
                    <input
                      type="text"
                      id="addCollectionThumb"
                      className="d-flex"
                      style={{width: 100}}
                      onChange={(e) => setNewCollection({...newCollection, thumb: '/media/collections/' + e.target.value})}
                    />
                  </div>
                  <div className="d-flex flex-nowrap flex-fill justify-content-end">
                    <label htmlFor="addCollectionPerm">
                      Permission:&nbsp;&nbsp;<span className="text-info">skins.</span>
                    </label>
                    <input
                      type="text"
                      id="addCollectionPerm"
                      style={{width: 100}}
                      onChange={(e) => setNewCollection({...newCollection, perm: 'skins.' + e.target.value})}
                    />
                  </div>
                  <Button
                    variant="outline-blue"
                    disabled={!newCollection?.perm || !newCollection?.thumb || !newCollection?.title}
                    onClick={handleAddCollection}
                  >
                    Добавить
                  </Button>
                </div>
              </td>
              <td className="border-bottom-0"/>
            </tr>
            </tbody>
          </Table>
        </Container>
      </Block>
    </div>
  )
}

export default AdminSkins;