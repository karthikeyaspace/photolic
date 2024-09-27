# Photolic AI Image Generator

Photolic is an AI-powered photorealistic image generator that uses the *FLUX-schnell* model via the Replicate API.

### Tech Stack

- **Frontend**: Next.js
- **Database**: Supabase (Postgres), Prisma ORM
- **Authentication**: Google OAuth
- **API**: Replicate API for AI-based image generation

## Quick local setup

Follow these steps to get Photolic running on your local machine for development and testing.

### Prerequisites

Requirements for the software and other tools to build, test, and push:

- [NPM](https://www.npmjs.com/) (or any other package manager)


### Installation Steps


1. **Clone the repository**:
    ```bash
    git clone https://github.com/karthikeyaspace/photolic.git
    cd photolic
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

### Environment Variables Setup

1. Copy the `.env.example` to `.env`:
    ```bash
    cp .env.example .env
    ```

2. Replace the placeholders with your credentials in the `.env` file:
    ```bash
    DATABASE_URL="postgresql://[PG_USER]:[PG_PASS]@localhost:6500/[PG_DB]?schema=public"
    REPLICATE_API_KEY=r8_...
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    NEXTAUTH_SECRET="ultrasecret"
    NEXTAUTH_URL="http://localhost:3000"
    ```

- **Replicate API Key**: Get it from [Replicate API Tokens](https://replicate.com/account/api-tokens)
- **Google OAuth Credentials**: Set them up at [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

### Database Setup

1. Ensure **Docker Desktop** is installed.
2. Start Docker desktop to start docker engine
```bash
start "C:\Program Files\Docker\Docker\Docker Desktop.exe"
```
3. Pull and run the latest PostgreSQL image using Docker:
    ```bash
    docker pull postgres:latest
    ```
4. Run PostgreSQL in a Docker container:
    ```bash
    docker run -d -e POSTGRES_DB=mydb -e POSTGRES_PASSWORD=testpass123 -e POSTGRES_USER=postgres -p 6500:5432 postgres:latest
    ```

5. **Migrate the database** using Prisma:
    ```bash
    npx prisma migrate dev
    ```
6. **Generate prisma client**
    ``` bash
    npx prisma generate
    ```

### Running the Development Server

Once your environment is set up, start the development server with:

```bash
npm run dev
```
The application should now be accessible at http://localhost:3000/
