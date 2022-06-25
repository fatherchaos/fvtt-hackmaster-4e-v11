export class HackmasterItem {

    static initialize(){
        this.addArmorDamageFields();

        Hooks.on('renderItemSheet', async (sheet) => {
			await this.insertArmorDamageFields(sheet);
		});
    }

    static async buildArmorDamageFields(armorDamageInfo){
        return await renderTemplate('modules/hackmaster-4e/templates/item-armor-damage-fields.hbs', armorDamageInfo);
    }

    static async insertArmorDamageFields(sheet) {
        let itemType = sheet.object.data.type;
        if (itemType === "armor"){
            let armorsList = sheet._element.find(".armors-list");
            if (armorsList){
                let armorDamageInfo = sheet.object.data.data.protection.armorDamage;
                let fieldHtml = await this.buildArmorDamageFields(armorDamageInfo);
                $(fieldHtml).insertAfter(armorsList);
            }
        }
	}

    static addArmorDamageFields(){
        let armorDamage = {
           progression: "",
           damageTaken: 0,
           soak: 1
        };
  
        game.system.model.Item.armor.protection.armorDamage = armorDamage;
    }
}