export const Hackmaster = {};

Hackmaster.MODULE_ID = "hackmaster-4e";

Hackmaster.StrengthTable = {
	0: ["OSRIC.abilityFields.str.hit", "OSRIC.abilityFields.str.dmg", "OSRIC.abilityFields.str.allow", "OSRIC.abilityFields.str.press", "OSRIC.abilityFields.str.open", "OSRIC.abilityFields.str.bendbars", "OSRIC.abilityFields.str.encumbrance.light", "OSRIC.abilityFields.str.encumbrance.moderate", "OSRIC.abilityFields.str.encumbrance.heavy", "OSRIC.abilityFields.str.encumbrance.severe", "OSRIC.abilityFields.str.encumbrance.max"],
  	
  	1: [-3,-8,1,3,"1(0)",0 ,2,4,6,8,10],
	2: [-3,-8,2,4,"1(0)",0 ,3,5,7,9,11],

	3: [-3,-7,3,5,"1(0)",0 ,4,6,8,10,12],
	4: [-3,-7,4,7,"1(0)",0 ,5,7,9,11,13],

	5: [-3,-6,5,10,"2(0)",0 ,6,8,10,12,16],
	6: [-3,-6,7,20,"2(0)",0 ,8,10,12,15,22],

	7: [-2,-5,9,25,"3(0)",0 ,10,12,15,19,28],
	8: [-2,-5,11,35,"3(0)",0 ,12,15,18,23,34],

	9: [-2,-4,13,30,"3(0)",0 ,14,17,21,27,40],
	10: [-2,-4,15,40,"3(0)",0 ,16,20,24,31,46],

	11: [-2,-3,18,55,"4(0)",0 ,19,24,28,37,55],
	12: [-2,-3,21,68,"4(0)",0 ,22,27,33,43,55],

	13: [-1,-2,24,70,"4(0)",0 ,25,31,37,49,73],
	14: [-1,-2,27,80,"5(0)",0 ,28,35,42,55,82],

	15: [-1,-1,30,90,"5(0)",1 ,31,39,46,61,91],
	16: [-1,-1,33,95,"5(0)",1 ,34,42,51,67,100],

	17: [0,-1,36,100,"5(0)",1 ,37,46,55,73,109],
	18: [0,-1,39,110,"6(0)",1 ,40,50,60,79,118],

	19: [0,0,43,115,"6(0)",2 ,44,55,88,87,130],
	20: [0,0,47,125,"6(0)",3 ,48,60,72,95,142],

	21: [0,0,51,130,"6(0)",4 ,52,65,78,103,154],
	22: [0,0,55,135,"7(0)",4 ,56,70,84,111,166],

	23: [0,1,59,140,"7(0)",5 ,60,75,90,119,178],
	24: [0,1,63,145,"7(0)",5 ,64,80,96,127,190],

	25: [1,1,67,150,"7(0)",6 ,68,85,102,135,202],
	26: [1,1,71,160,"8(0)",6 ,72,90,108,143,214],

	27: [1,2,76,170,"8(0)",7 ,77,96,115,153,229],
	28: [1,2,81,175,"8(0)",8 ,82,102,123,163,244],

	29: [1,3,86,185,"9(0)",9 ,87,109,130,173,259],
	30: [1,3,91,190,"9(0)",10 ,92,115,138,183,274],

	31: [2,4,97,195,"10(0)",11 ,98,122,147,195,292],
	32: [2,4,103,220,"10(0)",12 ,104,130,156,207,310],

	33: [2,5,109,255,"11(0)",15 ,110,137,165,219,328],
	34: [2,5,115,290,"11(0)",20 ,116,145,174,231,346],

	35: [3,6,130,350,"12(3)",25 ,131,164,196,261,391],
	36: [3,6,160,480,"14(6)",35 ,161,201,241,321,481],

	37: [3,7,200,640,"15(8)",50 ,201,251,301,401,601],
	38: [3,7,300,660,"16(9)",50 ,301,376,451,601,901],

	39: [3,8,400,700,"17(10)",60 ,401,501,601,801,1201],
	40: [3,8,500,625,"17(11)",65 ,501,626,751,1001,1501],

	41: [4,9,600,810,"17(12)",70 ,601,751,901,1201,1801],
	42: [4,9,700,865,"18(13)",75 ,701,876,1051,1401,2101],

	43: [4,10,800,970,"18(14)",80 ,801,1001,1201,1601,2401],
	44: [4,10,900,1050,"18(15)",85 ,901,1126,1351,1801,2701],

	45: [5,11,1000,1130,"18(16)",90 ,1001,1251,1501,2001,3001],
	46: [5,11,1100,1320,"19(16)",95 ,1101,1376,1651,2201,3301],

	47: [6,12,1200,1440,"19(16)",97 ,1201,1501,1801,2401,3601],
	48: [6,12,1300,1540,"19(17)",98 ,1301,1626,1951,2601,3901],

	49: [7,14,1500,1750,"19(18)",99 ,1501,1876,2251,3001,4501],
	50: [7,14,1500,1750,"19(18)",99 ,1501,1876,2251,3001,4501]
};
	  
