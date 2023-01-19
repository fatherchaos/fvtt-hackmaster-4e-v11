import { HackmasterCombatManager } from '../Modules/hackmaster-combat-manager.js';
import { libWrapper } from '../shim.js';

export class OsricCombatOverrides {
    static initialize(){
        OsricCombatOverrides.overrideDamageRoll();
		OsricCombatOverrides.overrideAttackRoll();
		OsricCombatOverrides.overrideApplyDamageAdjustments();
		OsricCombatOverrides.overrideSendHealthAdjustChatCard();
		OsricCombatOverrides.overrideGetDamageFormulas();
	}

	static overrideGetDamageFormulas(){
		// libWrapper.register(CONFIG.Hackmaster.MODULE_ID, 'game.osric.combatManager.getDamageFormulas', async function(wrapped, ...args) {
		// 	let returnData = await wrapped(...args);
		// 	return HackmasterCombatManager.addExtraDamageSizeFormulas(returnData, ...args);
		// }, 'WRAPPER');

		libWrapper.register(CONFIG.Hackmaster.MODULE_ID, 'game.osric.diceManager.adjustHPRoll', async function(wrapped, ...args) {
			// let dd = args[0];
			// We need to pop in and adjust the dd.data.dmgFormulas for our size
			// Should possibly only do this for melee weapons right now
			return await wrapped(...args)

		}, 'WRAPPER');
	}
	getDamageFormulas

	static overrideSendHealthAdjustChatCard(){
		libWrapper.register(CONFIG.Hackmaster.MODULE_ID, 'game.osric.combatManager.sendHealthAdjustChatCard', async function(wrapped, ...args) {
			await wrapped(...args);

			let targetToken = args[1];
			let totalDamageDone = args[4];
			await HackmasterCombatManager.recordDamageForThresholdOfPain(targetToken, totalDamageDone);

		}, 'WRAPPER');
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