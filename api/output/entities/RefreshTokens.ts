import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./Usuarios";

@Index("idx_refresh_tokens_expires_at", ["expiresAt"], {})
@Index("refresh_tokens_pkey", ["id"], { unique: true })
@Index("idx_refresh_tokens_token", ["token"], {})
@Index("refresh_tokens_token_key", ["token"], { unique: true })
@Index("idx_refresh_tokens_user_id", ["userId"], {})
@Entity("refresh_tokens", { schema: "public" })
export class RefreshTokens {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "user_id" })
  userId: number;

  @Column("text", { name: "token", unique: true })
  token: string;

  @Column("timestamp without time zone", { name: "expires_at" })
  expiresAt: Date;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "revoked_at", nullable: true })
  revokedAt: Date | null;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.refreshTokens, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "idUsuario" }])
  user: Usuarios;
}
