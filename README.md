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

prisma schema
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  avatar    String
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
  generations Generation[]
}

model Generation {
  id        String   @id @default(cuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  name      String
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}
```

prisma initialization commands

```bash
npx prisma init
npx prisma migrate dev --name init
npx prisma generate
```



what to do more

- add next auth
- configure api options
- configure ui sidebar
- prisma storage - figure out a way for less api calls