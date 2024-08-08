import { auth, signOut } from "@/auth";
import routes from "@/lib/routes";

export default async function Settings() {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut({ redirectTo: routes.login });
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
