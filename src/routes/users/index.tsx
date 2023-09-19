import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

export const useGetUsers = routeLoader$(async () => {
  const prisma = new PrismaClient();
  // const user = await prisma.user.create({
  //   data: {
  //     name: "Alice",
  //     email: "494057020@qq.com",
  //   },
  // });
  const users = await prisma.user.findMany();
  console.log("users", users)
  return users;
});

export default component$(() => {
  const users = useGetUsers();
  return (
    <section>
      <h1>User's directory</h1>
      <ul>
        {users.value.map((user) => (
          <li key={user.id}>
            <a href={`/users/${user.id}`}>
              {user.name} ({user.email})
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
});