Hackmaster.DexterityTable = {
	0: ["OSRIC.abilityFields.dex.reaction", "OSRIC.abilityFields.dex.missile", "OSRIC.abilityFields.dex.defensive"],
	1: [-5,-6,5],
	2: [-5,-5,5],

	3: [-5,-5,4],
	4: [-4,-5,4],

	5: [-4,-4,4],
	6: [-4,-4,3],

	7: [-3,-4,3],
	8: [-3,-3,3],

	9: [-3,-3,2],
	10: [-2,-3,2],

	11: [-2,-2,2],
	12: [-2,-2,1],

	13: [-1,-2,1],
	14: [-1,-1,1],

	15: [-1,-1,0],
	16: [0,-1,0],

	17: [0,0,0],
	18: [0,0,0],

	19: [0,0,0],
	20: [0,0,0],

	21: [0,0,0],
	22: [0,0,0],

	23: [0,0,0],
	24: [0,1,0],

	25: [1,1,0],
	26: [1,1,-1],

	27: [1,2,-1],
	28: [2,2,-1],

	29: [2,2,-2],
	30: [2,3,-2],

	31: [3,3,-2],
	32: [3,3,-3],

	33: [3,4,-3],
	34: [4,4,-3],

	35: [4,4,-4],
	36: [4,5,-4],

	37: [5,5,-4],
	38: [5,5,-5],

	39: [5,6,-5],
	40: [6,6,-5],

	41: [6,6,-6],
	42: [6,7,-6],

	43: [7,7,-6],
	44: [7,7,-7],

	45: [7,8,-7],
	46: [8,8,-7],

	47: [8,8,-8],
	48: [8,9,-8],

	49: [9,9,-8],
	50: [9,9,-8],
};

