# Ecommerce Application

## Overview
This is a full-stack Ecommerce application built using modern web technologies. The application leverages **React** for the frontend, **Redux Saga** for state management, **Hasura** for real-time GraphQL APIs, **SQL** for database management, and **Jest** for testing.

## Tech Stack
- **Frontend:** React, Redux Saga, ShadCN
- **Backend:** Hasura (GraphQL), Express
- **Database:** SQL (PostgreSQL/MySQL)
- **State Management:** Redux Saga
- **Testing:** Jest

## Features
- User authentication and authorization
- Product listing and search functionality
- Shopping cart and checkout system
- Payment gateway integration
- Order tracking
- Admin dashboard for product and order management
- Real-time updates with Hasura GraphQL

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (>=16.x)
- PostgreSQL/MySQL (if using SQL locally)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/tanishq-khandelwal/Ecommerce
   cd Ecommerce
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add necessary configurations:
   ```sh
   REACT_APP_HASURA_ENDPOINT=https://your-hasura-instance.com/v1/graphql
   REACT_APP_API_BASE_URL=https://your-backend-api.com
   REACT_APP_JWT_SECRET=your_secret_key
   ```

4. Start the backend:
   ```sh
   npm run start
   ```

5. Start the frontend
  ```sh
`npm run dev  
 ```

## Running Tests
Run unit and integration tests using Jest:
```sh
npm test
```



