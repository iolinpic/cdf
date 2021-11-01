import {ADirections} from "@/config/abilities";

export const ITypes = [
    {
        name: "Consum",
        subtypes: [
            {
                name: "Heal",
                ItemOption: {
                    "Direction": "D_Solo", //from ability
                    "CooldownTime": 0.001,
                    "StatusEffects": [],
                },
            },
            {
                name: "Bomb",
                ItemOption: {
                    "Direction": "D_Solo",
                    "CooldownTime": 0.001,
                    "StatusEffects": [],
                },
            },
            {
                name: "Resurrect",
                ItemOption: {},
            },
            {
                name: "Catch",
                ItemOption: {
                    "CrystalType": 2,
                    "CooldownTime": 15,
                },
            },
            {
                name: "Evolution",
                ItemOption: {},
            },
            {
                name:"ResourceBag",
                ItemOption: {
                    "DustPower": 100,
                    "GoldCount": 0,
                },
            },
        ]
    },
    {
        name: "Artifact",
        subtypes: [
            {
                name: "None",
                ItemOption: {
                    "HPModificator": 10,
                    "HPModificatorPercent": 1.5,
                    "AttackModificator": 1,
                    "DefenceModificator": 1,
                    "EvasionModificator": 0.0,
                    "ReflectionModificator": 0.0,
                    "HitChanceModifValue": 1.0,
                    "CritChanceModifValue": 1.0,
                    "DelayModifValue": 1.0,
                    "ActDelayModifValue": 1.0,
                    "ResistanceModificatorsMap": [
                        {
                            "Type": 0,
                            "Value": 1.0
                        }
                    ],
                },
            },
        ]
    },
    {
        name: "Quest",
        subtypes: [
            {
                name: "None",
                ItemOption: {},
            },
        ]
    },
];
export const ITypesSettings = {
    "Direction": {
        component: "VSelect",
        label: "Цели применения: одна, линия, все",
        items: ADirections,
    },
    "CooldownTime": {
        component: "optionsComponent",
        label: "Кулдаун",
    },
    "DustPower": {
        component: "optionsComponent",
        label: "Количество пыли",
    },
    "GoldCount": {
        component: "optionsComponent",
        label: "Количество золота",
    },
    "StatusEffects": {//статусы тип 11/0
        component: 'conditionsArray',
        label: "Статусы"
    },
    "CrystalType": {
        component: "optionsComponent",
        label: "Качество кристалла",
    },
    "HPModificator": {
        component: "optionsComponent",
        label: "HPModificator",
    },
    "HPModificatorPercent": {
        component: "optionsComponent",
        label: "HPModificatorPercent",
    },
    "AttackModificator": {
        component: "optionsComponent",
        label: "AttackModificator",
    },
    "DefenceModificator": {
        component: "optionsComponent",
        label: "DefenceModificator",
    },
    "EvasionModificator": {
        component: "optionsComponent",
        label: "EvasionModificator",
    },
    "ReflectionModificator": {
        component: "optionsComponent",
        label: "ReflectionModificator",
    },
    "HitChanceModifValue": {
        component: "optionsComponent",
        label: "HitChanceModifValue",
    },
    "CritChanceModifValue": {
        component: "optionsComponent",
        label: "CritChanceModifValue",
    },
    "DelayModifValue": {
        component: "optionsComponent",
        label: "DelayModifValue",
    },
    "ActDelayModifValue": {
        component: "optionsComponent",
        label: "ActDelayModifValue",
    },
    "ResistanceModificatorsMap": {
        component: "resistancesComponent",
        label: "Модификаторы сопротивления",
    },
};
