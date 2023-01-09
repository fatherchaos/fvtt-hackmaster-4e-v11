import { HackmasterActor } from '../Modules/hackmaster-actor.js';
import { HackmasterCombatManager } from '../Modules/hackmaster-combat-manager.js';

export class OsricCombatTrackerOverrides {
	static initialize(){
		OsricCombatTrackerOverrides.overrideUpdateCombat();
        OsricCombatTrackerOverrides.overrideProcessOngoingHealthAdjustments();
	}

    static overrideUpdateCombat(){
        libWrapper.register(CONFIG.Hackmaster.MODULE_ID, 'CONFIG.Combat.documentClass.prototype.reRollInitiative', async function(...args) {
            await HackmasterCombatManager.reRollInitiative(this);
		}, 'OVERRIDE');
    }

    static overrideProcessOngoingHealthAdjustments(){
		libWrapper.register(CONFIG.Hackmaster.MODULE_ID, 'CONFIG.Combat.documentClass.prototype.processOngoingHealthAdjustments', async function(wrapped, ...args) {
			await wrapped(...args);

            let hmActor = new HackmasterActor(args[0].actor);
            await hmActor.resetDamageTaken();
		}, 'WRAPPER');
    }
}
