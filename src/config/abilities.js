export const ATypes = ['AT_Damage', 'AT_Heal', 'AT_Defence'];
export const ADirections = ['AD_Solo', 'AD_Line', 'AD_All'];
export const AValues = {
    "DisplayNameText": '',
    "DescriptionText": '',
    "AbilitType": 'AT_Damage',
    "AbilityDirection": 'AD_Solo',
    "AbilityValue": 55.0,
    "HitChance": 1.0,
    "CritChance": 0.0,
    "AbilityDelay": 2.0,
    "ActCount": 1,
    "RestTime": 2.0,
    "DamageTypes": [],
    "ConditionTarget": [],
    "ConditionSelf": []
};
export const AFieldSettings = {
    "DisplayNameText": {
        component: "VTextField",
        label:"Название",
    },
    "DescriptionText": {
        component: "VTextarea",
        label:"Описание",
    },
    "AbilitType": {
        component: "VSelect",
        label:"Тип способности: атака, защита, исцеление",
        items: ATypes,
    },
    "AbilityDirection": {
        component: "VSelect",
        label:"Цели применения: одна, линия, все",
        items: ADirections,
    },
    "AbilityValue": {
        component: "optionsComponent",
        label:"Сила абилки (урон в атакующей, сила лечения в лечащей)",
    },
    "HitChance": {
        component: "optionsComponent",
        label:"Вероятность того, что абилка сработает.",
    },
    "CritChance": {
        component: "optionsComponent",
        label:"Вероятность того, что абилка сработается с некоторым бонусным модификатором (например, x2)",
    },
    "AbilityDelay": {
        component: "optionsComponent",
        label:"Задержка перед применением аблики.",
    },
    "ActCount": {
        component: "optionsComponent",
        label:"Количество действий для одной аблики (например, одна атака нанесет урон не 1 раз, а 4).",
    },
    "RestTime": {
        component: "optionsComponent",
        label:"Перезарядка кризма, после применения аблики.",
    },
    "DamageTypes": {
        component: 'crysmTypeComponent',
        label:"Типа урона, для атакующих абилок",
    },
    "ConditionTarget": {
        component: 'abilityConditionsComponent',
        label:"Список статусных эффектов, которые будут наложены на цель с некоторым шансом.",
    },
    "ConditionSelf": {
        component: 'abilityConditionsComponent',
        label:"Список статусных эффектов, которые будут наложены на атакующего с некоторым шансом.",
    }
};