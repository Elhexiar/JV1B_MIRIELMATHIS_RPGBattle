document.getElementById("text_button").style.visibility ="hidden";

//Statistique d'équilibrage


    //attaque des monstres
var default_monster_attack = 20;
    //attaque des personnage
var current_attack = 10;
    //reduction de degat apporter par l'action defence
var default_armor_value = 15;





// on s'assure que certaine variable existe mais soit null
var selected_ennemy = "none"
var selected_ally = "none"
var selected_action = "none"
var dead_heroes =0;
var dead_ennemies =0;

// On déclare les variable nescessaire au début de la partie
var current_Turn_Holder = "ALLIES";
var losingCondition = false;
var turn = 0;


// On crée des dictionnaire pour chaque hero et chaque monstre contenant leurs statistique et leurs positions.
hero_0 = {PV:50, current_alignment:"flex-end", alive: true, nom: "Priest",mana: 0, armor: 0,special_desc : " Vous soignez un allié de 30PV, selectionez quel allié soigné"};
hero_1 = {PV:50, current_alignment:"flex-end", alive: true, nom: "Warrior",mana: 0 ,armor: 0,special_desc : " Vous chargez un ennemi selectionez lequel"};
hero_2 = {PV:50, current_alignment:"flex-end", alive: true, nom: "Rogue",mana: 0 ,armor: 0,special_desc : " Vous tirez une vollée de fleche qui inflige 10 dégat a tout les ennemis, choisissez n'importe lequel pour lancer l'attaque"};
hero_3 = {PV:50, current_alignment:"flex-end", alive: true, nom: "Driad",mana: 0 ,armor: 0,special_desc : " Vous soignez tous le monde de 10 PV, choisissez n'importe quel allié pour lancer le sort"};

ennemy_0 = {PV:50, current_alignment:"center", alive: true, nom: "Loup Feral"};
ennemy_1 = {PV:50, current_alignment:"center", alive: true, nom: "Mage Elemental"};
ennemy_2 = {PV:50, current_alignment:"center", alive: true, nom: "Harlequin"};


// On places ces dictionnaires dans 2 array pour un accès plus facile lors de boucle for
my_heroes_array =[hero_0,hero_1,hero_2,hero_3];
my_ennemy_array =[ennemy_0,ennemy_1,ennemy_2];


//On déclare les event pour chacun de nos boutons et leurss fonctions réspéctives
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

// si le bouton defence est pressé on verifie qu'un hero detiens le tour et si oui dans ce cas on augmente son armure et on le signale en changeant la couleur de sa barre de vie 
  function defense() {
      if(current_Turn_Holder == "ALLIES"){
    document.getElementById("text_from_textBox").innerHTML = my_heroes_array[turn].nom + " decide de se defendre et prendra moins de dégats au prochains tour";
    my_heroes_array[turn].armor = default_armor_value;
    document.getElementById("green_bar_hero_"+turn).style.backgroundColor = "limegreen";
    finDeTour()
  }
}

// si le bouton attaque est pressé on passe la variable selected_action en "ATTAQUE" ce qui permettra lorsqu'on appuie sur un monstre de lui infliger des dégat
function attaque() {
    document.getElementById("text_from_textBox").innerHTML = "Vous décidez d'attaquer";
    selected_action = "ATTAQUE";
}

// si le bouton spécial est pressé on passe la variable selected_action en "SPECIAL" ce qui permettra dans les cas concerné d'accorder le droit  des actions celon les personnage
// On donne aussi une descripton de la compétence du héro dont c'est le tour
function action_special() {
    document.getElementById("text_from_textBox").innerHTML = "vous utilisez la compétence spéciale de : " + my_heroes_array[turn].nom + " Description : " + my_heroes_array[turn].special_desc + ": Cout : 20 Mana";
    selected_action = "SPECIAL";
}

// on verifie que si avant d'avoir appuyé sur un héro, un héro était bien détenteur du tour et que se dernier est soit le pretre ou la driad au quel cas on active leurs fonctions respectives
function hero_0_bouton_selected(){

    //Ici on verifie que le bouton special a bien été choisi, et que c'est bien le tour du pretre ( position 0)
    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 0){

        selected_ally = 0;
        priestHeal();
        selected_ally = "none"
    }
    //Ici on verifie que le bouton special a bien été choisi, et que c'est bien le tour de al driade ( position 3)
    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 3){

        selected_ally = 0;
        driadHeal();
        selected_ally = "none"
    }
}

//On refait la meme chose pour les autres boutons
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



