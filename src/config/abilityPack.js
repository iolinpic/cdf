export const APValues = {
    "Name": '',
    "Abilities": [
        {
            "Name": "",//название файла конфигурации для способности.
            "Chance": 0.85//шанс выпадения в паке
        },
        {
            "Name": "",
            "Chance": 0.6
        },
        {
            "Name": "",
            "Chance": 0.2
        },
        {
            "Name": "",
            "Chance": 0.15
        },
        {
            "Name": "",
            "Chance": 0.8
        }
    ],
    "Bonuses": [
        {
            "Value": 10,//Бонус для HP
            "Chance": 0.2	//шанс выпадения в паке
        },
        {
            "Value": 10,//Бонус для атаки
            "Chance": 0.2	//шанс выпадения в паке
        },
        {
            "Value": 10,//Бонус для защиты
            "Chance": 0.7	//шанс выпадения в паке
        },
        {
            "Value": 1.5,//Бонус для уклонения
            "Chance": 0.7	//шанс выпадения в паке
        },
        {
            "Value": 1.5,//Бонус для отражения
            "Chance": 0.7	//шанс выпадения в паке
        }
    ]
};
export const APBonusTitles = [
    "HP",
    "ATK",
    "DEF",
    "Evasion",
    "Reflection"
];
export const APFieldSettings = {
    "Name": {
        component: "VTextField",
        label:"Название",
    },
    "Abilities": {
        component: "AbilitiesComponent",
        label:"Способности",
    },
    "Bonuses": {
        component: "BonusesComponent",
        label:"Бонусы",
    },
};