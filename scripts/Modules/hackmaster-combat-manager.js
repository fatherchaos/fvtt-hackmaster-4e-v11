import { HackmasterActor } from '../Modules/hackmaster-actor.js';
import { HackmasterCrits } from '../Modules/hackmaster-crits.js';
import { Utilities } from '../utilities.js'

export class HackmasterCombatManager{

    static async applyArmorSoak(dmgAdjustResult, sourceActor, targetToken, sourceItem, sourceAction, bDamage, dmgDone, ammo = null){
        // dmgAdjustResult =  ({ total: damageTotalDone, types: damageTypes, absorbed: absorbedTotal })
        // TODO: Check for soakable damage types
        if (targetToken?.actor){
            let target = new HackmasterActor(targetToken.actor);
            let armors = target.getEquippedArmors();
            // TODO: What to do if there's more than one? Right now we're just grabbing the first.
            if (armors.length > 0){
                let armor = armors[0];
                // TODO: allow more than one soak per die
                let numDiceDamage =  Utilities.sumArray(dmgDone.map(d => Utilities.countOriginalDiceInRoll(d.roll)));
                let amountToSoak = Math.min(dmgAdjustResult.total, armor.hpRemaining, numDiceDamage);
                if (amountToSoak > 0){
                    dmgAdjustResult.absorbed += amountToSoak;
                    dmgAdjustResult.total -= amountToSoak;
                    // TODO: Determine if armor should be damaged. Check if it's magical, if there was penetration, if it was magic damage
                    armor.damageArmor(amountToSoak);
                    // TODO: Report a chat card?
                }
            }
            
        }
        return dmgAdjustResult;
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
			bonusFormula.push('@honor');
			additionalRollData.honor = isGreatHonor ? 1 : -1;
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
				dd.data.rolled.rawformulas[i] += ` ${operatorSign} @honor`;
				dd.data.rolled.results[i] += ` ${operatorSign} ${numDiceRolled}`;

				if (isGreatHonor) {
					dd.data.dmgDone[i].dmg += numDiceRolled;
				}
				else if (isDishonor) {
					dd.data.dmgDone[i].dmg -= numDiceRolled;
				}
			}
		}
	}
}