Hackmaster.WisdomTable = {
	0: ["OSRIC.abilityFields.wis.magic", "OSRIC.abilityFields.wis.bonus", "OSRIC.abilityFields.wis.failure", "OSRIC.abilityFields.wis.imm"],
    1: [-6, "None", 80, "None", 10, 0],
    2: [-4, "None", 60, "None", 10, 0],
    3: [-3, "None", 50, "None", 10, 0],
    4: [-2, "None", 45, "None", 10, 0],
    5: [-1, "None", 40, "None", 10, 0],
    6: [-1, "None", 35, "None", 10, 0],
    7: [-1, "None", 30, "None", 10, 0],
    8: [0, "None", 25, "None", 10, 0],
    9: [0, "None", 20, "None", 10, 0],
    10: [0, "None", 15, "None", 10, 0],
    11: [0, "None", 10, "None", 10, 0],
    12: [0, "None", 5, "None", 10, 0],
    13: [0, "1x1st", 0, "None", 10, 0],
    14: [0, "2x1st", 0, "None", 10, 0],
    15: [1, "2x1st,1x2nd", 0, "None", 10, 0],
    16: [2, "2x1st,2x2nd", 0, "None", 9, 1],
    17: [3, "Various", 0, "None", 8, 2],
    18: [4, "Various", 0, "None", 7, 3],
    19: [4, "Various", 0, "Various", 6, 4],
    20: [4, "Various", 0, "Various", 5, 5],
    21: [4, "Various", 0, "Various", 4, 6],
    22: [4, "Various", 0, "Various", 3, 7],
    23: [4, "Various", 0, "Various", 2, 8],
    24: [4, "Various", 0, "Various", 1, 9],
    25: [4, "Various", 0, "Various", 0, 10],
    //-- deal with long string bonus for tooltip
    117: [3, "Bonus Spells: 2x1st, 2x2nd, 1x3rd", 0, "None"],
    118: [4, "Bonus Spells: 2x1st, 2x2nd, 1x3rd, 1x4th", 0, "None"],
    119: [4, "Bonus Spells: 3x1st, 2x2nd, 2x3rd, 1x4th", 0, "Spells: cause fear,charm person, command, friends, hypnotism"],
    120: [4, "Bonus Spells: 3x1st, 3x2nd, 2x3rd, 2x4th", 0, "Spells: cause fear,charm person, command, friends, hypnotism, forget, hold person, enfeeble, scare"],
    121: [4, "Bonus Spells: 3x1st, 3x2nd, 3x3rd, 2x4th, 5th", 0, "Spells: cause fear,charm person, command, friends, hypnotism, forget, hold person, enfeeble, scare, fear"],
    122: [4, "Bonus Spells: 3x1st, 3x2nd, 3x3rd, 3x4th, 2x5th", 0, "Spells: cause fear,charm person, command, friends, hypnotism, forget, hold person, enfeeble, scare, fear, charm monster, confusion, emotion, fumble, suggestion"],
    123: [4, "Bonus Spells: 4x1st, 3x2nd, 3x3rd, 3x4th, 2x5th, 1x6th", 0, "Spells: cause fear,charm person, command, friends, hypnotism, forget, hold person, enfeeble, scare, fear, charm monster, confusion, emotion, fumble, suggestion, chaos, feeblemind, hold monster,magic jar,quest"],
    124: [4, "Bonus Spells: 4x1st, 3x2nd, 3x3rd, 3x4th, 3x5th, 2x6th", 0, "Spells: cause fear,charm person, command, friends, hypnotism, forget, hold person, enfeeble, scare, fear, charm monster, confusion, emotion, fumble, suggestion, chaos, feeblemind, hold monster,magic jar,quest, geas, mass suggestion, rod of ruleship"],
    125: [4, "Bonus Spells: 4x1st, 3x2nd, 3x3rd, 3x4th, 3x5th, 3x6th,1x7th", 0, "Spells: cause fear,charm person, command, friends, hypnotism, forget, hold person, enfeeble, scare, fear, charm monster, confusion, emotion, fumble, suggestion, chaos, feeblemind, hold monster,magic jar,quest, geas, mass suggestion, rod of ruleship, antipathy/sympath, death spell,mass charm"]
};

  
Hackmaster.ConstitutionTable = {
    0: ["OSRIC.abilityFields.con.hp", "OSRIC.abilityFields.con.shock", "OSRIC.abilityFields.con.survival", "OSRIC.abilityFields.con.poison", "OSRIC.abilityFields.con.regen"],
    1: [[-5], 25, 30, -2, "None", 0],
    2: [[-4], 30, 35, -1, "None", 0],
    3: [[-4], 35, 40, 0, "None", 0],
    4: [[-3], 40, 45, 0, "None", 0],
    5: [[-3], 45, 50, 0, "None", 0],
    6: [[-2], 50, 55, 0, "None", 0],
    7: [[-2], 55, 60, 0, "None", 0],
    8: [[-1], 60, 65, 0, "None", 0],
    9: [[-1], 65, 70, 0, "None", 0],
    10: [[0], 70, 75, 0, "None", 0],
    11: [[0], 75, 80, 0, "None", 0],
    12: [[1], 80, 85, 0, "None", 0],
    13: [[1], 85, 90, 0, "None", 0],
    14: [[2], 88, 92, 0, "None", 0],
    15: [[2], 90, 94, 0, "None", 0],
    16: [[3], 95, 96, 0, "None", 1],
    17: [[3], 97, 98, 0, "None", 2],
    18: [[4], 99, 100, 0, "None", 3],
    19: [[4], 99, 100, 1, "None", 4],
    20: [[5], 99, 100, 1, "1/6 turns", 5],
    21: [[5], 99, 100, 2, "1/5 turns", 6],
    22: [[6], 99, 100, 2, "1/4 turns", 7],
    23: [[6], 99, 100, 3, "1/3 turns", 8],
    24: [[7], 99, 100, 3, "1/2", 9],
    25: [[7], 100, 100, 4, "1 turn", 10]
};

