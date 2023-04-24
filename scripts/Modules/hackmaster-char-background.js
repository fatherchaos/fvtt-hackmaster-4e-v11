import { Utilities } from '../utilities.js'

export class HackmasterCharacterBackground{

    static getGender(nRollValue) {
        if (!nRollValue) {
            nRollValue = Utilities.getDieResult(2); 
        }
        if (nRollValue == 1) {
            return "Male";
        }
        else { 
            return "Female";
        }
    }

    static getBodySide(nRollValue){
        if (!nRollValue) { 
            nRollValue = Utilities.getDieResult(2); 
        }
        if (nRollValue == 1) {	
            return "left";
        }
        else {
            return "right";
        }
    }

    static getLawChaos(nRollValue){
        if (!nRollValue) { 
            nRollValue = Utilities.getDieResult(2); 
        }
        if (nRollValue == 1) {	
            return "Lawful";
        }
        else
        { 
            return "Chaotic";
        }
    }

    static getGoodEvil(nRollValue){
        if (nRollValue) {
            nRollValue = Utilities.getDieResult(2);
        }
        if (nRollValue == 1) 
        {	
            return "Good";
        }
        else {
            return "Evil";
        }
    }

    static getQuirkOrFlaw(){
        let nRollValue = Utilities.getDieResult(100);
        
        if (nRollValue < 15) return HackmasterCharacterBackground.getMinorPhysicalFlaw6b();
        else if (nRollValue < 29) return HackmasterCharacterBackground.getMinorPhysicalFlaw6c();
        else if (nRollValue < 43) return HackmasterCharacterBackground.getMinorPhysicalFlaw6d();
        else if (nRollValue < 51) return HackmasterCharacterBackground.getMajorPhysicalFlaw();
        else if (nRollValue < 67) return HackmasterCharacterBackground.getMinorMentalQuirk();
        else if (nRollValue < 77) return HackmasterCharacterBackground.getMajorMentalQuirk();
        else if (nRollValue < 94) return HackmasterCharacterBackground.getMinorPersonalityQuirk();
        else return HackmasterCharacterBackground.getMajorPersonalityQuirk();
    }

    static getRandomClass(nRollValue){
        if (!nRollValue) { 
            nRollValue = Utilities.getDieResult(20); 
        }
        
        if (nRollValue == 1) return "Barbarian";
        else if (nRollValue == 2) return "Bard";
        else if (nRollValue == 3) return "Cleric";
        else if (nRollValue == 4) return "Druid";
        else if (nRollValue == 5) return "Fighter";
        else if (nRollValue == 6) return "HackMaster";
        else if (nRollValue == 7) return "Cavalier";
        else if (nRollValue == 8) return "Paladin";
        else if (nRollValue == 9) return "Ranger";
        else if (nRollValue == 10) return "Magic User";
        else if (nRollValue == 11) return "Battle Mage";
        else if (nRollValue == 12) return "Dark Knight";
        else if (nRollValue == 13) return "Illusionist";
        else if (nRollValue == 14) return "Thief";
        else if (nRollValue == 15) return "Assassin";
        else if (nRollValue == 16) return "Monk";
        else if (nRollValue == 17) return "Berserker";
        else if (nRollValue == 18) return "Knight Errant";
        else if (nRollValue == 19) return "Blood Mage";
        else return HackmasterCharacterBackground.getRandomClass(Utilities.getDieResult(19)) + " and " + HackmasterCharacterBackground.getRandomClass(Utilities.getDieResult(19));
    }

    static getAbilityScore(){
        let nRollValue = Utilities.getDieResult(7);
        
        if (nRollValue == 1) return "Strength";
        else if (nRollValue == 2) return "Dexterity";
        else if (nRollValue == 3) return "Constitution";
        else if (nRollValue == 4) return "Intelligence";
        else if (nRollValue == 5) return "Wisdom";
        else if (nRollValue == 6) return "Charisma";
        else return "Comeliness";
    }

    static getRandomRace(){
        let nRollValue = Utilities.getDieResult(10);
        
        if (nRollValue == 1) return "Dwarf";
        else if (nRollValue == 2) return "Elf";
        else if (nRollValue == 3) return "Gnome";
        else if (nRollValue == 4) return "Gnomeling";
        else if (nRollValue == 5) return "Half-elf";
        else if (nRollValue == 6) return "Halfling";
        else if (nRollValue == 7) return "Half-orc";
        else if (nRollValue == 8) return "Half-ogre";
        else if (nRollValue == 9) return "Pixie Fairy";
        else return "Human";
    }

