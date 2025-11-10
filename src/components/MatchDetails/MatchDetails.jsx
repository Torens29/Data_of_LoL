import { For, Table, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

export const MatchDetails = ({ matchData }) => {
    const infoByPlayers = useMemo(() => {
        return matchData.info.info.participants.map((playerInfo) => {
            const {
                championName,
                item0,
                item1,
                item2,
                item3,
                item4,
                item5,
                item6,
                assists,
                deaths,
                kills,
                summoner1Id,
                summoner1Casts,
                summoner2Id,
                summoner2Casts,
                individualPosition,
                riotIdGameName,
                riotIdTagline,
            } = playerInfo;
            return {
                championName,
                riotIdGameName,
                riotIdTagline,
                item0,
                item1,
                item2,
                item3,
                item4,
                item5,
                item6,
                assists,
                deaths,
                kills,
                summoner1Id,
                summoner1Casts,
                summoner2Id,
                summoner2Casts,
                individualPosition,
            };
        });
    }, [matchData]);

    return (
        <>
            <Table.Root size="sm">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Чемпион</Table.ColumnHeader>
                        <Table.ColumnHeader>Предметы</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end">
                            KDA
                        </Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {infoByPlayers.map((player) => (
                        <Table.Row key={player.riotIdGameName}>
                            <Table.Cell>{player.championName}</Table.Cell>
                            <Table.Cell>{player.item0}</Table.Cell>
                            <Table.Cell textAlign="end">
                                {`${player.assists}/${player.deaths}/${player.kills}`}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            {/* <For each={infoByPlayers}>{(indexOfPlayer)=>(ds)}</For> */}
            {/* <Text>{infoByPlayers[0].championName}</Text>
            <Text>{console.log(matchData.info.info.participants)}</Text> */}
        </>
    );
};
