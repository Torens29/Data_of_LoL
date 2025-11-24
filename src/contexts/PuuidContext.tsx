import { createContext } from 'react';
import type { IItems, IPerks, ISpells } from '../assets/data/typeOfInfo.js';

interface IPuuidContext {
    puuid: string;
    setPuuid: React.Dispatch<React.SetStateAction<string>>;
    infoItems: IItems | null;
    infoSpells: ISpells | null;
    infoPerks: IPerks | null;
}

export const PuuidContext = createContext<IPuuidContext | undefined>(undefined);
