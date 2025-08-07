I want to create the whole project to teach NestJS course with the below course syllabus.
Can you help me create the whole project which contains the feature of the following chapter below.

# NestJS REST API Course Syllabus

---

## Chapter 1: Getting Started with NestJS

### Introduction to NestJS
- Overview of NestJS as a progressive Node.js framework built with TypeScript.
- Comparison with Express.js:
  - **Express**: Unopinionated, minimal setup.
  - **NestJS**: Opinionated, follows MVC pattern, and provides scalable architecture out of the box.
- Key Features:
  - TypeScript support
  - Modular structure
  - Dependency Injection (DI)
  - CLI tooling
  - Active community
- Internally built on Express (default) or Fastify (optional alternative).

### Prerequisites and Setup
- Ensure **Node.js (LTS)** is installed.
- Use **Visual Studio Code (VS Code)** as the recommended editor.
- Open a clean working directory for the project.

### NestJS CLI
- Install globally:
  ```bash
  npm install -g @nestjs/cli
  ```
- Create a new project:
  ```bash
  nest new <project-name>
  ```

### Project Structure Overview
- Explore generated files:
  - `main.ts`: Application entry point.
  - `app.module.ts`: Root module.
  - `app.controller.ts`, `app.service.ts`: Default controller and service.
- Run the dev server with:
  ```bash
  npm run start:dev
  ```
- Test the default “Hello World” route using Postman or Thunder Client.

---

## Chapter 2: Building Controllers and Defining Routes

### Creating Modules
- Use CLI to generate a module:
  ```bash
  nest g module users
  ```
- New modules are imported into `AppModule` automatically.

### Creating Controllers and Services
- Generate controller and service:
  ```bash
  nest g controller users
  nest g service users
  ```
- CLI will auto-register them in the `UsersModule`.

### Understanding Controllers
- Controllers handle incoming HTTP requests and return responses.
- Use `@Controller('users')` to define a route prefix.

### Defining Routes (CRUD)

#### GET Requests
- Retrieve all users:
  ```ts
  @Get() // GET /users
  ```
- Retrieve user by ID:
  ```ts
  @Get(':id') // GET /users/:id
  @Param('id') id: string
  ```

#### POST Requests
- Create a user:
  ```ts
  @Post()
  @Body() createUserDto: CreateUserDto
  ```

#### PATCH Requests
- Update a user:
  ```ts
  @Patch(':id')
  @Param('id') id: string
  @Body() updateUserDto: UpdateUserDto
  ```

#### DELETE Requests
- Delete a user:
  ```ts
  @Delete(':id')
  @Param('id') id: string
  ```

#### Query Parameters
- Handle optional query params:
  ```ts
  @Query('role') role: string
  ```

---

## Chapter 3: Implementing Services and Dependency Injection

### Providers as Services
- Providers can be:
  - Services
  - Factories
  - Repositories
  - Utility classes
- Use `@Injectable()` to make a class available for DI.

### Business Logic in Services
- Implement `UsersService` with methods:
  - `findAll()`
  - `findOne(id: number)`
  - `create()`
  - `update(id: number)`
  - `remove(id: number)`
- Use mock data (`private users = []`) before integrating a database.

### Dependency Injection in Action
- Inject `UsersService` into `UsersController`:
  ```ts
  constructor(private readonly usersService: UsersService) {}
  ```

### Type Coercion
- Convert path params to number using unary plus:
  ```ts
  const user = this.usersService.findOne(+id);
  ```

---

## Chapter 4: Data Validation, Pipes, DTOs, and Error Handling

### Introduction to Data Validation
- Importance of validating incoming data to ensure reliability and prevent errors.

### Pipes
- Special middleware for transformation and validation.
- `ParseIntPipe`: transforms string to number and throws `400 Bad Request` on failure.

### DTOs (Data Transfer Objects)
- Define DTO classes for request schemas.
- Use `@nestjs/mapped-types`, `PartialType` for reusability.
- Apply in controllers and services.

### Class Validation
- Use `class-validator` and `class-transformer`.
- Decorators: `@IsEmail()`, `@IsNotEmpty()`, `@IsEnum()`, etc.
- Customize error messages.

### ValidationPipe
- Apply per route or globally for automatic DTO validation.

### Error Handling with HTTP Exceptions
- Use exceptions like `NotFoundException`, `BadRequestException`.
- Throw from services and provide descriptive messages.

---

## Chapter 5: Database Integration with TypeORM and PostgreSQL (Neon)

### Introduction
- Use TypeORM with a Neon PostgreSQL database.

### Setup
- Install dependencies:
  ```bash
  npm install @nestjs/typeorm typeorm pg
  ```
- Configure `TypeOrmModule` in `AppModule`.

### Defining Entities
- Use decorators like `@Entity()`, `@PrimaryGeneratedColumn()`, `@Column()`.
- Create enums with `@Column({ type: 'enum' })`.

### Database Migrations
- Generate and run:
  ```bash
  npm run typeorm migration:generate -- -n Init
  npm run typeorm migration:run
  ```

### Create Database Module
- Use `TypeOrmModule.forRoot()` in a `DatabaseModule`.

### Generate CRUD Resource
- Scaffold resource:
  ```bash
  nest g resource employees
  ```

### Implementing Services
- Use `@InjectRepository()` and repository methods for DB operations.

---

## Chapter 6: Enhancing the API

### Global Prefix
- Add global route prefix in `main.ts`:
  ```ts
  app.setGlobalPrefix('api');
  ```

### CORS
- Enable CORS:
  ```ts
  app.enableCors();
  ```

### Rate Limiting
- Install and configure:
  ```bash
  npm install @nestjs/throttler
  ```
- Apply `ThrottlerGuard` globally.
- Use `@Throttle()` and `@SkipThrottle()`.

### Logging
- Extend `ConsoleLogger` in a custom `MyLoggerService`.
- Override methods and inject into controllers.
- Capture IP with `@Ip()`.

### Exception Filters
- Create custom filter extending `BaseExceptionFilter`.
- Use `@Catch()` to handle errors.
- Format error response and log with custom logger.
