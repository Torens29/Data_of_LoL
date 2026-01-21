import { createContext, useContext } from 'react';
import type { IItems, IPerks, ISpells } from '../assets/data/typeOfInfo.js';

interface IPuuidContext {
    puuid: string;
    matchHistory: string[];
    // setMatchHistory: (matchId: string[]) => void
    setPuuid: React.Dispatch<React.SetStateAction<string>>;
    infoItems: IItems | null;
    infoSpells: ISpells | null;
    infoPerks: IPerks[] | null;
}

export const PuuidContext = createContext<IPuuidContext | undefined>(undefined);

export const usePuuid = (): IPuuidContext => {
    const context = useContext(PuuidContext);

    if (context === undefined) {
        throw new Error('usePuuid must be used within a PuuidProvider');
    }

    return context;
};