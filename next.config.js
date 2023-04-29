/** @type {import('next').NextConfig} */
const { parsed: env } = require('dotenv').config()
const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
  env: {
    ...env,
    LOGIN_USERNAME: process.env.LOGIN_USERNAME,
    LOGIN_PASSWORD: process.env.LOGIN_PASSWORD,
  },
}

module.exports = nextConfig
