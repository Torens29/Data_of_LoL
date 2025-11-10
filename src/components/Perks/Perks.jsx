import { Box, Flex, Image, For, Center } from '@chakra-ui/react';
import { useContext, useMemo, useState } from 'react';
import { PuuidContext } from '../../contexts/PuuidContext';
import { Tooltip } from '../Tooltip/Tooltip';

const getPathIcons = (listPerks, idPerks) => {
    const url = `https://raw.communitydragon.org/latest/game/assets/perks/`; // styles statmodshealthplusicon.png

    if (listPerks === null) return 'non item';
    const perk = listPerks.find((perks) => perks.id === idPerks.perk);

    const fullURL =
        url + perk.iconPath?.split('/').slice(-4).join('/').toLowerCase();
    return fullURL;
};

export const Perks = ({ listPerks }) => {
    const { infoPerks } = useContext(PuuidContext);

    // const [statPerks, setStatPerks] = useState(listPerks.statPerks);
    const [primaryStyle, setPrimaryStyle] = useState(
        listPerks.styles[0].selections
    );
    const [subStyle, setSubStyle] = useState(listPerks.styles[1].selections);

    const statPerks = useMemo(() => {
        const arr = [];
        for (const id in listPerks.statPerks) {
            arr.push(listPerks.statPerks[id]); //{ perk: id }
        }
        
        return arr;
    }, [listPerks.statPerks]);

    if (!listPerks) return <></>;

    return (
        <Tooltip
            content={
                <Flex direction={'column'} align={'center'}>
                    <Box className="main">
                        <Image
                            width={'40px'}
                            src={getPathIcons(infoPerks, primaryStyle[0])}
                        ></Image>
                    </Box>
                    <Flex direction={'row'} className="mainSub">
                        <For each={[1, 2, 3]}>
                            {(item) => (
                                <Image
                                    key={primaryStyle[item] + item}
                                    width={'30px'}
                                    src={getPathIcons(
                                        infoPerks,
                                        primaryStyle[item]
                                    )}
                                ></Image>
                            )}
                        </For>
                    </Flex>
                    <Flex direction={'row'} className="sub">
                        <For each={subStyle}>
                            {(id, index) => (
                                <Image
                                    key={id + index}
                                    width={'30px'}
                                    src={getPathIcons(infoPerks, id)}
                                ></Image>
                            )}
                        </For>
                    </Flex>
                    {/* <Box className="statPerks">
                        <For each={statPerks}>
                            {(id) => (
                                <Image
                                    src={getPathIcons(infoPerks, id)}
                                ></Image>
                            )}
                        </For>
                    </Box> */}
                </Flex>
            }
        >
            <Box direction={'row'}>
                <Flex>
                    <Image
                        width={'20px'}
                        height={'20px'}
                        src={getPathIcons(infoPerks, primaryStyle[0])}
                    />
                    <Image
                        width={'20px'}
                        height={'20px'}
                        src={getPathIcons(infoPerks, subStyle[0])}
                    />
                </Flex>
            </Box>
        </Tooltip>
    );
};
