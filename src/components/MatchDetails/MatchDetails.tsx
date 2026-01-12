import { useMemo } from 'react';
import type { MatchDTO, ParticipantDTO } from '../../services/typesApi';
import { TableOfMatchDetails } from '../TableOfMatchDetails/TableOfMatchDetails';
import { Flex } from '@chakra-ui/react';

export const MatchDetails = ({
    matchData,
}: {
    matchData: {
        id: string;
        info: MatchDTO | null;
    } | null;
}) => {
    const infoByPlayers = useMemo(() => {
        return matchData?.info?.info.participants.map(
            (playerInfo) => playerInfo
            // const {
            //     championId,
            //     championName,
            //     item0,
            //     item1,
            //     item2,
            //     item3,
            //     item4,
            //     item5,
            //     item6,
            //     assists,
            //     deaths,
            //     kills,
            //     summoner1Id,
            //     summoner1Casts,
            //     summoner2Id,
            //     summoner2Casts,
            //     individualPosition,
            //     riotIdGameName,
            //     riotIdTagline,
            // } = playerInfo;
            // return {
            //     championName,
            //     riotIdGameName,
            //     riotIdTagline,
            //     item0,
            //     item1,
            //     item2,
            //     item3,
            //     item4,
            //     item5,
            //     item6,
            //     assists,
            //     deaths,
            //     kills,
            //     summoner1Id,
            //     summoner1Casts,
            //     summoner2Id,
            //     summoner2Casts,
            //     individualPosition,
            // };
        );
    }, [matchData]);

    return (
        <Flex  width={"auto"}>
            <TableOfMatchDetails infoByPlayers={infoByPlayers} />
        </Flex>
    );
};
