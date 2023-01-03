import { Hackmaster } from '../config.js';

export class HonorCalculator {

    static HonorStates = {
        Dishonor: -1,
        Normal: 0,
        GreatHonor: 1,
        TooMuchHonor: 2
    }   

    static HonorStateDescriptions = {
        [HonorCalculator.HonorStates.Dishonor]: "Dishonor",
        [HonorCalculator.HonorStates.Normal]: "Normal",
        [HonorCalculator.HonorStates.GreatHonor]: "Great Honor",
        [HonorCalculator.HonorStates.TooMuchHonor]: "Too Much Honor"
    }
    
    static getHonorState(level, honor){
        if (level < 1 || level > 20){
            console.log("Honor is considered normal for anyone not between levels 1 and 20.");
            return this.HonorStates.Normal;
        }

        let currentHonorArray = Hackmaster.HonorThresholds[level]; // {bottom normal, bottom great, top great}
        if (honor < currentHonorArray[0]){
            return this.HonorStates.Dishonor;
        }
        if (honor < currentHonorArray[1]){
            return this.HonorStates.Normal;
        }
        if (honor <= currentHonorArray[2]){
            return this.HonorStates.GreatHonor
        }
        return this.HonorStates.TooMuchHonor;
    }

    static keepHonorInBounds(honor){
        if (honor < 1) return 1;
        if (honor > 405) return 405;
        return honor;
    }

    static getHonorDie(level, honor){
        if (level < 1 || level > 20){
            console.log("No honor dice for anyone not between levels 1 and 20");
            return "";
        }

        let chartIndex = Math.ceil(this.keepHonorInBounds(honor) / 5);
        return Hackmaster.HonorDice[chartIndex][level]
    }

}