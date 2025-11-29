export interface IPerks {
        id: number;
        name: string;
        majorChangePatchVersion: string;
        tooltip: string;
        shortDesc:string;
        longDesc: string;
        recommendationDescriptor: string;
        iconPath: string;
        endOfGameStatDescs: string[];
        recommendationDescriptorAttributes: {}
    }

interface ISpell {
    id: number;
    name: string;
    description: string;
    summonerLevel: number;
    cooldown: number;
    gameModes: string[];
    iconPath: string;
}
export type ISpells = ISpell[]

interface IItem {
        "id": number;
        "name": "Boots";
        "description": string;
        "active": boolean;
        "inStore": boolean;
        "from": [];
        "to": number[];
        "categories": string[];
        "maxStacks": number;
        "requiredChampion":string;
        "requiredAlly": string;
        "requiredBuffCurrencyName": string;
        "requiredBuffCurrencyCost": number;
        "specialRecipe": number;
        "isEnchantment": boolean;
        "price": number;
        "priceTotal": number;
        "displayInItemSets": boolean;
        "iconPath": string
    }
export type IItems = IItem[]
