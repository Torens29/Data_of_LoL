import { Box, Flex, Image } from '@chakra-ui/react';
import { useContext, useMemo, useState } from 'react';
import { PuuidContext } from '../../contexts/PuuidContext';
import { Tooltip } from '../Tooltip/Tooltip';

const getPathIcons = (listPerks, idPerks) => {
    const url = `https://raw.communitydragon.org/latest/game/assets/perks/styles/`;

    if (listPerks === null) return 'non item';
    const perk = listPerks.find((perks) => perks.id === idPerks.perk);
    
    const fullURL = url + perk.iconPath?.split('/').slice(-3).join("/").toLowerCase();
    console.log('PERKS', fullURL);
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
            arr.push({ perk: id });
        }
        return arr;
    }, [listPerks.statPerks]);

    if (!listPerks) return <></>;


    return (
        <Box direction={'row'}>
            {/* <Tooltip> */}
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
            {/* </Tooltip> */}
        </Box>
    );
};
