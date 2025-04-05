---
title: Setup NestJS application
description: Setup NestJS application
---
<!-- 
## Context
— 3 items
NestJS Application Explanation
This codebase represents a NestJS e-commerce application with GraphQL API. Let me break down the key components and explain how they work together.

Main Entry Point (main.ts)

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```


### src\main.ts
This is the entry point of the NestJS application:

NestFactory.create() initializes the NestJS application with the root AppModule
The application listens on the port specified in environment variables or defaults to 3000
The bootstrap() function is immediately invoked to start the application

### Application Module (app.module.ts)
```ts
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      sortSchema: true,
    }),

    SessionModule,
    AddressModule,
    AttributeModule,
    BrandModule,
    CategoryModule,
    ImageModule,
    OrderModule,
    ProductModule,
    ShopModule,
    TagModule,
    VariantModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```


### src\app.module.ts
The AppModule is the root module that:

Configures environment variables with ConfigModule.forRoot()
Sets up GraphQL with Apollo:
Uses code-first approach with autoSchemaFile to generate the schema
Passes request and response objects to the GraphQL context
Sorts the schema for consistency
Imports feature modules for different parts of the application:
User authentication (SessionModule)
E-commerce entities (ProductModule, OrderModule, etc.)
Registers the main AppController and AppService
Product Resolver (product.resolver.ts)
The ProductResolver is a GraphQL resolver that handles product-related operations:

```ts
@Resolver(() => Product)
export class ProductResolver {
  // Constructor and dependencies...
  
  // Mutations and Queries...
}
```


### src\product\product.resolver.ts
Key aspects of the ProductResolver:

1. Dependency Injection
The resolver injects multiple services to handle different aspects of product management:

```ts
constructor(
  private readonly productService: ProductService,
  private readonly attributeService: AttributeService,
  private readonly categoryService: CategoryService,
  // Other services...
) {}
```


2. GraphQL Operations
Queries: Fetch data (products, search, etc.)
Mutations: Create, update, or delete products
ResolveField: Resolve related entities (attributes, categories, etc.)
3. Authentication & Authorization
Uses guards to protect endpoints:

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SELLER)



4. Error Handling
Comprehensive error handling with logging:
```ts
try {
  // Operation logic
} catch (error) {
  this.logger.error(`Failed to create product: ${error.message}`, error.stack);
  throw error;
}
```


5. Pagination
Implements pagination for list operations:

```ts
const paginationParams = pagination || { limit: 10, offset: 0 };
// Use pagination in queries
```


6. Data Relationships
Uses @ResolveField() decorators to handle related entities:

```ts
@ResolveField()
async attributes(@Parent() product: Product) {
  // Resolve attributes for a product
}
```


### Overall Architecture
This NestJS application follows a modular architecture with:

Modules: Each feature has its own module (ProductModule, UserModule, etc.)
Services: Business logic encapsulated in services
Resolvers: GraphQL endpoints that use services
Guards: Authentication and authorization middleware
DTOs: Data transfer objects for input/output validation
Entities: Database models that map to GraphQL types
The application uses:

GraphQL: For API queries and mutations
Sequelize: For database operations (evident from Op import)
JWT Authentication: For securing endpoints
Role-based Access Control: Different permissions for admins and sellers
The code demonstrates NestJS best practices:

Separation of concerns
Dependency injection
Exception filters
Decorators for metadata
Proper error handling and logging
This e-commerce platform allows:

Product management (CRUD operations)
User authentication and authorization
Shop management for sellers
Product categorization and filtering
Image and variant handling
The architecture makes it easy to extend with new features while maintaining a clean, organized codebase.
<!-- 
explain all nest js architecture and pattern tutorial -->
 -->


## Context
— none fetched
NestJS Architecture and Patterns: A Comprehensive Tutorial
NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. Based on the code provided, I'll explain the core NestJS architecture and patterns with examples from the codebase.

### 1. Core Architecture Components
Modules
Modules are the fundamental building blocks in NestJS. They encapsulate related components and provide organization.

```ts
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      sortSchema: true,
    }),
    SessionModule,
    AddressModule,
    AttributeModule,
    // Other modules...
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```


src\app.module.ts
#### Each module:

Can import other modules
Declares controllers (for REST APIs)
Provides services and other providers
Exports providers for use in other modules

### Controllers
Controllers handle incoming HTTP requests and return responses (used in REST APIs).

```ts
// Example controller pattern (not in provided code)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }
}
```


### Providers (Services)
Providers are classes annotated with @Injectable() that handle business logic.

```ts
// Example from product.resolver.ts showing service injection
constructor(
  private readonly productService: ProductService,
  private readonly attributeService: AttributeService,
  private readonly categoryService: CategoryService,
  // Other services...
) {}
```


### Resolvers (GraphQL)
Resolvers handle GraphQL operations (queries, mutations, subscriptions).

```ts
@Resolver(() => Product)
export class ProductResolver {
  @Query(() => ProductsResponse, { name: 'Products' })
  async findAll(
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    // Implementation...
  }

