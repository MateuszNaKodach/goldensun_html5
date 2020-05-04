var turn= 1; // to verify: a turn = "1 action" and not the whole PCs/enemies actions
var max_turn= 2; // normally 4 because you have 4 PCs except if you have deads... I guess?

/* todo */

// + decide turn
//"If a certain PCs speed is the same of a enemy, PC goes first."

export function calculate_power() {

}

export function calculate_damage() {

}

export function calculate_speed_enemy(enemy_agility) {
  if (max_turn==4){
    return enemy_agility- enemy_agility * 1/6 * turn;
  }
  if (max_turn==3){
    return enemy_agility- enemy_agility * 1/4 * turn;
  }
  if (max_turn==2){
    return enemy_agility- enemy_agility * 1/2 * turn;
  }

}

/* ----------------------------------- */

export function calculate_speed_pc(pc_agility) {
  var rand_number = Math.floor(Math.random() * 65536); // rand number between 0 and 65535
  var speed= pc_agility + ( (pc_agility*rand_number) >> 20 ); // formula: multiply, right shift 20, and add to the basis speed
  if (turn > 1) // multi-turn penalty: if more than 1, divide by 2
    speed= speed / 2;
  turn++;
  return speed;
}


/* tests */
var felix_agility=200;
var piers_agility=148;
var enemy_agility=120;
console.log( calculate_speed_pc(felix_agility) );
console.log( calculate_speed_pc(piers_agility) );
console.log( calculate_speed_pc(enemy_agility) );
