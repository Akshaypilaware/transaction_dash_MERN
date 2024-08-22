# Transaction Dashboard

## Description

A MERN stack application for managing and visualizing transactions. This project includes both a frontend built with React and Material UI, and a backend built with Express and MongoDB.

## Features

- **Transaction Management**: Add, update, and delete transactions.
- **Data Visualization**: View transaction statistics and charts.
- **Pagination and Search**: Efficiently handle large datasets with search and pagination features.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB Atlas account (for cloud database).
- Git installed.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Akshaypilaware/transaction_dash_MERN.git
   cd transaction-dashboard
   ```

2. **Install Backend Dependencies**

   Navigate to the `backend` directory and install dependencies:

   ```bash
   cd backend
   npm install
   ```

3. **Set Up Environment Variables**

   Copy `.env.example` to `.env` and update with your MongoDB connection string and other environment variables.

4. **Seed the Database**

   Run the seed script to populate the database with initial data:

   ```bash
   npm run seed
   ```

5. **Start the Backend Server**

   ```bash
   npm start
   ```

6. **Install Frontend Dependencies**

   Navigate to the `frontend` directory and install dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

7. **Start the Frontend**

   ```bash
   npm start
   ```

The application should now be running at `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

## Usage

1. **Frontend**: Navigate to the transaction dashboard to view and manage transactions. Use the search bar and pagination controls to interact with the data.

2. **Backend API**: The backend exposes various API endpoints for managing transactions. Refer to the API documentation for detailed usage.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests. Make sure to follow the code style and include tests for new features.
