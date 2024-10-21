import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Syne, DM_Sans } from "next/font/google"
import Head from "next/head";
import { ModalProvider } from "@/utils/contexts/modalContext"
import { AccountProvider } from "@/utils/contexts/accountContext"
import { NavDrawerProvider } from "@/utils/contexts/navDrawerContext";
import Modal from "@/components/organisms/modal";
import NavDrawer from "@/components/molecules/navDrawer";

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' })
const dmsans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NFT Gallery Demo</title>
      </Head>
      <AccountProvider>
        <ModalProvider>
          <NavDrawerProvider>
            <main className={`${syne.variable} ${dmsans.variable}`}>
              <Component {...pageProps} />
            </main>
            <NavDrawer />
          </NavDrawerProvider>
          <Modal />
        </ModalProvider>
      </AccountProvider>
    </>
  )
}
