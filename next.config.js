/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
}
require('dotenv').config();

module.exports = nextConfig
