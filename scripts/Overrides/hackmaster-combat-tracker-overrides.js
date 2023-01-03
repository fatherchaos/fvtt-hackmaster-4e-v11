export class HackmasterCombatTrackerOverrides {
	static initialize(){
		HackmasterCombatTrackerOverrides.overrideUpdateCombat();
	}

    static overrideUpdateCombat(){
        libWrapper.register(CONFIG.Hackmaster.MODULE_ID, 'CONFIG.Combat.documentClass.prototype.reRollInitiative', async function(...args) {
            await HackmasterCombatTrackerOverrides.reRollInitiative(this);
		}, 'OVERRIDE');
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
}
