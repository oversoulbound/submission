import { getNftsForOwner } from "@alch/alchemy-sdk";
import { ethers } from "ethers";
import type { GetServerSideProps, NextPage } from "next";

import { Layout } from "../components/Layout";
import { SketchComponent } from "../components/SketchComponent";
import { alchemy } from "../lib/alchemy";
import { NFT } from "../types/nft";

export const SBT_CONTRACT_ADDRESS = "0x60576A64851C5B42e8c57E3E4A5cF3CF4eEb2ED6";

interface IndexPageProps {
  nfts: NFT[];
}

const IndexPage: NextPage<IndexPageProps> = ({ nfts }) => {
  return (
    <Layout>
      <SketchComponent nfts={nfts} />
    </Layout>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (
    !context.params ||
    !context.params.address ||
    typeof context.params.address != "string" ||
    !ethers.utils.isAddress(context.params.address)
  ) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const { ownedNfts } = await getNftsForOwner(alchemy, context.params.address, {
    contractAddresses: [SBT_CONTRACT_ADDRESS],
  });
  const nfts: NFT[] = ownedNfts.map((nft) => {
    return {
      address: SBT_CONTRACT_ADDRESS,
      tokenId: nft.tokenId,
      phrase: nft.title,
    };
  });
  return {
    props: {
      nfts,
    },
  };
};
