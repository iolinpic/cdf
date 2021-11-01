export const DialogValues = {
    "Name": '',
    "StartStageId": '',
    "Stages": [],
};
export const DialogFieldSettings = {
    "Name": {
        component: "VTextField",
        label: "Название",
    },
    "StartStageId": {
        component: "StageSelectComponent",
        label: "Id первой реплики",
    },
    "Stages": {
        component: "dialogStagesComponent",
        label: "Реплики",
    },
};
export const DialogStageValues = {
    "StageId": '',
    "TextLine": '',
    "NextStages": [],
    "SpeakerId": '',
    "StageConditions": [],
    "StageActions": [],
    //"Answers": [],
};
export const DialogStageSettings = {
    "StageId": {
        component: "VTextField",
        label: "Id реплики",
    },
    "TextLine": {
        component: "VTextarea",
        label: "Реплика",
    },
    "NextStages": {
        component: "StagesSelectComponent",
        label: "Следующие реплики",
    },
    "SpeakerId": {
        component: "npcSelect",
        label: "Персонаж произносящий реплику",
    },
    "StageConditions": {
        component: "dialogAnswerConditionsComponent",
        label: "Условия отображения",
    },
    "StageActions": {
        component: "dialogAnswerActionsComponent",
        label: "Действия после отображения",
    },

/*    "Answers": {
        component: "dialogAnswersComponent",
        label: "Ответы",
    },*/
};
export const DialogAnswerValues = {
    "Answer": '',
    "NextStageId": '',
    "AnswerConditions": [],
    "AnswerActions": [],
};
export const DialogAnswerSettings = {
    "Answer": {
        component: "VTextField",
        label: "Ответ",
    },
    "NextStageId": {
        component: "VTextField",
        label: "Id следующей реплики",
    },
    "AnswerConditions": {
        component: "dialogAnswerConditionsComponent",
        label: "Условия отображения ответа",
    },
    "AnswerActions": {
        component: "dialogAnswerActionsComponent",
        label: "Действия выполняемые при выборе ответа",
    },
};
export const DialogAnswerConditionTypes = ['Sex', 'Quest', 'Item', 'Resource'];
export const DialogAnswerConditionSexValues = ['f', 'm'];
export const DialogAnswerConditionQuestValues = {
    quest: ['Unknown', 'Active', 'Failed', 'Complete', 'HideFailed'],
    stage: ['Unknown', 'Active', 'Failed', 'Complete'],
    goal: ['InProgress', 'Complete', 'Failed']
};
export const Resource = ['Gold', 'Crystal'];
export const DialogAnswerConditionValues = {
    'Sex': {
        "SexId": "m"
    },
    'Quest': {
        "QuestId": "", //Id квеста
        "QuestStatus": "Unknown", //Статус квеста
        "QuestStage": -1, //Стадия. -1 не проверяем по стадии.
        "StageStatus": "Unknown", //Стастус стадии
        "StageGoalId": -1,  //Цель. -1 не проверяем по цели.
        "GoalStatus": "InProgress" //Статус цели.
    },
    'Item': {
        "Id": "", // Id айтема или ресурса (у ресурсов есть Gold и Crystal).
        "Count": 1 // количество
    },
    'Resource': {
        "Id": "", // Id айтема или ресурса (у ресурсов есть Gold и Crystal).
        "Count": 1 // количество
    }
};
export const DialogAnswerConditionSettings = {
    'Sex': {
        "SexId": {
            component: "VSelect",
            label: "Пол игрока",
            items: DialogAnswerConditionSexValues,
        },
    },
    'Quest': {
        "QuestId": {
            component: "QuestSelectComponent",
            label: "Квест",
        }, // id квеста
        "QuestStatus": {
            component: "VSelect",
            label: "Статус квеста",
            items: DialogAnswerConditionQuestValues.quest,
        }, //Статус необходимый для квеста.
        "QuestStage": {
            component: "QuestStageSelectComponent",
            //component: "OptionComponent",
            label: "Требуемая стадия (-1, если не проверять по стадии)",
        }, // Требуемая стадия (-1, если не проверять по стадии)
        "StageStatus": {
            component: "VSelect",
            label: "Статус стадии",
            items: DialogAnswerConditionQuestValues.stage,
        }, //Статус необходимый для стадии.
        "StageGoalId": {
            component: "QuestGoalSelectComponent",
            //component: "OptionComponent",
            label: "Требуемая цель (-1, если не проверять по целям)",
        }, // Требуемая цель (-1, если не проверять по целям)
        "GoalStatus": {
            component: "VSelect",
            label: "Статус цели",
            items: DialogAnswerConditionQuestValues.goal,
        } //Статус необходимый для цели.
    },
    'Item': {
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
    'Resource': {
        "Id": {
            component: "VSelect",
            label: "Тип Ресурса",
            items: Resource,
        }, // Id айтема или ресурса (у ресурсов есть Gold и Crystal).
        "Count": {
            component: "OptionComponent",
            label: "Количество",
        } // количество
    }
};
export const DialogAnswerActionTypes = ['StartQuest', 'CompleteQuestGoal', 'FailQuestGoal', 'Item', 'Resources', 'StartBattle','InitTradeSys', 'InitScript'];
export const DialogAnswerActionValues = {
    'StartQuest': {
        "QuestId": "" //id квеста.
    },
    'CompleteQuestGoal': {
        "QuestId": "", //Id квеста.
        "QuestStage": -1, //Номер стадии.
        "QuestGoal": -1 //Номер цели.
    },
    'FailQuestGoal': {
        "QuestId": "",//Id квеста.
        "QuestStage": -1, //Номер стадии.
        "QuestGoal": -1 //Номер цели.
    },
    'Item': {
        "ItemId": "", //Id предмета.
        "Count": 1, // Количество.
        "Action": "Add" //Выбор - отдать или забрать.
    },
    'Resources': {
        "ResourceId": "Gold", //Золото или кристаллы.
        "ResourceCount": 100, //Количество.
        "Action": "Add" //Выбор - отдать или забрать.
    },
    'StartBattle': {},
    'InitTradeSys': {},
    'InitScript': {
        "ScriptId": "" //Название скрипта вводится вручную.
    },
};
export const DialogAnswerActionSettings = {
    'StartQuest': {
        "QuestId": {
            component: "QuestSelectComponent",
            label: "Квест",
        }, // id квеста
    },
    'CompleteQuestGoal': {
        "QuestId": {
            component: "QuestSelectComponent",
            label: "Квест",
        }, // id квеста
        "QuestStage": {
            //component: "OptionComponent",
            component: "QuestStageSelectComponent",
            label: "Требуемая стадия (-1, если не проверять по стадии)",
        }, // Требуемая стадия (-1, если не проверять по стадии)
        "QuestGoal": {
            component: "QuestGoalSelectComponent",
            label: "Требуемая цель (-1, если не проверять по целям)",
        }, // Требуемая цель (-1, если не проверять по целям)
    },
    'FailQuestGoal': {
        "QuestId": {
            component: "QuestSelectComponent",
            label: "Квест",
        }, // id квеста
        "QuestStage": {
            //component: "OptionComponent",
            component: "QuestStageSelectComponent",
            label: "Требуемая стадия (-1, если не проверять по стадии)",
        }, // Требуемая стадия (-1, если не проверять по стадии)
        "QuestGoal": {
            component: "QuestGoalSelectComponent",
            //component: "OptionComponent",
            label: "Требуемая цель (-1, если не проверять по целям)",
        }, // Требуемая цель (-1, если не проверять по целям)
    },
    'Item': {
        "ItemId": {
            component: "itemSelectComponent",
            label: "Предмет",
            // items: Resource,
        }, // Id айтема или ресурса (у ресурсов есть Gold и Crystal).
        "Count": {
            component: "OptionComponent",
            label: "Количество",
        }, // количество
        "Action": {
            component: "VSelect",
            label: "Действие",
            items: ['Add', 'Remove'],
        },
    },
    'Resources': {
        "ResourceId": {
            component: "VSelect",
            label: "Тип Ресурса",
            items: Resource,
        }, // Id айтема или ресурса (у ресурсов есть Gold и Crystal).
        "ResourceCount": {
            component: "OptionComponent",
            label: "Количество",
        }, // количество
        "Action": {
            component: "VSelect",
            label: "Действие",
            items: ['Add', 'Remove'],
        },
    },
    'StartBattle': {},
    'InitTradeSys': {},
    'InitScript': {
        "ScriptId": {
            component: "VTextField",
            label: "Id скрипта",
        }
    },
};
