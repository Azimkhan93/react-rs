import '@/styles/globals.css';
// import '@/src/components/info/cardlist/card/Card.css'
// import '@/src/components/info/cardlist/card/Card.tsx'
// import '@/src/components/info/cardlist/CardList.tsx'
// import '@/src/components/info/Info.tsx'
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { setupStore } from '@/store/store';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={setupStore()}>
      <Component {...pageProps} />;
    </Provider>
  );
}
