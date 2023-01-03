import { HonorCalculator } from "./honor-calculator.js";

export class HackmasterActor {

    constructor(osricActor) {
        this._osricActor = osricActor;
    }

    get temporaryHonor(){
        return this._osricActor.system.honor?.temp ?? 0;
    }

    get honor() {
        return this._osricActor.system.honor?.value ?? 0;
    }

    set honor(h) {
        if (!Number.isInteger(h)) {
            console.log(`Trying to set honor to something other than an integer: ${h}`);
        }
        defaultHonorIfNeeded();
        this._osricActor.system.honor.value = h;
    }

    get effectiveLevel() {
        return this._osricActor.effectiveLevel ?? 0;
    }

    get isNpc() {
        return this._osricActor.type == 'npc';
    }

    defaultHonorIfNeeded(){
        if (!this._osricActor.system.honor){
            this._osricActor.system.honor = {value: 0, temp: 0, die: ""};
        }
    }

    getHonorState() {
        if (this.isNpc){
            return this._osricActor.honorState ?? 0;
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