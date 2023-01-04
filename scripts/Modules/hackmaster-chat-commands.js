import { HackmasterCrits } from './hackmaster-crits.js';
import { Utilities } from '../utilities.js'

export class HackmasterChatCommands{

    static CommandMap = {
        ["/hmcrit"]: HackmasterChatCommands.HandleCritCommand
    };
        
    static initialize(){
        Hooks.on('chatMessage', (chatLog, messageText, chatData) => {
            if (messageText[0] !== '/') return;

            let args = messageText.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
            let commandName = args[0];
            let otherArgs = args.slice(1);
            let command = HackmasterChatCommands.CommandMap[commandName];
            if (command){
                try{
                    messageText = HackmasterChatCommands.removeCommand(messageText, commandName);
                    chatData.type = command.createdMessageType;
                    let modifiedText = command(otherArgs);
                    if (modifiedText){
                        messageText = modifiedText;
                        chatData.content = messageText;
                        ChatMessage.create(chatData);
                    }
                    
                    return false;
                }
                catch(error){
                    console.error({commandName, otherArgs}, error);
                }
            }
            return true;
        });
    }

    static removeCommand(messageText, command) {
        messageText = Utilities.caseInsensitiveReplace(messageText, command, "");
        return messageText.trim();
    }

    static HandleCritCommand(args){
        if (args.length == 3)
        {
            let damageType = args[0];
            let severity = Math.min(parseInt(args[1]) || 0, 24);
            let location = Math.min(parseInt(args[2]) || 0, 10000);

            if ((damageType === 'b' || damageType === 's' || damageType === 'c') && severity > 0 && location > 0){
                let crit = HackmasterCrits.forceCrit(damageType, severity, location);

                _templateCache["modules/hackmaster-4e/templates/crit-chat-card.hbs"]
                let card = Utilities.loadCachedTemplate("modules/hackmaster-4e/templates/crit-chat-card.hbs", {
                    severity: crit.nSeverity,
                    hitLocation: crit.sHitLocation,
                    effects: crit.aResults,
                    hasScar: crit.bHasScar ? "Yes" : "No",
                    isPermanent: crit.bPermanentDamage ? "Yes" : "No",
                    bruiseDays: crit.nBruiseDays,
                    damageBonus: crit.dmgMultiplier !== undefined ? `x${crit.dmgMultiplier}` : crit.dmgBonusDie !== undefined ? `+d${crit.dmgBonusDie}` : ''
                });
                return card;
            }
             
        }

        return "Invalid command. Usage: /hmcrit [(s,p, or b)] [#severity (1-24)] [#location (1-10000)]";
    }
}