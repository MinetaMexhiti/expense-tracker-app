# FinTrack Pro - Expense Tracker

## Overview

The FinTrack Pro - Expense Tracker is a web application designed to help users manage and track their expenses and incomes. The application allows users to record their expenses and incomes, categorize them automatically using AI, and view their financial status, including the net profit or loss.

## Features

- Add and track expenses and incomes.
- Automatic categorization of expenses using AI.
- View recent transactions and financial summaries.
- User authentication and profile management.
- Interactive dashboard displaying total expenses, total income, and net profit.

## Installation Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database set up and running.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/MinetaMexhiti/expense-tracker-app

   ```

2. Navigate to root directory:
   cd expense-tracker

3. Install server dependencies and start the server:
   cd server
   npm install
   npm run watch

4. Install client dependencies and start the client:
   cd ../client
   npm install
   npm run start

5. optional: MongoDB connection. You can use a cloud-hosted MongoDB instance instead of a local one. This URL allows access to the MongoDB instance without needing to download or set up MongoDB locally.

MONGO_URL=mongodb+srv://mm29335:mini123%40%40%40@expenses-tracker.ml3jccs.mongodb.net/expenses-tracker?retryWrites=true&w=majority&appName=expenses-tracker
