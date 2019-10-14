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
    "ActDelay": 0.001,
    "RestTime": 2.0,
    "DamageTypes": [],
    // "ConditionTarget": [],
    // "ConditionSelf": []
};
export const ATitles = {
    "DisplayNameText": "Название",
    "DescriptionText": "Описание",
    "AbilityValue": "Сила абилки (урон в атакующей, сила лечения в лечащей)",
    "AbilitType": "Тип способности: атака, защита, исцеление",
    "AbilityDirection": "Цели применения: одна, линия, все",
    "HitChance": "Вероятность того, что абилка сработает.",
    "CritChance": "Вероятность того, что абилка сработается с некоторым бонусным модификатором (например, x2)",
    "AbilityDelay": "Задержка перед применением аблики.",
    "ActCount": "Количество действий для одной аблики (например, одна атака нанесет урон не 1 раз, а 4).",
    "ActDelay": "Задержка между неколькими действиями. По умолчанию всегда 0.001, так как большинство абилок имеют 1 применение, без какой либо задержки.",
    "RestTime": "Перезарядка кризма, после применения аблики.",
    "ConditionTarget": "Список статусных эффектов, которые будут наложены на цель с некоторым шансом.",
    "DamageTypes": "Типа урона, для атакующих абилок",
    "ConditionSelf": "Список статусных эффектов, которые будут наложены на атакующего с некоторым шансом."
};
export const AFieldSettings = {
    "DisplayNameText": {
        component: "VTextField",
    },
    "DescriptionText": {
        component: "VTextarea",
    },
    "AbilitType": {
        component: "VSelect",
        items: ATypes,
    },
    "AbilityDirection": {
        component: "VSelect",
        items: ADirections,
    },
    "AbilityValue": {
        component: "optionsComponent",
    },
    "HitChance": {
        component: "optionsComponent",
    },
    "CritChance": {
        component: "optionsComponent",
    },
    "AbilityDelay": {
        component: "optionsComponent",
    },
    "ActCount": {
        component: "optionsComponent",
    },
    "ActDelay": {
        component: "optionsComponent",
    },
    "RestTime": {
        component: "optionsComponent",
    },
    "DamageTypes": {
        component: 'crysmTypeComponent',
    },
    // "ConditionTarget": [],
    // "ConditionSelf": []
};