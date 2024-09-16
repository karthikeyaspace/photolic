use prisma with supabase
user profile

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