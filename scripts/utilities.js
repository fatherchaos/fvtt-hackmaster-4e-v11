export class Utilities {
    static caseInsensitiveReplace(line, word, replaceWith) {
        var regex = new RegExp('(' + word + ')', 'gi');
        return line.replace(regex, replaceWith);
    }

    static loadCachedTemplate(path, context){
        return _templateCache[path](context || {}, {allowProtoMethodsByDefault: true, allowProtoPropertiesByDefault: true});
    }

    static displayChatMessage(content, actor, type){
        const sourceSpeaker = ChatMessage.getSpeaker({ actor: actor });
        let chatData = {
            content: content,
            user: game.user.id,
            speaker: sourceSpeaker,
            type: type ?? game.osric.const.CHAT_MESSAGE_TYPES.OTHER,
        };
        ChatMessage.create(chatData);
    }

    static getRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static rollPenetrateInBothDirection(nNumSides){
        let nValue = Utilities.getRandomNumber(1, nNumSides);
        if (nValue == nNumSides){
            nValue = nValue + (Utilities.rollPenetrateInBothDirection(nNumSides) - 1);
        }
        else if (nValue == 1){
            nValue = nValue - (Utilities.rollPenetrateInBothDirection(nNumSides) - 1);
        }
        return nValue;
    }

    static getDiceResult(numDice, dieFace){
        let total = 0;
        for(let i = 0; i < numDice; i++){
            Utilities.getRandomNumber(1, dieFace);
        }
        return total;
    }
}