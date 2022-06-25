export class ArmorInfo{
    constructor(itemData) {
		this._itemData = game.actors.get(itemData.actor.id).items.get(itemData.id);
	}

    getFlag(flag){
        return this._itemData.getFlag("osric", flag);
    }

    setFlag(flag, value){
        return this._itemData.setFlag("osric", flag, value);
    }

    toggleFlag(flag){
        this.setFlag(flag, !this.getFlag(flag));
    }

    get id(){
        return this._itemData?.id;
    }

    get protectionData(){
        return this._itemData?.data?.data?.protection;
    }

    get armorDamageData(){
        return this.protectionData?.armorDamage;
    }

    get isShield(){
        return this.protectionData?.type === "shield";
    }

    get damageProgressionString(){
        return this.armorDamageData?.progression;
    }

    get baseAc(){
        return this.protectionData?.ac ?? 10;
    }

    get armorHpArray(){
        if (this.damageProgressionString){
            return this.damageProgressionString.split(',').map(s => Number(s));
        }
        return [];
    }

    get isEquipped(){
        const locationState = game.osric.library.const.location;
        return this._itemData?.data?.data?.location?.state == locationState.EQUIPPED;
    }

    get damageTaken(){
        return this.armorDamageData?.damageTaken ?? 0;
    }

    get hpRemaining(){
        return this.maxArmorHp - this.damageTaken;
    }

    get maxArmorHp(){
        return this.armorHpArray.reduce((a, b) => a + b, 0);
    }

    get name(){
        return this._itemData?.data?.name;
    }

    async repairArmor(amount){
        await this.damageArmor(-1 * amount);
    }

    async damageArmor(amount){
        let newDamage = Math.max(0, Math.min(this.maxArmorHp, this.damageTaken + amount));
        await this._itemData.update({"data.protection.armorDamage.damageTaken": newDamage})
    }
}