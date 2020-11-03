DROP TABLE IF EXISTS next_user;

CREATE TABLE location (
  id SERIAL PRIMARY KEY,
  street VARCHAR NOT NULL,
  street_number VARCHAR NOT NULL,
  postal_code VARCHAR NOT NULL,
  town VARCHAR NOT NULL,
  country VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS next_user (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  token_version VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  location_id SERIAL NOT NULL,
  CONSTRAINT fk_location
    FOREIGN KEY(location_id) 
      REFERENCES location(id)
);

INSERT INTO location (street,street_number,postal_code,town,country) VALUES ('Molenstraat','14','3730','Hoeselt','Belgium');

INSERT INTO next_user (username,password,token_version,email,location_id) VALUES ('Brianmarting','test', '0', 'brian.marting@hotmail.com', 1);
