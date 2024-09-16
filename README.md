use prisma with supabase
user profile

// docker run -d -e POSTGRES_DB=mydb -e POSTGRES_PASSWORD=testpass123 -e POSTGRES_USER=postgres -p "6500:5432" postgres
// DATABASE_URL="postgresql://postgres:testpass123@localhost:6500/mydb?schema=public"
// docker run --hostname=c5c22ac2461f --mac-address=02:42:ac:11:00:02 --env=POSTGRES_PASSWORD=testpass123 --env=POSTGRES_USER=postgres --env=POSTGRES_DB=mydb --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/postgresql/16/bin --env=GOSU_VERSION=1.17 --env=LANG=en_US.utf8 --env=PG_MAJOR=16 --env=PG_VERSION=16.4-1.pgdg120+1 --env=PGDATA=/var/lib/postgresql/data --volume=/var/lib/postgresql/data --network=bridge -p 6500:5432 --restart=no --runtime=runc -d postgres

user: {
id: string;
email: string;
name: string;
avatar: string;
created_at: string;
updated_at: string;
generations: [];
}

store api key of user in local storage
use supabase to store user profile and generations

what to do more

- add next auth
- configure api options
- configure ui sidebar
- prisma storage - figure out a way for less api calls

https://next-js-flux1-replicate.vercel.app/
https://github.com/ashakoen/next-js-flux1-replicate/blob/main/src/app/api/replicate/route.ts


  "["https://replicate.delivery/yhqm/sKIJxZrcviLVMFDfoS4ekfBpI9V0dcoyx1GlcAnOrK3eAt0NB/out-0.png"]"