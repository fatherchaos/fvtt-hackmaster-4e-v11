import { HackmasterActor } from './hackmaster-actor.js';
import { HackmasterCrits } from './hackmaster-crits.js';
import { CritData } from '../../data/crit-data.js';
import { Utilities } from '../utilities.js'
import { HackmasterFumbles } from './hackmaster-fumbles.js';
import { HackmasterCharacterBackground } from './hackmaster-char-background.js';

export class HackmasterChatCommands{

    static CommandMap = {
        ["/hmcrit"]: HackmasterChatCommands.HandleForcedCritCommand,
        ["/crit"]: HackmasterChatCommands.HandleRandomCritCommand,
        ["/fumble"]: HackmasterChatCommands.HandleRandomFumbleCommand,
        ["/mishap"]: HackmasterChatCommands.HandleMishapCommand,
        ["/quirk"]: HackmasterChatCommands.HandleQuirkFlawCommand
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

    static HandleForcedCritCommand(args){
        if (args.length == 3)
        {
            let damageType = args[0];
            let severity = Math.min(parseInt(args[1]) || 0, 24);
            let location = Math.min(parseInt(args[2]) || 0, 10000);

            if ((damageType === 'b' || damageType === 's' || damageType === 'c') && severity > 0 && location > 0){
                let crit = HackmasterCrits.forceCrit(damageType, severity, location);
                return HackmasterCrits.createCritCard(crit);
            }
        }

        return "Invalid command. Usage: /hmcrit [(s,p,b)] [#severity (1-24)] [#location (1-10000)]";
    }

    static HandleRandomCritCommand(args){
        if (args.length <= 3){
            let damageType = args[0];
            let attackBonus = parseInt(args.length > 1 ? args[1] : 0);
            attackBonus = isNaN(attackBonus) ? 0 : attackBonus;
            let calledShotLocationName = args.length == 3 ? args[2].toLowerCase() : undefined;
            if ((!calledShotLocationName || Object.keys(CritData.CalledShotLocationTable).includes(calledShotLocationName))
                && (damageType === 'b' || damageType === 's' || damageType === 'p') 
                && canvas.tokens.controlled.length == 1
                && game.user.targets?.size == 1) {
                    let source = new HackmasterActor(canvas.tokens.controlled[0].actor);
                    let target = new HackmasterActor(Array.from(game.user.targets)[0].actor);
                    let crit = HackmasterCrits.rollCritForTarget(source, target, damageType, attackBonus, calledShotLocationName);
                    return HackmasterCrits.createCritCard(crit);
            }
        }

        return "Invalid command. Usage: select your token, target exactly 1 token, and then /crit [(s,p,b)] [*#attackBonus] [*called shot (abdomen, arm, eye, groin, hand, head, leg, neck, tail, torso]";
    }

    static HandleRandomFumbleCommand(args){
        let arg = args.length > 0 ? args[0].toLowerCase() : null;
        let isUnarmed = arg === 'unarmed' || arg === 'u';

        let fumble = HackmasterFumbles.handleFumble(isUnarmed);
        return HackmasterFumbles.createFumbleCard(fumble);
    }

    static HandleMishapCommand(args){
        let mishap = HackmasterFumbles.handleMishap();
        return HackmasterFumbles.createMishapCard(mishap);
    }

    static HandleQuirkFlawCommand(args){
        let quirkFlaw = HackmasterCharacterBackground.getQuirkOrFlaw();
        return HackmasterCharacterBackground.createQuirkFlawCard(quirkFlaw);
    }
}