
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateAddressInput {
    city?: Nullable<string>;
    country?: Nullable<string>;
    country_code?: Nullable<string>;
    location?: Nullable<string>;
    postal_code?: Nullable<string>;
    state_province_code?: Nullable<string>;
    state_province_name?: Nullable<string>;
    street?: Nullable<string>;
    street2?: Nullable<string>;
}

export interface CreateAttributeInput {
    description?: Nullable<string>;
    id?: Nullable<number>;
    mandatory?: Nullable<string>;
    name?: Nullable<string>;
    translatable?: Nullable<string>;
    type?: Nullable<string>;
    value?: Nullable<string>;
    variation?: Nullable<string>;
}

export interface CreateBrandInput {
    code?: Nullable<number>;
    name?: Nullable<string>;
}

export interface CreateCardInput {
    exampleField?: Nullable<number>;
}

export interface CreateCartInput {
    exampleField?: Nullable<number>;
}

export interface CreateCatgeoryInput {
    code?: Nullable<number>;
    description?: Nullable<string>;
    name?: Nullable<string>;
}

export interface CreateCouponInput {
    code?: Nullable<string>;
    couponDescription?: Nullable<string>;
    couponValue?: Nullable<string>;
    endDate?: Nullable<string>;
    startDate?: Nullable<string>;
}

export interface CreateCustomerInput {
    department?: Nullable<string>;
    photoURL?: Nullable<string>;
    title?: Nullable<string>;
    username?: Nullable<string>;
}

export interface CreateImageInput {
    primary?: Nullable<boolean>;
    url?: Nullable<string>;
}

export interface CreateOrderInput {
    businessClientCode?: Nullable<string>;
    comment?: Nullable<string>;
    products?: Nullable<string>;
    shippingDate?: Nullable<string>;
    shopId?: Nullable<string>;
}

export interface CreatePaymentInput {
    exampleField?: Nullable<number>;
}

export interface CreateProductInput {
    attributes?: Nullable<string>;
    barcodeEan?: Nullable<string>;
    brand?: Nullable<string>;
    category?: Nullable<string>;
    description?: Nullable<string>;
    images?: Nullable<string>;
    name?: Nullable<string>;
    parentSku?: Nullable<string>;
    price?: Nullable<string>;
    sellerSku?: Nullable<string>;
    stock?: Nullable<string>;
    variation?: Nullable<string>;
}

export interface CreateReviewInput {
    course?: Nullable<string>;
    createdAt?: Nullable<string>;
    enrollmmentId?: Nullable<number>;
    ratings?: Nullable<number>;
    reviewText?: Nullable<string>;
    reviewer?: Nullable<string>;
}

export interface CreateSaleInput {
    exampleField?: Nullable<number>;
}

export interface CreateShippingInput {
    TrackingCode?: Nullable<string>;
    name?: Nullable<string>;
}

export interface CreateShopInput {
    email?: Nullable<string>;
    name?: Nullable<string>;
}

export interface CreateStaffInput {
    department?: Nullable<string>;
    photoURL?: Nullable<string>;
    title?: Nullable<string>;
    username?: Nullable<string>;
}

export interface CreateTagInput {
    icon?: Nullable<string>;
    name?: Nullable<string>;
}

export interface CreateUserInput {
    email?: Nullable<string>;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
    password?: Nullable<string>;
    username?: Nullable<string>;
}

export interface CreateVariantInput {
    icon?: Nullable<string>;
    name?: Nullable<string>;
}

export interface CreateVariantsOptionInput {
    exampleField?: Nullable<number>;
}

export interface UpdateAddressInput {
    id: number;
}

export interface UpdateAttributeInput {
    id: number;
}

export interface UpdateBrandInput {
    id: number;
}

export interface UpdateCardInput {
    id: number;
}

export interface UpdateCartInput {
    id: number;
}

export interface UpdateCatgeoryInput {
    id: number;
}

export interface UpdateCouponInput {
    id: number;
}