    static getAnimalPhobia(){
        let nRollValue = Utilities.getDieResult(20);
        
        if (nRollValue < 3) return "horse";
        else if (nRollValue < 5) return "dog";
        else if (nRollValue < 7) return "cat";
        else if (nRollValue < 9) return "insect";
        else if (nRollValue < 11) return "rodent";
        else if (nRollValue < 13) return "snake";
        else if (nRollValue < 15) return "birds";
        else if (nRollValue < 17) return "fish";
        else if (nRollValue < 19) return "worms";
        else return "cattle";
    }

    static getAnimalAntipathy(){
        let nRollValue = Utilities.getDieResult(20);
        
        if (nRollValue < 3) return "horse";
        else if (nRollValue < 5) return "dog";
        else if (nRollValue < 7) return "cat";
        else if (nRollValue < 9) return "bird";
        else if (nRollValue < 11) return "insect";
        else if (nRollValue < 13) return "fish";
        else if (nRollValue < 15) return "bat";
        else if (nRollValue < 17) return "snake";
        else if (nRollValue < 19) return "ape";
        else return "GM's choice (Your GM may choose from this table, or from any animal in the Hacklopedia of Beasts)";
    }

    static getAllergen(){
        let nRollValue = Utilities.getDieResult(20);
        
        if (nRollValue < 3) return "food (GM can determine specific food)";
        else if (nRollValue < 5) return "cloth";
        else if (nRollValue < 7) return "wood";
        else if (nRollValue < 10) return "cats";
        else if (nRollValue < 11) return "animals other than cats (all)";
        else if (nRollValue < 13) return "gold";
        else if (nRollValue < 15) return "metals other than gold (GM can determine specific metal)";
        else if (nRollValue < 17) return "pollen";
        else if (nRollValue < 19) return "dust";
        else return HackmasterCharacterBackground.getAllergen() + " and " + HackmasterCharacterBackground.getAllergen();
    }

    static getMaiming(){
        let nRollValue = Utilities.getDieResult(6);
        
        if (nRollValue == 1) return "Severe facial burn or scarring";
        else if (nRollValue == 2) return "Misshapen head";
        else if (nRollValue == 3) { 
            let nFingerResult = Utilities.getDieResult(6);
            if (nFingerResult < 4) return "Fingers webbed"
            else return "Extra finger on " + getBodySide + " hand.";
        }
        else if (nRollValue == 4) return "Two missing facial features (nose and ear, nose and lips, etc.)";
        else if (nRollValue == 5) return "Misshapen body";
        else return HackmasterCharacterBackground.getMaiming() + " and " + HackmasterCharacterBackground.getMaiming();
    }

    static getDelusion(bIsMajor){
        let nRollValue = Utilities.getDieResult(6);
        
        if (nRollValue > 4 || bIsMajor) {
            return HackmasterCharacterBackground.getMajorDelusion();
        }
        else{
            return HackmasterCharacterBackground.getMinorDelusion();
        }
    }

    static getObsessiveCompulsive(){
        let nRollValue = Utilities.getDieResult(20);
        if (nRollValue < 20) {
            if (Utilities.getDieResult(2) == 1) {
                return HackmasterCharacterBackground.getObsession(nRollValue);
            }
            else {
                return HackmasterCharacterBackground.getCompulsion(nRollValue);
            }
        }
        else {
            nRollValue = Utilities.getDieResult(19);
            return HackmasterCharacterBackground.getObsession(nRollValue) + " and " + HackmasterCharacterBackground.getCompulsion(nRollValue);
        }
    }

    static getObsession(nRollValue){
        if (nRollValue == 1) return "Obsession with members of the opposite sex";
        else if (nRollValue == 2) return "Obsesssion with numbers";
        else if (nRollValue == 3) return "Obsession with clothing";
        else if (nRollValue == 4) return "Obsession with gold";
        else if (nRollValue == 5) return "Obsession with horses";
        else if (nRollValue == 6) return "Obsession with weapons";
        else if (nRollValue == 7) return "Obsession with armor";
        else if (nRollValue == 8) return "Obsession with magic";
        else if (nRollValue == 9) return "Obsession with cleanliness";
        else if (nRollValue == 10) return "Obsession with body image";
        else if (nRollValue == 11) return "Obsession with hair";
        else if (nRollValue == 12) return "Obsession with the sun";
        else if (nRollValue == 13) return "Obsession with bugs";
        else if (nRollValue == 14) return "Obsession with food";
        else if (nRollValue == 15) return "Obsession with sounds";
        else if (nRollValue == 16) return "Obsession with books or scrolls";
        else if (nRollValue == 17) return "Obsession with jewels";
        else if (nRollValue == 18) return "Obsession with rocks";
        else return "Obsession with smells";
    }

