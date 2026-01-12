import { Avatar, Flex, For, Table, Text } from '@chakra-ui/react';
import type { ParticipantDTO } from '../../services/typesApi';
import { ItemsTable } from '../ItemsTable/ItemsTable';
import { Spells } from '../Spells/Spells';

const TableOfTeam = ({
    infoByPlayers,
    colorTeam,
}: {
    infoByPlayers: ParticipantDTO[] | undefined;
    colorTeam: 'blue' | 'red';
}) => {
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
                                {`${player.totalMinionsKilled+player.neutralMinionsKilled}=${player.totalMinionsKilled}+${player.neutralMinionsKilled}`}
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
}) => (
    <>
    <Flex>
        <TableOfTeam
            infoByPlayers={infoByPlayers?.slice(0, 5)}
            colorTeam={'blue'}

        />
        <TableOfTeam
            infoByPlayers={infoByPlayers?.slice(5, 10)}
            colorTeam={'red'}
        />
    </Flex>
        
    </>
);
