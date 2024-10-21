// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Inft, IPagination, InftOpenSea } from "@/utils/contexts/nftContext";

type Data = {
  success: boolean;
  message: string;
  data: Inft[];
  pagination: IPagination;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

  const isDev = process.env.NEXT_PUBLIC_ENV === 'development'
  
  const {
    chain,
    address,
    limit = <number>10,
    next = <string>""
} = req.query
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json')
  if (!isDev) {
    requestHeaders.set('x-api-key', `${process.env.NEXT_PUBLIC_OPENSEA_API_KEY}`)
  }

  const response: Data = {
    success: true,
    message: "NFTs fetched",
    data: [],
    pagination: {
      limit: parseInt(`${limit}`),
      next: `${next}`,
    }
  }

  await fetch(`
    https://${isDev ? 'testnets-api' : 'api'}.opensea.io/api/v2/chain/${chain}/account/${address}/nfts?limit=${limit}${next ? `&next=${next}` : ''}`
  , {
    method: 'GET',
    headers: requestHeaders,
  })
  .then((res) => res.json())
  .then((res) => {
    if (res) {
      if (res.errors) {
        response.success = false
        response.message = res.errors[0]
      } else if (res.nfts && res.nfts.length > 0) {
        response.pagination = { 
          limit: parseInt(`${limit}`),
          next: res.next
        }
        res.nfts.map((nft:InftOpenSea) => {
          response.data.push(<Inft>{
            identifier: nft.identifier,
            collection: nft.collection,
            contract: nft.contract,
            name: nft.name,
            imageUrl: nft.image_url,
          })
        })
      }
    }
  })
  .catch((err) => {
    response.success = false
    response.message = err
  })
  res.status(200).json(response);
}
