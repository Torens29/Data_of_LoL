import { Image, For, Grid, Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { PuuidContext } from '../../contexts/PuuidContext';
import { Tooltip } from '../Tooltip/Tooltip';

const findSpellsIcon = (infoSpells, idSpell) => {
    const url = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/`;

    if (infoSpells === null) return 'non item';
    const spell = infoSpells.find((spell) => spell.id === idSpell);

    const fullURL = url + spell.iconPath?.split('/').at(-1).toLowerCase();
    return fullURL;
};

export const Spells = ({ listSpells }) => {
    const { infoSpells } = useContext(PuuidContext);

    return (
        <Grid
            // width={150}
            templateColumns={`repeat(${1}, auto)`}
            gap={0.5}
            justifyContent={'center'}
            borderWidth={2}
            borderRadius={'md'}
            borderColor={'black'}
            bg={'gray.500'}
        >
            <For each={listSpells} fallback="none items">
                {(infoSpell) => (
                    <Box
                        key={infoSpell.id}
                        borderWidth={1}
                        borderColor={'black'}
                        borderRadius={'md'}
                    >
                        <Tooltip
                            key={infoSpell.id}
                            content={`Использовалось ${infoSpell.countCast} раз`}
                        >
                            <Image
                                key={infoSpell.id}
                                src={
                                    infoSpell
                                        ? findSpellsIcon(
                                              infoSpells,
                                              Number(infoSpell.id)
                                          )
                                        : null
                                }
                                htmlWidth={33}
                            />
                        </Tooltip>
                    </Box>
                )}
            </For>
        </Grid>
    );
};
