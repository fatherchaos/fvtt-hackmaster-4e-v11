import { HackmasterCombatManager } from '../Modules/hackmaster-combat-manager.js';
import { libWrapper } from '../shim.js';

export class OsricCombatOverrides {
    static initialize(){
        OsricCombatOverrides.overrideDamageRoll();
		OsricCombatOverrides.overrideAttackRoll();
		OsricCombatOverrides.overrideApplyDamageAdjustments();
	}

	static overrideAttackRoll(){
		Hooks.on('addAttackRollBonuses', (dd, targetToken, bonusFormula, additionalRollData) =>{
			HackmasterCombatManager.applyHonorToAttackRoll(dd, bonusFormula, additionalRollData);
		});

		libWrapper.register(CONFIG.Hackmaster.MODULE_ID, 'game.osric.diceManager.osricAttackRoll', async function(wrapped, ...args) {
			let roll = await wrapped(...args);
			let dd = args[0];
			let targetToken = args[1];

			HackmasterCombatManager.handleCritCheck(roll, dd, targetToken);

		}, 'WRAPPER');
	}

    static overrideDamageRoll(){
		libWrapper.register(CONFIG.Hackmaster.MODULE_ID, 'game.osric.combatManager.getRolledDamage', async function(wrapped, ...args) {
			await wrapped(...args);
			HackmasterCombatManager.applyHonorToDamageRoll(args[0]);			
		}, 'WRAPPER');
	}

	static overrideApplyDamageAdjustments(){
		libWrapper.register(CONFIG.Hackmaster.MODULE_ID, 'game.osric.combatManager.applyDamageAdjustments', async function(wrapped, ...args) {
			let result = await wrapped(...args);
			return await HackmasterCombatManager.applyArmorSoak(result, ...args);			
		}, 'WRAPPER');
	}
}