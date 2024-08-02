# Shopify Product Search App Demo

Demo Shopify Application that adds a Product search and selection page to the admin area.

## Features

- Sorting by title, inventory, type, vendor
- Text-based filtering
- Multiple selection
- Row rendering is customized to display product descriptions on a second line

## Technology/Frameworks used

- Node.js
- Next.js
- Koa
- Shopify GraphQL API
- Shopify Polaris
- ReactJS
- Apollo client

## Setup

To install the application as a Shopify store, it needs to have a valid web address.
A tool such as ngrok can be used to create a web tunnel to a local server.

### Create a Shopify App

1. Create a Shopify public app.
2. In the App URL field, enter your valid web address (e.g., `https://XXX.ngrok.io/` if using ngrok for tests, where `XXX` is the id generated when running ngrok - the server runs on HTTP port 3000 by default)
3. In the Allowed redirect URL(s) field, add the absolute URL for the `/auth/callback` path (e.g. `https://XXX.ngrok.io/auth/callback`)
4. After creating the app, copy the API key and API secret key to configure it.

### Configure the environment

Create a file named `.env` in the `/app` folder with the following content:

```
SHOPIFY_API_KEY='YOUR_KEY_HERE'
SHOPIFY_API_SECRET_KEY='YOUR_SECRET_KEY_HERE'
HOST='YOUR_VALID_WEB_URL'
API_VERSION='2020-01'
```

Note: this app may work with other Shopify API versions, but it is only tested with version 2020-01.

## Running the application

The app server can be started locally in development mode using `npm run dev` or `node server.js`.

To start in production mode instead, use `npm run start` (needs cross-env).
Or use `npm run build` or `next build` to create a distribution package.
