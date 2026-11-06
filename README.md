# Go Payment Split Calculator

A full-stack payment installment calculator built with **Go, React, and Docker**.

The application allows users to enter a payment amount, select the number of installments, and automatically calculate the installment breakdown through a Go REST API.

## Overview

This project demonstrates a full-stack application where a React frontend communicates with a Go backend through HTTP requests.

The backend validates the input, calculates the installment amounts, handles rounding differences, and returns the results in JSON format.

Both services are containerized and managed using Docker Compose.

## Tech Stack

**Backend**
- Go
- Standard Go libraries (`net/http`, `encoding/json`, `math`)
- REST API
- JSON request and response handling

**Frontend**
- React
- Vite
- JavaScript
- CSS

**DevOps**
- Docker
- Docker Compose

## Features

- Calculate payment installments automatically.
- Support for 6, 8, and 12 installments.
- Validate payment amounts.
- Validate installment options.
- Adjust the final installment to account for rounding differences.
- REST API communication using HTTP POST.
- JSON-based request and response handling.
- HTTP error handling.
- Dockerized frontend and backend services.

## Project Structure

```text
go-payment-split-calculator/
│
├── backend/
│   ├── Dockerfile
│   ├── go.mod
│   └── main.go
│
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   ├── index.html
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

To run the complete application using Docker, you only need:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Make sure Docker Desktop is running before proceeding.

### 1. Clone the repository

```bash
git clone https://github.com/Delvinol/go-payment-split-calculator.git

cd go-payment-split-calculator
```

### 2. Build and start the application

Run the following command from the project's root directory:

```bash
docker compose up --build
```

Docker Compose will:

1. Build the Go backend image.
2. Build the React frontend image.
3. Start both containers.
4. Expose the application ports.

Wait until both services have started successfully.

### 3. Open the application

Open your browser and navigate to:

**Frontend:**
http://localhost:5174

**Backend API:**
http://localhost:8080

The frontend will communicate with the backend automatically.

### 4. How to use the application

1. Enter the amount you want to split.
2. Select the number of installments: 6, 8, or 12.
3. The application automatically sends a request to the backend.
4. The backend calculates the installment amounts.
5. The frontend displays the calculation results.

No additional button is required to trigger the calculation if the amount and installment selection are valid.

### 5. Stop the application

To stop the containers, press `CTRL + C` in the terminal where Docker Compose is running.

Alternatively, execute:

```bash
docker compose down
```

To start the application again without rebuilding the images:

```bash
docker compose up
```

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

**Full URL:**

```text
http://localhost:8080/calculate
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
  "finalquota": 200
}
```

### Supported Installment Options

| Installments | Description |
|---|---|
| 6 | Split the amount into 6 installments |
| 8 | Split the amount into 8 installments |
| 12 | Split the amount into 12 installments |

### Calculation Logic

The backend divides the requested amount into equal installments, rounding each regular installment to two decimal places.

The final installment is adjusted to ensure that the sum of all installments matches the original amount.

For example:

| Description | Amount |
|---|---:|
| Requested amount | $1,000.00 |
| Number of installments | 6 |
| First 5 installments | $166.67 each |
| Final installment | $166.65 |
| Total | $1,000.00 |

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

## Docker Architecture

The application consists of two independent services managed through Docker Compose:

| Service | Technology | Port |
|---|---|---|
| Backend | Go REST API | 8080 |
| Frontend | React + Vite | 5174 |

Docker Compose manages the build process, container startup, port mapping, and service dependencies.

## Future Improvements

- Add automated unit and integration tests.
- Improve input validation and error responses.
- Add configurable installment options.
- Implement a more detailed payment summary.
- Add CI/CD automation.

## Author

**Delvin Larez**

Software Developer | Go | React | REST APIs | SQL

[GitHub](https://github.com/Delvinol)