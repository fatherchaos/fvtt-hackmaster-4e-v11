import { CritData } from '../../data/crit-data.js';
import { Hackmaster } from '../config.js';
import { Utilities } from '../utilities.js'
import { HackmasterActor } from './hackmaster-actor.js';

export class HackmasterCrits {
    
    static getRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static rollPenetrateInBothDirection(nNumSides){
        let nValue = this.getRandomNumber(1, nNumSides);
        if (nValue == nNumSides){
            nValue = nValue + (this.rollPenetrateInBothDirection(nNumSides) - 1);
        }
        else if (nValue == 1){
            nValue = nValue - (this.rollPenetrateInBothDirection(nNumSides) - 1);
        }
        return nValue;
    }

    static getDiceResult(numDice, dieFace){
        let total = 0;
        for(let i = 0; i < numDice; i++){
            this.getRandomNumber(1, dieFace);
        }
        return total;
    }

    static handleCritCheck(roll, dd, targetToken){
		let source = new HackmasterActor(dd.source);
		let target = targetToken?.actor ? new HackmasterActor(targetToken.actor) : null;
        let nTargetAc = target?.armorClass[dd.ac] ?? 10;
        let nAttackBonus = roll.total - roll.dice[0].results[0].result;
        let damageSource = dd.item ? dd.item : dd.action;
        let aDamageTypes = [];
        let damageType = damageSource?.system?.damage?.type;
        if (damageType){
            aDamageTypes.push(damageType);
        }        

		if (roll.criticaled || true){
			let crit = HackmasterCrits.generateRandomCrit(source, target, nTargetAc, nAttackBonus, aDamageTypes);
			let card = HackmasterCrits.createCritCard(crit);
			Utilities.displayChatMessage(card, source);
		}
	}

    static generateRandomCrit(rSource, rTarget, nTargetAc, nAttackBonus, aDamageTypes, sCalledShotLocation,){
        aDamageTypes = aDamageTypes ?? ['s']; // TODO: get real damage type
        let severity = this.getCritSeverity(nAttackBonus, nTargetAc, rSource, rTarget);
        let hitLocation = this.getRandomHitLocation(rSource, rTarget, sCalledShotLocation);
        return this.getCritResult(severity, hitLocation, aDamageTypes, rSource, rTarget);
    }

    static getCritSeverity(nAttackBonus, nTargetAc, rSource, rTarget){
        let nAttackerThaco = rSource.thac0;
        let nBaseSeverity = this.calculateBaseSeverity(nAttackerThaco, nTargetAc, nAttackBonus);
        let nSeverityDieRoll = this.rollPenetrateInBothDirection(8);
        let nFinalSeverity = Math.min(24, nBaseSeverity + nSeverityDieRoll);
        return nFinalSeverityd;
    }

    static forceCrit(sType, nSeverity, nLocation){
        let rHitLocation = this.getHitLocationFromNumber(nLocation);
        let rCrit = this.getCritResult(nSeverity, rHitLocation, [sType]);
        return rCrit;
    }

