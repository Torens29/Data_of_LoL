import {
    Button,
    Field,
    Fieldset,
    Input,
    Flex,
    Heading,
} from '@chakra-ui/react';
import { useCallback, useContext, useState } from 'react';
import { getPUUID } from '../../services/riotApi';
import { PuuidContext } from '../../contexts/PuuidContext';

export const Search = () => {
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const context = useContext(PuuidContext);
    if (!context)
        throw new Error('useContext must be used within a PuuidProvider');

    const { setPuuid } = context;

    const handleSearch = useCallback(async () => {
        setIsLoading(true);
        const nik = username === '' ? 'JGL#4171' : username;

        const [gameName, tagLine] = nik.split('#');

        const puuid = await getPUUID(gameName, tagLine);

        setPuuid(puuid);
        setIsLoading(false);
    }, [username, setPuuid]);

    return (
        <Fieldset.Root width="300px">
            <Fieldset.Legend>
                <Heading size="2xl">Поиск игрока</Heading>
            </Fieldset.Legend>
            <Flex gap="10px" direction="row">
                <Fieldset.Content>
                    <Field.Root>
                        <Input
                            placeholder="JGL#4171"
                            size="lg"
                            style={{ width: 'auto' }}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSearch();
                            }}
                        />
                    </Field.Root>
                </Fieldset.Content>

                <Button loading={isLoading} onClick={handleSearch}>
                    Найти
                </Button>
            </Flex>
        </Fieldset.Root>
    );
};
