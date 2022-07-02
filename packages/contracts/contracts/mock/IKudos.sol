//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

// THIS IS ONLY FOR BUILD TO GET ABI

interface IKudos {
    struct KudosClaimabilityAttributesContainer {
        bool isSignatureRequired;
        bool isAllowlistRequired;
        int256 totalClaimCount; // -1 indicates infinite
        uint256 remainingClaimCount; // if totalClaimCount = -1 then irrelevant
        uint256 expirationTimestamp; // 0 indicates no expiration
    }

    struct KudosContainer {
        string headline;
        string description;
        uint256 startDateTimestamp;
        uint256 endDateTimestamp;
        string[] links;
        string DEPRECATED_communityDiscordId; // don't use this value anymore
        string DEPRECATED_communityName; // don't use this value anymore
        address creator;
        uint256 registeredTimestamp;
        string communityUniqId;
        KudosClaimabilityAttributesContainer claimabilityAttributes;
    }

    function getKudosMetadata(uint256 tokenId)
        external
        view
        returns (KudosContainer memory);
}
