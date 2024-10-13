import dotenv from 'dotenv'

dotenv.config()

const config = {
    port: process.env.PORT || 3000,
    nasaMeteorUrl: `${process.env.NASA_API_URL}`,
    apieKey: `${process.env.NASA_API_KEY}`
}

export default config;