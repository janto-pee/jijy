CREATE TABLE "users" (
    "username" varchar PRIMARY KEY,
    "hashed_password" varchar NOT NULL,
    "first_name" varchar NOT NULL,
    "last_name" varchar NOT NULL,
    "email" varchar UNIQUE NOT NULL,
    "address" varchar NOT NULL,
    "address2" varchar NOT NULL,
    "city" varchar NOT NULL,
    "country" varchar NOT NULL,
    "is_email_verified" bool NOT NULL DEFAULT false,
    "password_changed_at" timestamptz NOT NULL DEFAULT '0001-01-01',
    "created_at" timestamptz NOT NULL DEFAULT (now()),
    "updated_at" timestamptz NOT NULL DEFAULT (now())
);
CREATE TABLE "staffs" (
    "id" BIGSERIAL PRIMARY KEY,
    "username" varchar UNIQUE NOT NULL,
    "author_type" varchar NOT NULL,
    "author_is_active" boolean NOT NULL DEFAULT false,
    "created_at" timestamptz NOT NULL DEFAULT (now())
);
CREATE TABLE "customers" (
    "id" BIGSERIAL PRIMARY KEY,
    "username" varchar UNIQUE NOT NULL,
    "student_is_active" boolean NOT NULL DEFAULT false,
    "created_at" timestamptz NOT NULL DEFAULT (now())
);
CREATE TABLE "sessions" (
    "id" uuid PRIMARY KEY,
    "username" varchar NOT NULL,
    "refresh_token" varchar NOT NULL,
    "user_agent" varchar NOT NULL,
    "client_ip" varchar NOT NULL,
    "is_blocked" boolean NOT NULL DEFAULT false,
    "expires_at" timestamptz NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT (now())
);
CREATE TABLE "verify_emails" (
    "id" BIGSERIAL PRIMARY KEY,
    "username" varchar NOT NULL,
    "email" varchar NOT NULL,
    "secret_code" varchar NOT NULL,
    "is_used" boolean NOT NULL DEFAULT false,
    "created_at" timestamptz NOT NULL DEFAULT (now()),
    "expired_at" timestamptz NOT NULL DEFAULT (now() + interval '15 minutes')
);
CREATE TABLE "address" (
    "id" BIGSERIAL PRIMARY KEY,
    "created_at" timestamptz NOT NULL DEFAULT (now()),
    "expired_at" timestamptz NOT NULL DEFAULT (now() + interval '15 minutes')
);
CREATE TABLE "countrys" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "cards" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "coupons" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "orders" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "order_status" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "attributes" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "images" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "sales" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "shippings" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "roles" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "products" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "single_product_item" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "variants" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "variants_option" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "notification" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "tags" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "categories" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "payment" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "payment type" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "order status" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "shopping cart" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "shopping_cart_item" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "reviews" ("id" BIGSERIAL PRIMARY KEY,);