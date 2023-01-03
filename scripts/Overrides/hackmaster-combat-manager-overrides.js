import { HackmasterActor } from '../Modules/hackmaster-actor.js';
import { libWrapper } from '../shim.js';
import { HackmasterCombatTrackerOverrides } from './hackmaster-combat-tracker-overrides.js';

export class HackmasterCombatManagerOverrides {
    static initialize(){
        HackmasterCombatManagerOverrides.overrideDamageRoll();
		HackmasterCombatManagerOverrides.overrideAttackRoll();
	}

	static overrideAttackRoll(){
		Hooks.on('addAttackRollBonuses', (dd, targetToken, bonusFormula, additionalRollData) =>{
			HackmasterCombatManagerOverrides.applyHonorToAttackRoll(dd, bonusFormula, additionalRollData);
		});
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

    static overrideDamageRoll(){
		libWrapper.register(CONFIG.Hackmaster.MODULE_ID, 'game.osric.combatManager.getRolledDamage', async function(wrapped, ...args) {
			await wrapped(...args);
			HackmasterCombatManagerOverrides.applyHonorToDamageRoll(args[0]);			
		}, 'WRAPPER');
	}
}