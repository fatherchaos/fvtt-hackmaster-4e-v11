import { HackmasterItem } from "./hackmaster-item.js";
import { HonorCalculator } from "./honor-calculator.js";

export class HackmasterActor {

    constructor(osricActor) {
        this._osricActor = osricActor;
        this.defaultHonorIfNeeded();
    }

    getItems(){
        let items = this._osricActor?.items ?? [];
        return items.map(i => new HackmasterItem(i));
    }

    getEquippedArmors(){
        return this.getItems()
            .filter(i => i.isArmor && i.isEquipped)
            .map(a => a.getArmorInfo());
    }

    getEquippedShields(){
        return this.getItems()
            .filter(i => i.isShield && i.isEquipped)
            .map(a => a.getArmorInfo());
    }

    get isProtegee(){
        return this._osricActor?.system?.isProtegee ?? false;
    }

    get temporaryHonor(){
        return this._osricActor?.system?.honor?.temp ?? 0;
    }

    get honor() {
        return this._osricActor?.system?.honor?.value ?? 0;
    }

    get effectiveLevel() {
        return this._osricActor?.effectiveLevel ?? 0;
    }

    get isNpc() {
        return this._osricActor?.type == 'npc';
    }

    get thac0(){
        return this._osricActor?.system?.attributes?.thaco?.value ?? 20;
    }

    get armorClass(){
        return this._osricActor?.system?.armorClass ?? [];
    }

    getArmorClass(type){
        return this.armorClass[type] ?? 10;
    }

    get normalAc(){
        return this.armorClass['normal'] ?? 10;
    }

   
    get size(){
        return this._osricActor?.system?.attributes?.size ?? 'medium';
    }

    get sizeCategory(){
        let sizeChar = this.size.toLowerCase()[0];

        switch(sizeChar){
            case 't':
                return 1;
            case 's':
                return 2;
            case 'm':
                return 3;
            case 'l':
                return 4;
            case 'h':
                return 5;
            case 'g':
                return 6;
            default:
                return 3;
        }
    }

    defaultHonorIfNeeded(){
        if (this._osricActor?.system && !this._osricActor.system.honor){
            this._osricActor.system.honor = {value: 0, temp: 0, die: ""};
        }
    }

    get rawHonorState(){
        return this._osricActor?.system?.honorState ?? 0
    }

    getHonorState() {
        if (this.isNpc){
            return this.rawHonorState;
        }

        return HonorCalculator.getHonorState(this.effectiveLevel, this.honor);
    }

    getHonorStateDescription() {
        return HonorCalculator.HonorStateDescriptions[this.getHonorState()];
    }

    isInGreatHonor() {
        return this.getHonorState() == HonorCalculator.HonorStates.GreatHonor;
    }

    isInDishonor() {
        return this.getHonorState() == HonorCalculator.HonorStates.Dishonor;
    }

    getHonorDie(){
        if (this.isNpc){
            return "";
        }
        return HonorCalculator.getHonorDie(this.effectiveLevel, this.honor);
    }
}