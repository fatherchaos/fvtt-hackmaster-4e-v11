import { HackmasterActor } from './hackmaster-actor.js';
import { HackmasterCharacterSheet } from "./hackmaster-character-sheet.js";
import { Hackmaster } from './config.js';
import { HackmasterItem } from "./hackmaster-item.js";

const MODULE_NAME = "Hackmaster 4th Edition";

function loadHackmasterTemplates(){
  loadTemplates([
    'modules/hackmaster-4e/templates/actor-armor-damage-section.hbs',
    'modules/hackmaster-4e/templates/armor-damage.hbs',
    'modules/hackmaster-4e/templates/item-armor-damage-fields.hbs'
  ]);
}

Hooks.once('init', function() {
  console.log(`Initializing "${MODULE_NAME}"`);

  CONFIG.Hackmaster = Hackmaster;

  HackmasterActor.initialize();
  HackmasterCharacterSheet.initialize();
  HackmasterItem.initialize();
  loadHackmasterTemplates();
});