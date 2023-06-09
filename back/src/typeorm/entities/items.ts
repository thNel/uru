import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Skin} from "@/typeorm/entities/skins";

export enum ItemWinGroup {
  COMMON = 1,
  RARE = 3,
  EPIC = 5,
  LEGENDARY = 10,
  SPECIAL = 20,
}

@Entity({name: 'rust_items'})
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shortname: string;

  @Column()
  title: string;

  @Column({nullable: true})
  skinsAvailable: boolean;

  @Column({ type: 'enum', enum: ItemWinGroup, default: null, nullable: true })
  winGroup: ItemWinGroup;

  @Column({ type: 'integer', unsigned: true, default: 1, nullable: false })
  winCount: number;

  @OneToMany(() => Skin, (skins) => skins.item, {nullable: true, cascade: ['insert', 'recover', 'update']})
  skins: Skin[];
}