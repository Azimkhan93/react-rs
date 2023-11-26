import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import { fetchPages } from '@/store/productsApi';

export function App({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  );
}




export default wrapper.withRedux(App);
