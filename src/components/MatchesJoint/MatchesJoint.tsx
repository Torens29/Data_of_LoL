import { useContext, useEffect, useState } from 'react';
import { getHistoryMatches } from '../../services/riotApi';
import { PuuidContext } from '../../contexts/PuuidContext';
import type { MatchList } from '../../services/typesApi';
import { findCommonMatches } from '../../utils/findCommonMatches';

export const searchJointMatches = async ({
    puuidMainPlayer,
    puuidSecondPlayer
}: {
    puuidMainPlayer: string;
    puuidSecondPlayer: string;
}) => {
    console.log('Click');

    const mainPlayerMatches = await getHistoryMatches(puuidMainPlayer, 100);
    const secondPlayerMatches = await getHistoryMatches(puuidSecondPlayer, 100);

    const listIdCommonMatches = findCommonMatches(
        mainPlayerMatches,
        secondPlayerMatches
    );

    if (!listIdCommonMatches.length) return 'Not common matches';

    console.log(listIdCommonMatches);

    return listIdCommonMatches;
};

export const MatchesJoint = ({ namePlayer1, namePlayer2 }) => {
    const context = useContext(PuuidContext);
    if (!context)
        throw new Error('useContext must be used within a PuuidProvider');

    const { puuid } = context;

    const [listMatches, setListMatches] = useState<MatchList>([]);

    useEffect(() => {
        const handlerHistory = async () => {
            const matches = await getHistoryMatches(puuid);
            setListMatches(matches);
        };

        handlerHistory();
    }, [puuid]);
};
