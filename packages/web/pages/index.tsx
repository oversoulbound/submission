import type { GetServerSideProps, NextPage } from "next";

import { Text, Grid, VStack, GridItem, Box } from "@chakra-ui/react";

import { Link } from "../components/Link";
import { ConnectWallet } from "../components/ConnectWallet";
import { Layout } from "../components/Layout";
import { alchemy } from "../lib/alchemy";
import { getNftsForCollection } from "@alch/alchemy-sdk";
import { NFT } from "../types/nft";
import { COLLECTION_ADDRESS } from "../lib/constant";

interface IndexPageProps {
  nfts: NFT[];
}

const IndexPage: NextPage<IndexPageProps> = ({ nfts }) => {
  return (
    <Layout>
      <VStack>
        <ConnectWallet />
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {nfts.map((nft, i) => {
            const [, address] = nft.phrase.split("#");
            return (
              <GridItem key={i}>
                <Link to={`/${address}`}>
                  <Box p="4" border="1px" borderColor="white" borderRadius="xl">
                    <Text key="ok" color="white" fontSize="xs">
                      {nft.phrase}
                    </Text>
                  </Box>
                </Link>
              </GridItem>
            );
          })}
        </Grid>
      </VStack>
    </Layout>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getNftsForCollection(alchemy, COLLECTION_ADDRESS);

  const result: NFT[] = data.nfts.map((nft) => {
    console.log(nft);
    return {
      tokenId: nft.tokenId,
      phrase: nft.title,
      // image: nft.rawMetadata!.animation_url,
    };
  });

  return {
    props: {
      nfts: result,
    },
  };
};
