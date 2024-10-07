import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  if (!providers) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Sign in to Water Tracker</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const providers = await getProviders();
    console.log("Fetched providers:", providers); // Überprüfen, ob Provider verfügbar sind
    return {
      props: { providers },
    };
  } catch (error) {
    console.error("Error fetching providers:", error);
    return {
      props: { providers: null }, // Fallback, falls keine Provider gefunden werden
    };
  }
}