    static getCritResult(nSeverity, rHitLocation, aDamageTypes, rSource, rTarget){
        let rCrit = {};

        let aResults = [];
        // let sResult = "[Severity: " + nSeverity + "]";
        // sResult += "[Location (d10000=" + rHitLocation.roll + "): " + rHitLocation.desc + "(" + rHitLocation.side + ")]";
        if (nSeverity <= 0) {
            aResults.push("No extra effect.");
        }
        else{ 
            let bHasScar = this.getRandomNumber(1, 100) <= 5 * nSeverity;
            let bPermanentDamage = nSeverity >= 13;
            // if (bHasScar){
            //     sResult += "<br/>[Will Scar?: Yes]";
            // }
            // else{
            //     sResult += "<br/>[Will Scar?: No]";
            // }
            // if (bPermanentDamage){
            //     sResult += "<br/>[Permanent Penalties: Will not heal normally. 50% of ability reductions, movement penalties, etc. will remain permanently if left to heal naturally. If cured by magic, 25% will remain permanently. A Cure Critical Wounds spell can cure one critical injury per application if the wound has not been healed by another method and one week has not transpired. See other Cleric spells for other healing possibilities.]"
            // }
            let nBruiseDays = this.getRandomNumber(1, 20);
            aResults.push("Bruised: (" + nBruiseDays + " - Constitution) days. If injured in same location again before healed, suffer +1 damage per injury."); 
            if (nSeverity > 5){
                aResults.push("Unable to follow-through damage until wound healed.");
            }
            if (nSeverity > 10) {
                aResults.push("Unable to crit until wound healed");
            }
            if (nSeverity > 15){
                aResults.push("Unable to penetrate damage until wound healed");
            }
            
            console.log("generating crit", rHitLocation.desc, nSeverity, aDamageTypes);
            let rCritEffect = this.getCritEffects(rHitLocation.desc, nSeverity, aDamageTypes);		

            aResults = aResults.concat(this.decodeCritEffect(rCritEffect, rHitLocation.desc, nSeverity, rTarget));

            rCrit.sDamageType = rCritEffect.sDamageType;
            if (rCritEffect.dm){
                rCrit.dmgMultiplier = rCritEffect.dm;
            }
            
            if (rCritEffect.db){
                rCrit.dmgBonusDie = rCritEffect.db;
            }

            rCrit.bHasScar = bHasScar;
            rCrit.bPermanentDamage = bPermanentDamage;
            rCrit.nBruiseDays = nBruiseDays;
            rCrit.rCritEffect = rCritEffect;
        }
        
        rCrit.sHitLocation = rHitLocation.desc;
        rCrit.nSeverity = nSeverity;
        rCrit.aResults = aResults;

        return rCrit;
    }

    static getCritEffects(sLocation, nSeverity, aDamageTypes){
        let sCritType = this.getCritType(aDamageTypes);
        let rCritEffect;
        if (sCritType == "p"){
            rCritEffect = this.getPuncturingCrit(sLocation, nSeverity);
            rCritEffect.sDamageType = "piercing";
        }
        else if (sCritType == "b"){
            rCritEffect = this.getCrushingCrit(sLocation, nSeverity);
            rCritEffect.sDamageType = "bludgeoning";
        }
        else {
            rCritEffect = this.getHackingCrit(sLocation, nSeverity);
            rCritEffect.sDamageType = "slashing";
        }
        return rCritEffect;
    }

    static getCritDamageTypes(aDamageTypes){
        let aCritDamageTypes = ["bludgeoning", "piercing", "slashing", "hacking", "b", "p", "s", "h"];
        return aCritDamageTypes.filter(v => aDamageTypes.includes(v));
    }

    static selectRandomCritDamageType(aDamageTypes)
    {
        let aCritDamageTypes = this.getCritDamageTypes(aDamageTypes);
        if (!aCritDamageTypes || aCritDamageTypes.length == 0){
            return nil;
        }
        return aCritDamageTypes[this.getRandomNumber(1, aCritDamageTypes.length) - 1];
    }

    static getCritType(aDamageTypes){
        let sCritType = this.selectRandomCritDamageType(aDamageTypes); 
        if (!sCritType || sCritType === ""){
            sCritType = "s"; // couldn't parse anything, so call it hacking.
        }
        else
        {
            let sFirstChar = sCritType.slice(0);
            if (sFirstChar == "s" || sFirstChar == "h"){
                sCritType = "s";
            }
            else if (sFirstChar == "b" || sFirstChar == "c"){
                sCritType = "b";
            }
            else if (sFirstChar == "p"){
                sCritType = "p";
            }
            else {
                sCritType = "s"; // couldn't parse anything, so call it hacking.
            }
        }
        return sCritType;
    }

    static calculateBaseSeverity(nAttackerThaco, nTargetAc, nAttackBonus){
        let nToHitAc15 = nAttackerThaco - 15;
        return nTargetAc - nToHitAc15 + nAttackBonus;
    }

