import { Match } from '../Match/Match';
import { PuuidContext } from '../../contexts/PuuidContext';
import { useContext, useEffect, useState } from 'react';
import { getHistoryMatches } from '../../services/riotApi';
import { Flex, For } from '@chakra-ui/react';

export const History = () => {
    const { puuid } = useContext(PuuidContext);
    const [listMatches, setListMatches] = useState([]);

    useEffect(() => {
        const handlerHistory = async () => {
            const matches = await getHistoryMatches(puuid);
            setListMatches(matches);
        };

        handlerHistory();
    }, [puuid]);


    return (
        <>
            <Flex gap="4" wrap='wrap'  width="1200px" justify={"center"}>
                <For each={listMatches} fallback={<div>No matches</div>}>
                    {(idMatch) => (
                        <Match key={idMatch} idMatch={idMatch}></Match>
                    )}
                </For>
            </Flex>
        </>
    );
};
