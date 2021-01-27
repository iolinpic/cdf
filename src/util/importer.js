import deepCopy from "./deepCopy";
import {QSValues, QTypes, QValues} from "../config/quests";
import {DialogValues,DialogStageValues} from "../config/dialogs";
import api from "@/api";

export default {
    //import starters
    importQuestsFromJson: function(file,callback){
        if (file !== undefined) {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                let json = reader.result;
                json = JSON.parse(json);
                // eslint-disable-next-line
                //console.log(json);
                this.parseQFile(json)
                callback()
            }
        }
    },
    importDialogsFromJson: function(file,callback){
        if (file !== undefined) {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                let json = reader.result;
                json = JSON.parse(json);
                // eslint-disable-next-line
                //console.log(json);
                this.parseDFile(json)
                callback()
            }
        }
    },
    //select phase
    parseQFile:function (json) {
        //use only first package
        const dataStorage = json.Packages[0].Models;
        //only one quest in export
        dataStorage.forEach((el)=>{
            if(el.Type ==="QuestFlow"){
                this.parseQuest(dataStorage,el);
            }
        })

        //return true;
    },
    parseDFile:function (json) {
        //use only first package
        const dataStorage = json.Packages[0].Models;
        //only one quest in export
        dataStorage.forEach((el)=>{
            if(el.Type ==="Dialogue"){
                this.parseDialogue(dataStorage,el);
            }
        })
    },
    parseDialogue:function (dataStorage,currentNode){
        api.actors.all().then((res)=>{
            const actors = res.data;
            const resData = deepCopy(DialogValues);
            const dialogId = currentNode.Properties.Id;
            //quest params setup
            resData.Name = currentNode.Properties.DisplayName;
            //setup stages
            if (currentNode.Properties.InputPins[0].Connections&&currentNode.Properties.InputPins[0].Connections.length > 0) {
                resData.StartStageId = currentNode.Properties.InputPins[0].Connections[0].Target;
                currentNode.Properties.InputPins[0].Connections.forEach((con) => {
                    let currentNodeId = dataStorage.findIndex((el) => el.Properties.Id === con.Target && el.Type === "DialogueFragment");
                    if (currentNodeId !== -1) {
                        this.parseDStage(dataStorage, currentNodeId, resData, dialogId,actors);
                    }
                })
            }
            api.dialogs.store(resData).then(()=>{});
        })

       /* api.quests.store(resData).then(() => {
            // eslint-disable-next-line no-console
            // console.log(res.data.id);
            //this.back(res.data.id);
        })*/
    },
    parseQuest:function (dataStorage,currentNode){
        const resData = deepCopy(QValues);
        const questId = currentNode.Properties.Id;
        //quest params setup
        resData.DescriptionText = currentNode.Properties.Text;
        resData.DisplayNameText = currentNode.Properties.DisplayName;
        resData.QTechName = currentNode.Template.QuestTech.QTechName;
        resData.Type = QTypes[currentNode.Template.QuestTech.Type];
        //setup stages
        if (currentNode.Properties.InputPins[0].Connections.length > 0) {
            currentNode.Properties.InputPins[0].Connections.forEach((con) => {
                let currentNodeId = dataStorage.findIndex((el) => el.Properties.Id === con.Target && el.Type === "QuestStage");
                if (currentNodeId !== -1) {
                    this.parseStage(dataStorage, currentNodeId, resData, questId);
                }
            })
        }
        api.quests.store(resData).then(() => {
            // eslint-disable-next-line no-console
            // console.log(res.data.id);
            //this.back(res.data.id);
        })
    },
    parseStage(dataStorage, currentNodeId, resData, questId) {
        const currentNode = dataStorage[currentNodeId]
        const StageData = deepCopy(QSValues);
        StageData.StageDescriptionText = currentNode.Properties.Text;
        StageData.StageNameText = currentNode.Properties.DisplayName;
        resData.Stage.push(StageData);
        if (currentNode.Properties.OutputPins[0].Connections.length > 0) {
            let nextTarget = currentNode.Properties.OutputPins[0].Connections[0].Target;
            if (nextTarget !== questId) {
                let nextNode = dataStorage.findIndex((el) => el.Properties.Id === nextTarget);
                if (nextNode !== -1) {
                    this.parseStage(dataStorage, nextNode, resData, questId);
                }
            }
        }
    },
    parseDStage(dataStorage, currentNodeId, resData, dialogId,actors) {
        const currentNode = dataStorage[currentNodeId]
        const StageData = deepCopy(DialogStageValues);
        StageData.TextLine= currentNode.Properties.Text;
        StageData.StageId = currentNode.Properties.Id;
        const actor = actors.find((act)=> act.ArticyId === currentNode.Properties.Speaker)
        if(actor){
            StageData.SpeakerId = actor.id;
        }
        //add link to next edge if it is not final and exists
        if(currentNode.Properties.OutputPins[0].Connections){
            currentNode.Properties.OutputPins[0].Connections.forEach((con)=>{
                let nextTarget = con.Target;
                if (nextTarget !== dialogId) {
                    let nextNode = dataStorage.findIndex((el) => el.Properties.Id === nextTarget);
                    if (nextNode !== -1) {
                        StageData.NextStages.push(nextTarget);
                    }
                }
            })
            //push edge to visited list
            resData.Stages.push(StageData);
            //dive dipper in links, validating if edje is not final, exists and not visited
            currentNode.Properties.OutputPins[0].Connections.forEach((con)=>{
                let nextTarget = con.Target;
                let visitedTarget = resData.Stages.findIndex((stage)=>stage.StageId === nextTarget)
                if (nextTarget !== dialogId && visitedTarget===-1) {
                    let nextNode = dataStorage.findIndex((el) => el.Properties.Id === nextTarget);
                    if (nextNode !== -1) {
                        this.parseDStage(dataStorage, nextNode, resData, dialogId,actors);
                    }
                }
            })
        }else{
            resData.Stages.push(StageData);
        }
    },
}