    static getPuncturingCrit(sLocation, nSeverity){
        return CritData.PiercingCritMatrix[sLocation][nSeverity];
    }

    static getCrushingCrit(sLocation, nSeverity){
        return CritData.CrushingCritMatrix[sLocation][nSeverity];
    }

    static getHackingCrit(sLocation, nSeverity){
        return CritData.HackingCritMatrix[sLocation][nSeverity];
    }

    static getRandomHitLocation(rSource, rTarget, sCalledShotLocation){
        // if (sCalledShotLocation){
        //     let rHitRange = DataCommonPO.aHackmasterCalledShotsRanges[sCalledShotLocation];
        //     if (rHitRange){
        //         nHitLocationRoll = math.random(rHitRange.low, rHitRange.high);
        //     }
        // }
        // if nHitLocationRoll then	
        let nLocationDieType = 10000;
        let nLocationHitModifier = 0;
        let nSizeDifference = 0;
        // let nSizeDifference = getSizeDifference(ActorManagerPO.getNode(rSource), ActorManagerPO.getNode(rTarget));
        if (nSizeDifference > 0){
            nLocationHitModifier = (1000 * nSizeDifference);
        }
        else if (nSizeDifference < 0){
            nLocationDieType = nLocationDieType - (1000 * nSizeDifference);
        }

        let nHitLocationRoll = this.getRandomNumber(1, nLocationDieType) + nLocationHitModifier;
        return this.getHitLocationFromNumber(nHitLocationRoll);
    }

    static getHitLocationFromNumber(nHitLocationRoll){
	    let rHitLocation = {}
	    let bIsRightSide = nHitLocationRoll % 2 == 0
	    let sLocation = ""
		
        if (nHitLocationRoll < 101) sLocation = "Foot, top"
        else if (nHitLocationRoll < 105) sLocation = "Heel"
        else if (nHitLocationRoll < 137) sLocation = "Toe(s)"
        else if (nHitLocationRoll < 141) sLocation = "Foot, arch"
        else if (nHitLocationRoll < 171) sLocation = "Ankle, inner"
        else if (nHitLocationRoll < 201) sLocation = "Ankle, outer"
        else if (nHitLocationRoll < 221) sLocation = "Ankle, upper/Achilles"
        else if (nHitLocationRoll < 965) sLocation = "Shin"
        else if (nHitLocationRoll < 1007) sLocation = "Calf"
        else if (nHitLocationRoll < 1119) sLocation = "Knee"
        else if (nHitLocationRoll < 1133) sLocation = "Knee, back"
        else if (nHitLocationRoll < 1217) sLocation = "Hamstring"
        else if (nHitLocationRoll < 2001) sLocation = "Thigh"
        else if (nHitLocationRoll < 2331) sLocation = "Hip"
        else if (nHitLocationRoll < 2406) sLocation = "Groin"
        else if (nHitLocationRoll < 2436) sLocation = "Buttock"
        else if (nHitLocationRoll < 2571) sLocation = "Abdomen, Lower"
        else if (nHitLocationRoll < 3021) sLocation = "Side, lower"
        else if (nHitLocationRoll < 3111) sLocation = "Abdomen, upper"
        else if (nHitLocationRoll < 3126) sLocation = "Back, small of"
        else if (nHitLocationRoll < 3156) sLocation = "Back, lower"
        else if (nHitLocationRoll < 3426) sLocation = "Chest"
        else if (nHitLocationRoll < 3456) sLocation = "Side, upper"
        else if (nHitLocationRoll < 3486) sLocation = "Back, upper"
        else if (nHitLocationRoll < 3501) sLocation = "Back, upper middle"
        else if (nHitLocationRoll < 3821) sLocation = "Armpit"
        else if (nHitLocationRoll < 4301) sLocation = "Arm, upper outer"
        else if (nHitLocationRoll < 4493) sLocation = "Arm, upper inner"
        else if (nHitLocationRoll < 4589) sLocation = "Elbow"
        else if (nHitLocationRoll < 4685) sLocation = "Inner joint"
        else if (nHitLocationRoll < 5309) sLocation = "Forearm, back"
        else if (nHitLocationRoll < 5837) sLocation = "Forearm, inner"
        else if (nHitLocationRoll < 5909) sLocation = "Wrist, back"
        else if (nHitLocationRoll < 5981) sLocation = "Wrist, front"
        else if (nHitLocationRoll < 6053) sLocation = "Hand, back"
        else if (nHitLocationRoll < 6077) sLocation = "Palm"
        else if (nHitLocationRoll < 6221) sLocation = "Finger(s)"
        else if (nHitLocationRoll < 7181) sLocation = "Shoulder, side"
        else if (nHitLocationRoll < 9101) sLocation = "Shoulder, top"
        else if (nHitLocationRoll < 9122) sLocation = "Neck, front"
        else if (nHitLocationRoll < 9143) sLocation = "Neck, back" 
        else if (nHitLocationRoll < 9374) sLocation = "Neck, side" 
        else if (nHitLocationRoll < 9654) sLocation = "Head, side" 
        else if (nHitLocationRoll < 9689) sLocation = "Head, back lower"
        else if (nHitLocationRoll < 9769) sLocation = "Face, lower side"
        else if (nHitLocationRoll < 9789) sLocation = "Face, lower center"
        else if (nHitLocationRoll < 9824) sLocation = "Head, back upper"
        else if (nHitLocationRoll < 9904) sLocation = "Face, upper side"
        else if (nHitLocationRoll < 9924) sLocation = "Face, upper center"
        else sLocation = "Head, top"

        let sSide = bIsRightSide ? "right" : "left";	
        rHitLocation.desc = sLocation
        rHitLocation.side = sSide
        rHitLocation.roll = nHitLocationRoll
        return rHitLocation
    }

