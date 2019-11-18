export const crysmTypes = [
    'Нормальный',
    'Огненный',
    'Водяной',
    'Природный',
    'Электрический',
    'Земляной',
    'Воздушный',
    'Светлый',
    'Темный',
    'Паранормальный',
];
export const CValues = {
    "PreviousConfig": "",
    "DisplayNameText": "",
    "DescriptionText": "",
    "DefaultHitPoints": 150,
    "DefaultAttack": 5,
    "DefaultDefence": 5,
    "DefaultEvasion": 1.0,
    "DefaultReflection": 0.0,
    "LevelUpExpMultipliter": 1.45,
    "EvolutionLevel": -1,
    "CrysmTypes": [],
    "MilestonePacks": [
        {
            "Level": 0,
            "HP_progress": [11.0, 12.0, 13.0],
            "Attack_progress": [0.6, 0.62, 0.65],
            "Defence_progress": [0.8, 0.83, 0.85],
            "Evasion_progress": [0.0, 0.0, 0.0],
            "Reflection_progress": [0.0, 0.0, 0.0],
            "AbilityPackID": "",
        }
    ],
    "EvolutionConditions": [],
};
export const CEvolutionConditions = ["Map", "Item"];
export const CEvolutionMaps = ["Zone_Village", "Zone_RockyCoast","Zone_Forest","Zone_Cave"];
export const CEvolutionItems = ["SomeItem", "SomeItem2"];
export const CEvolution = {
    "SelectedConditions": ["Map", "Item"],
    "Map": ["Zone_Village"],
    "Item": "SomeItem",
    "NextConfig": ""
};
export const CEvolutionSettings = {
    "SelectedConditions": {
        component: "crysmEvolutionConditions",
        label: "Условия Эволюционирования",
    },
    "Map": {
        component: "VSelect",
        label: "Карта",
        items:CEvolutionMaps,
    },
    "Item": {
        component:"VSelect",
        label:"Предмет",
        items: CEvolutionItems,
    },
};
export const CMilestone = {
    "Level": 0,
    "HP_progress": [11.0, 12.0, 13.0],
    "Attack_progress": [0.6, 0.62, 0.65],
    "Defence_progress": [0.8, 0.83, 0.85],
    "Evasion_progress": [0.0, 0.0, 0.0],
    "Reflection_progress": [0.0, 0.0, 0.0],
    "AbilityPackID": "",
};
export const CMilestoneSettings = {
    "Level": {
        component: "optionsComponent",
        label: "Уровень",
    },
    "HP_progress": {
        component: "tierOptions",
        label: "Прирост ХП",
    },
    "Attack_progress": {
        component: "tierOptions",
        label: "Прирост Атаки",
    },
    "Defence_progress": {
        component: "tierOptions",
        label: "Прирост Защиты",
    },
    "Evasion_progress": {
        component: "tierOptions",
        label: "Прирост Уклонения",
    },
    "Reflection_progress": {
        component: "tierOptions",
        label: "Прирост Отражения",
    },
    "AbilityPackID": {
        component: "abilityPack",
        label: "Комплект способностей",
    },
};
export const CFieldSettings = {
    "DisplayNameText": {
        component: "VTextField",
        label: "Название",
    },
    "DescriptionText": {
        component: "VTextarea",
        label: "Описание",
    },
    "CrysmTypes": {
        component: 'crysmTypeComponent',
        label: "Тип(ы) кризма",
    },
    "DefaultHitPoints": {
        component: "optionsComponent",
        label: "Базовое ХП",
    },
    "DefaultAttack": {
        component: "optionsComponent",
        label: "Базовая атака",
    },
    "DefaultDefence": {
        component: "optionsComponent",
        label: "Базовая защита",
    },
    "DefaultEvasion": {
        component: "optionsComponent",
        label: "Базовое уклонение",
    },
    "DefaultReflection": {
        component: "optionsComponent",
        label: "Базовое отражение",
    },
    "LevelUpExpMultipliter": {
        component: "optionsComponent",
        label: "Коэфициент прироста опыта",
    },
    "MilestonePacks": {
        component: 'milestonesComponent',
        label: "Этап развития",
    },
    "EvolutionLevel": {
        component: "optionsComponent",
        label: "Уровень Эволюции"
    },
};