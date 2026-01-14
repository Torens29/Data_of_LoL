import { PuuidContext } from '../../contexts/PuuidContext.js';
import { useContext, useEffect, useState } from 'react';
import { getHistoryMatches } from '../../services/riotApi.js';
import type {
    MatchList,
} from '../../services/typesApi.js';
import { MatchListHistory } from '../MatchListHistory/MatchListHistory.js';

export const History = () => {
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

    return <MatchListHistory listMatches={listMatches} />;
};