    static decodeCritEffect(rCritEffect, sLocation, nSeverity, rTarget){
        let rLocation = this.getLocation(sLocation);
        let aEffects = [];
        
        if (rCritEffect.db){
            this.decodeDamageBonus(aEffects, rCritEffect.db, rLocation, rTarget);
        }
        if (rCritEffect.dm){
            this.decodeDamageMultiplier(aEffects, rCritEffect.dm, rLocation, rTarget);
        }
        if (rCritEffect.m){
            this.decodeMovement(aEffects, rCritEffect.m);
        }
        if (rCritEffect.f){
            this.decodeFall(aEffects);
        }
        if (rCritEffect.a){
            this.decodeToHitReduction(aEffects, rCritEffect.a);
        }
        if (rCritEffect.s){
            this.decodeStrengthReduction(aEffects, rCritEffect.s);
        }
        if (rCritEffect.d){
            this.decodeStrengthReduction(aEffects, rCritEffect.d);
        }
        if (rCritEffect.w){
            this.decodeWeaponDrop(aEffects, false);
        }
        if (rCritEffect.ws){
            this.decodeWeaponDrop(aEffects, true);
        }
        if (rCritEffect.mc){
            this.decodeMinorConcussion(aEffects, nSeverity);
        }
        if (rCritEffect.sc){
            this.decodeSevereConcussion(aEffects, nSeverity);
        }
        if (rCritEffect.p){
            this.decodeParalyzation(aEffects, nSeverity, rLocation);
        }
        if (rCritEffect.pb){
            this.decodeProfuseBleeding(aEffects, rTarget);
        }
        if (rCritEffect.v){
            this.decodeVitalOrgan(aEffects, rCritEffect.v, nSeverity, rLocation, rTarget);
        }
        if (rCritEffect.h){
            this.decodeTemporalHonorLoss(aEffects, rCritEffect.h);
        }
        if (rCritEffect.mt){
            this.decodeMuscleTear(aEffects, rCritEffect.mt, nSeverity, rLocation, rTarget);
        }
        if (rCritEffect.b){
            this.decodeBrokenBone(aEffects, 0, rCritEffect.b, nSeverity, rLocation, rTarget);
        }
        if (rCritEffect.tl){
            this.decodeTornLigaments(aEffects, rCritEffect.tl, nSeverity, rLocation, rTarget);
        }
        if (rCritEffect.bf){
            this.decodeBrokenBone(aEffects, 1, rCritEffect.bf, nSeverity, rLocation, rTarget);  
        }
        if (rCritEffect.bm){
            this.decodeBrokenBone(aEffects, 2, rCritEffect.bm, nSeverity, rLocation, rTarget);
        }
        if (rCritEffect.bs){
            this.decodeBrokenBone(aEffects, 3, rCritEffect.bs, nSeverity, rLocation, rTarget);  
        }
        if (rCritEffect.ib){
            this.decodeInternalBleeding(aEffects);
        }
        if (rCritEffect.u){
            this.decodeUnconscious(aEffects);
        }
        if (rCritEffect.ls){
            decodeLimbSevered(aEffects, rLocation, rTarget);
        }
        if (rCritEffect.dead){
            this.decodeDead(aEffects, rCritEffect.dead);
        }
        
        return aEffects;
    }

