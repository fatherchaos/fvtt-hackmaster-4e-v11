export class HackmasterSettings{

    static SettingsGroupName = 'hackmaster-4e';
    static InitiativeSetting = "tenSegmentInitiative"

    static initialize(){
        game.settings.register(HackmasterSettings.SettingsGroupName, HackmasterSettings.InitiativeSetting, {
            name: "10-Segment Initiative",
            scope: "world",
            config: true,
            type: Boolean,
            default: true,
            restricted: true
          });
    }

    static isUsingTenSegmentInit(){
        return game.settings.get(HackmasterSettings.SettingsGroupName, HackmasterSettings.InitiativeSetting);
    }
}