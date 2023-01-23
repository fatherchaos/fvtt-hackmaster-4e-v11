import { Utilities } from "../utilities.js";
import { HackmasterItem } from "./hackmaster-item.js";
import { HonorCalculator } from "./honor-calculator.js";

export class HackmasterActor {

    constructor(osricActor) {
        this._osricActor = osricActor;
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

    
    get comeliness(){
        return this._osricActor?.system?.comeliness?.value ?? 10;
    }

    get comelinessPercent(){
        return this._osricActor?.system?.comeliness?.percent ?? 0;
    }

    get comelinessDescription(){
        let boundedComeliness = Math.min(Math.max(1, this.comeliness), 25);
        return CONFIG.Hackmaster.ComelinessTable[boundedComeliness];
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

    get thresholdOfPain(){
        return Math.floor((this._osricActor?.system?.attributes?.hp?.max ?? 0) / 2);
    }

    get recentDamageTaken(){
        return this._osricActor?.system?.recentDamage ?? 0;
    }

    async setRecentDamageTaken(amount){
        if (this._osricActor){
            await Utilities.runAsGM({
                operation: 'updateActor',
                targetActorId: this.isNpc ? null : this.actorId,
                targetTokenId: this.isNpc ? this.tokenId : null,
                update: {
                    "system.recentDamage": amount
                }
            });
        }
    }

    get isDead(){
        return this._osricActor?.isDead ?? false;
    }

    async recordDamageTaken(amount){
        await this.setRecentDamageTaken(this.recentDamageTaken + amount);
    }

    async resetDamageTaken(){
        await this.setRecentDamageTaken(0);
    }

    get needsThresholdOfPainCheck(){
        return !this.isDead && this.recentDamageTaken >= this.thresholdOfPain;
    }

    get name() {
        return this._osricActor?.getName() ?? '';
    }

    get actorId(){
        return this._osricActor?.id;
    }

    get tokenId(){
        return this._osricActor?.token?.id;
    }
}