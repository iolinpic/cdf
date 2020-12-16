export const SPValues = {
    "Name": '',
    "Packs": [
    ],

};
export const SPPValues = {
    "ItemId": '',
    "Count": 1,
    "Chance":1.0,
};

export const SPFieldSettings = {
    "Name": {
        component: "VTextField",
        label:"Название",
    },
    "Packs": {
        component: "itemsComponent",
        label:"Предметы",
    },
};
export const SPPFieldSettings = {
    "ItemId": {
        component: "itemSelectComponent",
        label:"Предмет",
    },
    "Count": {
        component: "OptionComponent",
        label:"Количество",
    },
    "Chance": {
        component: "OptionComponent",
        label:"Шанс (1.0 = 100%)",
    },
};
