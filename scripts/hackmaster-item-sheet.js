export class HackmasterItemSheet{
    static initialize(){
        Hooks.on('renderOSRICItemSheet', async (sheet) => {
            let hmSheet = new HackmasterItemSheet(sheet);
            if (hmSheet.itemType == 'weapon'){
                await hmSheet.insertWeaponDamageSizes();
                hmSheet.restoreScrollPosition();
            }
		});
    }

    constructor(sheet) {
		this._sheet = sheet;
	}

    get osricItem(){
        return this._sheet?.item ?? {};
    }

    get rawDamageData(){
        return this.osricItem?.system?.damage ?? {};
    }

    getDamageForSizes(){
        let tiny = this.rawDamageData?.tiny;
        let small = this.rawDamageData?.small;
        let medium = this.rawDamageData?.normal;
        let large = this.damagrawDamageDataeData?.large;
        let huge = this.rawDamageData?.huge;
        let gargantuan = this.rawDamageData?.gargantuan;

        gargantuan ||= huge || large || medium || small || tiny;
        huge ||= large || medium || small || tiny || gargantuan;
        large ||= medium || small || tiny || huge || gargantuan;
        medium ||= small || tiny || large || huge || gargantuan;
        small ||= tiny || medium || large || huge || gargantuan;
        tiny ||= small || medium || large || huge || gargantuan;

        return {
            tiny: tiny,
            small: small,
            medium: medium,
            large: large,
            huge: huge,
            gargantuan: gargantuan
        };
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
        let data = this.rawDamageData;
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
}