Hackmaster.CharismaTable = {
    0: ["OSRIC.abilityFields.cha.max", "OSRIC.abilityFields.cha.loyalty", "OSRIC.abilityFields.cha.reaction"],
    1: [0, -8, -7],
    2: [1, -7, -6],
    3: [1, -6, -5],
    4: [1, -5, -4],
    5: [2, -4, -3],
    6: [2, -3, -2],
    7: [3, -2, -1],
    8: [3, -1, 0],
    9: [4, 0, 0],
    10: [4, 0, 0],
    11: [4, 0, 0],
    12: [5, 0, 0],
    13: [5, 0, 1],
    14: [6, 1, 2],
    15: [7, 3, 3],
    16: [8, 4, 5],
    17: [10, 6, 6],
    18: [15, 8, 7],
    19: [20, 10, 8],
    20: [25, 12, 9],
    21: [30, 14, 10],
    22: [35, 16, 1],
    23: [40, 18, 12],
    24: [45, 20, 13],
    25: [50, 20, 14]
};

Hackmaster.IntelligenceTable = {
    0: ["OSRIC.abilityFields.int.languages", "OSRIC.abilityFields.int.level", "OSRIC.abilityFields.int.chance", "OSRIC.abilityFields.int.max", "OSRIC.abilityFields.int.imm"],
    1: [0, 0, 0, 0, "None", 0, 0, 0],
    2: [1, 0, 0, 0, "None", 0, 0, 0],
    3: [1, 0, 0, 0, "None", 0, 0, 0],
    4: [1, 0, 0, 0, "None", 0, 0, 0],
    5: [1, 0, 0, 0, "None", 0, 0, 0],
    6: [1, 0, 0, 0, "None", 0, 0, 0],
    7: [1, 0, 0, 0, "None", 0, 0, 0],
    8: [1, 0, 0, 0, "None", 0, 0, 0],
    9: [2, 4, 35, 6, "None", 0, 0, 0],
    10: [2, 5, 40, 7, "None", 0, 0, 0],
    11: [2, 5, 45, 7, "None", 0, 0, 0],
    12: [3, 6, 50, 7, "None", 0, 0, 0],
    13: [3, 6, 55, 9, "None", 0, 0, 0],
    14: [4, 7, 60, 9, "None", 0, 0, 0],
    15: [4, 7, 65, 11, "None", 0, 0, 0],
    16: [5, 8, 70, 11, "None", 1, 1, 1],
    17: [6, 8, 75, 14, "None", 1, 2, 1],
    18: [7, 9, 85, 18, "None", 2, 3, 2],
    19: [8, 9, 95, "All", "1st", 2, 4, 2],
    20: [9, 9, 96, "All", "1,2", 3, 5, 3],
    21: [10, 9, 97, "All", "1,2,3", 3, 6, 3],
    22: [11, 9, 98, "All", "1,2,3,4", 3, 7, 3],
    23: [12, 9, 99, "All", "1,2,3,4,5", 4, 8, 4],
    24: [15, 9, 100, "All", "1,2,3,4,5,6", 4, 9, 4],
    25: [20, 9, 100, "All", "1,2,3,4,5,6,7", 4, 10, 4],
    //-- these have such long values we stuff them into tooltips instead
    119: [8, 9, 95, "All", "Level: 1st"],
    120: [9, 9, 96, "All", "Level: 1st, 2nd"],
    121: [10, 9, 97, "All", "Level: 1st, 2nd, 3rd"],
    122: [11, 9, 98, "All", "Level: 1st, 2nd, 3rd, 4th"],
    123: [12, 9, 99, "All", "Level: 1st, 2nd, 3rd, 4th, 5th"],
    124: [15, 9, 100, "All", "Level: 1st, 2nd, 3rd, 4th, 5th, 6th"],
    125: [20, 9, 100, "All", "Level: 1st, 2nd, 3rd, 4th, 5th, 6th, 7th"]
};
  
