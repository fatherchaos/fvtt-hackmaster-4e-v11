import { ArmorDamageTracker } from './armor-damage-tracker.js';

export class HackmasterCharacterSheet{
	static initialize(){
		Hooks.on('renderActorSheet', async (sheet) => {
			await this.insertArmorTracker(sheet);
		});
	}

	static getWornArmorData(inventory){
		let equippedArmor = inventory.find(i => 
			i.type === "armor" && 
			(i.data.data.protection.type === "armor" || i.data.data.protection.type === "shield")
		);
		// TODO: change to filter and iterate over this
		if (equippedArmor){
			return equippedArmor;
		}
		return null;
	}

	static async buildArmorDamageSection(){
		return await renderTemplate("modules/hackmaster-4e/templates/actor-armor-damage-section.hbs");
	}

	static async insertArmorTracker(sheet){
		let combatBox = sheet._element.find(".combat-stats");
		let data = this.getWornArmorData(sheet.object.data.data.inventory);

		if (data){
			let section = await this.buildArmorDamageSection();
			let template = await ArmorDamageTracker.buildArmorReport(data);
			let newSection = $(section).append(template);
			combatBox.append(newSection);
			$('.armor-damage-header-btn').each((i, btn) => {
				btn.addEventListener('click', function(){
					this.classList.toggle('active-hm');
					let content = this.nextElementSibling;
					content.classList.toggle('hidden');
				});
			});
		}
	}
};