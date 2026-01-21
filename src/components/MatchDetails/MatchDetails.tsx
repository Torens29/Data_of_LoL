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
        );
    }, [matchData]);

    return (
        <Flex width={'auto'}>
            <TableOfMatchDetails infoByPlayers={infoByPlayers} />
        </Flex>
    );
};
