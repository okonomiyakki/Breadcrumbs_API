interface EnvType {
  PORT: string | undefined;

  DB_HOST: string | undefined;
  DB_PORT: string | undefined;
  DB_NAME: string | undefined;
  DB_USERNAME: string | undefined;
  DB_PASSWORD: string | undefined;
}

export type EnvConfig = EnvType;
