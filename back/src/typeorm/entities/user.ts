import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany, OneToOne,
} from 'typeorm';
import {Item} from "@/typeorm/entities/items";
import {SkinsCollection} from "@/typeorm/entities/skinCollection";

export enum UserGroup {
  ADMIN = 'admin',
  MODERATOR = 'moder',
  PEASANT = 'peasant',
}

export enum orderedItemType {
  SKIN = 'skin',
  ITEM = 'item',
}

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ type: 'enum', enum: UserGroup, default: UserGroup.PEASANT })
  userGroup: UserGroup;

  @Column({nullable: true})
  steamId: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  telegram: string;

  @Column({ nullable: true })
  vk: string;

  @Column({nullable: false})
  password: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  lastSeen: Date | null;

  @Column({type: 'tinyint', unsigned: true, nullable: true})
  lastPrize: number;

  @Column({type: 'tinyint', unsigned: true, default: 1, nullable: false})
  rollCount: number;

  @Column({type: 'timestamp', nullable: true, default: null})
  lastRoll: Date | null;

  @OneToMany(() => OrderedItem, (order) => order.user, {cascade: ['update', 'recover', 'insert']})
  orderedItems: OrderedItem[]

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}

@Entity({name: 'ordered_items'})
export class OrderedItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orderedItems)
  user: User;

  @Column({type: 'enum', enum: orderedItemType, default: orderedItemType.ITEM})
  type: orderedItemType;

  @ManyToOne(() => Item, {nullable: true})
  item: Item | null;

  @Column({unsigned: true, nullable: true, default: null})
  extraCount: number;

  @OneToOne(() => SkinsCollection, {nullable: true})
  skinCollection: SkinsCollection | null;
}