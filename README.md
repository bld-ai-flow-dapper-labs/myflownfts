# Myflownfts

## Installation

### Prerequisites

#### Frontend

- [Node 16.17.0](https://nodejs.org)

#### Frontend Setup

- Create `/apps/site/.env.local` file and fill out `API_KEY`, which can be obtained from https://app.simplehash.com/.

```
npm install -g yarn
yarn
yarn start
```

#### Firebase Setup

1. Create a Firebase project
2. Add a web app
3. Insert SDK config into `.env.local`
4. Create a Realtime Database
5. Add database url in `.env.local`
6. Change database rules: `.write: true`

#### Firebase App Check Setup
1. Register site in `https://www.google.com/recaptcha/admin/create`
2. Select "reCAPTCHA v3"
3. Add domain/s
   - If locally, add local IP address instead of `localhost`
   - To get IP address, run `ip addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}'`
4. Add reCAPTCHA key to `.env.local (NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY)`
5. Go to Firebase project and enable `App Check`
6. In App Check > Apps, add your site and add the reCAPTCHA V3 secret key under `reCAPTCHA`
7. In App Check > APIs, enforce App Check for the `Realtime Database`

#### ReCAPTCHA Setup

1. Register site in `https://www.google.com/recaptcha/admin/create`
2. Select "reCAPTCHA v2 - Invisble reCAPTCHA badge"
3. Add domain/s
   - If locally, add local IP address instead of `localhost`
   - To get IP address, run `ip addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}'`
4. Add reCAPTCHA keys to `.env.local`
