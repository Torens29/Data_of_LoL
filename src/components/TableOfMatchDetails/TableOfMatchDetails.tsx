import { Avatar, Button, Flex, For, Table, Text } from '@chakra-ui/react';
import type { ParticipantDTO } from '../../services/typesApi';
import { ItemsTable } from '../ItemsTable/ItemsTable';
import { Spells } from '../Spells/Spells';
import { useContext, useEffect, useState } from 'react';
import { PuuidContext } from '../../contexts/PuuidContext';
import { TotalCommonMatches } from '../TotalCommonMatches/TotalCommonMatches';
import { getHistoryMatches } from '../../services/riotApi';
import { findCommonMatches } from '../../utils/findCommonMatches';

const TableOfTeam = ({
    infoByPlayers,
    colorTeam,
    commonMatchesCounts,
}: {
    infoByPlayers: ParticipantDTO[] | undefined;
    colorTeam: 'blue' | 'red';
    commonMatchesCounts: Record<string, number>;
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const context = useContext(PuuidContext);
    if (!context)
        throw new Error('useContext must be used within a PuuidProvider');

    const { puuid } = context;

    return (
        <>
            <Table.Root
                size="sm"
                colorPalette="blue"
                backgroundColor={'blue'}
                striped
            >
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
                        <Table.Row key={player.puuid}>
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
                                    <Flex direction={'column'}>
                                        <div>{player.championName}</div>
                                        <div>{`${player.riotIdGameName}#${player.riotIdTagline}`}</div>
                                        <Button
                                            loading={isLoading}
                                            onClick={() =>
                                                console.log(
                                                    'Click on common matches'
                                                )
                                            }
                                            size="2xs"
                                            variant="ghost"
                                            colorPalette={'gray'}
                                            maxW={40}
                                        >
                                            Общие матчи:
                                            {commonMatchesCounts[
                                                player.puuid
                                            ] || 0}
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Table.Cell>
                            <Table.Cell>
                                <Flex
                                    justifyContent={'center'}
                                    marginTop={2}
                                    gap={1}
                                >
                                    <Spells
                                        listSpells={[
                                            {
                                                id: player?.summoner1Id,
                                                countCast:
                                                    player?.summoner1Casts,
                                            },
                                            {
                                                id: player?.summoner2Id,
                                                countCast:
                                                    player?.summoner2Casts,
                                            },
                                        ]}
                                    />

                                    <ItemsTable
                                        listItems={Array(6)
                                            .fill(null)
                                            .map((_, idx) => {
                                                const key =
                                                    `item${idx}` as keyof ParticipantDTO;
                                                return (
                                                    (player[key] as number) || 0
                                                );
                                            })}
                                    ></ItemsTable>
                                    <ItemsTable listItems={[player['item6']]} />
                                </Flex>
                            </Table.Cell>
                            <Table.Cell textAlign="end">
                                {`${player.assists}/${player.deaths}/${player.kills}`}
                                <br />
                                {`${
                                    player.totalMinionsKilled +
                                    player.neutralMinionsKilled
                                }=${player.totalMinionsKilled}+${
                                    player.neutralMinionsKilled
                                }`}
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

export const TableOfMatchDetails = ({
    infoByPlayers,
}: {
    infoByPlayers: ParticipantDTO[] | undefined;
}) => {
    const context = useContext(PuuidContext);
    if (!context)
        throw new Error('useContext must be used within a PuuidProvider');

    const { puuid, matchHistory } = context;

    const [commonMatchesCounts, setCommonMatchesCounts] = useState<
        Record<string, number>
    >({});

    useEffect(() => {
        if (!puuid || !infoByPlayers?.length) return;

        const loadAllHistories = async () => {
            const uniquePlayers = infoByPlayers
                .filter((p) => p.puuid && p.puuid !== puuid)
                .map((p) => p.puuid);

            const promises = uniquePlayers.map(async (playerPuuid) => {
                try {
                    const playerHistory = await getHistoryMatches(
                        playerPuuid,
                        100
                    );
                    const commonCount = findCommonMatches(
                        matchHistory,
                        playerHistory
                    ).length;
                    console.log(matchHistory, commonCount);

                    return { playerPuuid, count: commonCount };
                } catch (error) {
                    console.error(`Error for ${playerPuuid}:`, error);
                    return { playerPuuid, count: 0 };
                }
            });

            const results = await Promise.all(promises);

            const countsMap = results.reduce((acc, { playerPuuid, count }) => {
                acc[playerPuuid] = count;
                return acc;
            }, {} as Record<string, number>);

            setCommonMatchesCounts(countsMap);
        };

        loadAllHistories();
    }, [puuid, infoByPlayers, matchHistory]);

    return (
        <>
            <Flex>
                <TableOfTeam
                    infoByPlayers={infoByPlayers?.slice(0, 5)}
                    colorTeam={'blue'}
                    commonMatchesCounts={commonMatchesCounts}
                />
                <TableOfTeam
                    infoByPlayers={infoByPlayers?.slice(5, 10)}
                    colorTeam={'red'}
                    commonMatchesCounts={commonMatchesCounts}
                />
            </Flex>
        </>
    );
};
