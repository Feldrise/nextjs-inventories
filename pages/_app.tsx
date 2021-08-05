import "../styles/globals.scss";
import { AppProps } from "next/app";

/**
 * App: the main application
 * @param param0 
 * @return 
 */
export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return <Component {...pageProps} />;
}
