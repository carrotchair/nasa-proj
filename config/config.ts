import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nasaMeteorUrl: string;
  apiKey: string;
  nasaRoverUrl: string;
  sol: number;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nasaMeteorUrl: process.env.NASA_API_URL || '',
    apiKey: process.env.NASA_API_KEY || '',
    nasaRoverUrl: process.env.NASA_ROVER_URL || '',
    sol: Number(process.env.SOL) || 0,
};

export default config;
