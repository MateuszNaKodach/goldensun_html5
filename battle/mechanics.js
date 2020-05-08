// a turn = "1 action"
var pc_max_turns= 2;
var pc_actual_turn= 1;
var enemy_max_turns=4; // by default
var enemy_actual_turn=1;

/* todo */

export function calculate_power() {

}

export function calculate_djinni_damage(){

}

export function calculate_summon_damage(){

}

export function calculate_unleash_damage(attack, defense, e_power, e_res, extra_dmg, crt_rate) {
  var rand_number = Math.floor(Math.random() * 4 );
  var relative_attack= attack - defense;
  var base_dammage= Math.floor(relative_attack / 2);
  return Math.floor ( (base_dammage + extra_dmg)* (1+(e_power-e_res)/400) ) + rand_number; // mult coef (mult mod) often to 1
}

export function calculate_physical_damage(attack, defense) { // base dammage
  var rand_number = Math.floor(Math.random() * 4 );
  var relative_attack= attack - defense;
  return Math.floor(relative_attack / 2) + rand_number;
}

export function calculate_psynergy_damage(resistance, e_power, base_value, range) { // looks complicated...
  // "basic" case
  var rand_number = Math.floor(Math.random() * 4 ); // RN between 0 and 3 -- only used in battle!
  if (range==1)
    return Math.floor ( (base_value) * ( 1 + (e_power -resistance) / 200 ) ) + rand_number;
  else
    // multiplier case easy: 0.8/0.6 /0.4 /0.2/0.1
    //return an array
}

/* ----------------------------------- */
export function aliment_sucess(current_hp, max_hp) {

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
  data.enemy_actual_turn++;
  return data;
}

export function calculate_speed_pc(data) {
  // version asm
  var rand_number = Math.floor(Math.random() * 65536) >> 20; // rand number between 0 and 65535
  console.log("coucou"+ (rand_number ) );
  var speed= data.agility + ( rand_number >> 20 );
  if (pc_actual_turn > 1) // multi-turn penalty: if more than 1, divide by 2
    speed= speed / 2;

  return speed;
  /*var rand_number = 6553500; // rand number between 0 and 65535
  var speed= data.agility + ( (data.agility*rand_number) >> 20 ); // formula: multiply, right shift 20, and add to the basis speed
  if (pc_actual_turn > 1) // multi-turn penalty: if more than 1, divide by 2
    speed= speed / 2;
  return speed;*/

}

export function decide_char_order_turn(agilities){
  // order agilities and the characters = of an array
  //"If a certain PCs speed is the same of a enemy, PC goes first."
}


/* tests: i took true stats of one of my game */
// need to separate the curent and base (max) stats in JSON

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
  "earth_element_power": undefined,
  "agility": 268,
  "current_hp": 400,
  "max_hp": 583,
  "max_turns": 2
}

// need to bind the type of 2 last params
console.log( healing(isaac.current_hp, isaac.max_hp, healing_values.cure, isaac.earth_element_power) );

/*console.log( calculate_speed_pc(isaac) );
console.log( calculate_speed_pc(piers) );
console.log( calculate_speed_enemy(star_magician) );

console.log( calculate_speed_pc({"agility": 100 }) );*/
