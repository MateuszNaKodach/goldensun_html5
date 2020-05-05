// a turn = "1 action"
var pc_max_turns= 2;
var pc_actual_turn= 1;
var enemy_max_turns=4; // by default
var enemy_actual_turn=1;

/* todo */

// + decide turn
//"If a certain PCs speed is the same of a enemy, PC goes first."

export function calculate_power() {

}

export function calculate_damage() {

}

export function calculate_speed_enemy(enemy_agility) {
  if (enemy_max_turns==4){
    return enemy_agility- enemy_agility * 1/6 * turn;
  }
  if (enemy_max_turns==3){
    return enemy_agility- enemy_agility * 1/4 * turn;
  }
  if (enemy_max_turns==2){
    return enemy_agility- enemy_agility * 1/2 * turn;
  }
  enemy_actual_turn++;
}

/* ----------------------------------- */

export function calculate_speed_pc(pc_agility) {
  var rand_number = Math.floor(Math.random() * 65536); // rand number between 0 and 65535
  var speed= pc_agility + ( (pc_agility*rand_number) >> 20 ); // formula: multiply, right shift 20, and add to the basis speed
  if (pc_actual_turn > 1) // multi-turn penalty: if more than 1, divide by 2
    speed= speed / 2;
  return speed;
}


/* tests */
var felix_agility=391;
var piers_agility=180;
var enemy_agility=268; // star magician agility
console.log( calculate_speed_pc(felix_agility) );
console.log( calculate_speed_pc(piers_agility) );
console.log( calculate_speed_pc(enemy_agility) );
