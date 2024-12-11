/* eslint-disable @typescript-eslint/no-unused-vars */
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Layout from '../components/Layout'
import { AuthProvider } from '../context/AuthContext'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp