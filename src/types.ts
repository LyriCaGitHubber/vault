export type DB = {
  credentials: Credential[];
};

export type Credential = {
  service: string;
  userName: string;
  password: string;
};
