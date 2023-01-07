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

    getArmorInfo(){
        if (this.isArmor || this.isShield){
            return new ArmorInfo(this._osricItem);
        }
        return null;
    }
}