import { getSession } from "next-auth/react";

export default function ProtectedPage() {
  return <div>Welcome to the protected page!</div>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin", // Leite Benutzer zur Anmeldeseite weiter, wenn nicht authentifiziert
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
