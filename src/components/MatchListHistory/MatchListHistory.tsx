import { Flex, For } from '@chakra-ui/react';
import { Match } from '../Match/Match';
import { Modal } from '../Modal/Modal';
import { useState } from 'react';
import type { IMatchData, MatchDTO, MatchList } from '../../services/typesApi';

export const MatchListHistory = ({
    listMatches,
}: {
    listMatches: MatchList;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [dataMatch, setDataMatch] = useState<{
        id: string;
        info: MatchDTO | null;
    } | null>(null);

    const openMatchModal = (matchData: IMatchData) => {
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
                    {(idMatch: string) => (
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
