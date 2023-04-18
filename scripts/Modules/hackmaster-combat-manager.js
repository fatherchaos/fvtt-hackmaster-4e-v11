import { HackmasterActor } from '../Modules/hackmaster-actor.js';
import { HackmasterCrits } from '../Modules/hackmaster-crits.js';
import { HackmasterItem } from '../Modules/hackmaster-item.js';
import { Utilities } from '../utilities.js'

export class HackmasterCombatManager{

    static getAdditionalInitiativeModifiers(combatant){
        let hmActor = new HackmasterActor(combatant.actor);

        let modifiers = [];
        if (hmActor.isInDishonor()){
            modifiers.push({desc: 'dishonor', value: 1});
        }
        else if (hmActor.isInGreatHonor()){
            modifiers.push({desc: 'honor', value: -1});
        }
        return modifiers;
    }

    static async applyArmorSoak(dmgAdjustResult, sourceActor, targetToken, sourceItem, sourceAction, bDamage, dmgDone, ammo = null){
        if (!bDamage){
            return dmgAdjustResult;
        }
        
        let hasUnsoakableDamageTypes = Utilities.intersection(["pyschic", "poison"], dmgAdjustResult.types).length > 0;
        if (!hasUnsoakableDamageTypes && targetToken?.actor){
            let target = new HackmasterActor(targetToken.actor);
            let armors = target.getEquippedArmors();
            
            if (armors.length > 0){
                let armor = armors[0]; // TODO: What to do if there's more than one? Right now we're just grabbing the first.
                let soakPerDie = armor.soakPerDie;
                let numDiceDamage =  Utilities.sumArray(dmgDone.map(d => Utilities.countOriginalDiceInRoll(d.roll)));
                let amountToSoak = Math.min(dmgAdjustResult.total, armor.hpRemaining, numDiceDamage * soakPerDie);
                if (amountToSoak > 0){
                    dmgAdjustResult.absorbed += amountToSoak;
                    dmgAdjustResult.total -= amountToSoak;
                    let armorDamageAmount = amountToSoak;

                    // If it's bludgeoning, piercing, or slashing damage and the armor is magic, it should only be hurt by penetrations.
                    let hasOnlyStandardDamageTypes = dmgAdjustResult.types.every(t => ["bludgeoning", "slashing", "piercing"].includes(t));
                    if (armor.isMagic && hasOnlyStandardDamageTypes){
                        let numPenetrationsOnDice = Utilities.sumArray(dmgDone.map(d => Utilities.countNumPenetrationsInRoll(d.roll)));
                        armorDamageAmount = Math.min(numPenetrationsOnDice, numDiceDamage);
                    }
                    await armor.damageArmor(armorDamageAmount);
                    
                    let armorDamageCard = await HackmasterCombatManager.createArmorDamageCard(armor, amountToSoak, armorDamageAmount); 
                    Utilities.displayChatMessage(armorDamageCard);
                }
            }
            
        }
        return dmgAdjustResult;
    }

    static async createArmorDamageCard(armor, amountSoaked, amountDamaged){
        let card = Utilities.loadCachedTemplate("modules/hackmaster-4e/templates/armor-damage-card.hbs", {
            armorName: armor.aliasedName,
            hpRemaining: armor.hpRemaining,
            amountSoaked: amountSoaked,
            amountDamaged: amountDamaged
        });
        return card;
    }

    static async reRollInitiative(combatTracker) {
        let slowCombatants = [];
        combatTracker.combatants.forEach(combatant =>{
            if (combatant.initiative > 10){
                slowCombatants.push({combatant: combatant, oldInitiative: combatant.initiative})
            }          
        });
        await combatTracker.resetAll();
        await combatTracker.update({ turn: null });

        await Promise.all(
            slowCombatants.map(s => s.combatant.update({initiative: s.oldInitiative - 10}))
        );
    }