    static getCompulsion(nRollValue){
        if (nRollValue == 1) return "Compulsion to kiss members of the opposite sex";
        else if (nRollValue == 2) return "Compulsion to count everything";
        else if (nRollValue == 3) return "Compulsion to buy clothing";
        else if (nRollValue == 4) return "Compulsion to gather as much gold as possible";
        else if (nRollValue == 5) return "Compulsion to scrub or brush horses";
        else if (nRollValue == 6) return "Compulsion to own as many weapons as possible";
        else if (nRollValue == 7) return "Compulsion to own as much armor as possible";
        else if (nRollValue == 8) return "Compulsion to accumulate as many magic items as possible";
        else if (nRollValue == 9) return "Compulsion to clean";
        else if (nRollValue == 10) return "Compulsion to exercise";
        else if (nRollValue == 11) return "Compulsion to comb hair";
        else if (nRollValue == 12) return "Compulsion to stare at the sun";
        else if (nRollValue == 13) return "Compulsion to eat bugs";
        else if (nRollValue == 14) return "Compulsion to cook/eat";
        else if (nRollValue == 15) return "Compulsion to discover source of unusual or unknown sounds";
        else if (nRollValue == 16) return "Compulsion to accumulate as many books or scrolls as possible";
        else if (nRollValue == 17) return "Compulsion to accumulate as many jewels as possible";
        else if (nRollValue == 18) return "Compulsion to collect rocks";
        else return "Compulsion to discover source of any odd odors";
    }

    static getSuperstition(nRollValue){
        if (!nRollValue) { 
            nRollValue = Utilities.getDieResult(20); 
        }
        
        if (nRollValue == 1) return "Believes a certain color is unlucky (your GM will choose). Will not wear clothing of this color or enter structures painted this color. Will avoid animals of this color and those who wear this color.";
        else if (nRollValue == 2) return "Believes a certain color is lucky (your GM will choose). Will only wear clothing of this color. Prefers animals of this color, those who wear this color and items of this color.";
        else if (nRollValue == 3) return "Thinks the world is flat. He will avoid travelling in ocean-going vessels for fear of falling off.";
        else if (nRollValue == 4) return "Thinks being near dead things is unlucky. Will avoid anything reminding him of death: cemeteries, graves, coffins, etc. Gets -2 to hit when encountering any undead.";
        else if (nRollValue == 5) return "Believes haggling or price-shopping is unlucky. If this character buys something that has a reduced price for any reason, he will constantly worry about it breaking or being of inferior quality. Eventually he will discard the item in favor of one bought at full price or found.";
        else if (nRollValue == 6) return "Has a lucky number ({1d20}). He will take insane risks on his lucky day. Performs 'rituals' using his number to gain luck.";
        else if (nRollValue == 7) return "Believes he's lucky and anyone touching him will steal his luck. He will not lend or share items with others (such as rope, torches, weapon, etc.) The character will go ballistic if anyone touches any of his stuff.";
        else if (nRollValue == 8) return "Believes a certain common animal is unlucky (GM will determine). This character will avoid contact with such an animal and will go so far as to leave the room or cross the street to get away from the animal's proximity";
        else if (nRollValue == 9) return "Believes going left is unlucky. Will only take routes where it is assured he will not have to turn left. Believes left-handed people are evil. He will avoid taking a left turn in a dungeon.";
        else if (nRollValue == 10) return "Doesn't believe in ghosts or undead of any type. If he sees one, he will attempt to disbelieve or ignore incorporeal spirits entirely. After defeating a corporeal undead, he will attempt to defraud it by pulling off its 'mask' or wiping away its 'makeup'.";
        else if (nRollValue == 11) return "Believes Pixie Fairies are lucky, so he attempts to capture them to gain favors, refusing to release them unless they 'bless' him.";
        else if (nRollValue == 12) return "Believes harm will befall him, his friends or his relatives if he steps on a crack. He will not step on a crack for any reason. His movement rate is cut in half if he is travelling over extremely cracked surfaces.";
        else if (nRollValue == 13) return "Has an unlucky number ({1d20}). He will not venture forth on this day. He will avoid anyone with this number of letters in their name. Will avoid being in a room with this number of people.";
        else if (nRollValue == 14) return "Believes he must make a donation to any cleric or church he passes. Failure will surely bring ill-luck down upon him and bring the particular god against him.";
        else if (nRollValue == 15) return "Believes those in authority were chosen by the gods to be in their position. Will attempt to please and pander to anyone in authority he sees.";
        else if (nRollValue == 16) return "Believes every time he hears a bell tinkling an angel gets its wings. Additionally, " + HackmasterCharacterBackground.getSuperstition();
        else if (nRollValue == 17) return "Believes adventuring with members of the opposite sex is bad luck. Will avoid this at all costs.";
        else if (nRollValue == 18) return "Has a magic charm that he believes helps protect him. He will not do anything until he kisses the charm for good luck. If he loses it he will not be able to static until he finds a new lucky charm.";
        else if (nRollValue == 19) return "Believes it's bad luck not to tip a beggar. Will always tip beggars in town.";
        else return HackmasterCharacterBackground.getSuperstition(Utilities.getDieResult(19)) + " Additionally, " + HackmasterCharacterBackground.getSuperstition(Utilities.getDieResult(19));
    }

