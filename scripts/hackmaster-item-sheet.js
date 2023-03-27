export class HackmasterItemSheet{
    static addArmorDamageFields(){
        let armorDamage = {
           progression: "",
           damageTaken: 0,
           soak: 1
        };
  
        game.system.model.Item.armor.protection.armorDamage = armorDamage;
    }
    
    static initialize(){
        this.addArmorDamageFields();

        Hooks.on('renderARSItemSheet', async (sheet) => {
            let hmSheet = new HackmasterItemSheet(sheet);
            if (hmSheet.itemType == 'weapon'){
                await hmSheet.insertWeaponDamageSizes();
                hmSheet.restoreScrollPosition();
            }
		});

        Hooks.on('renderItemSheet', async (sheet) => {
			await this.insertArmorDamageFields(sheet);
		});
    }

    constructor(sheet) {
		this._sheet = sheet;
	}

    getRawDamageData(){
        return this._sheet?.item?.system?.damage ?? {};
    }

    get itemType(){
        return this._sheet?.item?.type ?? '';
    }

    findElement(selector){
		return this._sheet._element.find(selector);
	}

    async insertWeaponDamageSizes(){
        let normalDamageInput = this.findElement("input[name='system.damage.normal']");
        if (normalDamageInput){
            let normalDamageDiv = normalDamageInput.closest('div');
            let section = await this.buildWeaponDamageSection();
            $(section).insertAfter(normalDamageDiv);
        }
    }

    async buildWeaponDamageSection(){
        let data = this.getRawDamageData();
		return await renderTemplate("modules/hackmaster-4e/templates/weapon-damage-section.hbs", data);
	}

    restoreScrollPosition(){
		if (this._sheet.itemSheetScrollY){
			$('.item .window-content').scrollTop(this._sheet.itemSheetScrollY);
		}
	}

	saveScrollPosition(){
		this._sheet.itemSheetScrollY = $('.item .window-content').scrollTop();
	}

    static async buildArmorDamageFields(armorDamageInfo){
        return await renderTemplate('modules/hackmaster-4e/templates/item-armor-damage-fields.hbs', armorDamageInfo);
    }

    static async insertArmorDamageFields(sheet) {
        let itemType = sheet.object.data.type;
        if (itemType === "armor"){
            let armorsList = sheet._element.find(".armors-list");
            if (armorsList){
                let armorDamageInfo = sheet.object.system.protection.armorDamage;
                let fieldHtml = await this.buildArmorDamageFields(armorDamageInfo);
                $(fieldHtml).insertAfter(armorsList);
            }
        }
	}
}