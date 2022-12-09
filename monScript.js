
var hero_0_PV = document.getElementById("hero_0_PV").innerHTML;

var info_text = document.getElementById("text_from_textBox");

console.log("loading");

document.getElementById("text_button").style.visibility ="hidden";

var selected_ennemy = "none"

var selected_ally = "none"

var turn = 0;

current_attack = 10;

var selected_action = "none"

var current_Turn_Holder = "ALLIES";

var losingCondition = false;

var dead_heroes =0;
var dead_ennemies =0;

function updateStatsInfo(hero_data_array,enemy_data_array) {


    for(i = 0; i<hero_data_array.length; i++){

        if(hero_data_array[i].PV <= 0){

            hero_data_array[i].alive = false;
            hero_data_array[i].PV = 0;
            document.getElementById("hero_"+i).style.visibility = "hidden"
            dead_heroes +=1;

            

        }

        document.getElementById("hero_"+i+"_PV").innerHTML = hero_data_array[i].PV;
        document.getElementById("PV_counter_hero_"+i).innerHTML = hero_data_array[i].PV;
        document.getElementById("green_bar_hero_"+i).style.width = (hero_data_array[i].PV * 2 )+ "%";
        document.getElementById("gray_bar_hero_"+i).style.width = (100 -(hero_data_array[i].PV * 2)) + "%";
        document.getElementById("hero_"+i).style.alignSelf = hero_data_array[i].current_alignment;

        

    }

    for(i = 0; i<enemy_data_array.length; i++){

        if(enemy_data_array[i].PV <= 0){

            enemy_data_array[i].alive = false;
            enemy_data_array[i].PV = 0;
            document.getElementById("ennemy_"+i).style.visibility = "hidden"
            dead_ennemies +=1


        }

        document.getElementById("ennemy_"+i+"_PV").innerHTML = enemy_data_array[i].PV;
        document.getElementById("ennemy_"+i).style.alignSelf = enemy_data_array[i].current_alignment;

        
    }

    if(dead_heroes >= 4){

        losingCondition = true;

    }
    dead_heroes = 0;

    if(dead_ennemies){
        victory_condition = true;
    }



    
}

hero_0 = {PV:50, current_alignment:"flex-end", alive: true, nom: "Priest",mana: 0};
hero_1 = {PV:50, current_alignment:"flex-end", alive: true, nom: "Warrior",mana: 0};
hero_2 = {PV:50, current_alignment:"flex-end", alive: true, nom: "Rogue",mana: 0};
hero_3 = {PV:50, current_alignment:"flex-end", alive: true, nom: "Driad",mana: 0};



ennemy_0 = {PV:50, current_alignment:"center", alive: true, nom: "Loup vener"};
ennemy_1 = {PV:50, current_alignment:"center", alive: true, nom: "Mage Elemental"};
ennemy_2 = {PV:50, current_alignment:"center", alive: true, nom: "L'autre la"};

my_heroes_array =[hero_0,hero_1,hero_2,hero_3];
my_ennemy_array =[ennemy_0,ennemy_1,ennemy_2];

document.getElementById("turn_count").innerHTML = turn+1;

document.getElementById("button_0_0").addEventListener("click",attaque);
document.getElementById("button_1_0").addEventListener("click",defense);
document.getElementById("button_0_1").addEventListener("click",action_special);
document.getElementById("button_1_1").addEventListener("click",finDeTour);

document.getElementById("ennemy_0_bouton").addEventListener("click",ennemy_0_selected);
document.getElementById("ennemy_1_bouton").addEventListener("click",ennemy_1_selected);
document.getElementById("ennemy_2_bouton").addEventListener("click",ennemy_2_selected);
document.getElementById("maPage").addEventListener("load", load);

document.getElementById("text_button").addEventListener("click", next_pressed);


document.getElementById("ennemy_0_bouton").addEventListener("click",ennemy_0_selected);
document.getElementById("ennemy_1_bouton").addEventListener("click",ennemy_1_selected);
document.getElementById("ennemy_2_bouton").addEventListener("click",ennemy_2_selected);

