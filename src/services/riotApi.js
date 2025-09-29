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
};

const makeRequest = async ({ url, type = 'summoner', region = 'euw' }) => {
    const baseURL = API_BASE_URLS[type][region];
    const fullURl = `${baseURL}${url}`;

    try {
        const response = await fetch(fullURl, {
            headers: { 'X-Riot-Token': RIOT_API },
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`HTTP error status:`, response.status);
        }
    } catch (error) {
        console.error('API reqiest faild', error);
        throw error;
    }
};

export const getPUUID = async (gameName = GAME_NAME, tagLine = TAG_LINE) => {
    const url = `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    const response = await makeRequest({ url, type: 'account' });

    return response.puuid;
};

export const getListChampionMasteries = async (puuid) => {
    const url = `/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`;
    const response = await makeRequest({ url });

    return response;
};

// ранг
export const getLeagues = async (puuid) => {
    const url = `/lol/league/v4/entries/by-puuid/${puuid}`;
    const response = await makeRequest({ url });

    return response;
};

export const getHistoryMatches = async (puuid) => {
    const sizeHistory = 1;
    const url = `/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${sizeHistory}`;
    const response = await makeRequest({ url, type: 'account' });

    return response;
};

// инфа по игре
export const getMatchById = async (matchId) => {
    const url = `/lol/match/v5/matches/${matchId}`;
    const response = await makeRequest({ url, type: 'account' });

    return response;
};

// инфа по текущей игре
export const getCurrentGame = async (puuid) => {
    const url = `/lol/spectator/v5/active-games/by-summoner/${puuid}`;
    const response = await makeRequest({ url });

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
