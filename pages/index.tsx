import { Suspense, lazy, useContext } from "react";
import Header from "@/components/organisms/header";
import Wrapper from "@/components/wrapper";
import { NFTProvider } from "@/utils/contexts/nftContext";
import { AccountContext } from "@/utils/contexts/accountContext";

const NFTGallery = lazy(() => import("@/components/organisms/nftGallery"))

export default function Home() {
  const accountContext = useContext(AccountContext)

  return (
    <div className="grid grid-col-1 gap-3">
      <div className="col-span-1 h-[10vh]">
        <Wrapper>
          <Header />
        </Wrapper>
      </div>
      <div className="col-span-1 h-[90vh]">
        <Wrapper className="md:!px-[10px]">
          <div className="">
            {accountContext.state.connecting && !accountContext.state.account
              ? (
                <div className="flex justify-center items-center">
                  Wallet is not connected.
                </div>
              ) : (
                <Suspense fallback={(<></>)}>
                  <NFTProvider>
                    <NFTGallery />
                  </NFTProvider>
                </Suspense>
              )}
          </div>
        </Wrapper>
      </div>
    </div>
  );
}
