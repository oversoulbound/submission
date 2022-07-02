export const IKudos_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getKudosMetadata",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "headline",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "startDateTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endDateTimestamp",
            type: "uint256",
          },
          {
            internalType: "string[]",
            name: "links",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "DEPRECATED_communityDiscordId",
            type: "string",
          },
          {
            internalType: "string",
            name: "DEPRECATED_communityName",
            type: "string",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "registeredTimestamp",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "communityUniqId",
            type: "string",
          },
          {
            components: [
              {
                internalType: "bool",
                name: "isSignatureRequired",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "isAllowlistRequired",
                type: "bool",
              },
              {
                internalType: "int256",
                name: "totalClaimCount",
                type: "int256",
              },
              {
                internalType: "uint256",
                name: "remainingClaimCount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "expirationTimestamp",
                type: "uint256",
              },
            ],
            internalType: "struct IKudos.KudosClaimabilityAttributesContainer",
            name: "claimabilityAttributes",
            type: "tuple",
          },
        ],
        internalType: "struct IKudos.KudosContainer",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
