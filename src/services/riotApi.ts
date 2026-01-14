import type {
    AccountDTO,
    ChampionMasteryDTO,
    LeagueEntryDTO,
    MatchList,
    MatchDTO,
    CurrentGameInfo,
    Region,
    ApiType,
    RiotAPIError,
} from './typesApi.js';

const RIOT_API = import.meta.env.VITE_RIOT_API_KEY;
const GAME_NAME = import.meta.env.VITE_RIOT_GAMENAME;
const TAG_LINE = import.meta.env.VITE_RIOT_TAGLINE;

const API_BASE_URLS = {
    account: {
        euw: 'https://europe.api.riotgames.com',
    },
    summoner: {
        ru: 'https://ru.api.riotgames.com',
        euw: 'https://euw1.api.riotgames.com',
    },
} as const;

interface IMakeRequestParams {
    url: string;
    type?: ApiType;
    region?: Region;
}

const makeRequest = async <TResponse>({
    url,
    type = 'summoner',
    region = 'euw',
}: IMakeRequestParams): Promise<TResponse> => {
    if (!(type in API_BASE_URLS)) {
        throw new Error(`Invalid API type: ${type}`);
    }

    const baseUrlsForType = API_BASE_URLS[type];

    if (!(region in baseUrlsForType)) {
        throw new Error(`Invalid region ${region} for type ${type}`);
    }

    const baseURL = baseUrlsForType[region as keyof typeof baseUrlsForType];
    const fullURL = `${baseURL}${url}`;

    try {
        const response = await fetch(fullURL, {
            headers: { 'X-Riot-Token': RIOT_API },
        });

        const data = await response.json();

        if (response.ok) {
            return data as TResponse;
        } else {
            const errorData = data as RiotAPIError;
            throw new Error(
                `Riot API Error: ${errorData.status.message} (${errorData.status.status_code})`
            );
        }
    } catch (error) {
        console.error('API reqiest faild', error);
        throw error;
    }
};

export const getPUUID = async (
    gameName: string = GAME_NAME,
    tagLine: string = TAG_LINE
): Promise<string> => {
    const url = `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    const response = await makeRequest<AccountDTO>({ url, type: 'account' });

    return response.puuid;
};

export const getListChampionMasteries = async (
    puuid: string
): Promise<ChampionMasteryDTO[]> => {
    const url = `/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`;
    const response = await makeRequest<ChampionMasteryDTO[]>({ url });

    return response;
};

// ранг
export const getLeagues = async (puuid: string): Promise<LeagueEntryDTO[]> => {
    const url = `/lol/league/v4/entries/by-puuid/${puuid}`;
    const response = await makeRequest<LeagueEntryDTO[]>({ url });

    return response;
};

export const getHistoryMatches = async (
    puuid: string,
    sizeHistory: number = 5
): Promise<MatchList> => {
    const url = `/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${sizeHistory}`;
    const response = await makeRequest<MatchList>({ url, type: 'account' });

    return response;
};

// инфа по игре
export const getMatchById = async (matchId: string): Promise<MatchDTO> => {
    const url = `/lol/match/v5/matches/${matchId}`;
    const response = await makeRequest<MatchDTO>({ url, type: 'account' });

    return response;
};

// инфа по текущей игре
export const getCurrentGame = async (
    puuid: string
): Promise<CurrentGameInfo> => {
    const url = `/lol/spectator/v5/active-games/by-summoner/${puuid}`;
    const response = await makeRequest<CurrentGameInfo>({ url });

    return response;
};

// инфа предмета по ID
// export const getInfoItems = async () => {
//     const region = 'ru_RU';
//     const version = '15.18.1';
//     const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${region}/item.json`;

//     const response = await makeRequest({ url, clearRequest: true });

//     return response;
// };

// инфа все предметов
// https://ddragon.leagueoflegends.com/cdn/15.18.1/data/ru_RU/item.json

//инфа всех персов
// https://ddragon.leagueoflegends.com/cdn/15.18.1/data/ru_RU/champion.json