    static getExtraPersonality(){
        let nRollValue = Utilities.getDieResult(100);
        
        if (nRollValue < 5) return "Young member of the opposite sex";
        else if (nRollValue < 9) return "Elderly memgber of the opposite sex";
        else if (nRollValue < 13) return "Young adult or middle-aged member of the opposite sex";
        else if (nRollValue < 17) return "Young member of the same sex";
        else if (nRollValue < 21) return "Elderly member of the same sex";
        else if (nRollValue < 25) return "Young adult or middle-aged member of the same sex";
        else if (nRollValue < 29) return "Extremely violent person";
        else if (nRollValue < 33) return "Extremely cowardly person";
        else if (nRollValue < 37) return "Extremely nasty person";
        else if (nRollValue < 41) return "Noble";
        else if (nRollValue < 45) return "Slave";
        else if (nRollValue < 49) return "Beggar";
        else if (nRollValue < 53) return "Royalty";
        else if (nRollValue < 57) return "Dwarf";
        else if (nRollValue < 61) return "Pixie Fairy";
        else if (nRollValue < 65) return "Gnome Titan";
        else if (nRollValue < 69) return "Elf";
        else if (nRollValue < 73) return "Assassin";
        else if (nRollValue < 77) return "Thief";
        else if (nRollValue < 81) return "Extremely pious person";
        else return HackmasterCharacterBackground.getExtraPersonality() + " and " + HackmasterCharacterBackground.getExtraPersonality();
    }

    static getMajorDelusion(){
        let nRollValue = Utilities.getDieResult(10);
        if (nRollValue == 1) return "(Major Delusion) Character thinks he is an animal and behaves like one. Check with your GM.";
        else if (nRollValue == 2) return "(Major Delusion) Character thinks he can fly, and often tries.";
        else if (nRollValue == 3) return "(Major Delusion) Character thinks he is royalty and acts like it, ordering people around, perhaps trying to walk into a castle as if it were his own";
        else if (nRollValue == 4) return "(Major Delusion) Character thinks he is in the middle of a battle when he is not. He attacks anyone that makes a quick movement or looks at him funny";
        else if (nRollValue == 5) return "(Major Delusion) Character thinks his party members are monsters, screams and runs away, or tries to attack them";
        else if (nRollValue == 6) return "(Major Delusion) Thinks scaled monsters are his friends and treats them as such";
        else if (nRollValue == 7) return "(Major Delusion) Character thinks screaming will scare away monsters, so when he's in a dungeon, he screams loudly";
        else if (nRollValue == 8) return "(Major Delusion) Character thinks he is invisible. He tries to pick pockets and do other things he thinks no one can see";
        else if (nRollValue == 9) return "(Major Delusion) Character thinks he can walk on water, and often tries";
        else return "(Major Delusion) Character thinks he can tame monsters, and tries";
    }

