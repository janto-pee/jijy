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
CREATE TABLE "clients" (
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
CREATE TABLE "shops"(
    "id": "b16aac6d-4b08-45ab-b8be-baf11615f400",
    "name": "Shop Name 1 Test",
    "email": "shop1.test@shop.com",
    "businessClients": [
                {
                    "name": "Jumia",
                    "code": "jumia-ng",
                    "countryCode": "NG",
                    "countryName": "Nigeria",
                    "status": "ACTIVE",
                    "shortCode": "NG100S9"
                }
            ]
);
CREATE TABLE "countrys" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "cards" (
    "id" BIGSERIAL PRIMARY KEY,
    "object": "card",
    "brand": "Visa",
    "customer": "cus_NhD8HD2bY8dP3V",
    "cvc_check": null,
    "dynamic_last4": null,
    "exp_month": 4,
    "exp_year": 2024,
    "funding": "credit",
    "last4": "4242",
    "metadata": { },
    "name": null,
    "tokenization_method": null,
    "wallet": null
);
CREATE TABLE "orders" (
    "id" BIGSERIAL PRIMARY KEY,
    "id": "41ea7c3b-20f0-466d-a095-e6e909298180",
    "shopIds": [
                "51ea8c3b-20f0-466d-a095-e6e909298547",
                "204eb6ea-56b9-11ed-9b6a-0242ac120002"
            ],
    "totalItems": 1,
    "packedItems": 1,
    "isPrepayment": true,
    "hasMultipleStatus": true,
    "hasItemsFulfilledByJumia": true,
    "pendingSince": "3 days",
    "status": "PENDING",
    "deliveryOption": "Universal Shipping Matrix",
    "number": 338997922,
    "totalAmount": { "currency": "USD",
    "value": 123.45 },
    "totalAmountLocal": { "currency": "EGP",
    "value": 60 },
    "country": { "code": "EG",
    "name": "EGYPT",
    "currencyCode": "EGP" },
    "shippingAddress": { "firstName": "string",
    "lastName": "string",
    "address": "string",
    "city": "string",
    "postalCode": "string",
    "ward": "string",
    "region": "string",
    "countryName": "string" },
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
);
CREATE TABLE "order_status" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "attributes" (
    "id" BIGSERIAL PRIMARY KEY,
    "id": "f14c4944-fb9f-4ec5-a057-51259cbb6a0b",
    "name": "note",
    "value": "note about the product",
    "translations": []
);
CREATE TABLE "images" (
    "id" BIGSERIAL PRIMARY KEY,
    "url": "https://vendorcenter-staging.jumia.com/product-set-images/2022/05/16/gvc.product.image.1652719867712.8cb06674-305a-4309-be97-b6bec5b1334d.jpeg",
    "originalUrl": "https://ng.jumia.is/LgDWyaUAUqlaDlr6gmf0ui43GGk=/fit-in/500x500/filters:fill(white)/product/90/278208/1.jpg?4790",
    "primary": true
);
CREATE TABLE "sales" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "shippings" (
    "id" BIGSERIAL PRIMARY KEY,
    "name": "Shipment Provider 1",
    "requireTrackingCode": true
);
CREATE TABLE "roles" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "products" (
    "id": "prod_NWjs8kKbJWmuuc",
    "shopId": "a8b5534b-277b-449c-97b7-c00979dd9c3a",
    "products" varchar NOT NULL;
);
CREATE TABLE "single_product_item" (
    "shopId": "a8b5534b-277b-449c-97b7-c00979dd9c3a",
    "products": [
        {
            "name": {
                "value": "Name should be between 15 and 60 characters",
                "translations": [
                    {
                        "language": "AR",
                        "value": "اختبار اسم المنتج"
                    },
                    {
                        "language": "FR",
                        "value": "Test du nom du produit"
                    }
                ] },
    "description": { "value": "Description should have more than 150 words. Product number35G41EAProduct nameHP Spectre x360 Convertible 14-ea0047naMicroprocessorIntel® Core™ i5-1135G7 (up to 4.2 GHz with Intel® Turbo Boost Technology, 8 MB L3 cache, 4 cores)ChipsetIntel® Integrated SoCMemory, standard8 GB LPDDR4x-3733 MHz RAM (onboard)Video graphicsIntel® Iris® Xᵉ GraphicsHard drive512 GB PCIe® NVMe™ TLC M.2 SSDOptical driveOptical drive not includedDisplay34.3 cm (13.5) diagonal, WUXGA+ (1920 x 1280), multitouch-enabled, IPS, edge-to-edge glass, micro-edge, Corning® Gorilla® Glass NBT™, 1000 nits, 100% sRGB, HP Sure View Reflect integrated privacy screenWireless connectivityIntel® Wi-Fi 6 AX201 (2x2) and Bluetooth® 5 combo (Supporting Gigabit file transfer speeds)Expansion slots1 microSD media card readerExternal ports2 Thunderbolt™ 4 with USB4™ Type-C® 40Gbps signaling rate (USB Power Delivery, DisplayPort™ 1.4, HP Sleep and Charge); 1 SuperSpeed USB Type-A 10Gbps signaling rate (HP Sleep and Charge); 1 headphone/microphone comboMinimum dimensions (W x D x H)29.83 x 22.01 x 1.69 cmWeight1.34 kgPower supply type65 W USB Type-C® power adapterBattery type4-cell, 66 Wh Li-ion polymerBattery life mixed usageUp to 15 hours and 45 minutesVideo Playback Battery lifeUp to 16 hours and 30 minutesWebcamHP True Vision 720p HD IR camera with camera shutter and integrated dual array digital microphonesAudio featuresAudio by Bang & Olufsen; Quad speakers; HP Audio BoostSoftwareOperating systemWindows 10 Home 64HP appsHP 3D DriveGuard; HP Audio Switch; HP JumpStart; HP Support AssistantSoftware includedMcAfee LiveSafe™Pre-installed softwareExpressVPN (30 day free trial); LastPass Premium (30 day free trial).",
    "translations": [
                    {
                        "language": "FR",
                        "value": "Test du description du produit"
                    }
                ] },
    "parentSku": "new_product_sku_60077999",
    "sellerSku": "new_product_sku_60077999",
    "barcodeEan": "1234567000001239999",
    "variation": "1",
    "brand": { "code": 1126253,
    "name": "123 updated" },
    "category": { "code": 1004141,
    name :'' },
    "name": "Gaming / PC Gaming / Accessories / Controllers" },
    "images": [
                {
                    "url": "https://ng.jumia.is/LgDWyaUAUqlaDlr6gmf0ui43GGk=/fit-in/500x500/filters:fill(white)/product/90/278208/1.jpg?4790",
                    "primary": true
                }
            ],
    "price": { "currency": "USD",
    "value": 200,
    "salePrice": { "value": 150,
    "startAt": "2022-08-11",
    "endAt": "2022-08-22" } },
    "stock": 500,
    "attributes": [
              
                {
                    "name": "battery_capacity",
                    "value": "100 mAh"
                } ]
);
CREATE TABLE "variants" (
    "id" BIGSERIAL PRIMARY KEY,
    "id": "56243159-15b9-4b59-baba-e416b3c6c113",
    "sellerSku": "seller-sku-v2",
    "barcodeEan": null,
    "variation": "1",
    "globalPrice": { "value": 200,
    "salePrice": { "value": 150,
    "startAt": "2022-08-11T00:00:00Z",
    "endAt": "2022-08-22T00:00:00Z" },
    "updateAt": "2022-05-16T16:58:50.820Z" },
    "attributes": [
                        {
                            "id": "5653eb32-af01-4438-9531-4abd7f14a52e",
                            "name": "battery_capacity",
                            "value": "100 mAh",
                            "translations": [] } ],
    "businessClients": [
                        {
                            "code": "jumia-dz",
                            "name": "Jumia",
                            "countryName": "Algeria",
                            "countryCode": "DZ",
                            "sku": null,
                            "visible": false,
                            "visibleUpdatedAt": null,
                            "status": "DELETED",
                            "statusUpdatedAt": "2022-08-16T18:34:17.245137Z",
                            "qc": {
                                "status": "REJECTED",
                                "updatedAt": "2022-08-16T18:34:17.245137Z",
                                "lastApprovedAt": "2022-05-16T16:57:52.732856Z",
                                "rejectionReason": "Restricted Brand",
                                "rejectionComment": "i am testing the comment"
                            },
                            "price": {
                                "value": null,
                                "salePrice": null,
                                "updatedAt": "2022-08-16T18:34:17.245137Z"
                            }
                        },
                    ]
);
CREATE TABLE "variants_option" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "tags" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "categories" (
    "id" BIGSERIAL PRIMARY KEY,
    "code": 1000052,
    "name": "Foreign Language Study",
    "completePath": "Books, Movies and Music / Art & Humanities / Foreign Language Study",
    "attributeSet": { "id": "9b66c50c-562a-4a98-9eae-0cf133a50f9d",
    "name": "Books & Magazines" }
);
CREATE TABLE "payment" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "payment type" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "shopping cart" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "shopping_cart_item" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "reviews" ("id" BIGSERIAL PRIMARY KEY,);
CREATE TABLE "coupon" (
    "id": "jMT0WJUD",
    "object": "coupon",
    "amount_off": null,
    "created": 1678037688,
    "currency": null,
    "duration": "repeating",
    "duration_in_months": 3,
    "livemode": false,
    "max_redemptions": null,
    "metadata": { },
    "name": null,
    "percent_off": 25.5,
    "redeem_by": null,
    "times_redeemed": 0,
    "valid": true
);
CREATE TABLE "alerts" (
    "id": "alrt_12345",
    "object": "billing.alert",
    "title": "API Request usage alert",
    "livemode": true,
    "alert_type": "usage_threshold",
    "usage_threshold": { "gte": 10000,
    "meter": "mtr_12345",
    "recurrence": "one_time" },
    "status": "active"
);
CREATE TABLE "brands"("code": 1127718, "name": "Samsung")