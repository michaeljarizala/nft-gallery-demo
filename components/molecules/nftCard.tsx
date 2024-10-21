import React from "react";
import Image from "next/image";
import { Inft } from "@/utils/contexts/nftContext";

interface Props {
  nft: Inft
}

const NftCard: React.FC<Props> = (props:Props): 
React.JSX.Element => {
  const { nft } = props

  return (
    <div className="
      w-[100%]
      flex flex-col gap-3
    ">
      <div>
        {nft.imageUrl ? (
          <Image
            alt={`${nft.name} - ${nft.identifier}`}
            src={nft.imageUrl}
            width={300}
            height={300}
            quality={80}
            priority={true}
          />
        ) : (
          <div className="max-h-[300px] overflow-hidden">
            <Image
              className="object-contain"
              alt={`${nft.name} - ${nft.identifier}`}
              src="https://picsum.photos/id/870/200/300.webp?grayscale&blur=2"
              width={300}
              height={300}
              quality={80}
            />
          </div>
        )}
      </div>
      <h2 className="
        font-semibold
        text-lg"
      >{nft.name}</h2>
      <div className="flex flex-col">
        <div className="
          text-sm
          text-orange-500
          font-semibold"
        >Contract:</div>
        <div className="
          text-sm
          break-words
          font-light"
        >{nft.contract}</div>
      </div>
    </div>
  )
}

export default NftCard