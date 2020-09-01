export const QValues = {
    "DisplayNameText": "",
    "DescriptionText": "",
    "Type": "Main",
    // "FirstStageId":"",
    "Stage": [],
};
export const QTypes = ['Main', 'Secondary'];
export const QFieldSettings = {
    "DisplayNameText": {
        component: "VTextField",
        label: "Название",
    },
    "DescriptionText": {
        component: "VTextarea",
        label: "Описание",
    },
    "Type": {
        component: "VSelect",
        label: "Тип",
        items: QTypes,
    },
};
export const QSValues = {
    "StageDescriptionText": "",
    "StageNameText": "",
    "StageName": "",
    "StageDescription": "",
    "Goals": [],
};
export const QSFieldSettings = {
    "StageNameText": {
        component: "VTextField",
        label: "Название стадии",
    },
    "StageDescriptionText": {
        component: "VTextarea",
        label: "Описание",
    },

};
export const QGoalTypes = ['Talk', 'TransferCrysm', 'TransferItem', 'TransferResource', 'DefeatCrysm', 'CatchCrysm', 'DefeatNPC', 'CustomGoal'];

export const QGOptions = {
    "Talk": {
        "NPC": ""
    },
    "TransferCrysm": {
        "Id": "",
        "Count": 1,
        "Action": "Add / Remove",
        "NPC": ""
    },
    "TransferItem": {
        "Id": "",
        "Count": 1,
        "Action": "Add / Remove",
        "NPC": ""
    },
    "TransferResource": {
        "Id": "",
        "Count": 1,
        "Action": "Add / Remove",
        "NPC": ""
    },
    "DefeatCrysm": {
        "Id": "",
        "Map": "",
        "Type": [],
        "Count": 1,
    },
    "CatchCrysm": {
        "Id": "",
        "Map": "",
        "Type": [],
        "Count": 1,
    },
    "DefeatNPC": {
        "NPC": "",
    },
    "CustomGoal": {
        "CustomGoalText": "",
    },
};
export const QGValues = {
    "GoalType": "Talk",
    "GoalOptions": {
        "NPC": ""
    },
};
export const Resource = ['Gold', 'Crystal'];
export const QGOptionsFieldSettings = {
    "Talk": {
        "NPC": {
            component: "npcSelect",
            label: "Название NPC",
        },
    },
    "TransferCrysm": {
        "Count": {
            component: "OptionComponent",
            label: "Количество",
        },
        "Id": {
            component: "CrysmSelectComponent",
            label: "Кризм",
            // items: Resource,
        },
        "Action": {
            component: "VSelect",
            label: "Действие",
            items: ['Add', 'Remove'],
        },
        "NPC": {
            component: "npcSelect",
            label: "Название NPC",
        },
    },
    "TransferItem": {
        "Count": {
            component: "OptionComponent",
            label: "Количество",
        },
        "Id": {
            component: "itemSelectComponent",
            label: "Предмет",
            // items: Resource,
        },
        "Action": {
            component: "VSelect",
            label: "Действие",
            items: ['Add', 'Remove'],
        },
        "NPC": {
            component: "npcSelect",
            label: "Название NPC",
        },
    },
    "TransferResource": {
        "Count": {
            component: "OptionComponent",
            label: "Количество",
        },
        "Id": {
            component: "VSelect",
            label: "Тип Ресурса",
            items: Resource,
        },
        "Action": {
            component: "VSelect",
            label: "Действие",
            items: ['Add', 'Remove'],
        },
        "NPC": {
            component: "npcSelect",
            label: "Название NPC",
        },
    },
    "DefeatCrysm": {
        "Id": {
            component: "CrysmSelectComponent",
            label: "Кризм",
            // items: Resource,
        },
        "Count": {
            component: "OptionComponent",
            label: "Количество",
        },
        "Map": {
            component: "ZoneSelectComponent",
            label: "Карта",
        },
        "Type": {
            component: "CrysmTypeComponent",
            label: "Тип кризма (не влияет на результат если задан конкретный кризм)",
        },
    },
    "CatchCrysm": {
        "Id": {
            component: "CrysmSelectComponent",
            label: "Кризм",
            // items: Resource,
        },
        "Count": {
            component: "OptionComponent",
            label: "Количество",
        },
        "Map": {
            component: "ZoneSelectComponent",
            label: "Карта",
        },
        "Type": {
            component: "CrysmTypeComponent",
            label: "Тип кризма (не влияет на результат если задан конкретный кризм)",
        },
    },
    "DefeatNPC": {
        "NPC": {
            component: "npcSelect",
            label: "Название NPC",
        },
    },
    "CustomGoal": {
        "CustomGoalText": {
            component: "VTextField",
            label: "Описание цели",
        },
    },
};
