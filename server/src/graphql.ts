
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
    name?: Nullable<string>;
    type?: Nullable<string>;
}

export interface CreateCartInput {
    product?: Nullable<string>;
    quantity?: Nullable<number>;
}

export interface CreateCategoryInput {
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
    id?: Nullable<number>;
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
    enrollmmentId?: Nullable<number>;
    ratings?: Nullable<number>;
    reviewText?: Nullable<string>;
    reviewer?: Nullable<string>;
}

export interface CreateSaleInput {
    amount?: Nullable<number>;
    quantity?: Nullable<number>;
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
    type?: Nullable<string>;
}

export interface UpdateAddressInput {
    city?: Nullable<string>;
    country?: Nullable<string>;
    country_code?: Nullable<string>;
    id: string;
    location?: Nullable<string>;
    postal_code?: Nullable<string>;
    state_province_code?: Nullable<string>;
    state_province_name?: Nullable<string>;
    street?: Nullable<string>;
    street2?: Nullable<string>;
}

export interface UpdateAttributeInput {
    description?: Nullable<string>;
    id: string;
    mandatory?: Nullable<string>;
    name?: Nullable<string>;
    translatable?: Nullable<string>;
    type?: Nullable<string>;
    value?: Nullable<string>;
    variation?: Nullable<string>;
}

export interface UpdateBrandInput {
    code?: Nullable<number>;
    id: string;
    name?: Nullable<string>;
}

export interface UpdateCardInput {
    id: string;
    name?: Nullable<string>;
    type?: Nullable<string>;
}

export interface UpdateCartInput {
    id: string;
    product?: Nullable<string>;
    quantity?: Nullable<number>;
}

export interface UpdateCategoryInput {
    code?: Nullable<number>;
    description?: Nullable<string>;
    id: string;
    name?: Nullable<string>;
}

export interface UpdateCouponInput {
    code?: Nullable<string>;
    couponDescription?: Nullable<string>;
    couponValue?: Nullable<string>;
    endDate?: Nullable<string>;
    id: string;
    startDate?: Nullable<string>;
}

export interface UpdateCustomerInput {
    department?: Nullable<string>;
    id: string;
    photoURL?: Nullable<string>;
    title?: Nullable<string>;
    username?: Nullable<string>;
}

export interface UpdateImageInput {
    id: string;
    primary?: Nullable<boolean>;
    url?: Nullable<string>;
}

export interface UpdateOrderInput {
    businessClientCode?: Nullable<string>;
    comment?: Nullable<string>;
    id: string;
    products?: Nullable<string>;
    shippingDate?: Nullable<string>;
    shopId?: Nullable<string>;
}

export interface UpdatePaymentInput {
    id: string;
}

export interface UpdateProductInput {
    attributes?: Nullable<string>;
    barcodeEan?: Nullable<string>;
    brand?: Nullable<string>;
    category?: Nullable<string>;
    description?: Nullable<string>;
    id: string;
    images?: Nullable<string>;
    name?: Nullable<string>;
    parentSku?: Nullable<string>;
    price?: Nullable<string>;
    sellerSku?: Nullable<string>;
    stock?: Nullable<string>;
    variation?: Nullable<string>;
}

export interface UpdateReviewInput {
    course?: Nullable<string>;
    enrollmmentId?: Nullable<number>;
    id: string;
    ratings?: Nullable<number>;
    reviewText?: Nullable<string>;
    reviewer?: Nullable<string>;
}

export interface UpdateSaleInput {
    amount?: Nullable<number>;
    id: string;
    quantity?: Nullable<number>;
}

export interface UpdateSessionInput {
    id: string;
}

export interface UpdateShippingInput {
    TrackingCode?: Nullable<string>;
    id: string;
    name?: Nullable<string>;
}

export interface UpdateShopInput {
    email?: Nullable<string>;
    id: string;
    name?: Nullable<string>;
}

export interface UpdateStaffInput {
    department?: Nullable<string>;
    id: string;
    photoURL?: Nullable<string>;
    title?: Nullable<string>;
    username?: Nullable<string>;
}