    static getMinorDelusion(){
    let nRollValue = Utilities.getDieResult(10);
        if (nRollValue == 1) return "(Minor Delusion) Character thinks animals are people and often talks to them";
        else if (nRollValue == 2) return "(Minor Delusion) Character thinks other people can fly and often asks them to";
        else if (nRollValue == 3) return "(Minor Delusion) Thinks one of the party members is royalty and treats them as such";
        else if (nRollValue == 4) return "(Minor Delusion) Character thinks he is a war hero and brags about accomplishments that aren't his";
        else if (nRollValue == 5) return "(Minor Delusion) Character thinks bugs are crawling on himself and those around him so he swats at them and stomps on them";
        else if (nRollValue == 6) return "(Minor Delusion) Character talks to an imaginary friend";
        else if (nRollValue == 7) return "(Minor Delusion) Character thinsk a monster is following him and keeps whirling around to catch it";
        else if (nRollValue == 8) return "(Minor Delusion) Character thinks his eyes are tricking him so he is constantly asking others what they see";
        else if (nRollValue == 9) return "(Minor Delusion) Character thinks water is poisonous so he never bathes or drinks water";
        else return "(Minor Delusion) Character thinks he has a tame monster for a pet and acts as if his pet is real and present";
    }

    static getMinorMentalQuirk(){
        // table 6f
        let sCategory = "Quirk, Minor (Mental): ";
        let nRollValue = Utilities.getDieResult(100);
        
        if (nRollValue < 6) return sCategory + "Absent Minded";
        else if (nRollValue < 9) return sCategory + "Acrophobia (fear of heights)";
        else if (nRollValue < 12) return sCategory + "Agoraphobia (fear of open spaces)";
        else if (nRollValue < 18) return sCategory + "Alcoholic";
        else if (nRollValue < 23) return sCategory + "Animal Phobia (" + HackmasterCharacterBackground.getAnimalPhobia() + ")";
        else if (nRollValue < 29) return sCategory + "Chronic Nightmares";
        else if (nRollValue < 33) return sCategory + "Claustrophobia (fear of closed spaces)";
        else if (nRollValue < 36) return sCategory + HackmasterCharacterBackground.getDelusion();
        else if (nRollValue < 42) return sCategory + "Depression (Minor)";
        else if (nRollValue < 48) return sCategory + "Gambling Addiction";
        else if (nRollValue < 54) return sCategory + "Inappropriate Sense of Humor";
        else if (nRollValue < 57) return sCategory + "Kleptomaniac (compelled to steal)";
        else if (nRollValue < 60) return sCategory + "Obsessive Compulsive: " + HackmasterCharacterBackground.getObsessiveCompulsive();
        else if (nRollValue < 71) return sCategory + "Nagging Conscience";
        else if (nRollValue < 74) return sCategory + "Paranoid";
        else if (nRollValue < 80) return sCategory + "Short Term Memory Loss";
        else if (nRollValue < 83) return sCategory + "Superstitious (" + HackmasterCharacterBackground.getSuperstition() + ")";
        else if (nRollValue < 91) return sCategory + "Temper"; 
        else if (nRollValue < 96) return HackmasterCharacterBackground.getMinorMentalQuirk() + " and " + HackmasterCharacterBackground.getMajorMentalQuirk();
        else return HackmasterCharacterBackground.getMinorMentalQuirk() + " and " + HackmasterCharacterBackground.getMinorPersonalityQuirk();
    }

    static getMajorMentalQuirk(){
        // table 6g
        let sCategory = "Quirk, Major (Mental): ";
        let nRollValue = Utilities.getDieResult(100);
        
        if (nRollValue < 5) return sCategory + HackmasterCharacterBackground.getDelusion(true);
        else if (nRollValue < 8) return sCategory + "Depression (Major)";
        else if (nRollValue < 14) return sCategory + "Enmity towards Class( " + HackmasterCharacterBackground.getRandomClass() + ")"; 
        else if (nRollValue < 20) return sCategory + "Enmity towards Monster"; 
        else if (nRollValue < 26) return sCategory + "Enmity towards Race( " + HackmasterCharacterBackground.getRandomRace() + ")";
        else if (nRollValue < 30) return sCategory + "HackFrenzy";
        else if (nRollValue < 34) return sCategory + "HackLust";
        else if (nRollValue < 42) return sCategory + "Psychotic Aversion to Class( " + HackmasterCharacterBackground.getRandomClass() + ")";
        else if (nRollValue < 51) return sCategory + "Psychotic Aversion to Monster"; 
        else if (nRollValue < 59) return sCategory + "Psychotic Aversion to Race( " + HackmasterCharacterBackground.getRandomRace() + ")";
        else if (nRollValue < 66) return sCategory + "Pyromaniac";
        else if (nRollValue < 73) return sCategory + "Sadistic";
        else if (nRollValue < 81) return sCategory + "Wuss-of-Heart"; 
        else if (nRollValue < 91) return HackmasterCharacterBackground.getMajorMentalQuirk() + " and " + HackmasterCharacterBackground.getMinorMentalQuirk();
        else return HackmasterCharacterBackground.getMajorMentalQuirk() + " and " + HackmasterCharacterBackground.getMinorPersonalityQuirk();
    }

