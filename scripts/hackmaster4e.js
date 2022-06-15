import { libWrapper } from './shim.js';
import { HackmasterActor } from './hackmaster-actor.js';
import { Hackmaster } from './config.js';

Hooks.once('init', function() {
  const MODULE_NAME = "Hackmaster 4th Edition";
  const MODULE_ID = "hackmaster-4e";
  console.log(`Initializing "${MODULE_NAME}"`);

  CONFIG.Hackmaster = Hackmaster;

  libWrapper.register(MODULE_ID, 'CONFIG.Actor.documentClass.prototype._buildAbilityFields', (function(data) {
      return function(data) {
        HackmasterActor._buildAbilityFields(data);
      }
  })(), 'OVERRIDE');
});

