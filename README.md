# React Mpesa Stk Push App

This is a React application for initiating Mpesa Stk Push transactions. It utilizes the Mpesa Stk Push API to submit transactions and provides real-time status updates through recursive validation.

## Features

- Submit Mpesa Stk Push transactions with ease.
- Real-time transaction status updates.
- User-friendly notifications for transaction success, failure, and cancellation.

## Prerequisites

Before running the application, ensure you have the following:

- Node.js installed
- npm (Node Package Manager) installed
- Backend API (Assuming it's available at `http://localhost:5000`)
- You can find the backend API here: [Domains18/Nodejs/Daraja]("https://github.com/Domains18/NodeJsDaraja.git")
- 

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Domains18/SafaricomDarajaFrontEnd.git
    ```

2. Navigate to the project directory:

    ```bash
    cd client
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the React application:

    ```bash
    npm run dev
    ```

The application should now be running at [http://localhost:5173](http://localhost:5173).

## Usage

1. Enter the required details, including phone number and amount.
2. Click the "Submit" button to initiate the Mpesa Stk Push transaction.
3. Real-time notifications will inform you of the transaction status.
4. Loading indicators will appear during the transaction submission.

## Additional Information

- This application uses Axios for making HTTP requests.
- Toast notifications are implemented using the `react-toastify` library.

Feel free to customize and extend the application based on your specific requirements.

## License

This project is licensed under the [MIT License](LICENSE).

---

