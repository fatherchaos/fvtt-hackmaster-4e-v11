import { ArmorInfo } from './armor-info.js';

export class AlwaysHpSupport{
    static initialize(){
        Hooks.on('renderAlwaysHP', async (app) => {
			let support = new AlwaysHpSupport(app);
            await support.attachArmorDamageButtons();
		});
    }

    async attachArmorDamageButtons(){
        let armorSection = await renderTemplate("modules/hackmaster-4e/templates/always-hp-armor-section.hbs");
        $('#always-hp .window-content').append(armorSection);
        $('#always-hp').height('auto');
        this.activateListeners($(armorSection));
    }

    activateListeners(html){
        var that = this;
        $('#alwayshp-hurt-shield-btn').click(async ev => {
            ev.preventDefault();
            if (canvas.tokens.controlled.length != 0){
                await Promise.all(canvas.tokens.controlled.map(t => this.changeShieldDamage(t, 1)));
            }
        });
        $('#alwayshp-repair-shield-btn').click(async ev => {
            ev.preventDefault();
            if (canvas.tokens.controlled.length != 0){
                await Promise.all(canvas.tokens.controlled.map(t => this.changeShieldDamage(t, -1)));
            }
        });
        $('#alwayshp-hurt-armor-btn').click(async ev => {
            ev.preventDefault();
            if (canvas.tokens.controlled.length != 0){
                await Promise.all(canvas.tokens.controlled.map(t => this.changeArmorDamage(t, 1)));
            }           
        });
        $('#alwayshp-repair-armor-btn').click(async ev => {
            ev.preventDefault();
            if (canvas.tokens.controlled.length != 0){
                await Promise.all(canvas.tokens.controlled.map(t => this.changeArmorDamage(t, -1)));
            }
        });
    }


    async changeShieldDamage(token, amount){
        let shield = this.getEquippedShield(token);
        await this.changeArmorTypeItemDamage(token, shield, amount);
    }

    async changeArmorDamage(token, amount){
        let armor = this.getEquippedArmor(token);
        await this.changeArmorTypeItemDamage(token, armor, amount);        
    }

    async changeArmorTypeItemDamage(token, armorItem, amount){
        if (armorItem && amount){
            let actualChange = await armorItem.damageArmor(amount);
            token.hud.createScrollingText((-actualChange).signedString(), {
                anchor: CONST.TEXT_ANCHOR_POINTS.TOP,
                fontSize: 32,
                fill: (actualChange > 0 ? 16746240 : 16746495),
                stroke: 0x000000,
                strokeThickness: 4,
                jitter: 0.25
            });
        }
    }

    getEquippedArmor(token){
        let allArmor = token.actor.items
            .filter(i => i.type === "armor" && i.data.data.protection.type == "armor")
            .map(a => new ArmorInfo(a));

        return allArmor.find(a => a.isEquipped);
    }

    getEquippedShield(token){
        let allShields = token.actor.items
            .filter(i => i.type === "armor" && i.data.data.protection.type == "shield")
            .map(a => new ArmorInfo(a));

        return allShields.find(a => a.isEquipped);
    }
}