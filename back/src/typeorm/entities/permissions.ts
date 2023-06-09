import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {SkinsCollection} from "@/typeorm/entities/skinCollection";

@Entity({name: 'PermissionsManager'})
export class SkinPermissions {
  @PrimaryColumn({type: "varchar", length: 17, collation: "utf8mb4_bin"})
  ID: string;

  @Column({type: "text", nullable: true, default: null, collation: "utf8mb4_bin"})
  Perms: string;

  @Column({type: 'text', nullable: true, default: null, collation: "utf8mb4_bin"})
  Players: string;

  @Column({type: "tinyint", precision: 4, nullable: true, default: null})
  Player: boolean;

  @ManyToOne(() => SkinsCollection, (collection) => collection.permissions, {nullable: true, cascade: ['insert', 'recover', 'update']})
  collection: SkinsCollection | null;
}