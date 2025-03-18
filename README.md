# CP-Planta Backend

API backend service for the CP-Planta production control system, built with NestJS, Prisma, and PostgreSQL.

![Banner](https://avatars.githubusercontent.com/u/202462667?s=200&v=4)

## Overview

CP-Planta Backend provides the core API services for a production control system designed for a hygienized products plant. This system streamlines production workflows, inventory management, and quality control processes.

## Features

- **Production Management**: Track and manage production orders and workflows
- **Inventory Control**: Manage raw materials, finished products, and stock movements
- **Quality Control**: Record quality inspections and non-conformities
- **User Management**: Role-based access control for system functions
- **Batch Traceability**: Complete tracking from raw materials to finished products

## Technology Stack

- **Framework**: [NestJS](https://nestjs.com/) - Progressive Node.js framework
- **Database**: PostgreSQL - Reliable, open-source relational database
- **ORM**: [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
- **Authentication**: JWT with Passport.js for secure access control
- **API Documentation**: OpenAPI with Swagger
- **Caching**: Redis for performance optimization
- **Testing**: Jest for unit and integration tests

## Development Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn
- PostgreSQL database
- Redis (optional, for caching)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Saccilotto-AGES-Projects/AGES-III-CP-Planta-Backend.git
   cd AGES-III-CP-Planta-Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```plaintext
   # Database connection
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cpplanta"
   
   # JWT settings
   JWT_SECRET="your-jwt-secret"
   JWT_EXPIRES_IN="1d"
   
   # Redis connection (optional)
   REDIS_HOST="localhost"
   REDIS_PORT=6379
   
   # Runtime environment
   NODE_ENV="development"
   ```

4. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

5. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:

   ```bash
   npm run start:dev
   ```

The API will be available at <http://localhost:3000> with Swagger documentation at <http://localhost:3000/api>.

## API Structure

The API follows a RESTful architecture with these main resource endpoints:

- `/auth` - Authentication and user management
- `/users` - User CRUD operations
- `/products` - Product and raw material management
- `/stock` - Inventory and stock movement operations
- `/production-orders` - Production order management
- `/categories` - Product categories
- `/suppliers` - Supplier management

## Database Schema

The system uses a rich data model with the following core entities:

- **Users**: System users with role-based permissions
- **Products**: Raw materials and finished products
- **Stock**: Inventory tracking with batch support
- **Production Orders**: Manufacturing orders with steps and progress tracking
- **Suppliers/Customers**: External business entities

## Docker Support

The project includes Docker configuration for easy containerization:

```bash
# Build the Docker image
docker build -t cpplanta-backend .

# Run the container
docker run -p 3000:3000 --env-file .env cpplanta-backend
```

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Check test coverage
npm run test:cov
```

## CI/CD Integration

This repository is set up with GitHub Actions workflows for:

- Continuous Integration: Runs linting and tests on pull requests
- Continuous Deployment: Builds and publishes Docker images on release

## Documentation

- API Documentation: Available at `/api` endpoint when the server is running
- Database Schema: Visualize with `npx prisma studio`
- Code Comments: JSDoc-style comments throughout the codebase

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the AGPL License - see the LICENSE file for details.

## Acknowledgments

- André Sacilotto Santos - Development Architecture and Implementation
- AGES (Agência Experimental de Engenharia de Software) - Project Management
- Hortti - Project Requirements and Business Logic
