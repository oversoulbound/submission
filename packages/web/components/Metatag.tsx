import Head from "next/head";
import React from "react";

export const Metatag: React.FC = () => {
  return (
    <Head>
      <title>OverSoul 🔥</title>
      <meta property="og:url" content="https://oversoul.vercel.app/" />
      <meta property="og:title" content="OverSoul 🔥" />
      <meta property="og:site_name" content="OverSoul 🔥" />
      <meta property="og:description" content="Onchain identity visualiser with SBT" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://oversoul.vercel.app/ogp.png" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};
