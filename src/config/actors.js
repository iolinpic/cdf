// export const ATypes = ['AT_Damage', 'AT_Heal', 'AT_Defence'];
// export const ADirections = ['D_Solo', 'D_Line', 'D_All'];
// export const AAnimations = ['Normal', 'Super'];
export const ActorValues = {
    "DisplayNameText": '',
    "DescriptionText": '',
    "Icon": '',
    "EquipAtrifacts": [],
    "Consumables": [],
};
export const ActorFieldSettings = {
    "DisplayNameText": {
        component: "VTextField",
        label: "Название",
    },
    "DescriptionText": {
        component: "VTextarea",
        label: "Описание",
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
