import { getProviders, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Home from "@/components/Home/Home";

export default function SignIn({ providers }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!providers) {
    return <div>Loading providers...</div>;
  }

  return <Home providers={providers} />;
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
