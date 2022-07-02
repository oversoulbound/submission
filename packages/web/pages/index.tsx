import type { NextPage } from "next";

import { Layout } from "../components/Layout";
import { SketchComponent } from "../components/SketchComponent";

const Home: NextPage = () => {
  return (
    <Layout>
      <SketchComponent />
    </Layout>
  );
};

export default Home;
