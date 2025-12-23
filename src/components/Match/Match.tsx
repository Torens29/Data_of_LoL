import { Card, Text, Flex, Image } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { useEffect, useState, useMemo, memo } from 'react';
import { getMatchById } from '../../services/riotApi.js';
import { usePuuid } from '../../contexts/PuuidContext.js';
import { IconResult } from '../IconResult/IconResult.js';
import { ItemsTable } from '../ItemsTable/ItemsTable.js';
import { Spells } from '../Spells/Spells.js';
import { Perks } from '../Perks/Perks.js';

import type {
    IMatchData,
    MatchDTO,
    ParticipantDTO,
} from '../../services/typesApi.js';

const getInfoPlayer = (infoMatch: MatchDTO, puuid: string) => {
    const indexOfPlayer = infoMatch.metadata.participants.indexOf(puuid);

    if (indexOfPlayer === -1) return undefined;

    return infoMatch.info.participants[indexOfPlayer];
};

const getDuration = (time: number) => {
    const [min, sec] = (time / 60).toString().split('.');

    let secIn60;
    if (sec === undefined) secIn60 = '0';
    else secIn60 = (+sec * 0.6).toString();

    if (secIn60.includes('.')) {
        secIn60 = secIn60.replace('.', '');
    }
    if (secIn60.length === 1) secIn60 = `0${secIn60}`;

    return `${min}:${secIn60.slice(0, 2)}`;
};

export const Match = memo(
    ({
        idMatch,
        onMatchClick,
    }: {
        idMatch: string;
        onMatchClick: (matchData: IMatchData) => void;
    }) => {
        const { puuid } = usePuuid();
        const [infoMatch, setInfoMatch] = useState<MatchDTO | null>(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            if (!idMatch) {
                setLoading(false);
                return;
            }

            const fetchData = async () => {
                setLoading(true);
                try {
                    const data = await getMatchById(idMatch);
                    setInfoMatch(data);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }, [idMatch]);

        const statistics = useMemo(() => {
            if (!infoMatch || !puuid) return null;

            const infoByPlayerInGame = getInfoPlayer(infoMatch, puuid);

            const listItems: number[] = Array(7)
                .fill(null)
                .map((_, i) => {
                    if (!infoByPlayerInGame) return 0;

                    return infoByPlayerInGame[
                        ('item' + i) as keyof ParticipantDTO
                    ] as number;
                });

            return {
                championName: infoByPlayerInGame?.championName,
                championId: infoByPlayerInGame?.championId,

                assists: infoByPlayerInGame?.assists,
                deaths: infoByPlayerInGame?.deaths,
                kills: infoByPlayerInGame?.kills,
                win: infoByPlayerInGame?.win,
                kda: infoByPlayerInGame?.challenges?.kda,

                perks: infoByPlayerInGame?.perks,
                items: listItems,
                championConsumablesPurchased:
                    infoByPlayerInGame?.consumablesPurchased,

                summoners: [
                    {
                        id: infoByPlayerInGame?.summoner1Id,
                        countCast: infoByPlayerInGame?.summoner1Casts,
                    },
                    {
                        id: infoByPlayerInGame?.summoner2Id,
                        countCast: infoByPlayerInGame?.summoner2Casts,
                    },
                ],

                gameMode: infoMatch.info.gameMode,

                position: infoByPlayerInGame?.individualPosition.toLowerCase(),

                gameDuration: getDuration(infoMatch.info.gameDuration),
                gameStartTimestamp: infoMatch.info.gameStartTimestamp,
            };
        }, [infoMatch, puuid]);

        const handleClick = () => {
            const matchData: IMatchData = {
                id: idMatch,
                info: infoMatch,
            };

            onMatchClick(matchData);
        };

        if (loading) {
            return (
                <Card.Root>
                    <Card.Body>Loading match...</Card.Body>
                </Card.Root>
            );
        }

        if (!statistics) {
            return (
                <Card.Root>
                    <Card.Body>No match data</Card.Body>
                </Card.Root>
            );
        }

        return (
            <Card.Root
                onClick={handleClick}
                cursor="pointer"
                _hover={{
                    transform: 'translateY(-10px)',
                    transition: 'all 0.2s',
                }}
                style={{ background: statistics.win ? '#a4cea2ff' : '#ffb2b2' }}
            >
                <Card.Header>
                    <Flex justify="space-between" gap="40px" align={'center'}>
                        <IconResult
                            isWin={statistics.win === true}
                            gameMode={statistics.gameMode}
                        />
                        <div>{statistics.gameDuration}</div>
                    </Flex>
                </Card.Header>
                <Card.Body paddingTop={4}>
                    <Flex direction="row" gap={2}>
                        <Avatar.Root size="lg" shape="rounded">
                            <Avatar.Image
                                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${statistics.championId}.png`}
                                onError={(e) => {
                                    // Обработка ошибки загрузки изображения
                                    console.error(
                                        'Failed to load champion icon' + e
                                    );
                                }}
                            />
                            <Avatar.Fallback name="Champion" />
                        </Avatar.Root>

                        <Card.Title mb="2" margin={0}>
                            <Flex direction="row">
                                <Text>{statistics.championName} </Text>
                                <Text>
                                    {statistics.gameMode === 'CLASSIC' ? (
                                        <Image
                                            widows={'30px'}
                                            src={`https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${statistics.position}-light.svg`}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </Text>
                            </Flex>
                            <Perks listPerks={statistics.perks}></Perks>
                        </Card.Title>
                    </Flex>
                    <Flex
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Text>{`${statistics.kills}/${statistics.deaths}/${statistics.assists}`}</Text>
                        <Card.Description>
                            KDA: {statistics.kda?.toFixed(2)}
                        </Card.Description>
                    </Flex>
                    <Flex justifyContent={'center'} marginTop={2} gap={1}>
                        <Spells listSpells={statistics.summoners} />

                        <ItemsTable listItems={statistics.items.slice(0, -1)} />
                        <ItemsTable listItems={statistics.items.slice(-1)} />
                    </Flex>
                </Card.Body>
            </Card.Root>
        );
    }
);