Hackmaster.ComelinessTable = {
	0: ["OSRIC.abilityFields.com.shortDesc", "OSRIC.abilityFields.com.longDesc"],
	1: ["You're ugly. Hover for more", "Such an individual is simply ugly. The reaction evidenced will tend toward unease and a desire to get away from such brutishness as quickly as possible. If given the opportunity, the character's Charisma can offset ugliness, but this requires a fair amount of conversation and interaction to take place."],
	2: ["You're ugly. Hover for more", "Such an individual is simply ugly. The reaction evidenced will tend toward unease and a desire to get away from such brutishness as quickly as possible. If given the opportunity, the character's Charisma can offset ugliness, but this requires a fair amount of conversation and interaction to take place."],
	3: ["You're ugly. Hover for more", "Such an individual is simply ugly. The reaction evidenced will tend toward unease and a desire to get away from such brutishness as quickly as possible. If given the opportunity, the character's Charisma can offset ugliness, but this requires a fair amount of conversation and interaction to take place."],
	4: ["You're ugly. Hover for more", "Such an individual is simply ugly. The reaction evidenced will tend toward unease and a desire to get away from such brutishness as quickly as possible. If given the opportunity, the character's Charisma can offset ugliness, but this requires a fair amount of conversation and interaction to take place."],
	5: ["You're ugly. Hover for more", "Such an individual is simply ugly. The reaction evidenced will tend toward unease and a desire to get away from such brutishness as quickly as possible. If given the opportunity, the character's Charisma can offset ugliness, but this requires a fair amount of conversation and interaction to take place."],
	6: ["You're ugly. Hover for more", "Such an individual is simply ugly. The reaction evidenced will tend toward unease and a desire to get away from such brutishness as quickly as possible. If given the opportunity, the character's Charisma can offset ugliness, but this requires a fair amount of conversation and interaction to take place."],
	7: ["You're homely. Hover for more.", "The homeliness of the individual will be such that initial contact will be of a negative sort. This negative feeling will not be strongly evidenced. High Charisma will quickly overcome it if any conversation and interpersonal interaction transpires."],
	8: ["You're homely. Hover for more.", "The homeliness of the individual will be such that initial contact will be of a negative sort. This negative feeling will not be strongly evidenced. High Charisma will quickly overcome it if any conversation and interpersonal interaction transpires."],
	9: ["You're homely. Hover for more.", "The homeliness of the individual will be such that initial contact will be of a negative sort. This negative feeling will not be strongly evidenced. High Charisma will quickly overcome it if any conversation and interpersonal interaction transpires."],
	10: ["You're average. Hover for more", "Plain to Average Comeliness; no effect on the viewer."],
	11: ["You're average. Hover for more", "Plain to Average Comeliness; no effect on the viewer."],
	12: ["You're average. Hover for more", "Plain to Average Comeliness; no effect on the viewer."],
	13: ["You're average. Hover for more", "Plain to Average Comeliness; no effect on the viewer."],
	14: ["You're attractive. Hover for more.", "Interest in viewing the individual is evidenced by those in contact, as he is good-looking. The reaction adjustment is increased by a percentage equal to the Comeliness score of the character. Individuals of the opposite sex will seek out such characters, and they will be affected as if under a Fascinate spell unless hte Wisdom of such individuals exceeds 50% of the character's Comeliness total."],
	15: ["You're attractive. Hover for more.", "Interest in viewing the individual is evidenced by those in contact, as he is good-looking. The reaction adjustment is increased by a percentage equal to the Comeliness score of the character. Individuals of the opposite sex will seek out such characters, and they will be affected as if under a Fascinate spell unless hte Wisdom of such individuals exceeds 50% of the character's Comeliness total."],
	16: ["You're attractive. Hover for more.", "Interest in viewing the individual is evidenced by those in contact, as he is good-looking. The reaction adjustment is increased by a percentage equal to the Comeliness score of the character. Individuals of the opposite sex will seek out such characters, and they will be affected as if under a Fascinate spell unless hte Wisdom of such individuals exceeds 50% of the character's Comeliness total."],
	17: ["You're attractive. Hover for more.", "Interest in viewing the individual is evidenced by those in contact, as he is good-looking. The reaction adjustment is increased by a percentage equal to the Comeliness score of the character. Individuals of the opposite sex will seek out such characters, and they will be affected as if under a Fascinate spell unless hte Wisdom of such individuals exceeds 50% of the character's Comeliness total."],
	18: ["You're beautiful. Hover for more.","The beauty of the character will cause heads to turn and hearts to race. Reaction for initial contact is at a percent equal to 150% of the Comeliness score. Individuals of the opposite sex will be affected as if under a Fascinate spell unless their Wisdom exceeds two-thirds of the character's Comeliness total. Individuals of the same sex will do likewise unless Wisdom totals at least 50% of the other character's Comeliness score. Rejection of harsh nature can cause the individual rejected to have a reaction as if the character had negative Comeliness of half the actual (positive) score."],
	19: ["You're beautiful. Hover for more.","The beauty of the character will cause heads to turn and hearts to race. Reaction for initial contact is at a percent equal to 150% of the Comeliness score. Individuals of the opposite sex will be affected as if under a Fascinate spell unless their Wisdom exceeds two-thirds of the character's Comeliness total. Individuals of the same sex will do likewise unless Wisdom totals at least 50% of the other character's Comeliness score. Rejection of harsh nature can cause the individual rejected to have a reaction as if the character had negative Comeliness of half the actual (positive) score."],
	20: ["You're beautiful. Hover for more.","The beauty of the character will cause heads to turn and hearts to race. Reaction for initial contact is at a percent equal to 150% of the Comeliness score. Individuals of the opposite sex will be affected as if under a Fascinate spell unless their Wisdom exceeds two-thirds of the character's Comeliness total. Individuals of the same sex will do likewise unless Wisdom totals at least 50% of the other character's Comeliness score. Rejection of harsh nature can cause the individual rejected to have a reaction as if the character had negative Comeliness of half the actual (positive) score."],
	21: ["You're beautiful. Hover for more.","The beauty of the character will cause heads to turn and hearts to race. Reaction for initial contact is at a percent equal to 150% of the Comeliness score. Individuals of the opposite sex will be affected as if under a Fascinate spell unless their Wisdom exceeds two-thirds of the character's Comeliness total. Individuals of the same sex will do likewise unless Wisdom totals at least 50% of the other character's Comeliness score. Rejection of harsh nature can cause the individual rejected to have a reaction as if the character had negative Comeliness of half the actual (positive) score."],
	22: ["You are stunning. Hover for more.", "The stunning beauty and gorgeous looks of a character with so high a Comeliness will be similar to that of those of lesser beauty (18-21). However, individuals will actually flock around the character, follow him, and generally behave foolishly or in some manner so as to attract the attention of the character. The reaction adjustment is double the score of Comeliness. Fascinate-like power will affect all those with Wisdom less than two-thirds the Comeliness score of the character. If an individual of the opposite sex is actually consciously sought by a character with Comeliness of 22-25, that individual will be effectively Fascinated unless his Wisdom is 18 or higher."],
	23: ["You are stunning. Hover for more.", "The stunning beauty and gorgeous looks of a character with so high a Comeliness will be similar to that of those of lesser beauty (18-21). However, individuals will actually flock around the character, follow him, and generally behave foolishly or in some manner so as to attract the attention of the character. The reaction adjustment is double the score of Comeliness. Fascinate-like power will affect all those with Wisdom less than two-thirds the Comeliness score of the character. If an individual of the opposite sex is actually consciously sought by a character with Comeliness of 22-25, that individual will be effectively Fascinated unless his Wisdom is 18 or higher."],
	24: ["You are stunning. Hover for more.", "The stunning beauty and gorgeous looks of a character with so high a Comeliness will be similar to that of those of lesser beauty (18-21). However, individuals will actually flock around the character, follow him, and generally behave foolishly or in some manner so as to attract the attention of the character. The reaction adjustment is double the score of Comeliness. Fascinate-like power will affect all those with Wisdom less than two-thirds the Comeliness score of the character. If an individual of the opposite sex is actually consciously sought by a character with Comeliness of 22-25, that individual will be effectively Fascinated unless his Wisdom is 18 or higher."],
	25: ["You are stunning. Hover for more.", "The stunning beauty and gorgeous looks of a character with so high a Comeliness will be similar to that of those of lesser beauty (18-21). However, individuals will actually flock around the character, follow him, and generally behave foolishly or in some manner so as to attract the attention of the character. The reaction adjustment is double the score of Comeliness. Fascinate-like power will affect all those with Wisdom less than two-thirds the Comeliness score of the character. If an individual of the opposite sex is actually consciously sought by a character with Comeliness of 22-25, that individual will be effectively Fascinated unless his Wisdom is 18 or higher."]
};