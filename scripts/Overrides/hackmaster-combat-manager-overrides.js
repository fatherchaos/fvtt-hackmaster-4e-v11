import { HackmasterActor } from '../Modules/hackmaster-actor.js';
import { libWrapper } from '../shim.js';

export class HackmasterCombatManagerOverrides {
    static initialize(){
        this.overrideRollBehavior();
	}

    static overrideRollBehavior(){
		libWrapper.register(CONFIG.Hackmaster.MODULE_ID, 'game.osric.combatManager.getRolledDamage', async function(wrapped, ...args) {
			await wrapped(...args);
			let dd = args[0];
			// const rolled = {
			// 	armorDamage: [],
			// 	rawformulas: [],
			// 	formulas: [],
			// 	results: [],
			// 	totals: [],
			// 	rolls: [],
			// 	totalValues: 0,
			// };
			// dmgDone.push({
			// 	dmg: rolledTotal,
			// 	type: damageType,
			// 	// roll: roll, sendHealthAdjustChatCard
			// 	roll: roll
			// });
			// dd.data.dmgDone = dmgDone;
			// dd.data.rolled = rolled;

			let hmActor = new HackmasterActor(dd.source);
			let isGreatHonor = hmActor.isInGreatHonor();
			let isDishonor = hmActor.isInDishonor();

			if (isGreatHonor || isDishonor){
				for(let i = 0; i < dd.data.dmgDone.length; i++){
					
					let numDiceRolled = dd.data.rolled.rolls[i].dice[0]?.results?.length ?? 0;
					let operatorSign = isGreatHonor ? '+' : '-';

					dd.data.rolled.formulas[i] += ` ${operatorSign} ${numDiceRolled}`;
					dd.data.rolled.rawformulas[i] += ` ${operatorSign} honor`;
					dd.data.rolled.results[i] += ` ${operatorSign} ${numDiceRolled}`;

					if (isGreatHonor) {
						dd.data.dmgDone[i].dmg += numDiceRolled;
					}
					else if (isDishonor) {
						dd.data.dmgDone[i].dmg -= numDiceRolled;
					}
				}
			}
			
		}, 'WRAPPER');
	}
}