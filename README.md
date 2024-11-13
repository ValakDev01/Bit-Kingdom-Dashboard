# Bit Kingdom Dashboard 🖥️

<br />

## 📄 **Project Overview**
This project is a **full-stack, Single Page Application (SPA)** built with **React** on the frontend and **Node.js** on the backend. It provides users with a seamless experience across
various sections, including a **Dashboard**, **Account**, **Crypto Watchlist**, and **Settings**. The application features essential user authentication functionalities, such
as **login**, **signup**, **logout**, and **password recovery**. If a user navigates to an invalid URL, they are directed to a custom **404 page**.

<img width="1216" alt="Screenshot 2024-11-13 at 09 53 05" src="https://github.com/user-attachments/assets/30a2dbf0-b291-4404-9ccb-9f44ec49a962">

## 🛠️ Tech Stack
This project uses a combination of modern technologies across frontend, backend, database, and development tools. Below is a summary of the key technologies used in the development of this application:


| **Frontend 🖥️** | **Backend 💻** | **Database 🗃️** | **Other Tools 🔧** |
|------------------|----------------|------------------|--------------------------|
| **React**, **React Router Dom**, **React Query**, **React Icons**, **React Hook Form**, **React-Error-Boundary**, **React-Hot-Toast**, **TypeScript** | **Node.js**, **Express**, **Nodemailer**, **Morgan**, **Sendgrid/Mail**, **Winston** | **MongoDB**, **Mongoose** | **EsLint**, **Prettier**, **Nodemon**, **Cypress**, **Vercel** |

<br />

## 📦 Installation

Follow the instructions below to run this project:

1. Clone the repository to your local machine:
```

git clone https://github.com/ValakDev01/Bit-Kingdom-Dashboard

```
2. Navigate to the client folder and install dependencies:
```

cd client
yarn install

```
3. Next, navigate to the server folder and install the backend dependencies:
```

cd ../server
yarn install

```
4. After installing the dependencies, return to the client folder and start the frontend:
```

cd ../client
yarn dev

```

5. Next, you'll need to set up the `.env` file in the `server` folder.

- First, create a file named `.env` in the root folder of the `server` directory.
- Then, copy the entire contents of the `.env.example` file into your newly created `.env` file.

After this, you'll need to fill in the missing values for the environment variables in the `.env` file:

- For `DATABASE`, replace `<YOUR_DATABASE_CLUSTER>` with your MongoDB Atlas database cluster URL.
- For `DATABASE_PASSWORD`, replace `<YOUR_DATABASE_PASSWORD>` with the password for your MongoDB Atlas database.

To get these values, visit [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database), create an account, and generate your own database connection details.

- For `CMC_API_KEY`, create an account on [CoinMarketCap API](https://coinmarketcap.com/api/) and paste your unique API key here.

Additionally, you'll need to create two accounts to handle email functionality:

1. Create an account on [Mailtrap](https://mailtrap.io/) to receive emails sent by the application.
2. Create an account on [SendGrid](https://sendgrid.com/) to manage email sending functionality.

After setting up these accounts, copy the required API keys and other relevant details into the `.env` file to ensure that email functionality works correctly.

7. After all these steps, return to the server folder and start it:
```

cd ../server
yarn run start:dev

```

8. Additionally, you can easily import and delete the data from your database:
```

cd ../server
node utils/importDevData.js --import
node utils/importDevData.js --delete

```

## 📚 Postman Documentation

If you'd like to explore the API and test its endpoints, you can use the Postman collection available [here](https://documenter.getpostman.com/view/32875194/2sAY548KWM#6292478a-b8bc-4423-ad2e-5cb600c54dab).

This collection includes all the API routes and examples for how to interact with the backend services.
