import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./usuarios.entity";

@Index("idx_refresh_tokens_expires_at", ["expiresAt"], {})
@Index("refresh_tokens_pkey", ["id"], { unique: true })
@Index("refresh_tokens_token_key", ["token"], { unique: true })
@Index("idx_refresh_tokens_token", ["token"], {})
@Index("idx_refresh_tokens_user_id", ["userId"], {})
@Entity("refresh_tokens", { schema: "public" })
export class RefreshTokens {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  public id: number;

  @Column("integer", { name: "user_id" })
  public userId: number;

  @Column("text", { name: "token", unique: true })
  public token: string;

  @Column("timestamp without time zone", { name: "expires_at" })
  public expiresAt: Date;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  public createdAt: Date;

  @Column("timestamp without time zone", { name: "revoked_at", nullable: true })
  public revokedAt: Date | null;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.refreshTokens, {
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "idUsuario" }])
  public user: Promise<Usuarios>;
}
