# Go Payment Split Calculator

A full-stack payment installment calculator built with **Go** and **React**. The application calculates installment amounts based on a requested payment amount and the selected number of installments.

## Overview

The project consists of a Go backend that exposes a REST API and a React frontend built with Vite.

The backend validates incoming requests, processes installment calculations, and returns the results in JSON format.

## Tech Stack

**Backend**
- Go
- Standard Go libraries (`net/http`, `encoding/json`)
- REST API
- JSON request and response handling

**Frontend**
- React
- Vite
- JavaScript
- CSS

## Features

- Calculate payment installments.
- Support for 6, 8, and 12 installments.
- Validate payment amounts.
- Validate the number of installments.
- REST API communication using HTTP POST.
- JSON-based request and response handling.
- HTTP error handling.

## Project Structure

```text
go-payment-split-calculator/
│
├── backend/
│   ├── go.mod
│   └── main.go
│
├── frontend/
│   ├── src/
│   ├── index.html
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- [Go](https://go.dev/dl/)
- [Node.js](https://nodejs.org/)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/go-payment-split-calculator.git
cd go-payment-split-calculator
```

### 2. Run the Backend

Navigate to the backend directory:

```bash
cd backend
```

Start the Go server:

```bash
go run main.go
```

The API will be available at:

```text
http://localhost:8080
```

### 3. Run the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

## API Documentation

### Calculate Installments

**Endpoint:**

```http
POST /calculate
```

**Base URL:**

```text
http://localhost:8080
```

**Request Body:**

```json
{
  "askedamount": 1200,
  "quotasnumber": 6
}
```

**Successful Response:**

```json
{
  "askedamount": 1200,
  "quotasnumber": 6,
  "normalquota": 200,
  "finalquota": 0
}
```

### Supported Installment Options

| Installments | Description |
|---|---|
| 6 | Split the amount into 6 installments |
| 8 | Split the amount into 8 installments |
| 12 | Split the amount into 12 installments |

### Error Handling

The API returns appropriate HTTP status codes:

| Status Code | Description |
|---|---|
| 200 | Successful calculation |
| 400 | Invalid JSON or invalid input |
| 405 | HTTP method not allowed |
| 500 | Internal server error |

## Backend Implementation

The backend uses Go's standard library to handle HTTP requests and JSON processing.

- **Calculation struct:** Defines the payment calculation data.
- **Calculate method:** Implements the installment calculation logic and input validation.
- **calculateHandler:** Handles HTTP requests, processes JSON data, executes calculations, and returns responses.
- **main function:** Initializes the HTTP server and registers the API endpoint.

## Future Improvements

- Implement final installment adjustment for rounding differences.
- Add unit tests for calculation logic.
- Improve input validation and error responses.
- Integrate the React frontend with the Go REST API.
- Add Docker support.

## Author

**Delvin Larez**

Software Developer | Go | React | REST APIs | SQL

[GitHub](https://github.com/YOUR_USERNAME)
