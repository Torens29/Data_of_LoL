import { Image, For, Grid, Box } from '@chakra-ui/react';
import { useContext, useMemo } from 'react';
import { PuuidContext } from '../../contexts/PuuidContext';
import type { IItems } from '../../assets/data/typeOfInfo';

const findItemIcon = (infoItems: IItems | null, idItem: number) => {
    const url = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/`;
    // https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data /global/default/data/spells/icons2d/summoner_flash.png
    if (infoItems === null) return 'non item';
    const item = infoItems.find((item) => item.id === idItem);

    const fullURL = url + item?.iconPath?.split('/')?.at(-1)?.toLowerCase();
    return fullURL;
};

export const ItemsTable = ({ listItems }: { listItems: number[] }) => {
    const context = useContext(PuuidContext);
    if (!context)
        throw new Error('useContext must be used within a PuuidProvider');

    const { infoItems } = context;
    const countColum = useMemo(
        () => (listItems.length % 3 ? 1 : 3),
        [listItems]
    );
    return (
        <Grid
            // width={150}
            templateColumns={`repeat(${countColum}, auto)`}
            gap={0.5}
            justifyContent={'center'}
            borderWidth={2}
            borderRadius={'md'}
            borderColor={'black'}
            bg={'gray.500'}
        >
            <For each={listItems} fallback="none items">
                {(idItem, idx) => (
                    <Box
                        key={`${idItem}-${idx}`}
                        borderWidth={1}
                        borderColor={'black'}
                        borderRadius={'md'}
                    >
                        <Image
                            key={`imgItem-${idItem}-${idx}`}
                            src={
                                idItem
                                    ? findItemIcon(infoItems, Number(idItem))
                                    : undefined
                            }
                            htmlWidth={33}
                        />
                    </Box>
                )}
            </For>
        </Grid>
    );
};
