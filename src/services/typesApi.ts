// Базовые типы для API
export type Region = 'ru' | 'euw';
export type ApiType = 'account' | 'summoner';

// Типы для Account API
export interface AccountDTO {
    puuid: string;
    gameName: string;
    tagLine: string;
}

// Типы для Champion Mastery API
export interface ChampionMasteryDTO {
    puuid: string;
    championId: number;
    championLevel: number;
    championPoints: number;
    lastPlayTime: number;
    championPointsSinceLastLevel: number;
    championPointsUntilNextLevel: number;
    chestGranted: boolean;
    tokensEarned: number;
    summonerId: string;
}

// Типы для League API
export interface LeagueEntryDTO {
    leagueId: string;
    summonerId: string;
    summonerName: string;
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    hotStreak: boolean;
    veteran: boolean;
    freshBlood: boolean;
    inactive: boolean;
    miniSeries?: {
        losses: number;
        progress: string;
        target: number;
        wins: number;
    };
}

// Типы для Match API
export interface IMatchData {
    id: string;
    info: MatchDTO | null;
}

export type MatchList = string[];

export interface MatchDTO {
    metadata: {
        dataVersion: string;
        matchId: string;
        participants: string[];
    };
    info: {
        gameCreation: number;
        gameDuration: number;
        gameEndTimestamp?: number;
        gameId: number;
        gameMode: string;
        gameName?: string;
        gameStartTimestamp: number;
        gameType: string;
        gameVersion: string;
        mapId: number;
        participants: ParticipantDTO[];
        platformId: string;
        queueId: number;
        teams: TeamDTO[];
        tournamentCode?: string;
    };
}

export interface ParticipantDTO {
    allInPings: number;
    assistMePings: number;
    assists: number;
    baitPings: number;
    baronKills: number;
    basicPings: number;
    bountyLevel: number;
    challenges?: Record<string, number>;
    champExperience: number;
    champLevel: number;
    championId: number;
    championName: string;
    championTransform: number;
    commandPings: number;
    consumablesPurchased: number;
    damageDealtToBuildings: number;
    damageDealtToObjectives: number;
    damageDealtToTurrets: number;
    damageSelfMitigated: number;
    dangerPings: number;
    deaths: number;
    detectorWardsPlaced: number;
    doubleKills: number;
    dragonKills: number;
    eligibleForProgression: boolean;
    enemyMissingPings: number;
    enemyVisionPings: number;
    firstBloodAssist: boolean;
    firstBloodKill: boolean;
    firstTowerAssist: boolean;
    firstTowerKill: boolean;
    gameEndedInEarlySurrender: boolean;
    gameEndedInSurrender: boolean;
    getBackPings: number;
    goldEarned: number;
    goldSpent: number;
    holdPings: number;
    individualPosition: string;
    inhibitorKills: number;
    inhibitorTakedowns: number;
    inhibitorsLost: number;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    item6: number;
    itemsPurchased: number;
    killingSprees: number;
    kills: number;
    lane: string;
    largestCriticalStrike: number;
    largestKillingSpree: number;
    largestMultiKill: number;
    longestTimeSpentLiving: number;
    magicDamageDealt: number;
    magicDamageDealtToChampions: number;
    magicDamageTaken: number;
    missions?: Record<string, number>;
    needVisionPings: number;
    neutralMinionsKilled: number;
    nexusKills: number;
    nexusLost: number;
    nexusTakedowns: number;
    objectivesStolen: number;
    objectivesStolenAssists: number;
    onMyWayPings: number;
    participantId: number;
    pentaKills: number;
    perks?: PerksDTO;
    physicalDamageDealt: number;
    physicalDamageDealtToChampions: number;
    physicalDamageTaken: number;
    profileIcon: number;
    pushPings: number;
    puuid: string;
    quadraKills: number;
    riotIdGameName: string;
    riotIdTagline: string;
    role: string;
    sightWardsBoughtInGame: number;
    spell1Casts: number;
    spell2Casts: number;
    spell3Casts: number;
    spell4Casts: number;
    summoner1Casts: number;
    summoner1Id: number;
    summoner2Casts: number;
    summoner2Id: number;
    summonerId: string;
    summonerLevel: number;
    summonerName: string;
    teamEarlySurrendered: boolean;
    teamId: number;
    teamPosition: string;
    timeCCingOthers: number;
    timePlayed: number;
    totalDamageDealt: number;
    totalDamageDealtToChampions: number;
    totalDamageShieldedOnTeammates: number;
    totalDamageTaken: number;
    totalHeal: number;
    totalHealsOnTeammates: number;
    totalMinionsKilled: number;
    totalTimeCCDealt: number;
    totalTimeSpentDead: number;
    totalUnitsHealed: number;
    tripleKills: number;
    trueDamageDealt: number;
    trueDamageDealtToChampions: number;
    trueDamageTaken: number;
    turretKills: number;
    turretTakedowns: number;
    turretsLost: number;
    unrealKills: number;
    visionScore: number;
    visionWardsBoughtInGame: number;
    wardsKilled: number;
    wardsPlaced: number;
    win: boolean;
}

export interface PerksDTO {
    statPerks: {
        defense: number;
        flex: number;
        offense: number;
    };
    styles: {
        description: string;
        selections: {
            perk: number;
            var1: number;
            var2: number;
            var3: number;
        }[];
        style: number;
    }[];
}

export interface TeamDTO {
    teamId: number;
    win: boolean;
    bans: BanDTO[];
    objectives: ObjectivesDTO;
}

export interface BanDTO {
    championId: number;
    pickTurn: number;
}

export interface ObjectivesDTO {
    baron: ObjectiveDTO;
    champion: ObjectiveDTO;
    dragon: ObjectiveDTO;
    inhibitor: ObjectiveDTO;
    riftHerald: ObjectiveDTO;
    tower: ObjectiveDTO;
}

export interface ObjectiveDTO {
    first: boolean;
    kills: number;
}

// Типы для Current Game API
export interface CurrentGameInfo {
    gameId: number;
    gameType: string;
    gameStartTime: number;
    mapId: number;
    gameLength: number;
    platformId: string;
    gameMode: string;
    bannedChampions: BannedChampion[];
    gameQueueConfigId: number;
    observers: Observer;
    participants: CurrentGameParticipant[];
}

export interface BannedChampion {
    championId: number;
    teamId: number;
    pickTurn: number;
}

export interface Observer {
    encryptionKey: string;
}

export interface CurrentGameParticipant {
    championId: number;
    perks?: PerksDTO;
    profileIconId: number;
    bot: boolean;
    teamId: number;
    summonerName: string;
    summonerId: string;
    spell1Id: number;
    spell2Id: number;
    gameCustomizationObjects: GameCustomizationObject[];
}

export interface GameCustomizationObject {
    category: string;
    content: string;
}

// Тип для ошибок API
export interface RiotAPIError {
    status: {
        status_code: number;
        message: string;
    };
}
