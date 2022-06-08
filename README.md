# Vite React Redux Toolkit TypeScript Best Practice

This repo is bootstraped with [vite-react-ts-antd-esLint-prettier](https://github.com/Malaaaa/vite-react-ts-antd-esLint-prettier)

## ✨ Features

-- use Ant-d modern UI libirary with Vite on-demand loading.

-- use navigator.geolocation get user current location.

-- use google map display and qurey location infomation.

-- use Redux Toolkit manage statement.

## Structure

├─components
│  ├─LatestSearchedLocation
│  ├─LocationTable
│  ├─Map
│  └─SearchLocation
├─store
│  └─slice
├─types
└─utils

## 💄 Project Setup

Node version

- node: v14+
- npm: 8+

Creat `.env` in the project of root directory

```.env
VITE_GOOGLE_MAPS_API_KEY = 
VITE_GOOGLE_MAPS_API_URL = https://maps.googleapis.com/maps/api/
```

Install Dependencies

```bash
npm i
```

Compile and Hot-Reload for Development

```bash
npm run dev
```

Type-Check, Compile and Minify for Production

```bash
npm run build
```

Type-Check, Compile and Minify for Production

```bash
npm run build
```
