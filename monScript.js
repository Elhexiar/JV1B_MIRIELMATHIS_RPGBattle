
var hero_0_PV = document.getElementById("hero_0_PV").innerHTML;

var info_text = document.getElementById("text_from_textBox");

console.log("loading");

document.getElementById("text_button").style.visibility ="hidden";

var turn = 0;

current_attack = 10;

var selected_action = "NONE"

var current_Turn_Holder = "ALLIES";

function updateStatsInfo(hero_data_array,enemy_data_array) {


    for(i = 0; i<hero_data_array.length; i++){

        if(hero_data_array[i].PV <= 0){

            hero_data_array[i].alive = false;
            hero_data_array[i].PV = 0;
            document.getElementById("hero_"+i).style.visibility = "hidden"

            

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


        }

        document.getElementById("ennemy_"+i+"_PV").innerHTML = enemy_data_array[i].PV;
        document.getElementById("ennemy_"+i).style.alignSelf = enemy_data_array[i].current_alignment;

        
    }



    
}

hero_0 = {PV:50, current_alignment:"flex-end", alive: true, nom: "Priest"};
hero_1 = {PV:50, current_alignment:"flex-end", alive: true, nom: "Warrior"};
hero_2 = {PV:50, current_alignment:"flex-end", alive: true, nom: "Rogue"};
hero_3 = {PV:50, current_alignment:"flex-end", alive: true, nom: "Driad"};



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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

function next_pressed(){

    if(my_ennemy_array[turn].alive == true){

    
        targetIsNotCorrect = true;
        while(targetIsNotCorrect){

            target_position = getRandomInt(0,3);
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
        finDeTour()

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

    




}

function turn_switch_check(){

    if(turn == 3 && current_Turn_Holder == "ENNEMIES"){
        turn = 0;
        current_Turn_Holder = "ALLIES";
        document.getElementById("turn_holder_print").innerHTML = current_Turn_Holder;
        document.getElementById("text_button").style.visibility = "hidden";

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
