import {Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn} from "typeorm";
import {SkinPermissions} from "@/typeorm/entities/permissions";
import {Skin} from "@/typeorm/entities/skins";

@Entity({name: 'skins_collection'})
export class SkinsCollection {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => SkinPermissions, (permissions) => permissions.collection, {cascade: ['insert', 'recover', 'update']})
  @JoinColumn()
  permissions: SkinPermissions[];

  @OneToMany(() => Skin, (skin) => skin.collection, {cascade: ['insert', 'recover', 'update']})
  @JoinColumn()
  skins: Skin[];

  @Column({nullable: false, default: '/media/none.png'})
  thumbnailUrl: string;

  @Column()
  title: string;
}