import "../styles/globals.css";
import Navigation from "../components/shared/navigation/Navigation";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}
