CREATE TABLE "users" (
  "id" BIGSERIAL,
  "username" varchar,
  "hashed_password" varchar NOT NULL,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "address" varchar NOT NULL,
  "address2" varchar NOT NULL,
  "city" varchar NOT NULL,
  "country" varchar NOT NULL,
  "is_email_verified" boolean NOT NULL DEFAULT false,
  "password_changed_at" timestamptz NOT NULL DEFAULT '0001-01-01',
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  PRIMARY KEY ("id", "username")
);

CREATE TABLE "sessions" (
  "id" BIGSERIAL PRIMARY KEY,
  "username" varchar NOT NULL,
  "refresh_token" varchar NOT NULL,
  "user_agent" varchar NOT NULL,
  "client_ip" varchar NOT NULL,
  "is_blocked" boolean NOT NULL DEFAULT false,
  "expires_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "address" (
  "id" BIGSERIAL PRIMARY KEY,
  "username" varchar NOT NULL,
  "street" varchar NOT NULL,
  "street2" varchar NOT NULL,
  "city" varchar NOT NULL,
  "state_province_code" varchar NOT NULL,
  "state_province_name" varchar NOT NULL,
  "postal_code" varchar NOT NULL,
  "country_code" varchar NOT NULL,
  "location" varchar NOT NULL,
  "country" varchar NOT NULL,
  "updated_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "shops" (
  "id" BIGSERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "email" varchar NOT NULL,
  "storedetails" varchar NOT NULL,
  "updated_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "storedetails" (
  "id" BIGSERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "code" varchar NOT NULL,
  "countryCode" varchar NOT NULL,
  "countryName" varchar NOT NULL,
  "status" varchar NOT NULL,
  "shortCode" varchar NOT NULL,
  "updated_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "orders" (
  "id" BIGSERIAL PRIMARY KEY,
  "shopId" varchar NOT NULL,
  "totalItems" INT NOT NULL,
  "packedItems" INT NOT NULL,
  "isPrepayment" boolean NOT NULL DEFAULT false,
  "hasMultipleStatus" boolean NOT NULL DEFAULT false,
  "hasItemsFulfilledByJumia" boolean NOT NULL DEFAULT false,
  "pendingSince" varchar NOT NULL,
  "status" varchar NOT NULL,
  "updated_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "attributes" (
  "id" BIGSERIAL PRIMARY KEY,
  "productId" BIGSERIAL NOT NULL,
  "name" varchar NOT NULL,
  "value" varchar NOT NULL,
  "updated_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "images" (
  "id" BIGSERIAL PRIMARY KEY,
  "url" varchar NOT NULL,
  "originalUrl" varchar NOT NULL,
  "primary" boolean NOT NULL DEFAULT false,
  "updated_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "products" (
  "id" BIGSERIAL PRIMARY KEY,
  "shopId" varchar NOT NULL,
  "name" varchar NOT NULL,
  "description" varchar NOT NULL,
  "parentSku" varchar NOT NULL,
  "sellerSku" varchar NOT NULL,
  "barcode" varchar NOT NULL,
  "variant" varchar NOT NULL,
  "shop" varchar NOT NULL,
  "brand" varchar NOT NULL,
  "category" varchar NOT NULL,
  "image" varchar NOT NULL,
  "price" varchar NOT NULL,
  "stock" varchar NOT NULL,
  "attribute" varchar NOT NULL,
  "tag" varchar NOT NULL
);

CREATE TABLE "variants" (
  "id" BIGSERIAL PRIMARY KEY,
  "sellerSku" varchar NOT NULL,
  "barcodeEan" varchar,
  "variation" varchar NOT NULL,
  "startAt" varchar NOT NULL,
  "updateAt" varchar NOT NULL,
  "attributes" varchar NOT NULL,
  "storedetails" varchar NOT NULL,
  "updated_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "tags" (
  "id" BIGSERIAL PRIMARY KEY,
  "code" INT NOT NULL,
  "name" varchar NOT NULL,
  "category" varchar,
  "updated_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" BIGSERIAL PRIMARY KEY,
  "code" INT NOT NULL,
  "name" varchar NOT NULL,
  "description" varchar NOT NULL,
  "updated_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "brands" (
  "id" BIGSERIAL PRIMARY KEY,
  "code" INT NOT NULL,
  "name" varchar NOT NULL,
  "updated_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE INDEX ON "shops" ("name");

CREATE INDEX ON "attributes" ("name");

CREATE INDEX ON "products" ("name");

CREATE INDEX ON "tags" ("name");

CREATE INDEX ON "categories" ("name");

ALTER TABLE "address" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");

ALTER TABLE "attributes" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("shopId") REFERENCES "shops" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("category") REFERENCES "categories" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("variant") REFERENCES "variants" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("image") REFERENCES "images" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("shop") REFERENCES "shops" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("attribute") REFERENCES "attributes" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("brand") REFERENCES "brands" ("id");

ALTER TABLE "sessions" ADD FOREIGN KEY ("username") REFERENCES "users" ("id");

ALTER TABLE "categories" ADD FOREIGN KEY ("id") REFERENCES "tags" ("category");
