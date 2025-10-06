import { Card, Avatar, Text, Flex, Image} from '@chakra-ui/react';
import { useContext, useEffect, useState, useMemo, memo } from 'react';
import { getMatchById } from '../../services/riotApi';
import { PuuidContext } from '../../contexts/PuuidContext';
import { IconResult } from '../IconResult/IconResult';
import { ItemsTable } from '../ItemsTable/ItemsTable';
import { Spells } from '../Spells/Spells';
import { Perks } from '../Perks/Perks';

const getInfoPlayer = (infoMatch, puuid) => {
    const indexOfPlayer = infoMatch.metadata.participants.indexOf(puuid);

    if (indexOfPlayer === -1) return null;
    return infoMatch.info.participants[indexOfPlayer];
};

const getDuration = (time) => {
    const [min, sec] = (time / 60).toString().split('.');

    return `${min}:${((sec / 100) * 60).toString().slice(0, 2)}`;
};

export const Match = memo(({ idMatch }) => {
    const { puuid } = useContext(PuuidContext);
    const [infoMatch, setInfoMatch] = useState(null);
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
        const listItems = Array(7)
            .fill('item')
            .map((item, i) => infoByPlayerInGame[item + i]);

        return {
            championName: infoByPlayerInGame.championName,
            championId: infoByPlayerInGame.championId,

            assists: infoByPlayerInGame.assists,
            deaths: infoByPlayerInGame.deaths,
            kills: infoByPlayerInGame.kills,
            win: infoByPlayerInGame.win,
            kda: infoByPlayerInGame.challenges.kda,

            perks: infoByPlayerInGame.perks,
            items: listItems,
            championConsumablesPurchased:
                infoByPlayerInGame.consumablesPurchased,

            summoners: [
                {
                    id: infoByPlayerInGame.summoner1Id,
                    countCast: infoByPlayerInGame.summoner1Casts,
                },
                {
                    id: infoByPlayerInGame.summoner2Id,
                    countCast: infoByPlayerInGame.summoner2Casts,
                },
            ],

            gameMode: infoMatch.info.gameMode,

            position: infoByPlayerInGame.individualPosition.toLowerCase(),

            gameDuration: getDuration(infoMatch.info.gameDuration),
            gameStartTimestamp: infoMatch.info.gameStartTimestamp,
        };
    }, [infoMatch, puuid]);

    console.log(
        'summoners',
        statistics?.summoners,
        statistics?.championConsumablesPurchased
    );
    

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
            style={{ background: statistics.win ? '#a4cea2ff' : '#ffb2b2' }}
        >
            <Card.Header>
                <Flex justify="space-between" gap="40px" align={'center'}>
                    <IconResult
                        isWin={statistics.win}
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
                        />
                        <Avatar.Fallback name="Champion" />
                    </Avatar.Root>

                    <Card.Title mb="2" margin={0}>
                        <Flex direction="row">
                            <Text>{statistics.championName} </Text>
                            <Text>
                                {statistics.gameMode === 'CLASSIC' ? (
                                    <Image
                                        widows={"30px"}
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
                        KDA: {statistics.kda.toFixed(2)}
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
});
