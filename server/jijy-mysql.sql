CREATE TABLE `users` (
  `id` BIGSERIAL AUTO_INCREMENT,
  `username` varchar(255),
  `hashed_password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `address` varchar(255) NOT NULL,
  `address2` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `is_email_verified` boolean NOT NULL DEFAULT false,
  `password_changed_at` timestamptz NOT NULL DEFAULT '0001-01-01',
  `created_at` timestamptz NOT NULL DEFAULT (now()),
  `updated_at` timestamptz NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`, `username`)
);

CREATE TABLE `sessions` (
  `id` BIGSERIAL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `refresh_token` varchar(255) NOT NULL,
  `user_agent` varchar(255) NOT NULL,
  `client_ip` varchar(255) NOT NULL,
  `is_blocked` boolean NOT NULL DEFAULT false,
  `expires_at` timestamptz NOT NULL,
  `created_at` timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE `address` (
  `id` BIGSERIAL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `street2` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state_province_code` varchar(255) NOT NULL,
  `state_province_name` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `country_code` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `updated_at` timestamptz NOT NULL,
  `created_at` timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE `shops` (
  `id` BIGSERIAL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `storedetails` varchar(255) NOT NULL,
  `updated_at` timestamptz NOT NULL,
  `created_at` timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE `storedetails` (
  `id` BIGSERIAL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `countryCode` varchar(255) NOT NULL,
  `countryName` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `shortCode` varchar(255) NOT NULL,
  `updated_at` timestamptz NOT NULL,
  `created_at` timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE `orders` (
  `id` BIGSERIAL PRIMARY KEY AUTO_INCREMENT,
  `shopId` varchar(255) NOT NULL,
  `totalItems` INT NOT NULL,
  `packedItems` INT NOT NULL,
  `isPrepayment` boolean NOT NULL DEFAULT false,
  `hasMultipleStatus` boolean NOT NULL DEFAULT false,
  `hasItemsFulfilledByJumia` boolean NOT NULL DEFAULT false,
  `pendingSince` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `updated_at` timestamptz NOT NULL,
  `created_at` timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE `attributes` (
  `id` BIGSERIAL PRIMARY KEY AUTO_INCREMENT,
  `productId` Bigserial NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `updated_at` timestamptz NOT NULL,
  `created_at` timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE `images` (
  `id` BIGSERIAL PRIMARY KEY AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `originalUrl` varchar(255) NOT NULL,
  `primary` boolean NOT NULL DEFAULT false,
  `updated_at` timestamptz NOT NULL,
  `created_at` timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE `products` (
  `id` BIGSERIAL PRIMARY KEY AUTO_INCREMENT,
  `shopId` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `parentSku` varchar(255) NOT NULL,
  `sellerSku` varchar(255) NOT NULL,
  `barcode` varchar(255) NOT NULL,
  `variant` varchar(255) NOT NULL,
  `shop` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `stock` varchar(255) NOT NULL,
  `attribute` varchar(255) NOT NULL,
  `tag` varchar(255) NOT NULL
);

CREATE TABLE `variants` (
  `id` BIGSERIAL PRIMARY KEY AUTO_INCREMENT,
  `sellerSku` varchar(255) NOT NULL,
  `barcodeEan` varchar(255),
  `variation` varchar(255) NOT NULL,
  `startAt` varchar(255) NOT NULL,
  `updateAt` varchar(255) NOT NULL,
  `attributes` varchar(255) NOT NULL,
  `storedetails` varchar(255) NOT NULL,
  `updated_at` timestamptz NOT NULL,
  `created_at` timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE `tags` (
  `id` BIGSERIAL PRIMARY KEY AUTO_INCREMENT,
  `code` INT NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255),
  `updated_at` timestamptz NOT NULL,
  `created_at` timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE `categories` (
  `id` BIGSERIAL PRIMARY KEY AUTO_INCREMENT,
  `code` INT NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `updated_at` timestamptz NOT NULL,
  `created_at` timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE `brands` (
  `id` BIGSERIAL PRIMARY KEY AUTO_INCREMENT,
  `code` INT NOT NULL,
  `name` varchar(255) NOT NULL,
  `updated_at` timestamptz NOT NULL,
  `created_at` timestamptz NOT NULL DEFAULT (now())
);

CREATE INDEX `shops_index_0` ON `shops` (`name`);

CREATE INDEX `attributes_index_1` ON `attributes` (`name`);

CREATE INDEX `products_index_2` ON `products` (`name`);

CREATE INDEX `tags_index_3` ON `tags` (`name`);

CREATE INDEX `categories_index_4` ON `categories` (`name`);

ALTER TABLE `address` ADD FOREIGN KEY (`username`) REFERENCES `users` (`username`);

ALTER TABLE `attributes` ADD FOREIGN KEY (`productId`) REFERENCES `products` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`shopId`) REFERENCES `shops` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`category`) REFERENCES `categories` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`variant`) REFERENCES `variants` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`image`) REFERENCES `images` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`shop`) REFERENCES `shops` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`attribute`) REFERENCES `attributes` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`brand`) REFERENCES `brands` (`id`);

ALTER TABLE `sessions` ADD FOREIGN KEY (`username`) REFERENCES `users` (`id`);

ALTER TABLE `categories` ADD FOREIGN KEY (`id`) REFERENCES `tags` (`category`);