export interface UpdateCustomerInput {
    id: number;
}

export interface UpdateImageInput {
    id: number;
}

export interface UpdateOrderInput {
    id: number;
}

export interface UpdatePaymentInput {
    id: number;
}

export interface UpdateProductInput {
    id: number;
}

export interface UpdateReviewInput {
    id: number;
}

export interface UpdateSaleInput {
    id: number;
}

export interface UpdateSessionInput {
    id: number;
}

export interface UpdateShippingInput {
    id: number;
}

export interface UpdateShopInput {
    id: number;
}

export interface UpdateStaffInput {
    id: number;
}

export interface UpdateTagInput {
    id: number;
}

export interface UpdateUserInput {
    id: number;
}

export interface UpdateVariantInput {
    id: number;
}

export interface UpdateVariantsOptionInput {
    id: number;
}

export interface ValidateUserInput {
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export interface Address {
    city?: Nullable<string>;
    country?: Nullable<string>;
    country_code?: Nullable<string>;
    id?: Nullable<number>;
    location?: Nullable<string>;
    postal_code?: Nullable<string>;
    state_province_code?: Nullable<string>;
    state_province_name?: Nullable<string>;
    street?: Nullable<string>;
    street2?: Nullable<string>;
    username?: Nullable<string>;
}

export interface Attribute {
    description?: Nullable<string>;
    id?: Nullable<number>;
    mandatory?: Nullable<string>;
    name?: Nullable<string>;
    translatable?: Nullable<string>;
    type?: Nullable<string>;
    value?: Nullable<string>;
    variation?: Nullable<string>;
}

export interface Brand {
    code?: Nullable<number>;
    id?: Nullable<number>;
    name?: Nullable<string>;
}

export interface Card {
    exampleField?: Nullable<number>;
}

export interface Cart {
    exampleField?: Nullable<number>;
}

export interface Catgeory {
    code?: Nullable<number>;
    description?: Nullable<string>;
    id?: Nullable<number>;
    name?: Nullable<string>;
}

export interface Coupon {
    code?: Nullable<string>;
    couponDescription?: Nullable<string>;
    couponValue?: Nullable<string>;
    endDate?: Nullable<string>;
    id?: Nullable<number>;
    startDate?: Nullable<string>;
}

export interface Customer {
    created_at?: Nullable<string>;
    department?: Nullable<string>;
    id?: Nullable<number>;
    photoURL?: Nullable<string>;
    title?: Nullable<string>;
    updated_at?: Nullable<string>;
    username?: Nullable<string>;
}

export interface Image {
    primary?: Nullable<boolean>;
    url?: Nullable<string>;
}

export interface IMutation {
    createAddress(createAddressInput: CreateAddressInput): Address | Promise<Address>;
    createAttribute(createAttributeInput: CreateAttributeInput): Attribute | Promise<Attribute>;
    createBrand(createBrandInput: CreateBrandInput): Brand | Promise<Brand>;
    createCard(createCardInput: CreateCardInput): Card | Promise<Card>;
    createCart(createCartInput: CreateCartInput): Cart | Promise<Cart>;
    createCatgeory(createCatgeoryInput: CreateCatgeoryInput): Catgeory | Promise<Catgeory>;
    createCoupon(createCouponInput: CreateCouponInput): Coupon | Promise<Coupon>;
    createCustomer(createCustomerInput: CreateCustomerInput): Customer | Promise<Customer>;
    createImage(createImageInput: CreateImageInput): Image | Promise<Image>;
    createOrder(createOrderInput: CreateOrderInput): Order | Promise<Order>;
    createPayment(createPaymentInput: CreatePaymentInput): Payment | Promise<Payment>;
    createProduct(createProductInput: CreateProductInput): Product | Promise<Product>;
    createReview(createReviewInput: CreateReviewInput): Review | Promise<Review>;
    createSale(createSaleInput: CreateSaleInput): Sale | Promise<Sale>;
    createSession(validateUserInput: ValidateUserInput): Session | Promise<Session>;
    createShipping(createShippingInput: CreateShippingInput): Shipping | Promise<Shipping>;
    createShop(createShopInput: CreateShopInput): Shop | Promise<Shop>;
    createStaff(createStaffInput: CreateStaffInput): Staff | Promise<Staff>;
    createTag(createTagInput: CreateTagInput): Tag | Promise<Tag>;
    createUser(createUserInput: CreateUserInput): ResponseObject | Promise<ResponseObject>;
    createVariant(createVariantInput: CreateVariantInput): Variant | Promise<Variant>;
    createVariantsOption(createVariantsOptionInput: CreateVariantsOptionInput): VariantsOption | Promise<VariantsOption>;
    forgotPassword(email?: Nullable<string>): ResponseObject | Promise<ResponseObject>;
    removeAddress(id: number): Nullable<Address> | Promise<Nullable<Address>>;
    removeAttribute(id: number): Nullable<Attribute> | Promise<Nullable<Attribute>>;
    removeBrand(id: number): Nullable<Brand> | Promise<Nullable<Brand>>;
    removeCard(id: number): Nullable<Card> | Promise<Nullable<Card>>;
    removeCart(id: number): Nullable<Cart> | Promise<Nullable<Cart>>;
    removeCatgeory(id: number): Nullable<Catgeory> | Promise<Nullable<Catgeory>>;
    removeCoupon(id: number): Nullable<Coupon> | Promise<Nullable<Coupon>>;
    removeCustomer(id: number): Nullable<Customer> | Promise<Nullable<Customer>>;
    removeImage(id: number): Nullable<Image> | Promise<Nullable<Image>>;
    removeOrder(id: number): Nullable<Order> | Promise<Nullable<Order>>;
    removePayment(id: number): Nullable<Payment> | Promise<Nullable<Payment>>;
    removeProduct(id: number): Nullable<Product> | Promise<Nullable<Product>>;
    removeReview(id: number): Nullable<Review> | Promise<Nullable<Review>>;
    removeSale(id: number): Nullable<Sale> | Promise<Nullable<Sale>>;
    removeSession(id: number): Nullable<Session> | Promise<Nullable<Session>>;
    removeShipping(id: number): Nullable<Shipping> | Promise<Nullable<Shipping>>;
    removeShop(id: number): Nullable<Shop> | Promise<Nullable<Shop>>;
    removeStaff(id: number): Nullable<Staff> | Promise<Nullable<Staff>>;
    removeTag(id: number): Nullable<Tag> | Promise<Nullable<Tag>>;
    removeUser(id: number): Nullable<ResponseObject> | Promise<Nullable<ResponseObject>>;
    removeVariant(id: number): Nullable<Variant> | Promise<Nullable<Variant>>;
    removeVariantsOption(id: number): Nullable<VariantsOption> | Promise<Nullable<VariantsOption>>;
    resetPassword(id: number, password?: Nullable<string>, resetcode?: Nullable<string>): ResponseObject | Promise<ResponseObject>;
    updateAddress(updateAddressInput: UpdateAddressInput): Address | Promise<Address>;
    updateAttribute(updateAttributeInput: UpdateAttributeInput): Attribute | Promise<Attribute>;
    updateBrand(updateBrandInput: UpdateBrandInput): Brand | Promise<Brand>;
    updateCard(updateCardInput: UpdateCardInput): Card | Promise<Card>;
    updateCart(updateCartInput: UpdateCartInput): Cart | Promise<Cart>;
    updateCatgeory(updateCatgeoryInput: UpdateCatgeoryInput): Catgeory | Promise<Catgeory>;
    updateCoupon(updateCouponInput: UpdateCouponInput): Coupon | Promise<Coupon>;
    updateCustomer(updateCustomerInput: UpdateCustomerInput): Customer | Promise<Customer>;
    updateImage(updateImageInput: UpdateImageInput): Image | Promise<Image>;
    updateOrder(updateOrderInput: UpdateOrderInput): Order | Promise<Order>;
    updatePayment(updatePaymentInput: UpdatePaymentInput): Payment | Promise<Payment>;
    updateProduct(updateProductInput: UpdateProductInput): Product | Promise<Product>;
    updateReview(updateReviewInput: UpdateReviewInput): Review | Promise<Review>;
    updateSale(updateSaleInput: UpdateSaleInput): Sale | Promise<Sale>;
    updateSession(updateSessionInput: UpdateSessionInput): Session | Promise<Session>;
    updateShipping(updateShippingInput: UpdateShippingInput): Shipping | Promise<Shipping>;
    updateShop(updateShopInput: UpdateShopInput): Shop | Promise<Shop>;
    updateStaff(updateStaffInput: UpdateStaffInput): Staff | Promise<Staff>;
    updateTag(updateTagInput: UpdateTagInput): Tag | Promise<Tag>;
    updateUser(updateUserInput: UpdateUserInput): ResponseObject | Promise<ResponseObject>;
    updateVariant(updateVariantInput: UpdateVariantInput): Variant | Promise<Variant>;
    updateVariantsOption(updateVariantsOptionInput: UpdateVariantsOptionInput): VariantsOption | Promise<VariantsOption>;
    verifyUser(updateUserInput: UpdateUserInput, verification?: Nullable<string>): ResponseObject | Promise<ResponseObject>;
}

export interface Order {
    businessClientCode?: Nullable<string>;
    comment?: Nullable<string>;
    id?: Nullable<number>;
    products?: Nullable<string>;
    shippingDate?: Nullable<string>;
    shopId?: Nullable<string>;
}

export interface Payment {
    exampleField?: Nullable<number>;
}

export interface Product {
    attributes?: Nullable<string>;
    barcodeEan?: Nullable<string>;
    brand?: Nullable<string>;
    category?: Nullable<string>;
    description?: Nullable<string>;
    id?: Nullable<number>;
    images?: Nullable<string>;
    name?: Nullable<string>;
    parentSku?: Nullable<string>;
    price?: Nullable<string>;
    sellerSku?: Nullable<string>;
    stock?: Nullable<string>;
    variation?: Nullable<string>;
}

export interface IQuery {
    address(id: number): Nullable<Address> | Promise<Nullable<Address>>;
    addresses(): Nullable<Address>[] | Promise<Nullable<Address>[]>;
    attribute(id: number): Nullable<Attribute> | Promise<Nullable<Attribute>>;
    attributes(): Nullable<Attribute>[] | Promise<Nullable<Attribute>[]>;
    brand(id: number): Nullable<Brand> | Promise<Nullable<Brand>>;
    brands(): Nullable<Brand>[] | Promise<Nullable<Brand>[]>;
    card(id: number): Nullable<Card> | Promise<Nullable<Card>>;
    cards(): Nullable<Card>[] | Promise<Nullable<Card>[]>;
    cart(id: number): Nullable<Cart> | Promise<Nullable<Cart>>;
    carts(): Nullable<Cart>[] | Promise<Nullable<Cart>[]>;
    catgeories(): Nullable<Catgeory>[] | Promise<Nullable<Catgeory>[]>;
    catgeory(id: number): Nullable<Catgeory> | Promise<Nullable<Catgeory>>;
    coupon(id: number): Nullable<Coupon> | Promise<Nullable<Coupon>>;
    coupons(): Nullable<Coupon>[] | Promise<Nullable<Coupon>[]>;
    customer(id: number): Nullable<Customer> | Promise<Nullable<Customer>>;
    customers(): Nullable<Customer>[] | Promise<Nullable<Customer>[]>;
    image(id: number): Nullable<Image> | Promise<Nullable<Image>>;
    images(): Nullable<Image>[] | Promise<Nullable<Image>[]>;
    order(id: number): Nullable<Order> | Promise<Nullable<Order>>;
    orders(): Nullable<Order>[] | Promise<Nullable<Order>[]>;
    payment(id: number): Nullable<Payment> | Promise<Nullable<Payment>>;
    payments(): Nullable<Payment>[] | Promise<Nullable<Payment>[]>;
    product(id: number): Nullable<Product> | Promise<Nullable<Product>>;
    products(): Nullable<Product>[] | Promise<Nullable<Product>[]>;
    review(id: number): Nullable<Review> | Promise<Nullable<Review>>;
    reviews(): Nullable<Review>[] | Promise<Nullable<Review>[]>;
    sale(id: number): Nullable<Sale> | Promise<Nullable<Sale>>;
    sales(): Nullable<Sale>[] | Promise<Nullable<Sale>[]>;
    session(id: number): Nullable<Session> | Promise<Nullable<Session>>;
    sessions(): Nullable<Session>[] | Promise<Nullable<Session>[]>;
    shipping(id: number): Nullable<Shipping> | Promise<Nullable<Shipping>>;
    shippings(): Nullable<Shipping>[] | Promise<Nullable<Shipping>[]>;
    shop(id: number): Nullable<Shop> | Promise<Nullable<Shop>>;
    shops(): Nullable<Shop>[] | Promise<Nullable<Shop>[]>;
    staff(id: number): Nullable<Staff> | Promise<Nullable<Staff>>;
    staffs(): Nullable<Staff>[] | Promise<Nullable<Staff>[]>;
    tag(id: number): Nullable<Tag> | Promise<Nullable<Tag>>;
    tags(): Nullable<Tag>[] | Promise<Nullable<Tag>[]>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    variant(id: number): Nullable<Variant> | Promise<Nullable<Variant>>;
    variants(): Nullable<Variant>[] | Promise<Nullable<Variant>[]>;
    variantsOption(id: number): Nullable<VariantsOption> | Promise<Nullable<VariantsOption>>;
    variantsOptions(): Nullable<VariantsOption>[] | Promise<Nullable<VariantsOption>[]>;
}

export interface ResponseObject {
    email?: Nullable<string>;
    id: number;
    message?: Nullable<string>;
}

export interface Review {
    course?: Nullable<string>;
    createdAt?: Nullable<string>;
    enrollmmentId?: Nullable<number>;
    id?: Nullable<number>;
    ratings?: Nullable<number>;
    reviewText?: Nullable<string>;
    reviewer?: Nullable<string>;
}

export interface Sale {
    exampleField?: Nullable<number>;
}

export interface Session {
    id?: Nullable<string>;
    userAgent?: Nullable<string>;
    userId?: Nullable<string>;
    valid?: Nullable<boolean>;
}

export interface Shipping {
    TrackingCode?: Nullable<string>;
    id?: Nullable<number>;
    name?: Nullable<string>;
}

export interface Shop {
    email?: Nullable<string>;
    id?: Nullable<string>;
    name?: Nullable<string>;
}

export interface Staff {
    created_at?: Nullable<string>;
    department?: Nullable<string>;
    id?: Nullable<number>;
    photoURL?: Nullable<string>;
    title?: Nullable<string>;
    updated_at?: Nullable<string>;
    username?: Nullable<string>;
}

export interface Tag {
    icon?: Nullable<string>;
    id?: Nullable<number>;
    name?: Nullable<string>;
}

export interface User {
    createdAt?: Nullable<string>;
    email?: Nullable<string>;
    first_name?: Nullable<string>;
    id: number;
    is_email_verified?: Nullable<boolean>;
    last_name?: Nullable<string>;
    password?: Nullable<string>;
    passwordResetCode?: Nullable<string>;
    password_changed_at?: Nullable<string>;
    updatedAt?: Nullable<string>;
    username?: Nullable<string>;
    verificationCode?: Nullable<string>;
}

export interface Variant {
    icon?: Nullable<string>;
    id?: Nullable<number>;
    name?: Nullable<string>;
}

export interface VariantsOption {
    exampleField?: Nullable<number>;
}

type Nullable<T> = T | null;