    static decodeDead(aEffects, sDeath){
        aEffects.push("Death! (" + sDeath + ")");
    }

    static decodeFall(aEffects){
        aEffects.push("Falls to the ground prone and drops anything held");
    }

    static decodeToHitReduction(aEffects, nValue){
        aEffects.push("Receives a -" + nValue + " penalty to hit until wound completely healed");
    }

    static decodeStrengthReduction(aEffects, nValue){
        aEffects.push("Loses " + nValue + " points of Strength until wound completely healed");
    }

    static decodeDexterityReduction(aEffects, nValue){
        aEffects.push("Loses " + nValue + " points of Dexterity until wound completely healed");
    }

    static decodeWeaponDrop(aEffects, bStrengthCheck){
        let sMsg =  "Drops any weapon and/or items carried";
        if (bStrengthCheck){
            sMsg += " unless a Strength check at half is passed";
        }
        aEffects.push(sMsg);
    }

    static decodeMinorConcussion(aEffects, nSeverity){
        let nDuration = this.getRandomNumber(1, 12) + nSeverity;
        
        let sFlaws = "the migraine flaw (PHB 94)";
        if (this.getRandomNumber(1, 100) <= 3 * nSeverity){
            sFlaws += " and the seizure disorder character flaw (PHB 94)"
        }
        aEffects.push("Gains " + sFlaws + " with an immediate headache. Lasts " + nDuration + " hours or until healed.");
    }

    static decodeSevereConcussion(aEffects, nSeverity){
        let sFlaws = "the migraine flaw (PHB 94)";
        if (this.getRandomNumber(1, 100) <= 5 * nSeverity){
            sFlaws += " and the seizure disorder character flaw (PHB 94)"
        }
        aEffects.push("Gains " + sFlaws + " with an immediate headache. Lasts until healed.");
    }

    static getLocation(sLocation){
        let rLocation = CritData.CritLocations[sLocation];
        return rLocation ?? {};
    }

    static getMuscle(rLocation, nIndex){
        let sMuscle = rLocation.muscular[nIndex];
        return sMuscle ?? "Unknown";
    }

    static getBone(rLocation, nIndex){
        let sBone = rLocation.skeletal[nIndex];
        return sBone ?? "Unknown";
    }

    static getOrgan(rLocation, nIndex){
        let sOrgan = rLocation.vital[nIndex];
        return sOrgan ?? "Unknown";
    }

