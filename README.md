- docker run -d -e POSTGRES_DB=mydb -e POSTGRES_PASSWORD=testpass123 -e POSTGRES_USER=postgres -p "6500:5432" postgres
- docker stop photolic
- docker restart photolic

- npx prisma migrate dev 
- npx prisma generate
- npx prisma studio

store api key of user in local storage - choice

- user profile
- add toast and check the flow of all response messages
- saved and deleted photos display
- add infinite scroll loading