import { AbsoluteCenter, Box, Flex } from '@chakra-ui/react';
import { Search } from './components/Search/Search.js';
import { History } from './components/History/History';
import { PuuidContext } from './contexts/PuuidContext.js';
import { useEffect, useMemo, useState } from 'react';
import type { IItems, IPerks, ISpells } from './assets/data/typeOfInfo.js';

const jsonFiles = [
    { name: 'infoItems.json', setter: 'setInfoItems' },
    { name: 'infoSpells.json', setter: 'setInfoSpells' },
    { name: 'infoPerks.json', setter: 'setInfoPerks' },
];

function App() {
    const [puuid, setPuuid] = useState<string>('');
    const [infoItems, setInfoItems] = useState<IItems | null>(null);
    const [infoSpells, setInfoSpells] = useState<ISpells | null>(null);
    const [infoPerks, setInfoPerks] = useState<IPerks | null>(null);

    useEffect(() => {
        const handleInfoItems = async () => {
            try {
                const promises = jsonFiles.map(async ({ name, setter }) => {
                    const response = await fetch(`/src/assets/data/${name}`);
                    const data = await response.json();

                    switch (setter) {
                        case 'setInfoItems':
                            setInfoItems(data as IItems);
                            break;
                        case 'setInfoSpells':
                            setInfoSpells(data as ISpells);
                            break;
                        case 'setInfoPerks':
                            setInfoPerks(data as IPerks);
                            break;
                    }
                });

                await Promise.all(promises);
            } catch (err) {
                console.error('Ошибка загрузки JSON:', err);
            }
        };

        handleInfoItems();
    }, []);

    const contextValue = useMemo(
        () => ({ puuid, setPuuid, infoItems, infoSpells, infoPerks }),
        [infoItems, puuid, infoSpells, infoPerks]
    );

    return (
        <PuuidContext.Provider value={contextValue}>
            <Box position="relative">
                <AbsoluteCenter>
                    <Flex gap="10" direction="column" align="center">
                        <Search />
                        {puuid !== '' && <History />}
                    </Flex>
                </AbsoluteCenter>
            </Box>
        </PuuidContext.Provider>
    );
}

export default App;