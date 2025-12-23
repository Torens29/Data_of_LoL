import { Avatar, Flex, For, Table, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import type { MatchDTO, ParticipantDTO } from '../../services/typesApi';
import { ItemsTable } from '../ItemsTable/ItemsTable';

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
                    {infoByPlayers?.map((player) => (
                        <Table.Row key={player.riotIdGameName}>
                            <Table.Cell>
                                <Flex direction="row" gap={2}>
                                    <Avatar.Root size="lg" shape="rounded">
                                        <Avatar.Image
                                            src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${player.championId}.png`}
                                            onError={(e) => {
                                                // Обработка ошибки загрузки изображения
                                                console.error(
                                                    'Failed to load champion icon' +
                                                        e
                                                );
                                            }}
                                        />
                                        <Avatar.Fallback name="Champion" />
                                    </Avatar.Root>
                                    {player.championName}
                                    <br />
                                    {`${player.riotIdGameName}#${player.riotIdTagline}`}
                                </Flex>
                            </Table.Cell>
                            <Table.Cell>
                                <ItemsTable
                                    listItems={Array(7)
                                        .fill(null)
                                        .map((_, idx) => {
                                            const key =
                                                `item${idx}` as keyof ParticipantDTO;
                                            return (player[key] as number) || 0;
                                        })}
                                ></ItemsTable>
                            </Table.Cell>
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
