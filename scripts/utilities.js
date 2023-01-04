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
}