  @Mutation(() => ProductsResponse)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SELLER)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @CurrentUser() user: User,
  ) {
    // Implementation...
  }
}
```


src\product\product.resolver.ts
#### 2. Key Design Patterns in NestJS
Dependency Injection
NestJS uses a powerful DI container to manage dependencies.

```ts
constructor(
  private readonly productService: ProductService,
  private readonly attributeService: AttributeService,
  // Other services...
) {}
```


src\product\product.resolver.ts
#### Benefits:

Loose coupling between components
Easier testing through mocking
Simplified component management

### Decorator Pattern
NestJS extensively uses decorators for metadata and behavior.

```ts
@Mutation(() => Product)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SELLER)
async updateProduct(
  @Args('updateProductInput') updateProductInput: UpdateProductInput,
  @CurrentUser() user: User,
) {
  // Implementation...
}
```


src\product\product.resolver.ts
#### Types of decorators:

Class decorators: @Module(), @Controller(), @Resolver()
Method decorators: @Get(), @Post(), @Query(), @Mutation()
Parameter decorators: @Param(), @Body(), @Args(), @CurrentUser()
Repository Pattern
While not explicitly shown in the provided code, NestJS often uses repositories to abstract data access.

```ts
// Example repository pattern
@Injectable()
export class ProductRepository {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async findAll(options): Promise<Product[]> {
    return this.productModel.findAll(options);
  }
}
```


### Guard Pattern
Guards determine if a request should be processed based on conditions.
```ts
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SELLER)
```


src\product\product.resolver.ts
### Guards are used for:

Authentication
Authorization
Request validation
Interceptor Pattern
Interceptors add extra logic before/after method execution.

```ts
// Example interceptor (not in provided code)
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    return next.handle().pipe(
      tap(() => console.log('After...'))
    );
  }
}
```


### Pipe Pattern
Pipes transform input data or validate it.

```ts
// Example pipe usage (implied in the code)
@Args('id', { type: () => String, pipe: new ValidationPipe() }) id: string
```


### Exception Filter Pattern
Exception filters handle errors and format responses.

```
try {
  // Operation logic
} catch (error) {
  this.logger.error(`Failed to create product: ${error.message}`, error.stack);
  throw error; // Will be caught by NestJS exception filters
}
```


src\product\product.resolver.ts
### 3. Application Architecture Patterns
Modular Architecture
The application is divided into feature modules:

```ts
imports: [
  SessionModule,
  AddressModule,
  AttributeModule,
  BrandModule,
  CategoryModule,
  // Other modules...
]
```


src\app.module.ts
#### Benefits:

Better organization
Code reusability
Easier maintenance
GraphQL Code-First Approach
The application uses GraphQL with a code-first approach:

```ts
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  // Other options...
})
```


src\app.module.ts
#### With entity definitions:

```ts
@Resolver(() => Product)
export class ProductResolver {
  @Query(() => ProductsResponse, { name: 'Products' })
  // Method implementation...
}
```


src\product\product.resolver.ts
### DTO Pattern
Data Transfer Objects define the shape of data:

```ts 
@Args('createProductInput') createProductInput: CreateProductInput
```


src\product\product.resolver.ts
#### DTOs are used for:

Input validation
Type safety
Documentation
Entity Pattern
Entities represent database models:

```ts
@Resolver(() => Product)
// Product is an entity class
```


src\product\product.resolver.ts
### Service Layer Pattern
Services encapsulate business logic:

const product = await this.productService.create(createProductInput);



src\product\product.resolver.ts
### 4. Authentication and Authorization
JWT Authentication
@UseGuards(JwtAuthGuard)



src\product\product.resolver.ts
### Role-Based Access Control
```ts
@Roles(UserRole.ADMIN, UserRole.SELLER)
@UseGuards(JwtAuthGuard, RolesGuard)
```


src\product\product.resolver.ts
### Custom Decorators
```ts
@CurrentUser() user: User
```


src\product\product.resolver.ts
### 5. Error Handling and Logging
Centralized Error Handling
```ts
try {
  // Operation logic
} catch (error) {
  this.logger.error(`Failed to create product: ${error.message}`, error.stack);
  throw error;
}
```


src\product\product.resolver.ts
### Structured Logging
private readonly logger = new Logger(ProductResolver.name);
```ts
// Usage
this.logger.error(`Failed to fetch products: ${error.message}`, error.stack);
```


src\product\product.resolver.ts
### 6. Data Access Patterns
Pagination
```ts
const paginationParams = pagination || { limit: 10, offset: 0 };

return {
  items: products,
  totalCount,
  hasMore: paginationParams.offset + paginationParams.limit < totalCount,
  page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
  pages: Math.ceil(totalCount / paginationParams.limit),
};
```


src\product\product.resolver.ts
### Filtering and Searching
```ts
// Build filter criteria
const filter: any = {};

if (categoryId) filter.categoryId = categoryId;
if (brandId) filter.brandId = brandId;

if (minPrice !== undefined || maxPrice !== undefined) {
  filter.price = {};
  if (minPrice !== undefined) filter.price[Op.gte] = minPrice;
  if (maxPrice !== undefined) filter.price[Op.lte] = maxPrice;
}
```


src\product\product.resolver.ts
### 7. Application Bootstrapping
```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```


src\main.ts
Best Practices Demonstrated in the Codebase
Separation of Concerns: Each module handles a specific domain
Single Responsibility Principle: Classes have focused responsibilities
Proper Error Handling: Try/catch blocks with logging
Input Validation: Validation in resolvers
Security: Guards and role-based access
Asynchronous Programming: Proper use of async/await
Environment Configuration: Using ConfigModule
Parallel Processing: Using Promise.all for concurrent operations

```ts
const [products, totalCount] = await Promise.all([
  this.productService.findAll(paginationParams),
  this.productService.countProducts(),
]);
```


src\product\product.resolver.ts
### Conclusion
NestJS provides a robust architecture that combines elements of OOP, FP, and FRP. The framework's modular design, combined with TypeScript's strong typing, creates a powerful platform for building scalable server-side applications.

The codebase demonstrates a well-structured e-commerce application with proper separation of concerns, authentication, authorization, and error handling - all following NestJS best practices and patterns.