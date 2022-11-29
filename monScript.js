
var hero_0_PV = document.getElementById("hero_0_PV").innerHTML;

var turn = 0;

var current_Turn_Holder = "ALLIES";

hero_0 = {PV:50, current_alignment:"flex-end"};
hero_1 = {PV:50, current_alignment:"flex-end"};
hero_2 = {PV:50, current_alignment:"flex-end"};
hero_3 = {PV:50, current_alignment:"flex-end"};

ennemy_0 = {PV:50, current_alignment:"center"};
ennemy_1 = {PV:50, current_alignment:"center"};
ennemy_2 = {PV:50, current_alignment:"center"};

my_heroes_array =[hero_0,hero_1,hero_2,hero_3];
my_ennemy_array =[ennemy_0,ennemy_1,ennemy_2];

document.getElementById("turn_count").innerHTML = turn+1;

document.getElementById("button_0_0").onclick = function() {

    hero_0_PV = document.getElementById("hero_0_PV").innerHTML;

    console.log(hero_0_PV);

    output = hero_0_PV - 20;

    console.log(output);
    console.log(current_Turn_Holder);

    document.getElementById("hero_0_PV").innerHTML = output;

    turn = turn + 1;

    if(turn == 3 && current_Turn_Holder == "ENNEMIES"){
        turn = 0;
        current_Turn_Holder = "ALLIES";
        document.getElementById("turn_holder_print").innerHTML = current_Turn_Holder;

    }

    if(turn == 4 ){
        turn = 0;
        if(current_Turn_Holder =="ALLIES"){
            current_Turn_Holder = "ENNEMIES"

        }
        document.getElementById("turn_holder_print").innerHTML = current_Turn_Holder;
    }
    document.getElementById("turn_count").innerHTML = turn+1;

    if(current_Turn_Holder =="ALLIES"){

        for(i = 0, i< my_heroes_array.length, )

        


    }


}

    


//document.getElementById("turn_count").innerHTML.onchange = function() {