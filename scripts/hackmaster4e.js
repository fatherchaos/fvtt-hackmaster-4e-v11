import { HackmasterActor } from './hackmaster-actor.js';
import { HackmasterCharacterSheet } from "./hackmaster-character-sheet.js";
import { Hackmaster } from './config.js';

const MODULE_NAME = "Hackmaster 4th Edition";

Hooks.once('init', function() {
  console.log(`Initializing "${MODULE_NAME}"`);

  CONFIG.Hackmaster = Hackmaster;
  
  HackmasterActor.overrideStatBonuses();
  HackmasterActor.addAcFieldsToActorDefinitions();
  HackmasterCharacterSheet.initialize();
});