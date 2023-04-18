import { Utilities } from '../utilities.js'

export class HackmasterFumbles{

    static handleMishap(){
        let nRollValue = Utilities.getDieResult(10000);
        
        let sResult = HackmasterFumbles.getMishapResult(nRollValue);
        return {
            roll: nRollValue,
            description: sResult
        };
    }

    static handleFumble(bIsUnarmed){
        let nRollValue = Utilities.getDieResult(1000);
        let sResult = HackmasterFumbles.getHackmasterFumbleResult(nRollValue, bIsUnarmed);
        
        return {
            isUnarmed: bIsUnarmed,
            roll: nRollValue,
            description: sResult
        };
    }

    static getArmorTroubleResult(){
        let nRollValue = Utilities.getDieResult(6);
        if (nRollValue < 3){
            return "Armor Trouble: Helm lost, victim's head exposed";
        }
        else{
            return "Armor Trouble: Shield dropped";
        } 
    }

    static getWeaponTroubleResult(){
        let nRollValue = Utilities.getDieResult(6);
        if (nRollValue < 5){
            return "Weapon Trouble: The character loses their grip on their weapon and drops it."
        }
        else{
             return "Weapon Trouble: Hard strike may break the weapon. Roll a succesful item saving throw vs crushing blow to avoid."
        }
    }

    static getHackmasterFumbleResult(nRollValue, isUnarmed){
        if (isUnarmed){
            return HackmasterFumbles.getUnarmedHackmasterFumbleResult(nRollValue);
        }
        else{
            return HackmasterFumbles.getNormalHackmasterFumbleResult(nRollValue);
        };
    }

    static getRandomCantrip(nRollValue){
        return "Not Yet Implemented"; // TODO
    }

