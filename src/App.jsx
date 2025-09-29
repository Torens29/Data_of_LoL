import { AbsoluteCenter, Box, Flex } from '@chakra-ui/react';
import { Search } from './components/Search/Search';
import { History } from './components/History/History';
import { PuuidContext } from './contexts/PuuidContext';
import { useEffect, useMemo, useState } from 'react';

function App() {
    const [puuid, setPuuid] = useState('');
    const [infoItems, setInfoItems] = useState(null);
    const [infoSpells, setInfoSpells] = useState(null);

    useEffect(() => {
        const handleInfoItems = async () => {
            try {
                let module = await import('./assets/data/infoItems.json');
                let infoJSON = module.default;
                setInfoItems(infoJSON);

                module = await import('./assets/data/infoSpells.json');
                infoJSON = module.default;
                setInfoSpells(infoJSON);

            } catch (err) {
                console.error('Ошибка загрузки JSON:', err);
            }
        };

        handleInfoItems();
    }, []);

    const contextValue = useMemo(
        () => ({ puuid, setPuuid, infoItems, infoSpells }),
        [infoItems, puuid, infoSpells]
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