document.getElementById("hero_0_bouton").addEventListener("click",hero_0_bouton_selected);
document.getElementById("hero_1_bouton").addEventListener("click",hero_1_bouton_selected);
document.getElementById("hero_2_bouton").addEventListener("click",hero_2_bouton_selected);
document.getElementById("hero_3_bouton").addEventListener("click",hero_3_bouton_selected);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

function next_pressed(){

    console.log(my_ennemy_array[turn].alive)

    if(my_ennemy_array[turn].alive == true && losingCondition == false){

    
        targetIsNotCorrect = true;
        while(targetIsNotCorrect){

            target_position = getRandomInt(0,4);
            console.log(" target position = "+ target_position + " Or alive :  " +my_heroes_array[target_position].alive)

            if(my_heroes_array[target_position].alive == true){
                targetIsNotCorrect = false
            }

        }

        document.getElementById("text_from_textBox").innerHTML = my_ennemy_array[turn].nom + " décide d'attaquer " +my_heroes_array[target_position].nom + " et inflige " + 20 + " dégats !";

        my_heroes_array[target_position].PV -= 20;



    }

    finDeTour();

}

function load(){

    console.log("loading")

    document.getElementById("text_button").style.hidden =true;

}


function ennemy_0_selected() {

    console.log("ennemy 0 selected")
    console.log(current_Turn_Holder)
    console.log(selected_action)
    console.log((selected_action == "ATTAQUE" && current_Turn_Holder == "ALLIES"))



    if(selected_action == "ATTAQUE" && current_Turn_Holder == "ALLIES"){

        selected_action = "NONE";

        my_ennemy_array[0].PV -= current_attack

        document.getElementById("text_from_textBox").innerHTML = my_heroes_array[turn].nom + " attaque " + my_ennemy_array[0].nom + " et inflige " + current_attack + " dégats !"

        finDeTour()

    }

    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 1){
        
        selected_ennemy = 0

        attaque_warrior()

        selected_ennemy = "none"

        finDeTour()

    }
    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 2){

        selected_ennemy = 0
        attaque_rogue()
        selected_ennemy = "none"
        
        finDeTour()

    }

}

function ennemy_1_selected() {

    console.log("ennemy 1 selected")
    console.log(current_Turn_Holder)
    console.log(selected_action)
    console.log((selected_action == "ATTAQUE" && current_Turn_Holder == "ALLIES"))

    if(selected_action == "ATTAQUE" && current_Turn_Holder == "ALLIES"){

        selected_action = "NONE";

        my_ennemy_array[1].PV -= current_attack

        document.getElementById("text_from_textBox").innerHTML = my_heroes_array[turn].nom + " attaque " + my_ennemy_array[1].nom + " et inflige " + current_attack + " dégats !"



        finDeTour()

    }
    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 1){

        selected_ennemy = 1

        attaque_warrior()

        selected_ennemy = "none"
        
        finDeTour()

    }
    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 2){

        selected_ennemy = 1

        attaque_rogue()
        
        selected_ennemy = "none"
        
        finDeTour()

    }

}

function ennemy_2_selected() {

    console.log("ennemy 2 selected")
    console.log(current_Turn_Holder)
    console.log(selected_action)
    console.log((selected_action == "ATTAQUE" && current_Turn_Holder == "ALLIES"))

    console.log("ennemy 2 selected" && current_Turn_Holder == "ALLIES")

    if(selected_action == "ATTAQUE" && current_Turn_Holder == "ALLIES"){

        selected_action = "NONE";

        my_ennemy_array[2].PV -= current_attack

        document.getElementById("text_from_textBox").innerHTML = my_heroes_array[turn].nom + " attaque " + my_ennemy_array[2].nom + " et inflige " + current_attack + " dégats !"

        finDeTour()

    }
    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 1){

        selected_ennemy = 2

        attaque_warrior()
        
        selected_ennemy = "none"

        finDeTour()

    }
    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 2){

        selected_ennemy = 2

        attaque_rogue()

        selected_ennemy = "none"
        
        finDeTour()

    }

}

function hero_0_bouton_selected(){

    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 0){

        selected_ally = 0;

        priestHeal();

        selected_ally = "none"

    }
    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 3){

        selected_ally = 0;

        driadHeal();

        selected_ally = "none"

    }
    



}

