export class HackmasterCharacterSheet{
	static initialize(){
		loadTemplates([
		      'modules/hackmaster-4e/templates/armor-damage-tracker.hbs'
		    ]);

		Hooks.on('renderActorSheet', async (sheet) => {
			await this.insertArmorTracker(sheet);
		});
	}

	static async insertArmorTracker(sheet){
		let combatBox = sheet._element.find(".combat-box");
		let template = await renderTemplate("modules/hackmaster-4e/templates/armor-damage-tracker.hbs", sheet);
		combatBox.append(template);
	}
};