// On fait relativement la meme chose avec les ennemies on regarde si un hero a choisi d'attaquer ou a activer une compétence spéciale offensive
// si les cas sont reunis soit pour l'attaque on le réalise direcement dans cette fonction en retirant des PV au monstre concerné
// soit si c'est une attaque spécial on appel la fonction concerné
function ennemy_0_selected() {

        //On verifie que le bouton attaque avait bien été selectionner et que c'est bien le tour des heros
    if(selected_action == "ATTAQUE" && current_Turn_Holder == "ALLIES"){

        // on reset la selection d'action pour ne pas la garder en memoire
        selected_action = "NONE";
        //on retire les PV au monstre correspondant au bouton (ici le monstre position 0)
        my_ennemy_array[0].PV -= current_attack
        //On informe le joueur
        document.getElementById("text_from_textBox").innerHTML = my_heroes_array[turn].nom + " attaque " + my_ennemy_array[0].nom + " et inflige " + current_attack + " dégats !"
        //On fini le tour en appellant la fonction corréspondante
        finDeTour()
    }

    //Ici on verifie si avant de cliquez sur le monstre le joueur avait demander au guerrier de faire son attaque spéciale
    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 1){
        
        //ici a la place on va plutot passez par une fonction
        selected_ennemy = 0
        attaque_warrior()
        //on reset la selection d'enemy de la memoire
        selected_ennemy = "none"
        finDeTour()
    }

    //Ici on fait la meme chose pour le rogue
    if(selected_action == "SPECIAL" && current_Turn_Holder == "ALLIES" && turn == 2){

        selected_ennemy = 0
        attaque_rogue()
        selected_ennemy = "none"
        finDeTour()
    }
}