function hero_1_bouton_selected(){

    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 0){

        selected_ally = 1;

        priestHeal();

        selected_ally = "none"

    }
    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 3){

        selected_ally = 1;

        driadHeal();

        selected_ally = "none"

    }
    



}

function hero_2_bouton_selected(){

    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 0){

        selected_ally = 2;

        priestHeal();

        selected_ally = "none"

    }
    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 3){

        selected_ally = 2;

        driadHeal();

        selected_ally = "none"

    }
    



}

function hero_3_bouton_selected(){

    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 0){

        selected_ally = 3;

        priestHeal();

        selected_ally = "none"

    }
    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 3){

        selected_ally = 3;

        driadHeal();

        selected_ally = "none"

    }
    



}

function defense() {

}

function attaque() {

    

    document.getElementById("text_from_textBox").innerHTML = "Vous décidez d'attaquer";
    
    selected_action = "ATTAQUE";
    console.log(selected_action);

}



function action_special() {

    document.getElementById("text_from_textBox").innerHTML = "vous utilisez la compétence spéciale de : " + my_heroes_array[turn].nom;

    selected_action = "SEPCIAL";

    




}

function priestHeal(){


    if(my_heroes_array[selected_ally].alive && my_heroes_array[0].mana >=20){

        my_heroes_array[selected_ally].PV += 30;
        my_heroes_array[0].mana -=20;
        document.getElementById("text_from_textBox").innerHTML = "Le pretre a soigner de 30 PV "+ my_heroes_array[selected_ally].nom;

    }
    

}

function attaque_warrior(){

}

function attaque_rogue(){


}

function driadHeal(){

}

function turn_switch_check(){

    if(turn == 3 && current_Turn_Holder == "ENNEMIES"){
        turn = 0;
        current_Turn_Holder = "ALLIES";
        document.getElementById("turn_holder_print").innerHTML = current_Turn_Holder;
        document.getElementById("text_button").style.visibility = "hidden";
        document.getElementById("text_from_textBox").innerHTML = "C'est a votre tour d'attaquer !"

    }

    if(turn == 4 ){
        turn = 0;
        if(current_Turn_Holder =="ALLIES"){
            current_Turn_Holder = "ENNEMIES"

            document.getElementById("text_from_textBox").innerHTML = "C'est au tour des Ennemies !";
            document.getElementById("text_button").style.visibility = "visible";

        }
        document.getElementById("turn_holder_print").innerHTML = current_Turn_Holder;
    }
    document.getElementById("turn_count").innerHTML = turn+1;


}

function finDeTour() {



    turn = turn + 1;

    turn_switch_check()

    if(current_Turn_Holder == "ALLIES"){

        console.log(turn)
        console.log(my_heroes_array[turn].alive)

        if(my_heroes_array[turn].alive == false){

            turn +=1;
    
        }

    }

    if(current_Turn_Holder == "ENNEMIES"){

        if(my_ennemy_array[turn].alive == false){

            turn +=1;
    
        }

    }

    turn_switch_check()
    position_check()

    

    

    

}

function position_check(){

    console.log("position check")

    if(current_Turn_Holder =="ALLIES"){

        for(i = 0; i< my_ennemy_array.length; i++ ){

            my_ennemy_array[i].current_alignment = "center"

        }
 
        for(i = 0; i< my_heroes_array.length; i++ ) { 

            console.log(i)
            console.log("turn " + turn)

            if(turn == i){

                my_heroes_array[i].current_alignment = "flex-start"


            }else{

                my_heroes_array[i].current_alignment = "flex-end"

            }
        }

        updateStatsInfo(my_heroes_array, my_ennemy_array)

    }

    if(current_Turn_Holder =="ENNEMIES"){

        for(i = 0; i< my_heroes_array.length; i++ ){

            my_heroes_array[i].current_alignment = "flex-end"

        }
 
        for(i = 0; i< my_ennemy_array.length; i++ ) { 

            console.log(i)
            console.log("turn " + turn)

            if(turn == i){

                my_ennemy_array[i].current_alignment = "flex-end"


            }else{

                my_ennemy_array[i].current_alignment = "center"

            }
        }

        updateStatsInfo(my_heroes_array, my_ennemy_array)
    }
}
