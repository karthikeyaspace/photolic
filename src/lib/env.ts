const env: {[key: string]: string} = {
    DATABASE_URL: process.env.DATABASE_URL ?? "",
    REPLICATE_API_KEY: process.env.REPLICATE_API_KEY ?? "",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? "",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? "ultrasecret",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
}

export default env;
