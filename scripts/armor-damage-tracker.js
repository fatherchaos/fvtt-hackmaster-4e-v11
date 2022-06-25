export class ArmorDamageTracker{

    static async buildArmorReport(itemData){
        return await renderTemplate("modules/hackmaster-4e/templates/armor-damage.hbs", this.getArmorDamageTemplateData(itemData));
    }

    static getArmorDamageTemplateData(itemData){
        let armorData = itemData.data.data;
        if (!armorData || !armorData?.protection?.armorDamage?.progression){
            return null;
        }
        const locationState = game.osric.library.const.location;
        let isShield = itemData.data.data.protection.type === "shield";
        let armorHp = armorData.protection.armorDamage.progression.split(',').map(s => Number(s));
        let totalAcLevels = armorHp.length;
        let damageToDistribute = armorData.protection.armorDamage.damageTaken;
        let result = {
            armorLevels: [], 
            name: itemData.data.name,
            isEquipped: itemData.data.data.location.state === locationState.EQUIPPED
        };
        for (let i = 0; i < totalAcLevels; i++){
            let hpForLevel = armorHp[i];
            let acBonus = totalAcLevels - i;
            let damageForLevel = Math.min(damageToDistribute, hpForLevel);
            damageToDistribute = damageToDistribute - damageForLevel;
            let remainingForLevel = hpForLevel - damageForLevel;
            let acBonusString = isShield ? `AC +${acBonus}: ` : `AC ${10 - acBonus}: `;
            result.armorLevels.push({acBonus: acBonusString, hpBoxes: this.buildArmorBoxes(damageForLevel, remainingForLevel) });
        }
        return result;
    }

    static buildArmorBoxes(damage, remaining){
        let damageString = damage ? "⯀".repeat(damage) : "";
        let remainingString = remaining ? "❒".repeat(remaining) : "";
        let combined = damageString + remainingString;
        let chunks = [];
        for (let i = 0; i < combined.length; i+=5){
            chunks.push(combined.slice(i, i+5));
        }
        
        return chunks.join(' ');
    }
}