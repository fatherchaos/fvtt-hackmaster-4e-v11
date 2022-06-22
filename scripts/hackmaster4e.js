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

// This exists primarily for Token Mold support.
function addAcFieldsToActorDefinitions(){
  let armorClass = {
     "normal": 10,
     "rear": 10,
     "touch": 10,
     "shieldless": 10,
     "nodex": 10,
     "acranged": 10,
     "acrangedfront": 10,
     "acrangedrear": 10,
     "armormelee": 10,
     "armormeleefront": 10,
     "armormeleerear": 10
  };

  game.system.model.Actor.character.armorClass = armorClass;
  game.system.model.Actor.npc.armorClass = armorClass;
}

Hooks.once('init', function() {
  console.log(`Initializing "${MODULE_NAME}"`);

  CONFIG.Hackmaster = Hackmaster;

  overrideStatBonuses();
  addAcFieldsToActorDefinitions();
});

