import { Hackmaster } from './config.js';

export class HackmasterActor{

	static _buildAbilityFields(data) {
		for (let [key, abl] of Object.entries(data.abilities)) {
		  // sanity checks.
		  if (abl.value > 25) abl.value = 25;
		  if (abl.value < 1) abl.value = 1;

		  switch (key) {
		    case "str":
		      let strIndex  = abl.value * 2 - 1;
		      if (abl.percent > 50){
		      	strIndex = strIndex + 1;
		      }
		      console.log("calling my dumb hm code");
		      abl.fields = {
		        hit: {
		          value: Hackmaster.StrengthTable[strIndex][0],
		          label: Hackmaster.StrengthTable[0][0]
		        },
		        dmg: {
		          value: Hackmaster.StrengthTable[strIndex][1],
		          label: Hackmaster.StrengthTable[0][1]
		        }
		        ,
		        allow: {
		          value: Hackmaster.StrengthTable[strIndex][2],
		          label: Hackmaster.StrengthTable[0][2]
		        }
		        ,
		        press: {
		          value: Hackmaster.StrengthTable[strIndex][3],
		          label: Hackmaster.StrengthTable[0][3]
		        }
		        ,
		        open: {
		          value: Hackmaster.StrengthTable[strIndex][4],
		          label: Hackmaster.StrengthTable[0][4]
		        },
		        bendbars: {
		          value: Hackmaster.StrengthTable[strIndex][5],
		          label: Hackmaster.StrengthTable[0][5]
		        }
		      };
		      abl.hit = Hackmaster.StrengthTable[strIndex][0];
		      abl.dmg = Hackmaster.StrengthTable[strIndex][1];
		      abl.allow = Hackmaster.StrengthTable[strIndex][2];
		      abl.press = Hackmaster.StrengthTable[strIndex][3];
		      abl.open = Hackmaster.StrengthTable[strIndex][4];
		      abl.bendbars = Hackmaster.StrengthTable[strIndex][5];
		      break;

		    case "dex":
				let dexIndex  = abl.value * 2 - 1;
				if (abl.percent > 50){
					dexIndex = dexIndex + 1;
				}

		      abl.fields = {
		        reaction: {
		          value: Hackmaster.DexterityTable[dexIndex][0],
		          label: Hackmaster.DexterityTable[0][0]
		        },
		        missile: {
		          value: Hackmaster.DexterityTable[dexIndex][1],
		          label: Hackmaster.DexterityTable[0][1]
		        },
		        defensive: {
		          value: Hackmaster.DexterityTable[dexIndex][2],
		          label: Hackmaster.DexterityTable[0][2]
		        }
		      };
		      abl.reaction = Hackmaster.DexterityTable[dexIndex][0],
		        abl.missile = Hackmaster.DexterityTable[dexIndex][1];
		      abl.defensive = Hackmaster.DexterityTable[dexIndex][2];
		      break;

		    case "con":
		      abl.fields = {
		        hp: {
		          value: Hackmaster.ConstitutionTable[abl.value][0].join('/'),
		          label: Hackmaster.ConstitutionTable[0][0]
		        },
		        shock: {
		          value: Hackmaster.ConstitutionTable[abl.value][1],
		          label: Hackmaster.ConstitutionTable[0][1]
		        },
		        survival: {
		          value: Hackmaster.ConstitutionTable[abl.value][2],
		          label: Hackmaster.ConstitutionTable[0][2]
		        },
		        poison: {
		          value: Hackmaster.ConstitutionTable[abl.value][3],
		          label: Hackmaster.ConstitutionTable[0][3]
		        },
		        regen: {
		          value: Hackmaster.ConstitutionTable[abl.value][4],
		          label: Hackmaster.ConstitutionTable[0][4]
		        }
		      };
		      abl.hp = Hackmaster.ConstitutionTable[abl.value][0];
		      abl.shock = Hackmaster.ConstitutionTable[abl.value][1];
		      abl.survival = Hackmaster.ConstitutionTable[abl.value][2];
		      abl.poison = Hackmaster.ConstitutionTable[abl.value][3];
		      abl.regen = Hackmaster.ConstitutionTable[abl.value][4];
		      break;

		    case "int":
		      abl.fields = {
		        languages: {
		          value: Hackmaster.IntelligenceTable[abl.value][0],
		          label: Hackmaster.IntelligenceTable[0][0]
		        },
		        level: {
		          value: Hackmaster.IntelligenceTable[abl.value][1],
		          label: Hackmaster.IntelligenceTable[0][1]
		        },
		        chance: {
		          value: Hackmaster.IntelligenceTable[abl.value][2],
		          label: Hackmaster.IntelligenceTable[0][2]
		        },
		        max: {
		          value: Hackmaster.IntelligenceTable[abl.value][3],
		          label: Hackmaster.IntelligenceTable[0][3]
		        },
		        imm: {
		          value: Hackmaster.IntelligenceTable[abl.value][4],
		          label: Hackmaster.IntelligenceTable[0][4]
		        }
		      };
		      abl.languages = Hackmaster.IntelligenceTable[abl.value][0];
		      abl.level = Hackmaster.IntelligenceTable[abl.value][1];
		      abl.chance = Hackmaster.IntelligenceTable[abl.value][2];
		      abl.max = Hackmaster.IntelligenceTable[abl.value][3];
		      abl.imm = Hackmaster.IntelligenceTable[abl.value][4];
		      break;

		    case "wis":
		      abl.fields = {
		        magic: {
		          value: Hackmaster.WisdomTable[abl.value][0],
		          label: Hackmaster.WisdomTable[0][0]
		        },
		        bonus: {
		          value: Hackmaster.WisdomTable[abl.value][1],
		          label: Hackmaster.WisdomTable[0][1],
		          tip: abl.value > 18 ? Hackmaster.WisdomTable[(abl.value + 100)][1] : '',
		        },
		        failure: {
		          value: Hackmaster.WisdomTable[abl.value][2],
		          label: Hackmaster.WisdomTable[0][2]
		        },
		        imm: {
		          value: Hackmaster.WisdomTable[abl.value][3],
		          label: Hackmaster.WisdomTable[0][3],
		          tip: abl.value > 18 ? Hackmaster.WisdomTable[(abl.value + 100)][3] : '',
		        }
		      };
		      abl.magic = Hackmaster.WisdomTable[abl.value][0];
		      abl.bonus = Hackmaster.WisdomTable[abl.value][1];
		      abl.failure = Hackmaster.WisdomTable[abl.value][2];
		      abl.imm = Hackmaster.WisdomTable[abl.value][3];
		      break;

		    case "cha":
		      abl.fields = {
		        max: {
		          value: Hackmaster.CharismaTable[abl.value][0],
		          label: Hackmaster.CharismaTable[0][0]
		        },
		        loyalty: {
		          value: Hackmaster.CharismaTable[abl.value][1],
		          label: Hackmaster.CharismaTable[0][1]
		        },
		        reaction: {
		          value: Hackmaster.CharismaTable[abl.value][2],
		          label: Hackmaster.CharismaTable[0][2]
		        }
		      };
		      abl.max = Hackmaster.CharismaTable[abl.value][0];
		      abl.loyalty = Hackmaster.CharismaTable[abl.value][1];
		      abl.reaction = Hackmaster.CharismaTable[abl.value][2];
		      break;

		    default:
		      break;
		  }
		}
	}
};