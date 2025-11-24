import { Match } from '../Match/Match.jsx';
import { PuuidContext } from '../../contexts/PuuidContext.js';
import { useContext, useEffect, useState } from 'react';
import { getHistoryMatches } from '../../services/riotApi.js';
import { Flex, For } from '@chakra-ui/react';
import { Modal } from '../Modal/Modal.js';

export const History = () => {
    const context = useContext(PuuidContext);
    if (!context)
        throw new Error('useContext must be used within a PuuidProvider');

    const { puuid } = context;

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
