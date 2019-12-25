export interface DbConfig {
  host: string;
  port: number;
  dialect: string;
  database: string;
  username: string;
  password: string;
  define?: {
    underscored?: boolean;
  };
  sync?: {
    force?: boolean;
  }
}