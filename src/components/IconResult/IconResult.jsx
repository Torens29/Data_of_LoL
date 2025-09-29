import { Text, Flex, Box } from '@chakra-ui/react';

export const IconResult = ({ isWin, gameMode }) => {
    const resultGame = isWin ? 'Victory' : 'Defeat';
    const dirGameMode = gameMode === "CLASSIC" ? 'classic_sru' : 'aram';
    const srcVideo = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/gamemodeassets/${dirGameMode}/video/icon-${resultGame.toLocaleLowerCase()}.webm`;

    return (
        <Flex direction={'row'} align={'center'}>
            <Box
                as={'video'}
                src={srcVideo}
                loop
                autoPlay
                width="50px"
                height="50px"
            />
            <Text>{resultGame}</Text>
        </Flex>
    );

    // switch (gameMode) {
    //     case 'CLASSIC': {
    //         return (
    //             <Flex direction={'row'} align={'center'}>
    //                 <Box
    //                     as={'video'}
    //                     src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/gamemodeassets/classic_sru/video/icon-${resultGame.toLocaleLowerCase()}.webm`}
    //                           https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/gamemodeassets/aram/video/icon-defeat.webm

    //                     loop
    //                     autoPlay
    //                     width="50px"
    //                     height="50px"
    //                 />
    //                 <Text>{resultGame}</Text>
    //             </Flex>
    //         );
    //     }
    //     case 'ARAM':
    //         return <></>;
    //     default:
    //         return <></>;
    // }
};