    static decodeParalyzation(aEffects, nSeverity, rLocation){
        let sCannotMove = "lower body";
        if (rLocation.isHead || rLocation.isSpine){
            sCannotMove = "anything but their head";
        }
        let sMsg = "";
        if (this.getRandomNumber(1, 100) <= nSeverity * 5){
            sMsg = "Paralyzed. Cannot move " + sCannotMove;
        }
        else {
            sMsg = "Avoided paralyzation.";
        }
            
        aEffects.push(sMsg);
    }

    static decodeProfuseBleeding(aEffects, rTarget){
        aEffects.push(this.createProfuseBleedingMessage(rTarget));
    }

    static createProfuseBleedingMessage(){
        return "Profuse bleeding! Will bleed to death in Con/2 rounds unless the wound has been treated by a successful first aid-related skill check or any cure spell that heals half the wound's HPs in damage, or one Cure Critical Wounds or better spell. Severed limbs may be cauterized by applying open flame for one round (1d4 damage)";
    }

    static decodeVitalOrgan(aEffects, nIndex, nSeverity, rLocation, rTarget){
        let sVitalOrganDamage, bWasHit = this.rollVitalOrganDamage(rLocation, nIndex);
        aEffects.push(sVitalOrganDamage);
        if (bWasHit){
            this.decodeWeaponDrop(aEffects);
            this.decodeInternalBleeding(aEffects);
            if (this.getRandomNumber(1, 100) <= 3 * nSeverity){
                this.decodeProfuseBleeding(aEffects, rTarget);
            }
            if (rLocation.isHead || rLocation.isSpine){
                this.decodeParalyzation(aEffects, nSeverity, rLocation);
            }
        }
    }

    static decodeTemporalHonorLoss(aEffects, nValue){
	    let nLoss = nValue * 5;
	    aEffects.push("Lose " + nLoss + "% of his temporal honor. Only affects males.");
    }

    static decodeMuscleTear(aEffects, nIndex, nSeverity, rLocation, rTarget){
        aEffects.push("Muscle Tear (" + this.getMuscle(rLocation, nIndex) + ")! These wounds heal naturally at half normal rate. Any Dexterity and Strength reductions from this crit last for 20 - Con days, are reduced by half for like periods until reduce to zero. This lasting effect occurs regardless of whether the wounds have been healed fully by spells. A Cure Critical Wounds spell or better will eliminate all ill effects instantly.");
        if (rLocation.isArm) {
            this.decodeWeaponDrop(aEffects, true);
        }
        if (this.getRandomNumber(1, 100) <= 3 * nSeverity){
            this.decodeProfuseBleeding(aEffects, rTarget);
        }
    }

    // nFracture = 0 normal broken, 1 = compound fracture, 2 = multiple fracture, 3 = bone shatter
    static decodeBrokenBone(aEffects, nFracture, nIndex, nSeverity, rLocation, rTarget){
        let sBone = this.getBone(rLocation, nIndex);

        let sHealRate = "onetenth";
        let sEffectName = "Broken bone (" + sBone + ")!"
        let nExtraEffectChance = 15;
        if (nFracture && nFracture == 1){
            sEffectName = "Broken bone (" + sBone + ") with compound fracture!";
            nExtraEffectChance = 30;
        }
        else if (nFracture && nFracture == 2){
            sEffectName = "Broken bone (" + sBone + ") with multiple fractures!";
            nExtraEffectChance = 50;
            sHealRate = "one twelfth";
        }
        else if (nFracture && nFracture == 3){
            sEffectName = "Bone (" + sBone + ") shattered!";
            nExtraEffectChance = 65;
            sHealRate = "one twentieth";
        }
	
	    aEffects.push("Can be cured by magical means or through healing at " + sHealRate + "  the normal rate. Successfully setting a broken bone using first aid-related skills allows healing at one quarter the normal rate. Unless set properly prior to healing, even magical healing, fractures will heal incorrectly giving rise to lasting limps, obvious lumps, etc. In this case, half of any associated movement and/or ability score penalties will be permanent. A Cure Critical Wounds spell or better will eliminate all ill effects instantly.");
	    if (rLocation.isSpine){
		    this.decodeParalyzation(aEffects, nSeverity, rLocation);
        }
	
	    if (rLocation.isArm){
    		this.decodeWeaponDrop(aEffects, true);
        }

	    if (rLocation.isTorso){
            if (this.getRandomNumber(1, 100) <= nExtraEffectChance){
                this.decodeProfuseBleeding(aEffects, rTarget);
            }
            
            if (this.getRandomNumber(1, 100) <= nExtraEffectChance){
                this.decodeInternalBleeding(aEffects);
            }
        }
    }

