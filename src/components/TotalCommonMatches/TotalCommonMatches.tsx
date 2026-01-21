import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { getHistoryMatches } from '../../services/riotApi';
import { findCommonMatches } from '../../utils/findCommonMatches';
import { Badge, Spinner } from '@chakra-ui/react';
import { PuuidContext } from '../../contexts/PuuidContext';

interface CommonMatchesState {
    loading: boolean;
    count: number;
    error?: string;
}

const historyCache = new Map<string, string[]>();
const resultsCache = new Map<string, number>();

const searchJointMatches = async ({
    puuidMainPlayer,
    puuidSecondPlayer,
    matchHistory,
}: {
    puuidMainPlayer: string;
    puuidSecondPlayer: string;
    matchHistory: string[];
}) => {
    if (puuidMainPlayer === puuidSecondPlayer) return [];

    try {
        let secondPlayerMatches: string[];

        const mainPlayerMatches = matchHistory;

        if (historyCache.has(puuidSecondPlayer)) {
            secondPlayerMatches = historyCache.get(puuidSecondPlayer)!;
        } else {
            secondPlayerMatches = await getHistoryMatches(
                puuidSecondPlayer,
                100
            );
            historyCache.set(puuidSecondPlayer, secondPlayerMatches);
        }
        const listIdCommonMatches = findCommonMatches(
            mainPlayerMatches,
            secondPlayerMatches
        );

        console.log(listIdCommonMatches);

        return listIdCommonMatches;
    } catch (error) {
        console.error('Error searching joint matches:', error);
        throw error;
    }
};

export const TotalCommonMatches = ({
    puuidMainPlayer,
    puuidSecondPlayer,
}: {
    puuidMainPlayer: string;
    puuidSecondPlayer: string;
}) => {
    const context = useContext(PuuidContext);
    if (!context)
        throw new Error('useContext must be used within a PuuidProvider');

    const { puuid, matchHistory } = context;

    const [matchesState, setMatchesState] = useState<CommonMatchesState>({
        loading: false,
        count: 0,
    });

    const isMounted = useRef(true);
    const hasLoaded = useRef(false);

    const loadCommonMatches = useCallback(async () => {
        if (
            !puuidMainPlayer ||
            !puuidSecondPlayer ||
            puuidMainPlayer === puuidSecondPlayer
        ) {
            setMatchesState({ loading: false, count: 0 });
            return;
        }

        const cacheKey = `${puuidMainPlayer}_${puuidSecondPlayer}`;
        if (resultsCache.has(cacheKey)) {
            setMatchesState({
                loading: false,
                count: resultsCache.get(cacheKey)!,
            });
            return;
        }

        if (matchesState.loading || hasLoaded.current) return;
        setMatchesState((prev) => ({ ...prev, loading: true }));

        try {
            const commonMatches = await searchJointMatches({
                puuidMainPlayer,
                puuidSecondPlayer,
                matchHistory: matchHistory || [],
            });

            const count = Array.isArray(commonMatches)
                ? commonMatches.length
                : 0;

            resultsCache.set(cacheKey, count);
            hasLoaded.current = true;

            if (isMounted.current) {
                setMatchesState({
                    loading: false,
                    count,
                });
            }
        } catch (error: any) {
            setMatchesState({
                loading: false,
                count: 0,
                error: error?.message || 'Ошибка загрузки',
            });
        }
    }, [puuidMainPlayer, puuidSecondPlayer, matchHistory]);

    useEffect(() => {
        isMounted.current = true;

        const load = async () => {
            await loadCommonMatches();
        };

            load();

        return () => {
            isMounted.current = false;
        };
    }, [loadCommonMatches]);

    return (
        <div>
            {matchesState.loading ? (
                <Spinner size="xs" ml={2} />
            ) : (
                <Badge
                    ml={2}
                    colorScheme={matchesState.count > 0 ? 'green' : 'gray'}
                    variant="solid"
                >
                    {matchesState.count}
                </Badge>
            )}
        </div>
    );
};