export interface UpdateTagInput {
    icon?: Nullable<string>;
    id: string;
    name?: Nullable<string>;
}

export interface UpdateUserInput {
    email?: Nullable<string>;
    first_name?: Nullable<string>;
    id: string;
    last_name?: Nullable<string>;
    password?: Nullable<string>;
    username?: Nullable<string>;
}

export interface UpdateVariantInput {
    icon?: Nullable<string>;
    id: string;
    name?: Nullable<string>;
}

export interface UpdateVariantsOptionInput {
    id: string;
    type?: Nullable<string>;
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
    id?: Nullable<number>;
    name?: Nullable<string>;
    type?: Nullable<string>;
}

export interface Cart {
    id?: Nullable<number>;
    product?: Nullable<string>;
    quantity?: Nullable<number>;
}

export interface Category {
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
    createCategory(createCategoryInput: CreateCategoryInput): Category | Promise<Category>;
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
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    createVariant(createVariantInput: CreateVariantInput): Variant | Promise<Variant>;
    createVariantsOption(createVariantsOptionInput: CreateVariantsOptionInput): VariantsOption | Promise<VariantsOption>;
    forgotPassword(email?: Nullable<string>): ForgotPasswordResponse | Promise<ForgotPasswordResponse>;
    removeAddress(id: string): Nullable<Address> | Promise<Nullable<Address>>;
    removeAttribute(id: string): Nullable<Attribute> | Promise<Nullable<Attribute>>;
    removeBrand(id: string): Nullable<Brand> | Promise<Nullable<Brand>>;
    removeCard(id: string): Nullable<Card> | Promise<Nullable<Card>>;
    removeCart(id: string): Nullable<Cart> | Promise<Nullable<Cart>>;
    removeCategory(id: string): Nullable<Category> | Promise<Nullable<Category>>;
    removeCoupon(id: string): Nullable<Coupon> | Promise<Nullable<Coupon>>;
    removeCustomer(id: string): Nullable<Customer> | Promise<Nullable<Customer>>;
    removeImage(id: string): Nullable<Image> | Promise<Nullable<Image>>;
    removeOrder(id: string): Nullable<Order> | Promise<Nullable<Order>>;
    removePayment(id: string): Nullable<Payment> | Promise<Nullable<Payment>>;
    removeProduct(id: string): Nullable<Product> | Promise<Nullable<Product>>;
    removeReview(id: string): Nullable<Review> | Promise<Nullable<Review>>;
    removeSale(id: string): Nullable<Sale> | Promise<Nullable<Sale>>;
    removeSession(id: string): Nullable<Session> | Promise<Nullable<Session>>;
    removeShipping(id: string): Nullable<Shipping> | Promise<Nullable<Shipping>>;
    removeShop(id: string): Nullable<Shop> | Promise<Nullable<Shop>>;
    removeStaff(id: string): Nullable<Staff> | Promise<Nullable<Staff>>;
    removeTag(id: string): Nullable<Tag> | Promise<Nullable<Tag>>;
    removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
    removeVariant(id: string): Nullable<Variant> | Promise<Nullable<Variant>>;
    removeVariantsOption(id: string): Nullable<VariantsOption> | Promise<Nullable<VariantsOption>>;
    resetPassword(id: string, password?: Nullable<string>, resetcode?: Nullable<string>): User | Promise<User>;
    updateAddress(updateAddressInput: UpdateAddressInput): Address | Promise<Address>;
    updateAttribute(updateAttributeInput: UpdateAttributeInput): Attribute | Promise<Attribute>;
    updateBrand(updateBrandInput: UpdateBrandInput): Brand | Promise<Brand>;
    updateCard(updateCardInput: UpdateCardInput): Card | Promise<Card>;
    updateCart(updateCartInput: UpdateCartInput): Cart | Promise<Cart>;
    updateCategory(updateCategoryInput: UpdateCategoryInput): Category | Promise<Category>;
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
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    updateVariant(updateVariantInput: UpdateVariantInput): Variant | Promise<Variant>;
    updateVariantsOption(updateVariantsOptionInput: UpdateVariantsOptionInput): VariantsOption | Promise<VariantsOption>;
    verifyUser(updateUserInput: UpdateUserInput, verification?: Nullable<string>): User | Promise<User>;
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
    id?: Nullable<number>;
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
    address(id: string): Nullable<Address> | Promise<Nullable<Address>>;
    addresses(): Nullable<Address>[] | Promise<Nullable<Address>[]>;
    attribute(id: string): Nullable<Attribute> | Promise<Nullable<Attribute>>;
    attributes(): Nullable<Attribute>[] | Promise<Nullable<Attribute>[]>;
    brand(id: string): Nullable<Brand> | Promise<Nullable<Brand>>;
    brands(): Nullable<Brand>[] | Promise<Nullable<Brand>[]>;
    card(id: string): Nullable<Card> | Promise<Nullable<Card>>;
    cards(): Nullable<Card>[] | Promise<Nullable<Card>[]>;
    cart(id: string): Nullable<Cart> | Promise<Nullable<Cart>>;
    carts(): Nullable<Cart>[] | Promise<Nullable<Cart>[]>;
    category(id: string): Nullable<Category> | Promise<Nullable<Category>>;
    categorys(): Nullable<Category>[] | Promise<Nullable<Category>[]>;
    coupon(id: string): Nullable<Coupon> | Promise<Nullable<Coupon>>;
    coupons(): Nullable<Coupon>[] | Promise<Nullable<Coupon>[]>;
    customer(id: string): Nullable<Customer> | Promise<Nullable<Customer>>;
    customers(): Nullable<Customer>[] | Promise<Nullable<Customer>[]>;
    image(id: string): Nullable<Image> | Promise<Nullable<Image>>;
    images(): Nullable<Image>[] | Promise<Nullable<Image>[]>;
    order(id: string): Nullable<Order> | Promise<Nullable<Order>>;
    orders(): Nullable<Order>[] | Promise<Nullable<Order>[]>;
    payment(id: string): Nullable<Payment> | Promise<Nullable<Payment>>;
    payments(): Nullable<Payment>[] | Promise<Nullable<Payment>[]>;
    product(id: string): Nullable<Product> | Promise<Nullable<Product>>;
    products(): Nullable<Product>[] | Promise<Nullable<Product>[]>;
    review(id: string): Nullable<Review> | Promise<Nullable<Review>>;
    reviews(): Nullable<Review>[] | Promise<Nullable<Review>[]>;
    sale(id: string): Nullable<Sale> | Promise<Nullable<Sale>>;
    sales(): Nullable<Sale>[] | Promise<Nullable<Sale>[]>;
    session(id: string): Nullable<Session> | Promise<Nullable<Session>>;
    shipping(id: string): Nullable<Shipping> | Promise<Nullable<Shipping>>;
    shippings(): Nullable<Shipping>[] | Promise<Nullable<Shipping>[]>;
    shop(id: string): Nullable<Shop> | Promise<Nullable<Shop>>;
    shops(): Nullable<Shop>[] | Promise<Nullable<Shop>[]>;
    staff(id: string): Nullable<Staff> | Promise<Nullable<Staff>>;
    staffs(): Nullable<Staff>[] | Promise<Nullable<Staff>[]>;
    tag(id: string): Nullable<Tag> | Promise<Nullable<Tag>>;
    tags(): Nullable<Tag>[] | Promise<Nullable<Tag>[]>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    variant(id: string): Nullable<Variant> | Promise<Nullable<Variant>>;
    variants(): Nullable<Variant>[] | Promise<Nullable<Variant>[]>;
    variantsOption(id: string): Nullable<VariantsOption> | Promise<Nullable<VariantsOption>>;
    variantsOptions(): Nullable<VariantsOption>[] | Promise<Nullable<VariantsOption>[]>;
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
    amount?: Nullable<number>;
    id?: Nullable<number>;
    quantity?: Nullable<number>;
}

export interface Session {
    id?: Nullable<number>;
    userAgent?: Nullable<string>;
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
    id: string;
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
    id?: Nullable<number>;
    type?: Nullable<string>;
}

export interface ForgotPasswordResponse {
    email?: Nullable<string>;
    message?: Nullable<string>;
}

type Nullable<T> = T | null;
