import "../styles/globals.css";
import PrivateRoute from "../components/shared/routeguard/PrivateRoute";
import Navigation from "../components/shared/navigation/Navigation";

const protectedRoutes = ["/admin/product-upload"];

export default function App({ Component, pageProps }) {
  return (
    <>
      <PrivateRoute protectedRoutes={protectedRoutes}>
        {/* <Navigation /> */}
        <Component {...pageProps} />
      </PrivateRoute>
    </>
  );
}
