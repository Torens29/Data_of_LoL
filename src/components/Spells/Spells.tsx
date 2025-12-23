import { Image, For, Grid, Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { PuuidContext } from '../../contexts/PuuidContext';
import { Tooltip } from '../Tooltip/Tooltip';
import type { ISpells } from '../../assets/data/typeOfInfo';

interface SpellsProps {
    listSpells: Array<{
        id: number | undefined;
        countCast: number | undefined;
    }>;
}

const findSpellsIcon = (infoSpells: ISpells | null, idSpell: number) => {
    const url = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/`;

    if (infoSpells === null) return 'non item';

    const spell = infoSpells.find((spell) => spell.id === idSpell);

    if (!spell) return '';

     const iconFileName = spell.iconPath?.split('/').pop()?.toLowerCase();
     if (!iconFileName) return '';

     return url + iconFileName;
};

export const Spells = ({listSpells}: SpellsProps) => {
    const context = useContext(PuuidContext);
    if (!context)
        throw new Error('useContext must be used within a PuuidProvider');

    const { infoSpells } = context;

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
                        key={String(infoSpell.id)}
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
                                        : undefined
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
