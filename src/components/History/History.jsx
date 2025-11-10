import { Match } from '../Match/Match';
import { PuuidContext } from '../../contexts/PuuidContext';
import { useContext, useEffect, useState } from 'react';
import { getHistoryMatches } from '../../services/riotApi';
import { Flex, For } from '@chakra-ui/react';
import { Modal } from '../Modal/Modal';

export const History = () => {
    const { puuid } = useContext(PuuidContext);
    const [listMatches, setListMatches] = useState([]);

    const [dataMatch, setDataMatch] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handlerHistory = async () => {
            const matches = await getHistoryMatches(puuid);
            setListMatches(matches);
        };

        handlerHistory();
    }, [puuid]);

    const openMatchModal = (matchData) => {
        setDataMatch(matchData);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setDataMatch(null);
    };

    return (
        <>
            <Flex gap="4" wrap="wrap" width={'1300px'} justify={'center'}>
                <For each={listMatches} fallback={<div>No matches</div>}>
                    {(idMatch) => (
                        <Match
                            key={idMatch}
                            idMatch={idMatch}
                            onMatchClick={openMatchModal}
                        ></Match>
                    )}
                </For>
            </Flex>
            <Modal
                closeModal={closeModal}
                isModalOpen={isModalOpen}
                matchData={dataMatch}
            />
        </>
    );
};
