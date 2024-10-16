import dotenv from 'dotenv'

dotenv.config()

const config = {
    port: process.env.PORT || 3000,
    nasaMeteorUrl: `${process.env.NASA_API_URL}`,
    apieKey: `${process.env.NASA_API_KEY}`,
    nasaRoverUrl: `${process.env.NASA_ROVER_URL}`,
    sol: Number(process.env.SOL)
}

export default config;