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

};
