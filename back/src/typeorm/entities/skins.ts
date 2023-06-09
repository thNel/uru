import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Item} from "@/typeorm/entities/items";
import {SkinsCollection} from "@/typeorm/entities/skinCollection";

@Entity({name: 'rust_skins'})
export class Skin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, (item) => item.skins, {cascade: true})
  item: Item;

  @Column({type: 'bigint', nullable: false})
  skinId: number;

  @Column({nullable: false})
  skinTitle: string;

  @Column({nullable: false})
  previewUrl: string;

  @Column({nullable: false})
  requiredPermission: string;

  @ManyToOne(() => SkinsCollection, (collection) => collection.skins, {nullable: true, cascade: ['insert', 'recover', 'update']})
  collection: SkinsCollection | null;
}

@Entity({name: 'default_skins'})
export class DefaultSkin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  itemShortname: string;

  @Column({type: 'bigint', nullable: false})
  skinId: number;

  @Column({nullable: false})
  skinTitle: string;

  @Column({nullable: false, default: '/media/boar.png'})
  previewUrl: string;
}