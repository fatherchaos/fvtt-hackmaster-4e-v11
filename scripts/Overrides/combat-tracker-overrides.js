import { HackmasterActor } from '../Modules/hackmaster-actor.js';
import { HackmasterCombatManager } from '../Modules/hackmaster-combat-manager.js';
import { HackmasterSettings } from '../Modules/hackmaster-settings.js';

export class OsricCombatTrackerOverrides {
	static initialize(){
		OsricCombatTrackerOverrides.overrideUpdateCombat();
    OsricCombatTrackerOverrides.overrideProcessOngoingHealthAdjustments();
	}

  static overrideUpdateCombat(){
    libWrapper.register(CONFIG.Hackmaster.MODULE_ID, 'CONFIG.Combat.documentClass.prototype.reRollInitiative', async function(wrapped, ...args) {
        if (HackmasterSettings.isUsingTenSegmentInit()){
          await HackmasterCombatManager.reRollInitiative(this);
        }
        else{
          await wrapped(...args);
        }
		}, 'MIXED');
  }

  static overrideProcessOngoingHealthAdjustments(){
		libWrapper.register(CONFIG.Hackmaster.MODULE_ID, 'CONFIG.Combat.documentClass.prototype.processOneRoundFlags', async function(wrapped, ...args) {
			await wrapped(...args);
      if(game.user.isGM){
          let hmActor = new HackmasterActor(args[0].actor);
          await hmActor.resetDamageTaken();
      }
		}, 'WRAPPER');
  }
}