    static getMishapResult(nRollValue){
        let sResult = "";
        if (nRollValue < 276) sResult = "Spell dissolves in a harmless puff of smoke" 
        else if (nRollValue < 296 ) sResult = "Ears turn " + HackmasterFumbles.getColorChange() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 308 ) sResult = "Ears turn " + HackmasterFumbles.getColorChange() + " permanently";
        else if (nRollValue < 328 ) sResult = "Nose turns " + HackmasterFumbles.getColorChange() + " for " + HackmasterFumbles.getMishapDuration(); 
        else if (nRollValue < 340 ) sResult = "Nose turns " + HackmasterFumbles.getColorChange() + " permanently";
        else if (nRollValue < 360 ) sResult = "Neck turns " + HackmasterFumbles.getColorChange() + " for " + HackmasterFumbles.getMishapDuration(); 
        else if (nRollValue < 372 ) sResult = "Neck turns " + HackmasterFumbles.getColorChange() + " permanently";
        else if (nRollValue < 392 ) sResult = "Hands turn " + HackmasterFumbles.getColorChange() + " for " + HackmasterFumbles.getMishapDuration(); 
        else if (nRollValue < 404 ) sResult = "Hands turn " + HackmasterFumbles.getColorChange() + " permanently";
        else if (nRollValue < 454 ) sResult = "Eyes turn " + HackmasterFumbles.getColorChange() + " for " + HackmasterFumbles.getMishapDuration(); 
        else if (nRollValue < 504 ) sResult = "Hair turns " + HackmasterFumbles.getColorChange() + " for " + HackmasterFumbles.getMishapDuration(); 
        else if (nRollValue < 554 ) sResult = "Skin turns " + HackmasterFumbles.getColorChange() + " for " + HackmasterFumbles.getMishapDuration(); 
        else if (nRollValue < 579 ) sResult = "Biting fingernails";
        else if (nRollValue < 594 ) sResult = "Hair grows {1d4} feet in one round";
        else if (nRollValue < 612 ) sResult = "Chews own hair";
        else if (nRollValue < 637 ) sResult = "Burst of soot in face";
        else if (nRollValue < 687 ) sResult = "Affected by cantrip: " + HackmasterFumbles.getRandomCantrip(); // TODO: Random cantrip table
        else if (nRollValue < 712 ) sResult = "Becomes chronic nagger";
        else if (nRollValue < 772 ) sResult = "Skin complaint (unpleasant rash) for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 802 ) sResult = "Skin complaint (unpleasant rash) permanently";
        else if (nRollValue < 852 ) sResult = "Suffer 1 point of damage";
        else if (nRollValue < 932 ) sResult = "1 random memorized spell goes off";
        else if (nRollValue < 997 ) sResult = "Choke for {1d4} rounds";
        else if (nRollValue < 1029 ) sResult = "Rash (-1 dex) for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 1069 ) sResult = "Suffer " + Utilities.getDiceResult(1, 4, -2) + " points of damage";
        else if (nRollValue < 1084 ) sResult = "Lose sense of touch in fingers for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 1096 ) sResult = CharBackgroundManagerPO.getBodySide() + " arm goes numb for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 1122 ) sResult = CharBackgroundManagerPO.getBodySide() + " leg goes numb for " + HackmasterFumbles.getMishapDuration
        else if (nRollValue < 1146 ) sResult = "Constantly gasping for air (slows speech by half, doubles casting times)";
        else if (nRollValue < 1196 ) sResult = "Personal cloudburst";
        else if (nRollValue < 1236 ) sResult = "2 random memorized spells go off simultaneously";
        else if (nRollValue < 1271 ) sResult = "Suffer " + Utilities.getDiceResult(1, 4) + " points of damage";
        else if (nRollValue < 1296 ) sResult = "Loss of one spell slot for " + getMishapDuration();
        else if (nRollValue < 1326 ) sResult = "Suffer " + Utilities.getDiceResult(1, 6, 1) + " points of damage";
        else if (nRollValue < 1376 ) sResult = "Spell dissolves in minor explosion: " + Utilities.getDiceResult(1, 6, -2) + " points of damage in a 5-foot radius";
        else if (nRollValue < 1409 ) sResult = "Loss of two spell slots for " + getMishapDuration();
        else if (nRollValue < 1469 ) sResult = "Cannot memorize that spell again for " + getMishapDuration();
        else if (nRollValue < 1494 ) sResult = "Eyes turn " + HackmasterFumbles.getColorChange() + " permanently";
        else if (nRollValue < 1519 ) sResult = "Hair turns " + HackmasterFumbles.getColorChange() + " permanently";
        else if (nRollValue < 1544 ) sResult = "Skin turns " + HackmasterFumbles.getColorChange() + " permanently";
        else if (nRollValue < 1555 ) sResult = "Polymorphed to amphibian for " + getMishapDuration();
        else if (nRollValue < 1590 ) sResult = "Skin covered in large blotches (-3 Comeliness) for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 1601 ) sResult = "Skin covered in large blotches (-3 Comeliness) permanently";
        else if (nRollValue < 1681 ) sResult = "Now talks to self";
        else if (nRollValue < 1711 ) sResult = "Fingernails turn " + HackmasterFumbles.getColorChange() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 1725 ) sResult = "Fingernails turn " + HackmasterFumbles.getColorChange() + " permanently";
        else if (nRollValue < 1800 ) sResult = "Tingling in fingers (+25% chance of spell mishap for somatic components) for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 1840 ) sResult = "Ringing in ears for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 1860 ) sResult = "Narcissism";
        else if (nRollValue < 1900 ) sResult = "Contracts the flu";
        else if (nRollValue < 1920 ) sResult = "Becomes convicned he is a clone of his original self";
        else if (nRollValue < 1933 ) sResult = "Tinnitus - permanent ringing in ears";
        else if (nRollValue < 1973 ) sResult = "Vision blurred (reduced 50%) for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 2013 ) sResult = "Amnesia back 1 day";
        else if (nRollValue < 2033 ) sResult = "Amnesia back 2 days";
        else if (nRollValue < 2073 ) sResult = "Enlarge random object (as spell)";
        else if (nRollValue < 2093 ) sResult = "Reduce random object (as spell)";
        else if (nRollValue < 2133 ) sResult = "Enlarge self";
        else if (nRollValue < 2153 ) sResult = "Reduce self";
        else if (nRollValue < 2878 ) sResult = "Gain minor mental quirk: " + CharBackgroundManagerPO.getMinorMentalQuirk() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 3178 ) sResult = "Gain minor mental quirk: " + CharBackgroundManagerPO.getMinorMentalQuirk() + " permanently";
        else if (nRollValue < 3278 ) sResult = "Sibling (or parent) gains " + CharBackgroundManagerPO.getMinorMentalQuirk() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 3323 ) sResult = "Sibling (or parent) gains " + CharBackgroundManagerPO.getMinorMentalQuirk() + " permanently";
        else if (nRollValue < 4048 ) sResult = "Gain " + CharBackgroundManagerPO.getMinorPersonalityQuirk() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 4348 ) sResult = "Gain " + CharBackgroundManagerPO.getMinorPersonalityQuirk() + " permanently";
        else if (nRollValue < 4448 ) sResult = "Sibling (or parent) gains " + CharBackgroundManagerPO.getMinorPersonalityQuirk() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 4493 ) sResult = "Sibling (or parent) gains " + CharBackgroundManagerPO.getMinorPersonalityQuirk() + " permanently";
        else if (nRollValue < 4793 ) sResult = "Gain " + CharBackgroundManagerPO.getMajorMentalQuirk() + " for " + getMishapDuration();
        else if (nRollValue < 4943 ) sResult = "Gain " + CharBackgroundManagerPO.getMajorMentalQuirk() + " permanently";
        else if (nRollValue < 4983 ) sResult = "Sibling (or parent) gains " + CharBackgroundManagerPO.getMajorMentalQuirk() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 5003 ) sResult = "Sibling (or parent) gains " + CharBackgroundManagerPO.getMajorMentalQuirk() + " permanently";
        else if (nRollValue < 5303 ) sResult = "Gain " + CharBackgroundManagerPO.getMajorPersonalityQuirk() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 5453 ) sResult = "Gain " + CharBackgroundManagerPO.getMajorPersonalityQuirk() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 5523 ) sResult = "Sibling (or parent) gains " + CharBackgroundManagerPO.getMajorPersonalityQuirk() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 5553 ) sResult = "Sibling (or parent) gains " + CharBackgroundManagerPO.getMajorPersonalityQuirk() + " permanently";
        else if (nRollValue < 5583 ) sResult = "Wandering eye for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 5603 ) sResult = "Gain 1 alignment infration point";
        else if (nRollValue < 5653 ) sResult = "Blinks (as per spell)";
        else if (nRollValue < 5678 ) sResult = "Unquenchable thirst for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 5703 ) sResult = "Entire body glows as per Light spell";
        else if (nRollValue < 5712 ) sResult = "Continual Light spell on tongue";
        else if (nRollValue < 5722 ) sResult = "Gain 2 alignment infraction points";
        else if (nRollValue < 5758 ) sResult = "Emit unpleasant odor (-1 to reaction rolls) for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 5780 ) sResult = "Emit vile odor (-3 to reaction rolls) for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 5802 ) sResult = "Sibling (or parent) emits unpleasant odor (-1 to reaction rolls) for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 5820 ) sResult = "Sibling (or parent) emits vile odor (-3 to reaction rolls) for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 5833 ) sResult = "Must memorize all spells as if they were one level higher than actual";
        else if (nRollValue < 5835 ) sResult = "Temporary compulsion to become a mime";
        else if (nRollValue < 5855 ) sResult = "Teleport 5 feet in random direction";
        else if (nRollValue < 5870 ) sResult = "Teleport 10 feet in random direction";
        else if (nRollValue < 5880 ) sResult = "Teleport 50 feet in random direction";
        else if (nRollValue < 5895 ) sResult = "Wandering eye - permanent";
        else if (nRollValue < 5945 ) sResult = "Cannot memorize that spell again - permanently";
        else if (nRollValue < 5995 ) sResult = "Becomes center of a Stinking Cloud spell";
        else if (nRollValue < 6195 ) sResult = "Gains " + CharBackgroundManagerPO.getMinorPhysicalFlaw6b() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 6285 ) sResult = "Gains " + CharBackgroundManagerPO.getMinorPhysicalFlaw6b() + " permanently";
        else if (nRollValue < 6485 ) sResult = "Gains " + CharBackgroundManagerPO.getMinorPhysicalFlaw6c() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 6575 ) sResult = "Gains " + CharBackgroundManagerPO.getMinorPhysicalFlaw6c() + " permanently";
        else if (nRollValue < 6775 ) sResult = "Gains " + CharBackgroundManagerPO.getMinorPhysicalFlaw6d() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 6900 ) sResult = "Gains " + CharBackgroundManagerPO.getMinorPhysicalFlaw6d() + " permanently";
        else if (nRollValue < 6920 ) sResult = "Teleport 5 feet straight up";
        else if (nRollValue < 6929 ) sResult = "Teleport 10 feet straight up";
        else if (nRollValue < 6937 ) sResult = "Teleport 50 feet straight up";
        else if (nRollValue < 6959 ) sResult = "Needs 1 extra hour of sleep for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 6969 ) sResult = "Loses all tattoos for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 6979 ) sResult = "Permanently loses all tattoos";
        else if (nRollValue < 6984 ) sResult = "Shaking (-1 to-hit, -1 to damage, +3 segments to casting times for spells with somatic components) for " + getMishapDuration();
        else if (nRollValue < 6999 ) sResult = "Needs 2 extra hours of sleep for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 7017 ) sResult = "Conversations with self (thinks others respond) for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 7032 ) sResult = "Is convinced he has a long lost sibling";
        else if (nRollValue < 7038 ) sResult = "Polymorphed into primate for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 7063 ) sResult = "Suffer " + Utilities.getDiceResult(2, 6) + " points of damage";
        else if (nRollValue < 7074 ) sResult = "Suffer permanent loss of 1 hit point";
        else if (nRollValue < 7078 ) sResult = "Constant thirst (must drink 3 times normal volume per day) permanently";
        else if (nRollValue < 7089 ) sResult = "Permanently emits unpleasant odor (-1 to reaction rolls)";
        else if (nRollValue < 7096 ) sResult = "Permanently emits vile odor (-3 to reaction rolls)";
        else if (nRollValue < 7186 ) sResult = "Gains " + CharBackgroundManagerPO.getMajorPhysicalFlaw() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 7276 ) sResult = "Gains " + CharBackgroundManagerPO.getMajorPhysicalFlaw() + " permanently";
        else if (nRollValue < 7296 ) sResult = "Immediate alignment audit";
        else if (nRollValue < 7306 ) sResult = "Summon hostile monsters (MS1)"; // TODO, MS1
        else if (nRollValue < 7315 ) sResult = "Summon hostile monsters (MS2)"; // TODO, ms2
        else if (nRollValue < 7357 ) sResult = "Struck by Lightning Bolt from above";
        else if (nRollValue < 7369 ) sResult = "Switch gender for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 7384 ) sResult = "Change race to " + CharBackgroundManagerPO.getRandomRace() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 7386 ) sResult = "Shaking (-1 to-hit, -1 to damage, +3 segments to casting times for spells with somatic components) - permanent";
        else if (nRollValue < 7398 ) sResult = "Uncontrollable falling down at random (1d100 minute) intervals for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 7403 ) sResult = "Uncontrollable falling down at random (1d100 minute) intervals - permanent";
        else if (nRollValue < 7428 ) sResult = "Enters HackFrenzy immediately ({2d20} 'effective' points of damage)";
        else if (nRollValue < 7448 ) sResult = "Enter HackLust immediately ({2d20} 'effective' points of damage)";
        else if (nRollValue < 7548 ) sResult = "Becomes misanthrope for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 7556 ) sResult = "Lose one talent temporarily";
        else if (nRollValue < 7560 ) sResult = "Lose two talents temporarily";
        else if (nRollValue < 7580 ) sResult = "Suffer " + Utilities.getDiceResult(3, 6) + " points of damage";
        else if (nRollValue < 7588 ) sResult = "Summon hostile monsters (MS3)"; // TODO: ms3
        else if (nRollValue < 7608 ) sResult = "Lower temperature 10 degrees in a 5-foot radius";
        else if (nRollValue < 7618 ) sResult = "Lower temperature 25 degrees in a 5-foot radius";
        else if (nRollValue < 7623 ) sResult = "Lower temperature 50 degrees in a 5-foot radius";
        else if (nRollValue < 7643 ) sResult = "Raise temperature 10 degrees in a 5-foot radius";
        else if (nRollValue < 7653 ) sResult = "Raise temperature 25 degrees in a 5-foot radius";
        else if (nRollValue < 7658 ) sResult = "Raise temperature 50 degrees in a 5-foot radius";
        else if (nRollValue < 7665 ) sResult = "Summon hostile monsters (MS4)"; // TODO ms4
        else if (nRollValue < 7685 ) sResult = "Lose one class-specific ability for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 7690 ) sResult = "Lose two class-specific abilities for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 7696 ) sResult = "Sibling (or parents) contracts the flu";
        else if (nRollValue < 7699 ) sResult = "Sibling (or parents) contracts leprosy`";
        else if (nRollValue < 7715 ) sResult = "Introversion";
        else if (nRollValue < 7730 ) sResult = "Suffer " + Utilities.getDiceResult(3, 10) + " points of damage";
        else if (nRollValue < 7740 ) sResult = "Suffer " + Utilities.getDiceResult(2, 20) + " points of damage";
        else if (nRollValue < 7765 ) sResult = "Slowed (as spell)";
        else if (nRollValue < 7775 ) sResult = "Hasted (as spell)";
        else if (nRollValue < 7805 ) sResult = "-1 to-hit for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 7833 ) sResult = "-1 to damage rolls for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 7843 ) sResult = "Hatred of one gender (" + CharBackgroundManagerPO.getGender() + ")";
        else if (nRollValue < 7857 ) sResult = "-2 to-hit for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 7881 ) sResult = "-1 to all rolls for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 7887 ) sResult = "Summon hostile monsters (MS5)"; // TODO: MS5
        else if (nRollValue < 7896 ) sResult = "Suffer permanent loss of 2 hp";
        else if (nRollValue < 7901 ) sResult = "Switdh gender permanently";
        else if (nRollValue < 7903 ) sResult = "Sibling (or parent) contracts malaria";
        else if (nRollValue < 7909 ) sResult = "Permanent compulsion to become a mime";
        else if (nRollValue < 7917 ) sResult = "-2 to damage rolls for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 7957 ) sResult = "-1 points of Honor";
        else if (nRollValue < 7989 ) sResult = "-2 points of Honor";
        else if (nRollValue < 8064 ) sResult = "Ages 1 day";
        else if (nRollValue < 8076 ) sResult = "-2 to all rolls for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 8092 ) sResult = "-{1d4} points of Honor";
        else if (nRollValue < 8100 ) sResult = "-{1d6} points of Honor";
        else if (nRollValue < 8130 ) sResult = "Becomes center of Fireball";
        else if (nRollValue < 8200 ) sResult = "Ages {2d6} days";
        else if (nRollValue < 8265 ) sResult = "Ages {1d4} weeks";
        else if (nRollValue < 8325 ) sResult = "Ages {1d3} months";
        else if (nRollValue < 8380 ) sResult = "Ages {1d6} months";
        else if (nRollValue < 8428 ) sResult = "Ages {2d6} months";
        else if (nRollValue < 8464 ) sResult = "Ages 1 year";
        else if (nRollValue < 8488 ) sResult = "Ages {1d4} years";
        else if (nRollValue < 8500 ) sResult = "Ages {2d4} years";
        else if (nRollValue < 8506 ) sResult = "Ages {2d6} years";
        else if (nRollValue < 8531 ) sResult = "Tingling in fingers (+25% chance of spell mishap for somatic components) - permanently";
        else if (nRollValue < 8547 ) sResult = "Permanent Rash (-2 dex)";
        else if (nRollValue < 8556 ) sResult = "Lose ability to cast spells for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 8570 ) sResult = "Permanent -1 to damage rolls";
        else if (nRollValue < 8585 ) sResult = "Permanent -1 to-hit";
        else if (nRollValue < 8589 ) sResult = "Permanent -2 to dmaage rolls";
        else if (nRollValue < 8592 ) sResult = "Drug Addiction (GM chooses substance)";
        else if (nRollValue < 8640 ) sResult = "Lose 50 fractional points from " + CharBackgroundManagerPO.getAbilityScore() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 8664 ) sResult = "Lose 1 point from " + CharBackgroundManagerPO.getAbilityScore() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 8676 ) sResult = "Lose 2 points from " + CharBackgroundManagerPO.getAbilityScore() + " for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 8696 ) sResult = "Lose 50 fraction points from each ability score for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 8716 ) sResult = "Lose a point from each ability score for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 8736 ) sResult = "Lose 2 pointsfrom each ability score for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 8743 ) sResult = "Permanent -2 to-hit";
        else if (nRollValue < 8793 ) sResult = "All memorized spells go off simultaneously";
        else if (nRollValue < 8798 ) sResult = "Summon hostile monsters (MS6)"; // MS6, TODO
        else if (nRollValue < 8802 ) sResult = "Summon hostile monsters (MS7)"; // MS7, todo
        else if (nRollValue < 8809 ) sResult = "Lose sense of touch in fingers permanently (x3 casting time, -4 to hit)";
        else if (nRollValue < 8814 ) sResult = CharBackgroundManagerPO.getBodySide() + " arm goes permanently numb, becoming useless";
        else if (nRollValue < 8821 ) sResult = CharBackgroundManagerPO.getBodySide() + " leg goes permanently numb, becoming useless";
        else if (nRollValue < 8835 ) sResult = "Permanent loss of one random spell";
        else if (nRollValue < 8847 ) sResult = "Permanent -1 to all rolls";
        else if (nRollValue < 8857 ) sResult = "Permanent loss of one spell slot";
        else if (nRollValue < 8887 ) sResult = "Aphasia (speaks random meaningless phrases instead of desired words)";
        else if (nRollValue < 8896 ) sResult = "Contracts leprosy";
        else if (nRollValue < 8901 ) sResult = "Contracts malaria";
        else if (nRollValue < 8907 ) sResult = "Permanent -2 to all rolls";
        else if (nRollValue < 8920 ) sResult = "Permanent loss of two spell slots";
        else if (nRollValue < 8930 ) sResult = "Alignment change - 1 step towards " + CharBackgroundManagerPO.getLawChaos();
        else if (nRollValue < 8940 ) sResult = "Alignment change - 1 step towards " + CharBackgroundManagerPO.getGoodEvil();
        else if (nRollValue < 9040 ) sResult = "Becomes misanthrope permanently";
        else if (nRollValue < 9051 ) sResult = "Sibling (or parent) permanently emits unpleasant odor (-1 to reaction rolls)";
        else if (nRollValue < 9060 ) sResult = "Sibling (or parent) permanently emits vile odor (-3 to reaction rolls)";
        else if (nRollValue < 9075 ) sResult = "Permanently needs 1 hour of extra sleep";
        else if (nRollValue < 9082 ) sResult = "Permanently needs 2 hours of extra sleep";
        else if (nRollValue < 9092 ) sResult = "Conversations with self (thinks others respond) - permanent";
        else if (nRollValue < 9102 ) sResult = "Vision blurred (reduced 50%) permanently";
        else if (nRollValue < 9106 ) sResult = "Lose one talent permanently";
        else if (nRollValue < 9108 ) sResult = "Lose two talents permanently";
        else if (nRollValue < 9115 ) sResult = "Suffer permanent loss of " + (Utilities.getDieResult(6) + 1) + " hit points";
        else if (nRollValue < 9117 ) sResult = "Gain enmity of nefarion";
        else if (nRollValue < 9124 ) sResult = "Is Harmed (as spell)";
        else if (nRollValue < 9129 ) sResult = "Polymorphed to Amphibian - permanently";
        else if (nRollValue < 9216 ) sResult = "Gain Insanity: " + HackmasterFumbles.getInsanity();
        else if (nRollValue < 9236 ) sResult = "Now hates one sibling (or parent)";
        else if (nRollValue < 9246 ) sResult = "Now hated by one sibling (or parent)";
        else if (nRollValue < 9253 ) sResult = "Change race to " + CharBackgroundManagerPO.getRandomRace() + " permanently";
        else if (nRollValue < 9257 ) sResult = "Becomes {10d4} years younger";
        else if (nRollValue < 9261 ) sResult = "Lose {1d8} points of Honor";
        else if (nRollValue < 9263 ) sResult = "Lose {2d4} points of Honor";
        else if (nRollValue < 9273 ) sResult = "Enervated - lose 1 experience level for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 9278 ) sResult = "Enervated - lose 2 experience levels for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 9303 ) sResult = "Amnesia back 1 week";
        else if (nRollValue < 9323 ) sResult = "Amnesia back 1 month";
        else if (nRollValue < 9359 ) sResult = "Permanent loss of {1d20}% to one skill (determine randomly)";
        else if (nRollValue < 9377 ) sResult = "Permanent loss of {1d100}% to one skill (determine randomly)";
        else if (nRollValue < 9386 ) sResult = "Suffer permanent loss of {1d4} hit points";
        else if (nRollValue < 9406 ) sResult = "Dyslexia (x3 time to read anything, including spellbooks) for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 9446 ) sResult = "Loss of {1d20}% to one skill (determine randomly) for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 9471 ) sResult = "Loss of {1d100}% to one skill (determine randomly) for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 9485 ) sResult = "Lethargy (-2 to-hit, -2 to damage, double all initiative times, movement is halved) for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 9505 ) sResult = "Amnesia back 6 months";
        else if (nRollValue < 9515 ) sResult = "Amnesia back 1 year";
        else if (nRollValue < 9520 ) sResult = "Amnesia back 2 years";
        else if (nRollValue < 9522 ) sResult = "Amnesia back 5 years";
        else if (nRollValue < 9523 ) sResult = "Amnesia back 10 years";
        else if (nRollValue < 9548 ) sResult = "Decides he must switch classes";
        else if (nRollValue < 9578 ) sResult = "Unable to sleep for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 9618 ) sResult = "Uncontrollable weight gain - 1 pound per week for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 9642 ) sResult = "Bulimia for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 9657 ) sResult = "Permanently unable to sleep";
        else if (nRollValue < 9664 ) sResult = "Permanent lethary (-2 to-hit, -2 to damage, double all initiative times, movement is halved)";
        else if (nRollValue < 9689 ) sResult = "Permanent -50 fractional points to " + CharBackgroundManagerPO.getAbilityScore();
        else if (nRollValue < 9709 ) sResult = "Permanent -1 to " + CharBackgroundManagerPO.getAbilityScore();
        else if (nRollValue < 9714 ) sResult = "Permanent -2 to " + CharBackgroundManagerPO.getAbilityScore();
        else if (nRollValue < 9724 ) sResult = "Spontaneous combustion! Bursts into flame and suffers " + Utilities.getDiceResult(6, 8) + " points of damage";
        else if (nRollValue < 9744 ) sResult = "Sibling (or parent) suffers uncontrollable weight gain of 1 pound per week for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 9764 ) sResult = "Gains appearance of undead (-15 Comeliness, -5 Charisma) for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 9774 ) sResult = "Sibling (or parent) suffers uncontrollable weight gain of 1 pound per week permanently";
        else if (nRollValue < 9794 ) sResult = "Permanent uncontrollable weight gain (1 pound per week)";
        else if (nRollValue < 9797 ) sResult = "Permanent -50 fraction points to each ability score";
        else if (nRollValue < 9799 ) sResult = "Permament -1 to each ability score";
        else if (nRollValue < 9800 ) sResult = "Permanent -2 to each ability score";
        else if (nRollValue < 9806 ) sResult = "Suffer permanent loss of {2d6} hit points";
        else if (nRollValue < 9815 ) sResult = "Anorexia (lose 1-2 pounds per week) - permanent until cured or death";
        else if (nRollValue < 9818 ) sResult = "Polymorphed into Primate permanently";
        else if (nRollValue < 9828 ) sResult = "Permanent bulimia";
        else if (nRollValue < 9833 ) sResult = "Suffer permanent loss of {3d6} hit points";
        else if (nRollValue < 9843 ) sResult = "Permanent dyslexia (x3 time to read anything, including spell books)";
        else if (nRollValue < 9849 ) sResult = "Enters coma for " + HackmasterFumbles.getMishapDuration();
        else if (nRollValue < 9859 ) sResult = "Lose one class-specific ability permanently";
        else if (nRollValue < 9862 ) sResult = "Lose two class-specific abilities permanently";
        else if (nRollValue < 9872 ) sResult = "Lose ability to cast spells permanently";
        else if (nRollValue < 9874 ) sResult = "All magic items on person are Disjoined (as per Hyptor's Disjunction";
        else if (nRollValue < 9877 ) sResult = "Enters permanent coma";
        else if (nRollValue < 9887 ) sResult = "Gains appears of undead (-15 Comeliness, -5 Charisma) permanently";
        else if (nRollValue < 9894 ) sResult = "Energy Drain: Lose 1 experience level";
        else if (nRollValue < 9899 ) sResult = "Energy Drain: Lose 2 experience levels";
        else if (nRollValue < 9900 ) sResult = "Spontaneous combustion! Bursts into flame and immediately dies.";
        else if (nRollValue < 9901 ) sResult = "Chokes to death in 1 round";
        else sResult = HackmasterFumbles.getMishapResult() + " and " + HackmasterFumbles.getMishapResult();
        
        return HackmasterFumbles.replaceRolls(sResult);
    }

    static getMishapDuration(nRollValue){
        if (!nRollValue) nRollValue = Utilities.getDieResult(100);
        
        if (nRollValue < 17 ) return Utilities.getDieResult(24) + " hours";
        else if (nRollValue < 31 )	return Utilities.getDieResult(6) + " days";
        else if (nRollValue < 46 )	return Utilities.getDieResult(4) + " weeks";
        else if (nRollValue < 61 )	return Utilities.getDieResult(12) + " months";
        else if (nRollValue < 71 )	return Utilities.getDieResult(12) + 12 + " months";
        else if (nRollValue < 81 )	return Utilities.getDieResult(3) + 1 + " years";
        else if (nRollValue < 91 )	return Utilities.getDieResult(4) + 3 + " years";
        else if (nRollValue < 96 )	return Utilities.getDieResult(14) + 6 + " years";
        else{
            let sDuration = HackmasterFumbles.getMishapDuration(Utilities.getDieResult(95));
            let sRecurrenceRate = HackmasterFumbles.getMishapDuration(Utilities.getDieResult(95));
            return "Chronic. Lasts " + sDuration + " and recurs every " + sRecurrenceRate;
        }	
    }

    static getPhobia(nRollValue){
        if (!nRollValue == 1 ) return "fear of the color(s) " + HackmasterFumbles.getColorChange(Utilities.getDieResult(88));
        else if (nRollValue == 2 )	return "Ablutophobia (washing, bathing)";
        else if (nRollValue == 3 )	return "Acousticaphobia (sounds)";
        else if (nRollValue == 4 )	return "Acrophobia (heights)";
        else if (nRollValue == 5 )	return "Aerophobia (drafts, air swallowing, or airborne noxious substances)";
        else if (nRollValue == 6 )	return "Agateophobia (insanity)";
        else if (nRollValue == 7 )	return "Agiliophobia (pain)";
        else if (nRollValue == 8 )	return "Agoraphobia (open spaces)";
        else if (nRollValue == 9 )	return "Alliumphobia (garlic)";
        else if (nRollValue == 10 ) return "Animals (see quirk)";
        else if (nRollValue == 11 ) return "Antrophobia (flowers)";
        else if (nRollValue == 12 ) return "Anthraxaphobia (Anthraxians)";
        else if (nRollValue == 13 ) return "Arachnophobia (spiders)";
        else if (nRollValue == 14 ) return "Arcanophobia (magic)";
        else if (nRollValue == 15 ) return "Arithmophobia (numbers)";
        else if (nRollValue == 16 ) return "Aurophobia (gold)";
        else if (nRollValue == 17 ) return "Autodysomophobia (emitting a vile odor)";
        else if (nRollValue == 18 ) return "Bibliophobia (books, the written word)";
        else if (nRollValue == 19 ) return "Caligynephobia or Venustraphobia (beautiful women)";
        else if (nRollValue == 20 ) return "Chaetophobia (hair)";
        else if (nRollValue == 21 ) return "Chionophobia (snow)";
        else if (nRollValue == 22 ) return "Chlorophobia (plants)";
        else if (nRollValue == 23 ) return "Chorophobia (dancing)";
        else if (nRollValue == 24 ) return "Chrometophobia (money)";
        else if (nRollValue == 25 ) return "Claustrophobia (closed spaces)";
        else if (nRollValue == 26 ) return "Coulrophobia (clowns)";
        else if (nRollValue == 27 ) return "Crystallophobia (crystal, glass)";
        else if (nRollValue == 28 ) return "Deipnophobia (dining or dinner conversations)";
        else if (nRollValue == 29 ) return "Dendrophobia (trees)";
        else if (nRollValue == 30 ) return "Donutiphobia (baked goods)";
        else if (nRollValue == 31 ) return "Doraphobia (fur or skins of animals)";
        else if (nRollValue == 32 ) return "Dracovideriphobia (pseudo-dragons)";
        else if (nRollValue == 33 ) return "Eisoptrophobia (mirrors or of seeing oneself in a mirror)";
        else if (nRollValue == 34 ) return "Enissophobia (criticism)";
        else if (nRollValue == 35 ) return "Epistaxiophobia (nosebleeds)";
        else if (nRollValue == 36 ) return "Ferrophobia (iron, steel)";
        else if (nRollValue == 37 ) return "Gamophobia (marriage)";
        else if (nRollValue == 38 ) return "Geliophobia (laughter)";
        else if (nRollValue == 39 ) return "Gerontophobia (old people or of growing old)";
        else if (nRollValue == 40 ) return "Heresyphobia or Hereiophobia (challenges to official doctrine or of radical deviation)";
        else if (nRollValue == 41 ) return "Heterophobia (the opposite sex)";
        else if (nRollValue == 42 ) return "Hobophobia (bums, beggars)";
        else if (nRollValue == 43 ) return "Homilophobia (sermons)";
        else if (nRollValue == 44 ) return "Hydrophobia (water)";
        else if (nRollValue == 45 ) return "Ichthyophobia (fish)";
        else if (nRollValue == 46 ) return "Incantiphobia (casting spells, spell casters)";
        else if (nRollValue == 47 ) return "Kathisophobia (sitting down)";
        else if (nRollValue == 48 ) return "Kleptophobia (stealing, theft)";
        else if (nRollValue == 49 ) return "Koboldophobia (kobolds)";
        else if (nRollValue == 50 ) return "Limnophobia (lakes)";
        else if (nRollValue == 51 ) return "Llamophobia (llamas)";
        else if (nRollValue == 52 ) return "Lygophobia (darkness)";
        else if (nRollValue == 53 ) return "Maniaphobia (insanity)";
        else if (nRollValue == 54 ) return "Melophobia (fear or hatred of music)";
        else if (nRollValue == 55 ) return "Metallophobia (metal)";
        else if (nRollValue == 56 ) return "Methyphobia or Potophobia (alcohol)";
        else if (nRollValue == 57 ) return "Necrophobia (dead things)";
        else if (nRollValue == 58 ) return "Nephophobia (clouds)";
        else if (nRollValue == 59 ) return "Nomatophobia (names)";
        else if (nRollValue == 60 ) return "Ochlophobia (crowds, mobs)";
        else if (nRollValue == 61 ) return "Ochophobia (wheels)";
        else if (nRollValue == 62 ) return "Odinophobia (the wrath of Odin)";
        else if (nRollValue == 63 ) return "Odontophobia (teeth)";
        else if (nRollValue == 64 ) return "Oenophobia (wines)";
        else if (nRollValue == 65 ) return "Class (" + CharBackgroundManagerPO.getRandomClass() + ")";
        else if (nRollValue == 66 ) return "Race (" + CharBackgroundManagerPO.getRandomRace() + ")"; 
        else if (nRollValue == 67 ) return "Pagophobia (ice, frost)";
        else if (nRollValue == 68 ) return "Papyrophobia (paper, papyrus, etc)";
        else if (nRollValue == 69 ) return "Pediophobia (dolls)";
        else if (nRollValue == 60 ) return "Pedophobia (children)";
        else if (nRollValue == 71 ) return "Peladophobia (bald people)";
        else if (nRollValue == 72 ) return "Peniaphobia (poverty)";
        else if (nRollValue == 73 ) return "Pharmacophobia (drugs)";
        else if (nRollValue == 74 ) return "Phengophobia (sunshine)";
        else if (nRollValue == 75 ) return "Phobophobias (phobias)";
        else if (nRollValue == 76 ) return "Photophobia (light)";
        else if (nRollValue == 77 ) return "Plutophobia (wealth)";
        else if (nRollValue == 78 ) return "Pluviophobia (rain, being rained on)";
        else if (nRollValue == 79 ) return "Pocrescophobia (gaining weight)";
        else if (nRollValue == 80 ) return "Podophobia (feet)";
        else if (nRollValue == 81 ) return "Pogonophobia (beards)";
        else if (nRollValue == 82 ) return "Potamophobia (rivers or running water)";
        else if (nRollValue == 83 ) return "Pyrophobia (fire)";
        else if (nRollValue == 84 ) return "Rhabdophobia (magic items)";
        else if (nRollValue == 85 ) return "Rupophobia (dirt)";
        else if (nRollValue == 86 ) return "Selenophobia (the moon)";
        else if (nRollValue == 87 ) return "Sesquipedalophobia (long words)";
        else if (nRollValue == 88 ) return "Sitophobia or Sitiophobia (food, eating)";
        else if (nRollValue == 89 ) return "Sominphobia (sleep)";
        else if (nRollValue == 90 ) return "Statuphobia (stress)";
        else if (nRollValue == 91 ) return "Staurophobia (religious symbols)";
        else if (nRollValue == 92 ) return "Teluphobia (weapons)";
        else if (nRollValue == 93 ) return "Thanatophobia (death or dying)";
        else if (nRollValue == 94 ) return "Tonitrophobia (thunder)";
        else if (nRollValue == 95 ) return "Trichophobia (hair)";
        else if (nRollValue == 96 ) return "Triskaidekaphobia (the number 13)";
        else if (nRollValue == 97 ) return "Vestiphobia (clothing)";
        else if (nRollValue == 98 ) return "Xenophobia (foreigners, outsiders)";
        else if (nRollValue == 99 ) return "Xylophobia (wood, forests)";
        else return "Zoophobia (animals (all kinds))";        
    }

    static getInsanity(nRollValue){
        if (!nRollValue) nRollValue = Utilities.getDieResult(100);
        
        if (nRollValue < 5 ) return "gender Delusion";
        else if (nRollValue < 9 ) return "Racial Delusion";
        else if (nRollValue < 16 )	return "Dipsomania";
        else if (nRollValue < 22 )	return "Schizoid";
        else if (nRollValue < 26 )	return "Monomania";
        else if (nRollValue < 30 )	return "Dementia praecox";
        else if (nRollValue < 35 )	return "Melancholia";
        else if (nRollValue < 41 )	return "Megalomania";
        else if (nRollValue < 45 )	return "Mania";
        else if (nRollValue < 50 )	return "Lunacy";
        else if (nRollValue < 56 )	return "Phobia: " + HackmasterFumbles.getPhobia();
        else if (nRollValue < 59 )	return "Manic-depressive";
        else if (nRollValue < 64 )	return "Hallucinatory insanity";
        else if (nRollValue < 69 )	return "Homicidal maniac";
        else if (nRollValue < 72 )	return "Hebephrenia";
        else if (nRollValue < 75 )	return "Suicidal mania";
        else if (nRollValue < 79 )	return "Catatonia";
        else if (nRollValue < 85 )	return "Heroic idiocy";
        else if (nRollValue < 90 )	return "Masochism";
        else if (nRollValue < 95 )	return "Sadistic (as per major mental quirk)";
        else if (nRollValue < 99 )	return "Sado-masochism";
        else return HackmasterFumbles.getInsanity() + " and " + HackmasterFumbles.getInsanity();
    }

    static getColorChange(nRollValue){
        if (!nRollValue ) nRollValue = Utilities.getDieResult(100);
        
        if (nRollValue < 10 )	return "Red";
        else if (nRollValue < 19 )	return "Orange";
        else if (nRollValue < 28 )	return "Yellow";
        else if (nRollValue < 37 )	return "Green";
        else if (nRollValue < 46 )	return "Blue";
        else if (nRollValue < 55 )	return "Purple";
        else if (nRollValue < 64 )	return "Pink";
        else if (nRollValue < 73 )	return "Black";
        else if (nRollValue < 83 )	return "White";
        else if (nRollValue < 89 )	return HackmasterFumbles.getColorChange() + " and " + HackmasterFumbles.getColorChange();
        else if (nRollValue < 93 )	return HackmasterFumbles.getColorChange(Utilities.getDieResult(88)) + " Geometric Designs";
        else if (nRollValue < 97 )	return HackmasterFumbles.getColorChange(Utilities.getDieResult(88)) + " Striped";
        else return HackmasterFumbles.getColorChange(Utilities.getDieResult(88)) + " Polka Dot";       
    }

    static getUnarmedHackmasterFumbleResult(nRollValue){
        let sResult = "";
        if (nRollValue >= 1000 ) sResult = "knocks self unconscious"
        else if (nRollValue >= 997 ) sResult = "slams head into floor, must save vs breath weapon or fall unconscious for {2d6} minutes / if npc immediate morale check (if conscious)"
        else if (nRollValue >= 988 ) sResult = "fall prone"
        else if (nRollValue >= 983 ) sResult = "slip, opponent gains +2 to-hit next attack, must save vs breath weapon or fall prone"
        else if (nRollValue >= 974 ) sResult = "hinder ally; ally at -2 to-hit for {1d4} rounds / allay at +{1d4} initiative next round"
        else if (nRollValue >= 968 ) sResult = "compound leg fracture; move x1/4 for 1 week, suffers {1d4} points of damage / save at -1 / -2 to-hit / opponents gain +2 to-hit for {1d3} days / if npc immediate morale check"
        else if (nRollValue >= 964 ) sResult = "tear muscle badly; move x1/4 for 1 day / suffers 1 point of damage / -4 to-hit / save at -2 for 1 day"
        else if (nRollValue >= 960 ) sResult = "severe strain; move x1/3 for 1 turn / saves -3 / if npc immediate morale check"
        else if (nRollValue >= 956 ) sResult = "simple bone fracture; move x1/3, for one month / suffers 1 point of damage / -1 to-hit for 1 week"
        else if (nRollValue >= 951 ) sResult = "hairline bone fracture; move x1/2 for 1 month / suffers 1 point of damage / save at -1 / opponents gain +2 t hit for 1d12 hours"
        else if (nRollValue >= 948 ) sResult = "muscle tear; move x1/2 for 1 week / suffers 1 point of damage /-2 to-hit / save at -1 for {1d3} days / if npc immediate morale check"
        else if (nRollValue >= 945 ) sResult = "bad leg crap (or similar limb); movex2/3 for 1 day / saves at -3"
        else if (nRollValue >= 941 ) sResult = "leg cramp (or similar limb); move x2/3 for 1 turn / saves at -3"
        else if (nRollValue >= 936 ) sResult = "bad sprain; move -3 for 1 day / saves at -3 / if npc immediate morale check"
        else if (nRollValue >= 932 ) sResult = "hyperextension;move -3 for 1 turn / saves at -3 "
        else if (nRollValue >= 926 ) sResult = "sprain leg (or similar limb);move -2 for {1d3} days / saves at -2 / if npc immediate morale check"
        else if (nRollValue >= 922 ) sResult = "pull leg (or similar limb);move -2 for 1 day / saves at -2"
        else if (nRollValue >= 916 ) sResult = "internal bleeding;move -2 for 1 turn / saves at -2"
        else if (nRollValue >= 908 ) sResult = "sprain leg (or similar limb);move -1 for 1 day / saves at -1"
        else if (nRollValue >= 903 ) sResult = "pull leg (or similar limb);move -1 for 1 turn / saves at -1"
        else if (nRollValue >= 896 ) sResult = "slip badly;opponent gains +4 to-hit for 1 round / initiative +{1d6} on next round"
        else if (nRollValue >= 889 ) sResult = "falls towards opponent's weapon;opponent gains +4 to-hit for attack / initiative +{1d4} on next round"
        else if (nRollValue >= 884 ) sResult = "severely off-balanced;opponent gains +3 to-hit for {1d6} rounds / initiative +{1d4} on next round"
        else if (nRollValue >= 879 ) sResult = "severely off-balanced;opponent gains +3 to-hit for 2 rounds / initiative +{1d4} on next round"
        else if (nRollValue >= 872 ) sResult = "off-balanced; opponent gains +3 to-hit for 1 round / initiative +{1d3} on next round"
        else if (nRollValue >= 865 ) sResult = "off-balanced;opponent gains +3 to-hit next attack / initiative +{1d3} on next round"
        else if (nRollValue >= 858 ) sResult = "severely off-balanced; opponent gains +2 to-hit for {1d6} rounds / initiative +{1d3} on next round"
        else if (nRollValue >= 850 ) sResult = "severely off-balanced; opponent gains +2 to-hit for 2 rounds / initiative +!d3 on next round"
        else if (nRollValue >= 842 ) sResult = "off-balanced; opponent gains +2 to-hit for 1 round / initiative +{1d3} on next round"
        else if (nRollValue >= 834 ) sResult = "off-balanced; opponent gains +2 to-hit next attack / initiative +1 on next round"
        else if (nRollValue >= 826 ) sResult = "severely off-balanced; opponent gains +1 to-hit for {1d6} rounds / initiative +{1d3} on next round"
        else if (nRollValue >= 807 ) sResult = "off-balance; opponent gains +1 to-hit for 1 round / initiative +1 on next round"
        else if (nRollValue >= 796 ) sResult = "off-balance; opponent gains +1 to-hit next attack / initiative +1 on next round"
        else if (nRollValue >= 782 ) sResult = "bad muscle pull;move -1, 1 day / saves at -1 for 1 day / opponent gains +1 to-hit for {1d4} rounds"
        else if (nRollValue >= 772 ) sResult = "hit ally, {2d6} points or hit self, 10% change of paralyzing self"
        else if (nRollValue >= 767 ) sResult = "hit ally, 1d10 points or hit self, 10% change of paralyzing self"
        else if (nRollValue >= 759 ) sResult = "hit ally, {1d8} points or hit self, 8% change of paralyzing self"
        else if (nRollValue >= 749 ) sResult = "hit ally, normal damage or hit self, 5% change of paralyzing self"
        else if (nRollValue >= 731 ) sResult = "hit ally, {1d6} points or hit self, 4% change of paralyzing self"
        else if (nRollValue >= 718 ) sResult = "hit ally, {1d4} points or hit self, 3% change of paralyzing self"
        else if (nRollValue >= 704 ) sResult = "hit ally, {1d4}-1 points or hit self, 2% chance of paralyzing self"
        else if (nRollValue >= 693 ) sResult = "hit ally, {1d4}-2 points or hit self, 2% chance of paralyzing self"
        else if (nRollValue >= 679 ) sResult = "hit ally, 1 point or hit self, 1% chance of paralyzing self"
        else if (nRollValue >= 664 ) sResult = "may hit ally, roll attack normally"
        else if (nRollValue >= 645 ) sResult = "damage to self, {2d6} points / if npc immediate morale check"
        else if (nRollValue >= 640 ) sResult = "damage to self, 1d10 points"
        else if (nRollValue >= 632 ) sResult = "damage to self, {1d8} points"
        else if (nRollValue >= 622 ) sResult = "damage to self, normal damage"
        else if (nRollValue >= 604 ) sResult = "damage to self, {1d6} points"
        else if (nRollValue >= 594 ) sResult = "damage to self, {1d4} points"
        else if (nRollValue >= 580 ) sResult = "damage to self, {1d4}-1 points"
        else if (nRollValue >= 570 ) sResult = "damage to self, {1d4}-2 points"
        else if (nRollValue >= 558 ) sResult = "damage to self, 1 point"
        else if (nRollValue >= 545 ) sResult = "may hit self, roll attack normally"
        else if (nRollValue >= 531 ) sResult = "back strain; saves at -3 for 1 turn / if npc immediate morale check"
        else if (nRollValue >= 526 ) sResult = "severe dizziness; saves at -3 for {1d4} rounds / if npc immediate morale check"
        else if (nRollValue >= 521 ) sResult = "whiplash; saves at -3 for 1 round"
        else if (nRollValue >= 516 ) sResult = "overextended; saves at -2 for 1 turn"
        else if (nRollValue >= 510 ) sResult = "overextended; saves at -2 for {1d4} rounds"
        else if (nRollValue >= 504 ) sResult = "overextended; saves at -2 for 1 round"
        else if (nRollValue >= 498 ) sResult = "overextended; saves at -1 for 1 turn"
        else if (nRollValue >= 490 ) sResult = "accidentally swallowed dust, insect or tooth;saves at -1 for {1d4} rounds"
        else if (nRollValue >= 481 ) sResult = "overextended; saves at -1 for 1 round"
        else if (nRollValue >= 471 ) sResult = "slip badly; opponent gains +4 to-hit for 1 round"
        else if (nRollValue >= 466 ) sResult = "falls towards opponent's weapon; opponent gains +4 to-hit next attack"
        else if (nRollValue >= 461 ) sResult = "severely off-balanced; opponent gains +3 to-hit for {1d6} rounds"
        else if (nRollValue >= 455 ) sResult = "severely off-balanced; opponent gains +3 to-hit for 2 rounds"
        else if (nRollValue >= 449 ) sResult = "off-balanced; opponent gains +3 to-hit for 1 round"
        else if (nRollValue >= 442 ) sResult = "off-balanced; opponent gains +3 to-hit next attack"
        else if (nRollValue >= 434 ) sResult = "severely off-balanced; opponent at +2 to-hit for {1d6} rounds"
        else if (nRollValue >= 426 ) sResult = "severely off-balanced; opponent gains +2 to-hit for 2 rounds"
        else if (nRollValue >= 409 ) sResult = "off-balanced; opponent gains +2 to-hit for 1 round"
        else if (nRollValue >= 400 ) sResult = "severely off-balanced; opponent gains +1 to-hit for {1d6} rounds"
        else if (nRollValue >= 392 ) sResult = "severely off-balanced; opponent gains +1 to-hit for 2 rounds"
        else if (nRollValue >= 383 ) sResult = "breaks tooth; opponent gains +1 to-hit for 1 round"
        else if (nRollValue >= 371 ) sResult = "off-balance; opponent at +1 to-hit next attack"
        else if (nRollValue >= 356 ) sResult = "bad pull; move x1/4, 1 day / saves t -3 for 1 day / immediate morale check if npc"
        else if (nRollValue >= 352 ) sResult = "pull; move x1/4, 1 day / saves -3 for 1 day"
        else if (nRollValue >= 348 ) sResult = "bad pull; move x1/4, 1 turn"
        else if (nRollValue >= 344 ) sResult = "very bad pull; move x1/3, 1 day / saves at -3 for 1 day"
        else if (nRollValue >= 340 ) sResult = "twisted ankle;move x1/3,1 day"
        else if (nRollValue >= 335 ) sResult = "very bad pull; move x1/3, 1 turn"
        else if (nRollValue >= 330 ) sResult = "severe strain; move x1/2, 1 day / saves at -3 for 1 day"
        else if (nRollValue >= 326 ) sResult = "severe leg crap; move x1/2, 1 turn / saves at -3 for 1 turn"
        else if (nRollValue >= 322 ) sResult = "severe strain; move x1/2, 1 day"
        else if (nRollValue >= 317 ) sResult = "severe leg crap; move 1/2, 1 turn"
        else if (nRollValue >= 312 ) sResult = "strain limb; move x2/3, 1 week"
        else if (nRollValue >= 308 ) sResult = "bad leg(or similar limb) cramp; move x2/3, 1 day"
        else if (nRollValue >= 297 ) sResult = "bad sprain; move -3, 1 week"
        else if (nRollValue >= 292 ) sResult = "hyperextention; move -3, 1 day"
        else if (nRollValue >= 286 ) sResult = "hyperextention; move -3, 1 turn"
        else if (nRollValue >= 280 ) sResult = "sprain leg (or similar limb); move -2, 1 week"
        else if (nRollValue >= 275 ) sResult = "pull leg (or similar limb); move -2, 1 day"
        else if (nRollValue >= 269 ) sResult = "pull leg (or similar limb); move -2, 1 turn"
        else if (nRollValue >= 262 ) sResult = "sprain leg (or similar limb); move -1, 1 week"
        else if (nRollValue >= 257 ) sResult = "pull leg (or similar limb); move -1, 1 day"
        else if (nRollValue >= 251 ) sResult = "pull leg (or similar limb); move -1, 1 turn"
        else if (nRollValue >= 244 ) sResult = "broken finger(or similar limb); -5 to-hit, 1 turn"
        else if (nRollValue >= 240 ) sResult = "broken pinky (or similar limb); -5 to hit, {1d4} rounds"
        else if (nRollValue >= 235 ) sResult = "bad pull; -4 to-hit, {1d6} minutes"
        else if (nRollValue >= 229 ) sResult = "pull muscle; -4 to-hit, 1 turn"
        else if (nRollValue >= 222 ) sResult = "strain limb; -4 to-hit, {1d8} rounds"
        else if (nRollValue >= 215 ) sResult = "overextended; -4 to-hit, {1d4} rounds"
        else if (nRollValue >= 205 ) sResult = "off-balance; -4 to hit, 1 round"
        else if (nRollValue >= 198 ) sResult = "bad pull; -3 to-hit, {1d6} minutes"
        else if (nRollValue >= 190 ) sResult = "pull muscle; -3 to-hit, 1 turn"
        else if (nRollValue >= 182 ) sResult = "strain limb; -3 to-hit, {1d8} rounds"
        else if (nRollValue >= 174 ) sResult = "overextended; -3 to-hit, {1d4} rounds"
        else if (nRollValue >= 166 ) sResult = "off-balance; -3 to hit, 1 round"
        else if (nRollValue >= 158 ) sResult = "bad pull; -2 to-hit, {1d6} minutes"
        else if (nRollValue >= 151 ) sResult = "pull muscle; -2 to-hit, 1 turn"
        else if (nRollValue >= 142 ) sResult = "strain limb; -2 to-hit, {1d8} rounds"
        else if (nRollValue >= 133 ) sResult = "overextended; -2 to-hit, {1d4} rounds"
        else if (nRollValue >= 124 ) sResult = "off-balance; -2 to hit, 1 round"
        else if (nRollValue >= 114 ) sResult = "bad pull; -1 to-hit, {1d6} minutes"
        else if (nRollValue >= 106 ) sResult = "pull muscle; -1 to-hit, 1 turn"
        else if (nRollValue >= 96 ) sResult = "strain limb; -1 to-hit, {1d8} rounds"
        else if (nRollValue >= 86 ) sResult = "overextended; -1 to-hit, {1d4} rounds"
        else if (nRollValue >= 75 ) sResult = "off-balance; -1 to-hit, 1 round"
        else if (nRollValue >= 62 ) sResult = "Severly off-balanced; Lose next attack"
        else if (nRollValue >= 56 ) sResult = "overextended thrust; initiative +{1d6} on next round"
        else if (nRollValue >= 48 ) sResult = "bites inside of cheek; initiative +{1d4} on next round"
        else if (nRollValue >= 37 ) sResult = "off-balance;initiative +{1d3} on next round"
        else if (nRollValue >= 25 ) sResult = "off-balance; initiative + 1 on next round"
        else if (nRollValue >= 12 ) sResult = "Slaps/Claws/bites self - looks funny"
        else sResult = "Would have hit, but slips away at last moment"
        
        return HackmasterFumbles.replaceRolls(sResult);
    }

    static getNormalHackmasterFumbleResult(nRollValue){
        let sResult = "";
        if (nRollValue >= 985 ) sResult = "Clumsiness; Slip, opponent gains +2 to next to hit roll, -4 Dex for one round and make check vs. 1/2 Dex or fall prone"
        else if (nRollValue >= 969 ) sResult = "Clumsiness; overextended, opponent gains +2 to next to-hit"  
        else if (nRollValue >= 953 ) sResult = "Clumsiness; off balance +{1d4} penalty to next initiative"  
        else if (nRollValue >= 937 ) sResult = "Clumsiness; hinder ally - takes +{1d6} initiative penalty, suffers -{1d4+1} to hit penalty on next attack or have 25% chance of hitting you"  
        else if (nRollValue >= 921 ) sResult = "Clumsiness; overextended +d4 penalty to next initiative, opponent gains +2 to next attack roll"  
        else if (nRollValue >= 904 ) sResult = "Hinderance; distracted, -4 to hit and no Dex bonus to AC for 1 round"  
        else if (nRollValue >= 886 ) sResult = "Hinderance; nearby ally is automatically hit"  
        else if (nRollValue >= 869 ) sResult = "Hinderance; blood in eyes -3 to hit for 1 turn"  
        else if (nRollValue >= 851 ) sResult = "Hinderance; sweat in eyes -1 to hit for 1 round"  
        else if (nRollValue >= 821 ) sResult = "Equipment Mishap; shield strap breaks, -3 to hit until repaired or discarded"  
        else if (nRollValue >= 814 ) sResult = "Equipment Mishap; armor strap breaks, +1 AC penalty and -1 to hit until repaired"  
        else if (nRollValue >= 791 ) sResult = "Equipment Mishap; armor loosened, -1 to hit until readjusted (by redonning or by another person helping for 1 round)"  
        else if (nRollValue >= 761 ) sResult = "Equipment Mishap; belt, girdle, etc. breaks"  
        else if (nRollValue >= 716 ) sResult = "Equipment Mishap; backpack, pouch or other container strap breaks, -1 to hit until item repaired or discarded"  
        else if (nRollValue >= 701 ) sResult = "Equipment Mishap; boot/footgear breaks, -1 to hit until repaired or discarded"  
        else if (nRollValue >= 661 ) sResult = "Weapon damaged/broken; edge dulled, nicked and/or cracked (-1 to hit & damage)"  
        else if (nRollValue >= 651 ) sResult = "Weapon damaged/broken; blade/head sheared/cracked -50% to dmg"  
        else if (nRollValue >= 631 ) sResult = "Weapon damaged/broken; blade/head badly broken -2 dmg"  
        else if (nRollValue >= 611 ) sResult = "Weapon damaged/broken; handle badly broken -2 to hit"  
        else if (nRollValue >= 601 ) sResult = "Weapon damaged/broken; sheared (useless)"  
        else if (nRollValue >= 591 ) sResult = "Weapon damaged/broken; handle/haft sheared (useless)"  
        else if (nRollValue >= 581 ) sResult = "Weapon damaged/broken; blade shattered (useless)"  
        else if (nRollValue >= 541 ) sResult = "Weapon damaged/broken; blade/head broken -1 to damage"  
        else if (nRollValue >= 501 ) sResult = "Weapon damaged/broken; handle broken -1 to hit"  
        else if (nRollValue >= 401 ) sResult = "Damage to ally, make Dex check to deliver only half damage"  
        else if (nRollValue >= 359 ) sResult = "Damage own armor for {1d3} points"  
        else if (nRollValue >= 358 ) sResult = "Non-wpn injury to self; hyperext}ed back,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1d6} turns, {1d20}% temporal honor reduction."  
        else if (nRollValue >= 355 ) sResult = "Non-wpn injury to self; hyperext}ed neck,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1d6} turns, {1d20}% temporal honor reduction."  
        else if (nRollValue >= 354 ) sResult = "Non-wpn injury to self; hyperextention left elbow,minus {1d4} to hit for {1d4} days unless magically cured, {1d20}% temporal honor reduction."  
        else if (nRollValue >= 353 ) sResult = "Non-wpn injury to self; hyperextention left shoulder,minus {1d4} to hit for {1d4} days unless magically cured, {1d20}% temporal honor reduction."  
        else if (nRollValue >= 352 ) sResult = "Non-wpn injury to self; hyperextention left wrist,minus {1d4} to hit for {1d4} days unless magically cured, {1d20}% temporal honor reduction."  
        else if (nRollValue >= 351 ) sResult = "Non-wpn injury to self; hyperextention left hip,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1d6} turns, {1d20}% temporal honor reduction."  
        else if (nRollValue >= 349 ) sResult = "Non-wpn injury to self; hyperextention left knee,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns, {1d20}% temporal honor reduction."  
        else if (nRollValue >= 347 ) sResult = "Non-wpn injury to self; hyperextention left ankle,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns, {1d20}% temporal honor reduction."  
        else if (nRollValue >= 346 ) sResult = "Non-wpn injury to self; hyperextention left foot,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns, {1d20}% temporal honor reduction."  
        else if (nRollValue >= 345 ) sResult = "Non-wpn injury to self; hyperextention right elbow,minus {1d4} to hit for {1d4} days unless magically cured, {1d20}% temporal honor reduction."  
        else if (nRollValue >= 343 ) sResult = "Non-wpn injury to self; hyperextention right shoulder,minus {1d4} to hit for {1d4} days unless magically cured, {1d20}% temporal honor reduction."  
        else if (nRollValue >= 342 ) sResult = "Non-wpn injury to self; hyperextention right wrist,minus {1d4} to hit for {1d4} days unless magically cured, {1d20}% temporal honor reduction."  
        else if (nRollValue >= 341 ) sResult = "Non-wpn injury to self; hyperextention right hip,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns, {1d20}% temporal honor reduction."  
        else if (nRollValue >= 340 ) sResult = "Non-wpn injury to self; hyperextention right knee,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns, {1d20}% temporal honor reduction."  
        else if (nRollValue >= 338 ) sResult = "Non-wpn injury to self; hyperextention right ankle,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns, {1d20}% temporal honor reduction."  
        else if (nRollValue >= 337 ) sResult = "Non-wpn injury to self; hyperextention right foot,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns, {1d20}% temporal honor reduction."  
        else if (nRollValue >= 319 ) sResult = "Non-wpn injury to self, pulled muscle, Roll on crit (puncture) chart until reasonable result attained"  
        else if (nRollValue >= 318 ) sResult = "Non-wpn injury to self; sprain back,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns"  
        else if (nRollValue >= 317 ) sResult = "Non-wpn injury to self; sprain neck,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns"  
        else if (nRollValue >= 316 ) sResult = "Non-wpn injury to self; sprain left elbow,minus {1d4} to hit for {1d4} days unless magically cured"  
        else if (nRollValue >= 315 ) sResult = "Non-wpn injury to self; sprain left shoulder,minus {1d4} to hit for {1d4} days unless magically cured"  
        else if (nRollValue >= 314 ) sResult = "Non-wpn injury to self; sprain left wrist,minus {1d4} to hit for {1d4} days unless magically cured"  
        else if (nRollValue >= 313 ) sResult = "Non-wpn injury to self; sprain left hip,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns"  
        else if (nRollValue >= 312 ) sResult = "Non-wpn injury to self; sprain left knee,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns"  
        else if (nRollValue >= 311 ) sResult = "Non-wpn injury to self; sprain left ankle,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns"  
        else if (nRollValue >= 310 ) sResult = "Non-wpn injury to self; sprain left foot,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns"  
        else if (nRollValue >= 309 ) sResult = "Non-wpn injury to self; sprain right elbow,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns"  
        else if (nRollValue >= 308 ) sResult = "Non-wpn injury to self; sprain right shoulder,minus {1d4} to hit for {1d4} days unless magically cured"  
        else if (nRollValue >= 307 ) sResult = "Non-wpn injury to self; sprain right wrist,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns"  
        else if (nRollValue >= 306 ) sResult = "Non-wpn injury to self; sprain right hip,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns"  
        else if (nRollValue >= 305 ) sResult = "Non-wpn injury to self; sprain right knee,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns"  
        else if (nRollValue >= 304 ) sResult = "Non-wpn injury to self; sprain right ankle,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns"  
        else if (nRollValue >= 303 ) sResult = "Non-wpn injury to self; sprain right foot,50% movement reduction for 1 round ) 10% for {2d4} rounds, ) 25% for {1{1d6}} turns"  
        else if (nRollValue >= 301 ) sResult = "Non-wpn injury to self; bad twist to back,50% movement reduction for 1 round ) 10% for {2d4} rounds"  
        else if (nRollValue >= 297 ) sResult = "Non-wpn injury to self; bad twist to neck,50% movement reduction for 1 round ) 10% for {2d4} rounds"  
        else if (nRollValue >= 294 ) sResult = "Non-wpn injury to self; bad twist left elbow,50% movement reduction for 1 round ) 10% for {2d4} rounds"  
        else if (nRollValue >= 291 ) sResult = "Non-wpn injury to self; bad twist left shoulder,50% movement reduction for 1 round ) 10% for {2d4} rounds"  
        else if (nRollValue >= 289 ) sResult = "Non-wpn injury to self; bad twist left wrist,50% movement reduction for 1 round ) 10% for {2d4} rounds"  
        else if (nRollValue >= 288 ) sResult = "Non-wpn injury to self; bad twist left hip,50% movement reduction for 1 round ) 10% for {2d4} rounds"  
        else if (nRollValue >= 285 ) sResult = "Non-wpn injury to self; bad twist left knee,50% movement reduction for 1 round ) 10% for {2d4} rounds"  
        else if (nRollValue >= 282 ) sResult = "Non-wpn injury to self; bad twist left ankle,50% movement reduction for 1 round ) 10% for {2d4} rounds"  
        else if (nRollValue >= 280 ) sResult = "Non-wpn injury to self; bad twist left foot,50% movement reduction for 1 round ) 10% for {2d4} rounds"  
        else if (nRollValue >= 277 ) sResult = "Non-wpn injury to self; bad twist right elbow,50% movement reduction for 1 round ) 10% for {2d4} rounds"  
        else if (nRollValue >= 274 ) sResult = "Non-wpn injury to self; bad twist right shoulder,50% movement reduction for 1 round ) 10% for {2d4} rounds"  
        else if (nRollValue >= 272 ) sResult = "Non-wpn injury to self; bad twist right wrist,50% movement reduction for 1 round ) 10% for {2d4} rounds"  
        else if (nRollValue >= 271 ) sResult = "Non-wpn injury to self; bad twist right hip,50% movement reduction for 1 round ) 10% for {2d4} rounds"  
        else if (nRollValue >= 268 ) sResult = "Non-wpn injury to self; bad twist right knee,50% movement reduction for 1 round ) 10% for {2d4} rounds"  
        else if (nRollValue >= 265 ) sResult = "Non-wpn injury to self; bad twist right ankle,50% movement reduction for 1 round ) 10% for {2d4} rounds"  
        else if (nRollValue >= 263 ) sResult = "Non-wpn injury to self; bad twist right foot,50% movement reduction for 1 round ) 10% for {2d4} rounds"  
        else if (nRollValue >= 201 ) sResult = "Dmg to self, roll dmg as normal, make Dex check to suffer half dmg"  
        else if (nRollValue >= 200 ) sResult = "Drop weapon 20 feet away"  
        else if (nRollValue >= 199 ) sResult = "Drop weapon 19 feet away"  
        else if (nRollValue >= 198 ) sResult = "Drop weapon 18 feet away"  
        else if (nRollValue >= 196 ) sResult = "Drop weapon 17 feet away"  
        else if (nRollValue >= 194 ) sResult = "Drop weapon 16 feet away"  
        else if (nRollValue >= 192 ) sResult = "Drop weapon 15 feet away"  
        else if (nRollValue >= 190 ) sResult = "Drop weapon 14 feet away"  
        else if (nRollValue >= 187 ) sResult = "Drop weapon 13 feet away"  
        else if (nRollValue >= 184 ) sResult = "Drop weapon 12 feet away"  
        else if (nRollValue >= 181 ) sResult = "Drop weapon 11 feet away"  
        else if (nRollValue >= 177 ) sResult = "Drop weapon 10 feet away"  
        else if (nRollValue >= 173 ) sResult = "Drop weapon 9 feet away"  
        else if (nRollValue >= 168 ) sResult = "Drop weapon 8 feet away"  
        else if (nRollValue >= 162 ) sResult = "Drop weapon 7 feet away"  
        else if (nRollValue >= 155 ) sResult = "Drop weapon 6 feet away"  
        else if (nRollValue >= 145 ) sResult = "Drop weapon 5 feet away"  
        else if (nRollValue >= 131 ) sResult = "Drop weapon 4 feet away"  
        else if (nRollValue >= 111 ) sResult = "Drop weapon 3 feet away"  
        else if (nRollValue >= 86 ) sResult = "Drop weapon 2 feet away"  
        else sResult = "Drop weapon at feet" 
                
        return HackmasterFumbles.replaceRolls(sResult);
    }

    static replaceRolls(sText){
        const re = /(\d+d\d+)+/g;
        let matches = re.exec(sText);
        
        if (matches){
            matches.forEach(match => {
                let splits = match.split('d');
                let nTotal = Utilities.getDiceResult(Number(splits[0]), Number(splits[1]));
                sText = sText.replace(match, nTotal);
            });
        }
        return sText;
    }

    static createFumbleCard(fumble){
        let card = Utilities.loadCachedTemplate("modules/hackmaster-4e/templates/fumble-chat-card.hbs", {
            isUnarmed: fumble.isUnarmed,
            roll: fumble.roll,
            description: fumble.description
        });
        return card;
    }
}