    static decodeTornLigaments(aEffects, nIndex, nSeverity, rLocation, rTarget){
	
        aEffects.push("Torn ligament or t}on (" + getMuscle(rLocation, nIndex) + ")! Unless the appropriate body part is isolated prior to healing, even magical healing, will heal incorrectly or incompletely, giving rise to lasting limps, obvious lumps, etc. In this case, half of any associated movement and/or ability score penalties will become permanent. A Cure Critical Wounds spell or better will eliminate all ill effects instantly.");
        
        if (rLocation.isArm){
            this.decodeWeaponDrop(aEffects);
        }
        else {
            this.decodeWeaponDrop(aEffects, true);
        }
        
        if (rLocation.isLeg){
            this.decodeParalyzation(aEffects, nSeverity, rLocation);
        }
        
        if (this.getRandomNumber(1, 100) <= 30){
            this.decodeProfuseBleeding(aEffects, rTarget);
        }
    }

    static decodeInternalBleeding(aEffects){
	    aEffects.push("Internal bleeding! Each hour lose 1d4 hit points and make a Constitution check, with failure indicating that the character goes into shock (see Trauma Damage). May live for many hours or days with this problem and not know it; will feel pains in the area, but will otherwise not know that he has been injured");
    }

    static decodeUnconscious(aEffects){
	    aEffects.push("Falls to the ground unconscious. Remains in a coma until the hit points suffered from this wound are healed (naturally or magically)");
    }

    static decodeLimbSevered(aEffects, rLocation, rTarget){
	    aEffects.push("Limb severed! The stump can be cured by magical means or through natural healing at one third the normal rate. Regeneration, Reattach Limb, or the like needed to recover the limb.");
	
        if (!rLocation.isDigit){
            this.decodeProfuseBleeding(aEffects, rTarget);
        }
    }

    static rollVitalOrganDamage(rLocation, nIndex, nRollValue){
        if (!nRollValue){
            nRollValue = this.getRandomNumber(1, 100);
        } 
        
        let sStatLost = "Constitution";
        if (rLocation.isHead || rLocation.isSpine){
            if (this.getRandomNumber(1, 100) <= 80){
                sStatLost = "Intelligence";
            }
            else{
                sStatLost = "Dexterity";
            }
        }
        let bWasHit = true;
        let sMsg = "";
        if (nRollValue < 26) { 
            sMsg = "Vital organ missed!"; bWasHit = false;
        }
        else if (nRollValue < 51) {
            sMsg = "Vital organ (" + this.getOrgan(rLocation, nIndex) + ")! Lose " + this.getDiceResult(2, 6) + " points of " + sStatLost + ". 1 point returns per day for the next " + this.getRandomNumber(1, 6) + " day(s). Unreturned points are lost permanently.";
        }
        else if (nRollValue < 71) {
            sMsg = "Vital organ (" + this.getOrgan(rLocation, nIndex) + ")! Death in " + this.getRandomNumber(1, 12) + " days";
        }
        else if (nRollValue < 81) {
            sMsg = "Vital organ (" + this.getOrgan(rLocation, nIndex) + ")! Death in " + this.getRandomNumber(1, 12) + " hours";
        }
        else if (nRollValue < 91) {
             sMsg = "Vital organ (" + this.getOrgan(rLocation, nIndex) + ")! Death in " + this.getRandomNumber(1, 12) + " rounds";
        }
        else {
            sMsg = "Vital organ(" + this.getOrgan(rLocation, nIndex) + ")! Death in " + this.getRandomNumber(1, 12) + " segments";
        }
        return sMsg, bWasHit;
    }