    static getMinorPersonalityQuirk() {
        // PHB Table 6H
        let sCategory = "Quirk, Minor (Personality): ";
        let nRollValue = Utilities.getDieResult(100);
        
        if (nRollValue < 9) return sCategory + "Chronic Liar";
        else if (nRollValue < 18) return sCategory + "Clingy";
        else if (nRollValue < 31) return sCategory + "Glutton";
        else if (nRollValue < 36) return sCategory + "Greedy";
        else if (nRollValue < 43) return sCategory + "Gullible";
        else if (nRollValue < 49) return sCategory + "Jerk";
        else if (nRollValue < 56) return sCategory + "Loud Boor";
        else if (nRollValue < 68) return sCategory + "Misguided";
        else if (nRollValue < 73) return sCategory + "Obnoxious";
        else if (nRollValue < 77) return sCategory + "Pack Rat";
        else if (nRollValue < 83) return sCategory + "Self Absorbed";
        else if (nRollValue < 89) return sCategory + "Socially Awkward";
        else if (nRollValue < 96) return sCategory + "Value Privacy (Reclusive)";
        else return HackmasterCharacterBackground.getMinorPersonalityQuirk() + " and " + HackmasterCharacterBackground.getMajorMentalQuirk();
    }

    static getMajorPersonalityQuirk(){
        // PHB Table 6I
        let sCategory = "Quirk, Major (Personality): ";
        let nRollValue = Utilities.getDieResult(100);
        
        if (nRollValue < 36) return sCategory + "Multiple Personalities";
        else if (nRollValue < 71) return sCategory + "Truthful";
        else if (nRollValue < 86) return HackmasterCharacterBackground.getMinorPersonalityQuirk() + " and " + HackmasterCharacterBackground.getMinorPersonalityQuirk();
        else return HackmasterCharacterBackground.getMajorMentalQuirk() + " and " + HackmasterCharacterBackground.getMajorMentalQuirk();
    }

    static getMinorPhysicalFlaw6b(){
        // PHB Table 6B
        let sCategory = "Flaws, Minor (Physical): ";
        let nRollValue = Utilities.getDieResult(100);
        
        if (nRollValue < 10) return sCategory + "Albino";
        else if (nRollValue < 15) return sCategory + "Animal Antipathy (" + HackmasterCharacterBackground.getAnimalAntipathy() + ")";
        else if (nRollValue < 24) return sCategory + "Anosmia (loss of the sense of taste)";
        else if (nRollValue < 27) return sCategory + "Asthmatic";
        else if (nRollValue < 36) return sCategory + "Color Blind";
        else if (nRollValue < 41) return sCategory + "Chronic Nose Bleeds";
        else if (nRollValue < 50) return sCategory + "Excessive Drooling";
        else if (nRollValue < 59) return sCategory + "Flatulent";
        else if (nRollValue < 62) return sCategory + "Hearing Impaired";
        else if (nRollValue < 71) return sCategory + "Lisp";
        else if (nRollValue < 86) return HackmasterCharacterBackground.getMinorPhysicalFlaw6b() + " and " + HackmasterCharacterBackground.getMinorPhysicalFlaw6c();
        else return HackmasterCharacterBackground.getMinorPhysicalFlaw6b() + " and " + HackmasterCharacterBackground.getMinorPhysicalFlaw6d();
    }

