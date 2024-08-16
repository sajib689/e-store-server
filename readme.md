# e-Store Server

This is the backend server for the e-store application. It provides APIs for managing products, including features like pagination, searching, sorting, and filtering.

## Features

- **Products API**: Fetch products with pagination, search, sort, and filter options.
- **CORS Enabled**: Cross-Origin Resource Sharing (CORS) is enabled for seamless integration with front-end applications.
- **Environment Variables**: Uses `.env` file to securely manage sensitive information.

## Technologies Used

- **Node.js**: JavaScript runtime for the server.
- **Express.js**: Web framework for handling HTTP requests and middleware.
- **MongoDB**: NoSQL database for storing product data.
- **dotenv**: For managing environment variables.
- **cors**: For enabling Cross-Origin Resource Sharing.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A MongoDB database URI (can use MongoDB Atlas for a cloud database).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sajib689/e-store-server.git
   cd e-store-server