//La fonction est similaire pour chaque bouton de monstre
function ennemy_1_selected() {

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

//La fonction est similaire pour chaque bouton de monstre
function ennemy_2_selected() {

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

//Une fois que le tour des monstre est arrivé le bouton next apparait dans la bulle de texte centrale et permet de passer de tour en tour des monstres
// lors de cette dernierres ces derniers chacun leurs tours choisiront aléatoirement un héro et lui infligeront 30 dégat ( valeur par défaut )
function next_pressed(){

        //On verifie que le monstre est bien en vie et que la partie n'est pas finie
    if(my_ennemy_array[turn].alive == true && losingCondition == false){

        //on crée une variable pour verifié que notre générateur aléatoire nous génere une cible correcte
        targetIsNotCorrect = true;
        while(targetIsNotCorrect){

            // On genere un entier entre 0 et 3
            target_position = getRandomInt(0,4);
            // on verifie que le hero correspondant est bien en vie
            if(my_heroes_array[target_position].alive == true){
                targetIsNotCorrect = false
            }
            //sinon la boucle se refait et un nouveau chiffre est demander jusqu'a ce qu'une cible valable soit trouver
        }

        // On informe le joueur de quel cible a été frappé et de combien
        document.getElementById("text_from_textBox").innerHTML = my_ennemy_array[turn].nom + " décide d'attaquer " +my_heroes_array[target_position].nom + " et inflige " + (default_monster_attack - my_heroes_array[target_position].armor) + " dégats !";
        //on retire le nombre de PV correspondant au héro pris pour cible tout en prenant en compte s'il s'était mis en défence
        my_heroes_array[target_position].PV -= default_monster_attack - my_heroes_array[target_position].armor ;
    }

    //fin du tour
    finDeTour();
}

//ici ce sont les fonction qui décrivent les différentes actions spéciales.
// Je pensais avoir encore du temps pour continuer de commenter mon texte mais le rendu est a 18h et non 19H comme je le croyais je ne peux donc pas plus commenter malheureuseument.
function priestHeal(){

    selected_action = "NONE"

    if(my_heroes_array[selected_ally].alive && my_heroes_array[0].mana >=20){

        my_heroes_array[selected_ally].PV += 30;
        my_heroes_array[0].mana -=20;
        document.getElementById("text_from_textBox").innerHTML = "Le pretre a soigner de 30 PV "+ my_heroes_array[selected_ally].nom;

        finDeTour();

    }else{

        document.getElementById("text_from_textBox").innerHTML = "Pas assez de Mana"

    }
    

}

function attaque_warrior(){

    selected_action = "NONE"

    if(my_ennemy_array[selected_ennemy].alive && my_heroes_array[1].mana >= 20){

        my_ennemy_array[selected_ennemy].PV -=30;
        my_heroes_array[1].mana -=20;
        document.getElementById("text_from_textBox").innerHTML = my_heroes_array[1].nom + " a charger "+my_ennemy_array[selected_ennemy].nom+" et inflige 30 degats";

        finDeTour();

    }else{
        document.getElementById("text_from_textBox").innerHTML = "Pas assez de Mana"

    }



}

function attaque_rogue(){

    selected_action = "NONE"

    if(my_ennemy_array[selected_ennemy].alive && my_heroes_array[2].mana >= 20){

        for(i = 0;i < my_ennemy_array.length;i++){
            if(my_ennemy_array[i].alive){
                my_ennemy_array[i].PV -= 10;
            }
        }
        my_heroes_array[2].mana -=20;
        document.getElementById("text_from_textBox").innerHTML = my_heroes_array[2].nom +" lance une volee de fleche et inflige 10 degats a tout les ennemies";

        finDeTour();

    }else{
        document.getElementById("text_from_textBox").innerHTML = "Pas assez de Mana"

    }

}

function driadHeal(){

    selected_action = "NONE"

    if(my_heroes_array[3].mana >= 20 ){
        
        for(i =0;i < my_heroes_array.length; i++){

            if(my_heroes_array[i].alive){
                my_heroes_array[i].PV +=10
            }
        

        }
        my_heroes_array[3].mana -=20;
        document.getElementById("text_from_textBox").innerHTML = my_heroes_array[3].nom + " soigne tout le monde de 10 PV"

        finDeTour();


    }else{
        document.getElementById("text_from_textBox").innerHTML = "Pas assez de Mana"

    }




}

function turn_switch_check(){

    if(turn == 3 && current_Turn_Holder == "ENNEMIES"){
        
        current_Turn_Holder = "ALLIES";
        turn = turn_start();
        document.getElementById("text_button").style.visibility = "hidden";
        document.getElementById("text_from_textBox").innerHTML = document.getElementById("text_from_textBox").innerHTML+ "\n C'est a votre tour d'attaquer !";

        for(i =0; i < my_heroes_array.length; i++){

            my_heroes_array[i].mana += 10;
            my_heroes_array[i].armor = 0;
            document.getElementById("green_bar_hero_"+i).style.backgroundColor = "greenyellow";

            
        }


    }

    if(turn == 4 ){
        if(current_Turn_Holder =="ALLIES"){
            
            current_Turn_Holder = "ENNEMIES"
            turn = turn_start();

            document.getElementById("text_from_textBox").innerHTML = document.getElementById("text_from_textBox").innerHTML + "\n C'est au tour des Ennemies !";
            document.getElementById("text_button").style.visibility = "visible";

        }
        
    }
    


}

function turn_start() {


    if(current_Turn_Holder == "ALLIES"){
        for(i = 0; i < my_heroes_array.length; i++){
            if(my_heroes_array[i].alive){
                console.log(" le tour commence a la position "+ i)
                return(i)
            }
            
        }
        return(0)

    }
    if(current_Turn_Holder == "ENNEMIES"){
        for(i = 0; i < my_ennemy_array.length; i++){
            if(my_ennemy_array[i].alive){
                console.log(" le tour commence a la position "+ i)
                return(i)
            }

        }
        return(0)

    }


}

function finDeTour() {

    updateStatsInfo(my_heroes_array, my_ennemy_array)



    turn = turn + 1;

    turn_switch_check()

    if(current_Turn_Holder == "ALLIES"){


        if(my_heroes_array[turn].alive == false){

            console.log(" le tour "+ turn + " est passer car " + my_heroes_array[turn].nom + " est mort DANS FIN DE TOUR")

            return(finDeTour())
    
        }

    }

    if(current_Turn_Holder == "ENNEMIES"){

        if(my_ennemy_array[turn].alive == false){

            console.log(" le tour "+ turn + " est passer car " + my_ennemy_array[turn].nom + " est mort DANS FIN DE TOUR")

            return(finDeTour())
    
        }

    }

    turn_switch_check()
    position_check()

    

    

    

}

function position_check(){


    if(current_Turn_Holder =="ALLIES"){

        for(i = 0; i< my_ennemy_array.length; i++ ){

            my_ennemy_array[i].current_alignment = "center"

        }
 
        for(i = 0; i< my_heroes_array.length; i++ ) { 


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


            if(turn == i){

                my_ennemy_array[i].current_alignment = "flex-end"


            }else{

                my_ennemy_array[i].current_alignment = "center"

            }
        }

        updateStatsInfo(my_heroes_array, my_ennemy_array)
    }
}

function updateStatsInfo(hero_data_array,enemy_data_array) {

    document.getElementById("turn_holder_print").innerHTML = current_Turn_Holder;

    if(current_Turn_Holder == "ALLIES"){
        document.getElementById("turn_count").innerHTML = my_heroes_array[turn].nom.toUpperCase();  
    }
    if(current_Turn_Holder == "ENNEMIES"){
        document.getElementById("turn_count").innerHTML = my_ennemy_array[turn].nom.toUpperCase();   
    }
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
        document.getElementById("hero_"+i+"_mana").innerHTML = hero_data_array[i].mana;
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
        document.getElementById("upper_info_container").style.display = "none";
        document.getElementById("endgame_screen").style.display = "flex";
        document.getElementById("endgame_screen").innerHTML = "DEFAITE";
        document.getElementById("action_window_0").style.visibility = "hidden";
        document.getElementById("text_button").style.visibility = "hidden";

    }
    dead_heroes = 0;

    if(dead_ennemies >=3){
        victory_condition = true;
        document.getElementById("upper_info_container").style.display = "none";
        document.getElementById("endgame_screen").style.display = "flex";
        document.getElementById("endgame_screen").innerHTML = "VICTOIRE";
        document.getElementById("action_window_0").style.visibility = "hidden";

    }
    dead_ennemies = 0; 
}

function load(){
    document.getElementById("text_button").style.hidden =true;
}