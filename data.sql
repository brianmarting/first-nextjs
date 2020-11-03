DROP TABLE IF EXISTS next_user;

CREATE TABLE IF NOT EXISTS next_user (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  token_version VARCHAR NOT NULL,
  email VARCHAR NOT NULL
);

INSERT INTO next_user (username,password,token_version,email) VALUES ('nextuser','nothing', '0', 'next@gmail.com');
