export const ActorValues = {
    "DisplayNameText": '',
    "DescriptionText": '',
    "Icon": '',
    'Tech':'Игровой',
    'ArticyId':'',
    "EquipArtifacts": [],
    "Consumables": [],
    "DialogGreetings":[],
};
export const TechOps = ['Игровой', 'Технический']
export const DialogGreetingsTypes = ['Message','Talk'];
export const DialogGreetingsValues={
    "Name":"Диалог 1",
    "Priority": 1, //приоритет срабатывания
    "DialogId": "0", //идентификатор диалога, который будет показан, если условия соблюдены.
    "DialogType": "Message", // Тип: Message или Talk
    "bShowOnce": true, // показывать один раз?
    "bAutoStart": true, // автоматически?
    "Conditions":[],
}
export const DialogGreetingsConditionTypes=['Quest','Crysm','Item','Resource','Map'];
export const DialogGreetingsQuestStatuses={quest:['Unknown','Active','Failed','Complete','HideFailed'],stage:['Unknown','Active','Failed','Complete'],goal:['InProgress','Complete','Failed']};
export const DialogGreetingsConditionOptions={
    "Quest":{
        "QuestId": "5f44ae0a7495bc17024efe46", // id квеста
        "QuestStatus": "Active", //Статус необходимый для квеста.
        "QuestStage": -1, // Требуемая стадия (-1, если не проверять по стадии)
        "StageStatus": "Active", //Статус необходимый для стадии.
        "StageGoalId": -1, // Требуемая цель (-1, если не проверять по целям)
        "GoalStatus": "Active" //Статус необходимый для цели.
    },
    "Crysm":{
        "Id": "", //Id кризма
        "Type": [], //Если Id кризма не указан, то нужно указать тип.
        "Count": 1 // Требуемое количество.
    },
    "Item":{
        "Id": "", // Id айтема или ресурса (у ресурсов есть Gold и Crystal).
        "Count": 1 // количество
    },
    "Resource":{
        "Id": "", // Id айтема или ресурса (у ресурсов есть Gold и Crystal).
        "Count": 1 // количество
    },
    "Map":{
        "MapId": "" //Id карты, на которой должен находится НПЦ для старта данного привествия.
    }
}
export const Resource = ['Gold', 'Crystal'];
export const DialogGreetingsConditionOptionsSettings={
    "Quest":{
        "QuestId": {
            component: "QuestSelectComponent",
            label: "Квест",
        }, // id квеста
        "QuestStatus": {
            component: "VSelect",
            label: "Статус квеста",
            items: DialogGreetingsQuestStatuses.quest,
        }, //Статус необходимый для квеста.
        "QuestStage": {
            //component: "OptionComponent",
            component: "QuestStageSelectComponent",
            label: "Требуемая стадия (-1, если не проверять по стадии)",
        }, // Требуемая стадия (-1, если не проверять по стадии)
        "StageStatus": {
            component: "VSelect",
            label: "Статус стадии",
            items: DialogGreetingsQuestStatuses.stage,
        }, //Статус необходимый для стадии.
        "StageGoalId": {
            //component: "OptionComponent",
            component: "QuestGoalSelectComponent",
            label: "Требуемая цель (-1, если не проверять по целям)",
        }, // Требуемая цель (-1, если не проверять по целям)
        "GoalStatus": {
            component: "VSelect",
            label: "Статус цели",
            items: DialogGreetingsQuestStatuses.goal,
        } //Статус необходимый для цели.
    },
    "Crysm":{
        "Id": {
            component: "CrysmSelectComponent",
            label: "Кризм",
            // items: Resource,
        }, //Id кризма
        "Type": {
            component: "CrysmTypeComponent",
            label: "Тип кризма (не влияет на результат если задан конкретный кризм)",
        }, //Если Id кризма не указан, то нужно указать тип.
        "Count": {
            component: "OptionComponent",
            label: "Количество",
        } // Требуемое количество.
    },
    "Item":{
        "Id": {
            component: "itemSelectComponent",
            label: "Предмет",
            // items: Resource,
        }, // Id айтема или ресурса (у ресурсов есть Gold и Crystal).
        "Count": {
            component: "OptionComponent",
            label: "Количество",
        } // количество
    },
    "Resource":{
        "Id": {
            component: "VSelect",
            label: "Тип Ресурса",
            items: Resource,
        }, // Id айтема или ресурса (у ресурсов есть Gold и Crystal).
        "Count": {
            component: "OptionComponent",
            label: "Количество",
        } // количество
    },
    "Map":{
        "MapId": {
            component: "ZoneSelectComponent",
            label: "Карта",
        }
    }
}
export const DialogGreetingsSettings={
    "Name": {
        component: "VTextField",
        label: "Название",
    },
    "DialogType": {
        component: "VSelect",
        label: "Тип",
        items: DialogGreetingsTypes,
    },
    "Priority": {
        component: "OptionComponent",
        label: "Приоритет срабатывания",
    },
    "bShowOnce":{
        component: "VSwitch",
        label: "Показывать один раз",
    },
    "bAutoStart": {
        component: "VSwitch",
        label: "Автоматически",
    },
    "Conditions":{
        component:"actorDialogConditionsComponent",
        label:"Условия",
    },
    "DialogId":{
        component:"dialogSelectComponent",
        label:"Диалог"
    },
}
export const ActorFieldSettings = {
    "DisplayNameText": {
        component: "VTextField",
        label: "Название",
    },
    "DescriptionText": {
        component: "VTextarea",
        label: "Описание",
    },
    "ArticyId": {
        component: "VTextField",
        label: "ArticyId",
    },
    "Tech": {
        component: "VSelect",
        label: "Тип",
        items: TechOps,
    },
    "Icon": {
        component: "fileUpload",
        label: "Icon",
    },
    "EquipArtifacts": {
        component: "actorSelectEquippedComponent",
        label: "Надетые артефакты",
    },
    "Consumables": {
        component: "actorConsumablesComponent",
        label: "Предметы",
    },
    "DialogGreetings": {
        component: "actorDialogsComponent",
        label: "Диалоги",
    },
};
export const ActorEquippedValue = {
    "ContentId":0,
}

export const ActorEquippedItems={
    Type:"Artifact",
}
export const ActorConsumeItems={
    Type:"Consum",
}

export const ActorConsumableValue = {
    "ContentId":0,
    "Count":0,
}
