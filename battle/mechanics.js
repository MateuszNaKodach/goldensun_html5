// a turn = "1 action"
var pc_max_turns= 2;
var pc_actual_turn= 0;
var enemy_max_turns=1; // default value most monsters are single-turn
var enemy_actual_turn=0;
var fleeFails=0;

/* todo... argh xD */

// diminishing-stats psynergy
//poison
// regenrate
// summon boost

/* ----------------------------------- */
export function flee (pcs_avg_lvl, enemies_avg_lvl){
  var rand_number = Math.floor(Math.random() * 10000 );
  var relative_lvl= pcs_avg_lvl-enemies_avg_lvl; // note: if > 10, flee always success
  if (5000 + (2000*fleeFails) +  relative_lvl * 500 >= rand_number )
    return true;
  else{
    fleeFails++;
    return false;
  }
}

// not to be confused with unleash
//  In battle, Criticals are represented by the camera zooming in on the target, followed by a slightly delayed attack from the user.
/* CrtRate = 1.25x base, but some weapons have different modifiers set for this.
Sol Blade = 3x
Excalibur = 1.25x or 3x
Tisiphone Edge = 1.25, 2x, or 3x*/
export function calculate_critical_damage(attack, defense, e_power, e_res, dmg_mult, extra_dmg, level, crt_rate) {
  var rand_number = Math.floor(Math.random() * 4 );
  var relative_attack= attack - defense;
  var base_dammage= Math.floor(relative_attack / 2);
  var extra_dmg= level / 5 + 6;
  return Math.floor ( base_dammage * crt_rate + extra_dmg) + rand_number;
}


export function calculate_power() {
  // if a dijiini is set -5 power
}

export function calculate_summon_damage(base_dammage, multiplier, hp, e_power, e_res){
  var relative_power= e_power-e_res;
  return (base_dammage+ multiplier * hp) * (1+ relative_power/200 ); //200= "eHalf"
  // multiplier case easy: 0.7/0.4 /0.3 /0.2/0.1
  //return an array
}

// this is for djiin OR unleash as they are Elemental Physical Attacks
// dmg_mult often to 1 (but flint-> 1.6) // extra_dmg depends of the weapons
export function calculate_physical_damage(attack, defense, e_power, e_res, dmg_mult, extra_dmg) {
  var rand_number = Math.floor(Math.random() * 4 );
  var relative_attack= attack - defense;
  var base_dammage= Math.floor(relative_attack / 2);
  return Math.floor ( (base_dammage * dmg_mult + extra_dmg)* (1+(e_power-e_res)/400) ) + rand_number;
}

export function calculate_base_damage(attack, defense) {
  var rand_number = Math.floor(Math.random() * 4 );
  var relative_attack= attack - defense;
  return Math.floor(relative_attack / 2) + rand_number;
}

export function calculate_psynergy_damage(resistance, e_power, base_value, range) {
  // "basic" case
  var rand_number = Math.floor(Math.random() * 4 ); // RN between 0 and 3 -- only used in battle!
  if (range==1)
    return Math.floor ( (base_value) * ( 1 + (e_power -resistance) / 200 ) ) + rand_number;
  //else
    // multiplier case easy: 0.8/0.6 /0.4 /0.2/0.1
    //return an array
}

export function aliment_sucess(current_hp, max_hp) {

  // coef for effect on multi-target (ice power for instance)
  // (((((((Attacker's elemental level - Defender's elemental level) - Floor(Defender's luck / 2)) * 3) + effect's base chance + (vulnerabity's 25)) * multi_arg) / 100)  >= rnd())
}

export function aliment_recovery(current_hp, max_hp) {

  // coef for effect on multi-target (ice power for instance)
  // (((((((Attacker's elemental level - Defender's elemental level) - Floor(Defender's luck / 2)) * 3) + effect's base chance + (vulnerabity's 25)) * multi_arg) / 100)  >= rnd())
}

// same for multi-healing
export function healing(current_hp, max_hp, e_power, base_value) { // this one... was simple indeed
  if(current_hp > 0){
    var rand_number = Math.floor(Math.random() * 4 ); // RN between 0 and 3 -- only used in battle!
    var restored_hp= Math.floor( (base_value*e_power)/100 + rand_number );
    if(current_hp + restored_hp > max_hp)
      return max_hp;
    else
      return current_hp + restored_hp;
  }
}

export function calculate_speed_enemy(data) {
  if (data.max_turns==4){
    data.agility= data.agility- data.agility * 1/6 * enemy_actual_turn;
  }
  if (data.max_turns==3){
    data.agility= data.agility- data.agility * 1/4 * enemy_actual_turn;
  }
  if (data.max_turns==2){
    data.agility= data.agility- data.agility * 1/2 * enemy_actual_turn;
  }
  return data;
}

export function calculate_speed_pc(data) {
  // version asm
  var rand_number = Math.floor(Math.random() * 65536) ; // rand number between 0 and 65535
  var speed= data.agility + data.agility*(rand_number/Math.pow(2,20) );
  if (pc_actual_turn > 0) // multi-turn penalty: if more than 1, divide by 2
    speed= speed / 2;

  return Math.floor(speed);
}

export function decide_char_order_turn(agilities){
  // order agilities and the characters = of an array
  //"If a certain PCs speed is the same of a enemy, PC goes first."
}


/* tests: i took true stats of one of my game */
// need to separate the curent and base (max) stats in JSON

var djinn= {
  "flint": { "base_dammage": 30, "multiplier": 0.03 }
}

var pysnergies_base_values= {
  "ice": 35,
  "cool": 35
};

var healing_values= {
  "cure": 70
};

var isaac= {
  "earth_element_power": 139,
  "agility": 391,
  "current_hp": 400,
  "max_hp": 652
};

var piers= {
  "earth_element_power": 78,
  "agility": 180,
  "current_hp": 400,
  "max_hp": 583
};

var star_magician= {
  "level": 46,
  "earth_element_power": 90,
  "agility": 268,
  "current_hp": 400,
  "max_hp": 583,
  "max_turns": 2
}

// HEALING
// need to bind the type of 2 last params
//console.log( healing(isaac.current_hp, isaac.max_hp, healing_values.cure, isaac.earth_element_power) );

// SPEED CALCULATION
console.log( calculate_speed_pc(isaac) );
console.log( calculate_speed_pc(piers) );
console.log( calculate_speed_enemy(star_magician) );
pc_actual_turn++;
enemy_actual_turn++;
console.log( calculate_speed_pc(isaac) );
console.log( calculate_speed_pc(piers) );
console.log( calculate_speed_enemy(star_magician) );
