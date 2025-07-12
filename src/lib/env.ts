const env = {
    DATABASE_URL: process.env.DATABASE_URL ?? "",
    REPLICATE_API_KEY: process.env.REPLICATE_API_KEY ?? "",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? "",
    AUTH_URL: process.env.AUTH_URL ?? "http://localhost:3000",
}

export default env;
