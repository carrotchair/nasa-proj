import dotenv from 'dotenv'

dotenv.config()

const config = {
    port: process.env.PORT || 4000,
    // startDate: process.env.START_DATE,
    // endDate: process.env.END_DATE,
    nasaMeteorUrl: `${process.env.NASA_API_URL}?api_key=${process.env.NASA_API_KEY}`
}

export default config;