    static getMinorPhysicalFlaw6c(bAlreadyRolledHigh){
        // PHB Table 6C
        let sCategory = "Flaws, Minor (Physical): ";
        let nRollValue = Utilities.getDieResult(100);
        
        if (nRollValue < 8) return sCategory + "Loss of " + HackmasterCharacterBackground.getBodySide() + " ear";
        else if (nRollValue < 14) return sCategory + "Loss of " + HackmasterCharacterBackground.getBodySide() + " eye"
        else if (nRollValue < 22) return sCategory + "Male Pattern Baldness";
        else if (nRollValue < 27) return sCategory + "Migraines";
        else if (nRollValue < 35) return sCategory + "Missing Finger on " + HackmasterCharacterBackground.getBodySide() + " hand";
        else if (nRollValue < 43) return sCategory + "Nervous Tic";
        else if (nRollValue < 48) return sCategory + "Facial Scar";
        else if (nRollValue < 55) return sCategory + "Sleep Chatter";
        else if (nRollValue < 62) return sCategory + "Sound Sleeper";
        else if (nRollValue < 71) return sCategory + "Strange Body Odor";
        else if (nRollValue < 86) return HackmasterCharacterBackground.getMinorPhysicalFlaw6c() + " and " + HackmasterCharacterBackground.getMajorPhysicalFlaw();
        else if (bAlreadyRolledHigh) return HackmasterCharacterBackground.getMinorPhysicalFlaw6c(true) + " and " + HackmasterCharacterBackground.getMajorPhysicalFlaw();
        else return HackmasterCharacterBackground.getMinorPhysicalFlaw6c(true) + " and " + HackmasterCharacterBackground.getMinorPhysicalFlaw6c(true);
    }

    static getMinorPhysicalFlaw6d(){
        //PHB Table 6D
        let sCategory = "Flaws, Minor (Physical): ";
        let nRollValue = Utilities.getDieResult(100);
        
        if (nRollValue < 11) return sCategory + "Stutter";
        else if (nRollValue < 31) return sCategory + "Tone Deaf"; 
        else if (nRollValue < 46) return sCategory + "Vision Impaired (Far Sighted)"; 
        else if (nRollValue < 56) return sCategory + "Blind in " + HackmasterCharacterBackground.getBodySide() + " eye"; 
        else if (nRollValue < 71) return sCategory + "Vision Impaired (Near Sighted)";
        else if (nRollValue < 91) return HackmasterCharacterBackground.getMinorPhysicalFlaw6b() + " and " + HackmasterCharacterBackground.getMinorPhysicalFlaw6c();
        else return HackmasterCharacterBackground.getMajorPhysicalFlaw();
    }

    static getMajorPhysicalFlaw(){
        // PHB Table 6E
        let sCategory = "Flaws, Major (Physical): ";
        let nRollValue = Utilities.getDieResult(100);
        
        if (nRollValue < 7) return sCategory + "Accident Prone";
        else if (nRollValue < 13) return sCategory + "Acute Allergies (" + HackmasterCharacterBackground.getAllergen() + ")";
        else if (nRollValue < 18) return sCategory + "Amputee, " + HackmasterCharacterBackground.getBodySide() + " arm";
        else if (nRollValue < 21) return sCategory + "Amputee, Double, Arm";
        else if (nRollValue < 24) return sCategory + "Amputee, Double, Leg";
        else if (nRollValue < 29) return sCategory + "Amputee, " + HackmasterCharacterBackground.getBodySide() + " leg"
        else if (nRollValue < 32) return sCategory + "Blind";
        else if (nRollValue < 41) return sCategory + "Deaf";
        else if (nRollValue < 46) return sCategory + "Hemophiliac";
        else if (nRollValue < 51) return sCategory + "Low Threshold for Pain (LTP)";
        else if (nRollValue < 57) return sCategory + "Maimed: " + HackmasterCharacterBackground.getMaiming();
        else if (nRollValue < 63) return sCategory + "Mute";
        else if (nRollValue < 68) return sCategory + "Narcolepsy";
        else if (nRollValue < 74) return sCategory + "No Depth Perception";
        else if (nRollValue < 79) return sCategory + "Seizure, Disorders (Epilepsy)";
        else if (nRollValue < 85) return sCategory + "Sleep Walker";
        else if (nRollValue < 91) return sCategory + "Trick Knee";
        else return HackmasterCharacterBackground.getMajorPhysicalFlaw() + " and " + HackmasterCharacterBackground.getMinorPhysicalFlaw6b();
    }

    static createQuirkFlawCard(quirkFlaw){
        let card = Utilities.loadCachedTemplate("modules/hackmaster-4e/templates/quirk-flaw-chat-card.hbs", {
            description: quirkFlaw
        });
        return card;
    }
}