import { HackmasterCombatManager } from '../Modules/hackmaster-combat-manager.js';

export class OsricCombatTrackerOverrides {
	static initialize(){
		OsricCombatTrackerOverrides.overrideUpdateCombat();
	}

    static overrideUpdateCombat(){
        libWrapper.register(CONFIG.Hackmaster.MODULE_ID, 'CONFIG.Combat.documentClass.prototype.reRollInitiative', async function(...args) {
            await HackmasterCombatManager.reRollInitiative(this);
		}, 'OVERRIDE');
    }
}
