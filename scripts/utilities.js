export class Utilities {
    static caseInsensitiveReplace(line, word, replaceWith) {
        var regex = new RegExp('(' + word + ')', 'gi');
        return line.replace(regex, replaceWith);
    }

    static loadCachedTemplate(path, context){
        return _templateCache[path](context || {}, {allowProtoMethodsByDefault: true, allowProtoPropertiesByDefault: true});
    }
}