import { AbsoluteCenter, Box, Flex } from '@chakra-ui/react';
import { Search } from './components/Search/Search';
import { History } from './components/History/History';
import { PuuidContext } from './contexts/PuuidContext';
import { useEffect, useMemo, useState } from 'react';

const listImportsDynamic = [
    'infoItems.json',
    'infoSpells.json',
    'infoPerks.json',
];

function App() {
    const [puuid, setPuuid] = useState('');
    const [infoItems, setInfoItems] = useState(null);
    const [infoSpells, setInfoSpells] = useState(null);
    const [infoPerks, setInfoPerks] = useState(null);

    useEffect(() => {
        const handleInfoItems = async () => {
            try {
                listImportsDynamic.map(async (importName, index) => {
                    let module = await import(`./assets/data/${importName}`);
                    let infoJSON = module.default;
                    [setInfoItems, setInfoSpells, setInfoPerks][index](
                        infoJSON
                    );
                });
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