    static handleCritCheck(roll, dd, targetToken){
        if (!roll)
            return;
            
		let source = new HackmasterActor(dd.source);
		let target = new HackmasterActor(targetToken?.actor);
        let nTargetAc = target.getArmorClass(dd.ac);
        let nAttackBonus = roll.total - roll.dice[0].results[0].result;
        let damageSource = dd.item ? dd.item : dd.action;
        let aDamageTypes = [];
        let sCalledShotLocation = undefined; // TODO
        let damageType = damageSource?.system?.damage?.type;
        if (damageType){
            aDamageTypes.push(damageType);
        }        

		if (roll.criticaled){
			let crit = HackmasterCrits.generateRandomCrit(source, target, nTargetAc, nAttackBonus, aDamageTypes, sCalledShotLocation);
			let card = HackmasterCrits.createCritCard(crit);
			Utilities.displayChatMessage(card, source);
		}
	}

    static applyHonorToAttackRoll(dd, bonusFormula, additionalRollData){
		let hmActor = new HackmasterActor(dd.source);
		let isGreatHonor = hmActor.isInGreatHonor();
		let isDishonor = hmActor.isInDishonor();

		if (isGreatHonor || isDishonor){
			bonusFormula.push('@hon');
			additionalRollData.hon = isGreatHonor ? 1 : -1;
		}
	}

	static applyHonorToDamageRoll(dd){
		let hmActor = new HackmasterActor(dd.source);
		let isGreatHonor = hmActor.isInGreatHonor();
		let isDishonor = hmActor.isInDishonor();

		if (isGreatHonor || isDishonor){
			for(let i = 0; i < dd.data.dmgDone.length; i++){
				
				let numDiceRolled = dd.data.rolled.rolls[i].dice[0]?.results?.length ?? 0;
				let operatorSign = isGreatHonor ? '+' : '-';

				dd.data.rolled.formulas[i] += ` ${operatorSign} ${numDiceRolled}`;
				dd.data.rolled.rawformulas[i] += ` ${operatorSign} @hon`;
				dd.data.rolled.results[i] += ` ${operatorSign} ${numDiceRolled}`;

				if (isGreatHonor) {
					dd.data.dmgDone[i].dmg += numDiceRolled;
                    dd.data.rolled.totalValues += numDiceRolled;
				}
				else if (isDishonor) {
					dd.data.dmgDone[i].dmg -= numDiceRolled;
                    dd.data.rolled.totalValues -= numDiceRolled
				}
			}
		}
	}

    static async recordDamageForThresholdOfPain(targetToken, damageDone){
        if (targetToken && targetToken.actor && damageDone > 0){
            let actor = new HackmasterActor(targetToken.actor);
            await actor.recordDamageTaken(damageDone);
            if (actor.needsThresholdOfPainCheck){
                let card = await HackmasterCombatManager.createTopCheckCard(actor);
                Utilities.displayChatMessage(card, actor);
            }
        }
    }

    static async createTopCheckCard(actor){
        let card = Utilities.loadCachedTemplate("modules/hackmaster-4e/templates/top-check-card.hbs", {
            actorName: actor.name,
            thresholdOfPain: actor.thresholdOfPain,
            recentDamageTaken: actor.recentDamageTaken,
            actorId: actor.actorId,
            tokenId: actor.tokenId
        });
        return card;
    }

    static replaceDamageForCorrectSize(dd, targetToken){
        if (!targetToken?.actor){
            return;
        }

        if (dd.isWeapon && dd.item && dd?.data?.dmgFormulas){
            // for now we only handle melee weapons and thrown weapons. Ranged weapons are weird with ammo and I'm not sure how to deal with it yet.
            if( dd.item.type === 'weapon' && dd.item?.system?.attack?.type !== 'ranged'){
                let weapon = new HackmasterItem(dd.item);
                let target = new HackmasterActor(targetToken.actor);
                let correctDamage = weapon.getDamageForSizeCategory(target.sizeCategory);
                let weaponNormalDamage = weapon.getDamageForSizeCategory(3);
                let weaponLargeDamage = weapon.getDamageForSizeCategory(4);
                let damageToReplace = target.sizeCategory <= 3 ? weaponNormalDamage : weaponLargeDamage;
                dd.data.dmgFormulas[0].formula = dd.data.dmgFormulas[0].formula.replace(damageToReplace, correctDamage);
                dd.data.dmgFormulas[0].rawformula = dd.data.dmgFormulas[0].rawformula.replace(damageToReplace, correctDamage);
            }
        }
    }
}