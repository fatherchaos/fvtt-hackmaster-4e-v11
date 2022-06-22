import { libWrapper } from './shim.js';
import { HackmasterActor } from './hackmaster-actor.js';
import { Hackmaster } from './config.js';

const MODULE_NAME = "Hackmaster 4th Edition";
const MODULE_ID = "hackmaster-4e";

function overrideStatBonuses(){

  CONFIG.OSRIC.constitutionTable = Hackmaster.ConstitutionTable;
  libWrapper.register(MODULE_ID, 'CONFIG.Actor.documentClass.prototype._buildAbilityFields', (function() {
    return function(data) {
      HackmasterActor._buildAbilityFields(data);
    };
  })(), 'OVERRIDE');
}

Hooks.once('init', function() {
  console.log(`Initializing "${MODULE_NAME}"`);

  CONFIG.Hackmaster = Hackmaster;

  overrideStatBonuses();
});

