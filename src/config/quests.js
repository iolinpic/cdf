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
        component:"VSelect",
        label:"Тип",
        items: QTypes,
    },
};
export const QSValues = {
    "StageDescriptionText": "",
    // "StageDescription": "",
    "Goals": [],
};
export const QSFieldSettings = {
    "StageDescriptionText": {
        component: "VTextarea",
        label: "Описание",
    },
};
export const QGoalTypes = ['Talk','TransferCrysm','TransferItem','TransferResource','DefeatCrysm','CatchCrysm','DefeatNPC','CustomGoal'];

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
    "DefeatCrysm":{
        "Id":"",
        "Map":"",
        "Type":"",
        "Count":"",
    },
    "CatchCrysm":{
        "Id":"",
        "Map":"",
        "Type":"",
        "Count":"",
    },
    "DefeatNPC":{
        "NPC": "",
    },
    "CustomGoal":{
        "CustomGoalText":"",
    },
};
export const QGValues = {
    "GoalType": "Talk",
    "GoalOptions":{
        "NPC": ""
    },
};
export const QGOptionsFieldSettings = {
    "Talk": {
        "NPC": {
            component: "VTextField",
            label: "Название NPC",
        },
    },
    "TransferCrysm": {},
    "TransferItem": {},
    "TransferResource": {},
    "DefeatCrysm":{},
    "CatchCrysm":{},
    "DefeatNPC":{},
    "CustomGoal":{
        "CustomGoalText": {
            component: "VTextField",
            label: "Описание цели",
        },
    },
};
