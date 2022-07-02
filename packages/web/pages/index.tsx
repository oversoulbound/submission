import type { NextPage } from "next";

import { ConnectWallet } from "../components/ConnectWallet";
import { Layout } from "../components/Layout";

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <ConnectWallet />
    </Layout>
  );
};

export default IndexPage;
