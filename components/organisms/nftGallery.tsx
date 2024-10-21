import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AccountContext } from "@/utils/contexts/accountContext";
import { ModalContext } from "@/utils/contexts/modalContext";
import { NFTContext } from "@/utils/contexts/nftContext";
import { Inft } from "@/utils/contexts/nftContext";
import Skeleton from "@/components/atoms/skeleton"
import Button from "@/components/atoms/button"
import NftCard from "@/components/molecules/nftCard"

const NftGallery: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)

  const accountContext = useContext(AccountContext)
  const nftContext = useContext(NFTContext)
  const modalContext = useContext(ModalContext)

  const listObserver = useRef<HTMLDivElement>(null)

  const loadNFTs = async (account: string, flush: boolean = false) => {
    await fetch(`/api/opensea/nfts?chain=${accountContext.state.chain}&address=${account}&limit=${nftContext.state.pagination?.limit}${nftContext.state.pagination?.next ? `${!flush ? `&next=${nftContext.state.pagination?.next}`:''}` : '' }
    `)
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        nftContext.dispatch({
          type: !flush ? "APPEND_NFTS" : "LOAD_NFTS",
          payload: {
            nfts: res.data,
            pagination: res.pagination,
          }
        })
      } else {
        modalContext.dispatch({
          type: "OPEN",
          payload:  {
            open: !modalContext.state.open,
            children: (
              <div className="flex flex-col">
                <div>
                  {res.message}
                </div>
                <div className="flex justify-end gap-20 mt-5">
                  <Button
                    className="rounded-md"
                    label="Ok"
                    onClick={() => modalContext.dispatch({
                      type: "OPEN",
                      payload: { open: !!modalContext.state.open }
                    })}
                  />
                </div>
              </div>
            )
          }
        })
      }
    })
    .catch((err) => {
      modalContext.dispatch({
        type: "OPEN",
        payload:  {
          open: !modalContext.state.open,
          children: (
            <div className="flex flex-col">
              <div>
                Unknown error has been encountered.
              </div>
              <div className="flex justify-end gap-20 mt-5">
                <Button
                  className="rounded-md"
                  label="Ok"
                  onClick={() => modalContext.dispatch({
                    type: "OPEN",
                    payload: { open: !!modalContext.state.open }
                  })}
                />
              </div>
            </div>
          )
        }
      })
      console.log("Error: Could not fetch NFTs", err)
    })
    setLoading(false)
  }

  // helper function for handling inifinte scrolling
  const handleScroll = (account: string):IntersectionObserver => {
    const observer = new IntersectionObserver((o) => {
      if (o[0].isIntersecting) {
        if (nftContext.state.pagination?.next) {
          loadNFTs(account)
        }
      }
    }, { threshold: 1 })

    if (listObserver.current) {
      observer.observe(listObserver.current)
    }

    return observer
  }


  // useEffect calls
  // ===============
  useEffect(() => {
    if (!accountContext.state.account)
      return

    loadNFTs(accountContext.state.account, true)

    return () => {}
  }, [accountContext.state.account])

  useEffect(() => {
    const observer = handleScroll(accountContext.state.account)
    
    return () => {
      if (listObserver.current) {
        observer.unobserve(listObserver.current)
      }
    }
  }, [
    listObserver,
    handleScroll,
    accountContext.state.account,
  ])

  if (loading) {
    return (
      <div className="
        grid
        gap-10
        grid-cols-2

        lg:grid-cols-4
        xl:grid-cols-6"
      >
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    )
  }

  if (accountContext.state.account
    && nftContext.state.nfts
    && nftContext.state.nfts.length === 0) {
    return (
      <div className="flex justify-center items-center text-center">
        Your collection is empty. Mint some awesome arts now!
      </div>
    )
  }

  return (
    <>
      <div
        className="
          w-full
          px-4
          md:px-0
          grid
          gap-10
          grid-cols-2

          lg:grid-cols-4
          xl:grid-cols-6
        "
      >
        {nftContext.state.nfts && nftContext.state.nfts.map(
          (nft: Inft, idx: number) => (
          <div key={nft.identifier} className="">
            {nft.name && nft.imageUrl && (
              <>
                {idx === nftContext.state.nfts.length - 1 && (
                  <div className="observer" ref={listObserver}></div>
                )}
                <NftCard
                  nft={{
                    identifier: nft.identifier,
                    collection: nft.collection,
                    name: nft.name,
                    description: nft.description,
                    contract: nft.contract,
                    imageUrl: nft.imageUrl,
                  }}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default NftGallery