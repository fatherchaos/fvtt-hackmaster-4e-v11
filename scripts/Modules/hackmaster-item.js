import { ArmorInfo } from "./armor-info.js";

export class HackmasterItem{

    constructor(osricItem){
        this._osricItem = osricItem;
    }

    get type(){
        return this._osricItem?.type;
    }

    get isArmor(){
        return this.type == "armor" && this.protectionType == "armor";
    }

    get protectionType(){
        return this._osricItem?.system?.protection?.type;
    }

    get isShield(){
        return this.type == "armor" && this.protectionType == "shield";
    }

    get isEquipped(){
        return this._osricItem?.system?.location?.state == game.osric.library.const.location.EQUIPPED;        
    }

    get isMagic() {
        return this._osricItem?.isMagic ?? false;
    }

    getArmorInfo(){
        if (this.isArmor || this.isShield){
            return new ArmorInfo(this._osricItem);
        }
        return null;
    }

    get rawDamageData(){
        return this._osricItem?.system?.damage ?? {};
    }

    getDamageForSizeCategory(sizeCategory){
        let damages = this.getDamageForSizes();
        switch(sizeCategory){
            case 1:
                return damages.tiny;
            case 2:
                return damages.small;
            case 4:
                return damages.large;
            case 5:
                return damages.huge;
            case 6:
                return damages.gargantuan;
            case 3:
            default: 
                return damages.medium;
        }
    }

    getDamageForSizes(){
        let tiny = this.rawDamageData?.tiny;
        let small = this.rawDamageData?.small;
        let medium = this.rawDamageData?.normal;
        let large = this.rawDamageData?.large;
        let huge = this.rawDamageData?.huge;
        let gargantuan = this.rawDamageData?.gargantuan;

        gargantuan ||= huge || large || medium || small || tiny;
        huge ||= large || medium || small || tiny || gargantuan;
        large ||= medium || small || tiny || huge || gargantuan;
        medium ||= small || tiny || large || huge || gargantuan;
        small ||= tiny || medium || large || huge || gargantuan;
        tiny ||= small || medium || large || huge || gargantuan;

        return {
            tiny: tiny,
            small: small,
            medium: medium,
            large: large,
            huge: huge,
            gargantuan: gargantuan
        };
    }
}