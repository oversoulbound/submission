import axios from "axios";
import { ethers } from "ethers";
import type { GetServerSideProps, NextPage } from "next";

import { Layout } from "../components/Layout";
import { NFT } from "../types/nft";
import { Helmet } from "react-helmet";
import Iframe from "react-iframe";
import { SketchComponent } from "../components/SketchComponent";

export const SBT_CONTRACT_ADDRESSES = ["0x60576A64851C5B42e8c57E3E4A5cF3CF4eEb2ED6"];

interface IndexPageProps {
  nfts: NFT[];
}

const IndexPage: NextPage<IndexPageProps> = ({ nfts }) => {
  const iframeSource =
    "https://oversoul.vercel.app/creative/index.html?seed=0xB6Ac3Fe610d1A4af359FE8078d4c350AB95E812b";
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
  const { data } = await axios.get(`http://localhost:3000/api/${context.params.address}`);
  const nfts = data;
  return {
    props: {
      nfts,
    },
  };
};
