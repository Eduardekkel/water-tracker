import GlobalStyle from "../styles";
import { SessionProvider } from "next-auth/react";
export default function App({ session, Component, pageProps }) {
  return (
    <SessionProvider session={session}>
      <GlobalStyle />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
