const env: {[key: string]: string} = {
    DATABASE_URL: process.env.DATABASE_URL ?? "",
    REPLICATE_API_KEY: process.env.REPLICATE_API_KEY ?? "",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? "",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? "ultrasecret",
}

export default env;


/**
 *  // docker run -d -e POSTGRES_DB=mydb -e POSTGRES_PASSWORD=testpass123 -e POSTGRES_USER=postgres -p "6500:5432" postgres
    // DATABASE_URL="postgresql://postgres:testpass123@localhost:6500/mydb?schema=public"
    // docker run --hostname=c5c22ac2461f --mac-address=02:42:ac:11:00:02 --env=POSTGRES_PASSWORD=testpass123 --env=POSTGRES_USER=postgres --env=POSTGRES_DB=mydb --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/postgresql/16/bin --env=GOSU_VERSION=1.17 --env=LANG=en_US.utf8 --env=PG_MAJOR=16 --env=PG_VERSION=16.4-1.pgdg120+1 --env=PGDATA=/var/lib/postgresql/data --volume=/var/lib/postgresql/data --network=bridge -p 6500:5432 --restart=no --runtime=runc -d postgres

 */