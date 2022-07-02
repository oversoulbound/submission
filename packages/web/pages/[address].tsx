import { ethers } from "ethers";
import type { GetServerSideProps, NextPage } from "next";

import { Layout } from "../components/Layout";
import { SketchComponent } from "../components/SketchComponent";

interface IndexPageProps {
  address: string;
}

const IndexPage: NextPage<IndexPageProps> = ({ address }) => {
  return (
    <Layout>
      <SketchComponent address={address} />
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
  return {
    props: {
      address: context.params.address,
    },
  };
};