    static decodeMovement(aEffects, nValue){
        let sMsg = "";
        if (nValue == 1){
             sMsg = "Lose 50% move for 1 rd,) 10% for " + this.getDiceResult(2, 4) + " rds";
        }
        else if (nValue == 2) {
            sMsg =  "Lose 50% move for 2 rds,) 25% for " + this.getDiceResult(2, 10) + " rds";
        }
        else if (nValue == 3) {
            sMsg =  "Lose 50% move for 1 rd, 10% for " + this.getDiceResult(2, 4) + " rds,) 25% for " + this.getDiceResult(1, 4) + " turns";
        }
        else if (nValue == 4) {
            sMsg =  "Lose 50% move for " + this.getDiceResult(1, 12) + " hours";
        }
        else if (nValue == 5) {
            sMsg =  "Lose 50% move for " + this.getDiceResult(1, 12) + " hours,) 25% for " + this.getDiceResult(1, 12) + " days";
        }
        else if (nValue == 6) {
            sMsg =  "Lose 75% move for 6 hours,) 50% for " + this.getDiceResult(2, 12) + " days";
        }
        else if (nValue == 7) {
            sMsg =  "Lose 75% move for 6 hours,) 50% for " + this.getDiceResult(4, 12) + " days";
        }
        else if (nValue == 8) {
            sMsg =  "Lose 75% move for 6 hours,) 50% for " + this.getDiceResult(1, 3) + " months";
        }
        else if (nValue == 9) {
            sMsg =  "Lose 75% move for 1 day,) 50% for " + this.getDiceResult(1, 4) + " months";
        }
        else {
            sMsg =  "Lose 75% move for 1 week,) 50% for " + this.getDiceResult(1, 6) + " months";
        }
        
        aEffects.push(sMsg);
    }

    static decodeMaxDamageBonus(rLocation, rTarget){
        if (rLocation.dam == 1.0){	
            return ""; // No point in saying the bonus damage can't exceed 100% of their hp.
        }
        else {
            //let nMaxHp = 20; // TODO: ActorManagerPO.getMaxHp(rTarget);
            //let nAffectedHp = Math.floor(nMaxHp * rLocation.dam);

            if (rLocation.isDigit){
                return "If bonus damage exceeds " + rLocation.dam * 100 + "% of health, affected body part is severed or destroyed.";
            }
            else {
                // TODO: Once we calculate if it was severed, this could cause profuse bleeding
                return "If bonus damage exceeds " + rLocation.dam * 100 + "% of health, affected body part is severed or destroyed. If severed, will cause " + this.createProfuseBleedingMessage(rTarget);
            }
        }
    }

    static decodeDamageBonus(aEffects, nDieType, rLocation, rTarget){
        aEffects.push(this.decodeMaxDamageBonus(rLocation, rTarget));
    }

    static decodeDamageMultiplier(aEffects, nMultiplier, rLocation, rTarget){
    	aEffects.push(this.decodeMaxDamageBonus(rLocation, rTarget));
    }

    static createCritCard(crit){
        _templateCache["modules/hackmaster-4e/templates/crit-chat-card.hbs"]
        let card = Utilities.loadCachedTemplate("modules/hackmaster-4e/templates/crit-chat-card.hbs", {
            severity: crit.nSeverity,
            hitLocation: crit.sHitLocation,
            effects: crit.aResults.filter(e => e),
            hasScar: crit.bHasScar ? "Yes" : "No",
            isPermanent: crit.bPermanentDamage ? "Yes" : "No",
            damageBonus: crit.dmgMultiplier !== undefined ? `x${crit.dmgMultiplier}` : crit.dmgBonusDie !== undefined ? `+d${crit.dmgBonusDie}` : ''
        });
        return card;
    }
}