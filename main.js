"use strict";
const game__icon = document.querySelector('.game__icon');
const game__text = document.querySelector('.game__text');
const game__counter = document.querySelector('.game__counter');
const buttons = document.querySelectorAll('.button');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const Counter = document.createElement('p');
const result = document.createElement('div');
const resultText = document.createElement('p');
let countTrue = 0;
let countAll = 0;
let resultNumber = 0;
let oneSkill;
let twoSkill;
let SkillsDescRandom;
let Skills;
let SkillsDesc;
buttons.onmouseover = () =>{
    buttons.style.border = '1px solid white';
};
function gameModel(skill, manacost,cooldown,icon){
    this.skill = skill;
    this.manacost = manacost;
    this.cooldown = cooldown;
    const image = document.createElement('img');
    image.classList.add('game_image');
    image.src = icon;
    this.icon = image;
};
function countPlus(){
    countTrue+=1;
    countAll+=1;
}
function gameRandom(){
    resultNumber+=Math.round((countTrue/countAll));
    if(resultNumber>100){
        resultNumber = 100;
    }
    if (resultNumber !== resultNumber){
        resultNumber = 0;
    };
    result.remove();
    button1.style.display = 'none';
    const BersCall = new gameModel("Berserker's Call","80/90/100/110","17/15/13/11","photo_skills/ability1.jpg");
    const WildAxes = new gameModel("Wild Axes","65","8",'photo_skills/ability2.jpg');
    const Counterspell = new gameModel("Counterspell","45","17/11/7/3",'photo_skills/ability3.jpg');
    const ManaVoid = new gameModel("Mana Void","100/200/300","70","photo_skills/ability4.jpg");
    const gameSkills = [BersCall,WildAxes,Counterspell,ManaVoid];
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    oneSkill = getRandomInt(0,gameSkills.length);
    twoSkill = oneSkill;
    while (twoSkill === oneSkill){
        twoSkill = getRandomInt(0,gameSkills.length);
    };
    Skills = [gameSkills[oneSkill],gameSkills[twoSkill]];
     SkillsDescRandom = getRandomInt(0,1);
    SkillsDesc = `${Skills[SkillsDescRandom].skill} <br>${Skills[SkillsDescRandom].manacost} / ${Skills[SkillsDescRandom].cooldown}`
    const SkillDescP = document.createElement('p');
    SkillDescP.innerHTML = SkillsDesc;
    game__text.append(SkillDescP);
    if (getRandomInt(0,2) === 1){
        game__icon.append(gameSkills[oneSkill].icon);
        game__icon.append(gameSkills[twoSkill].icon);
    }else{
        game__icon.append(gameSkills[twoSkill].icon);
        game__icon.append(gameSkills[oneSkill].icon);
    };
    const image_game = document.querySelectorAll('.game_image');
    const icon_one = document.querySelectorAll('.game_image')[0];
    const icon_two = document.querySelectorAll('.game_image')[1];
    function Score(icon){
        if(icon == Skills[SkillsDescRandom].icon){
            countPlus();
            gameNext();
        }else{
            countAll+=1;
            gameNext();
        }
    }
    icon_two.addEventListener('click',() => Score(icon_two));
    icon_one.addEventListener('click',() => Score(icon_one));
    game__counter.append(Counter);
    function gameNext(){
        SkillDescP.remove();
        image_game[0].remove();
        image_game[1].remove();
        Counter.textContent = `${countTrue} / ${countAll}`;
        gameRandom();
    };
    function gameEnd(){
        resultText.textContent = `ВЫ ЗАРАБОТАЛИ : ${resultNumber} БАЛЛОВ`;
        result.append(resultText);
        game__icon.append(result);
        countTrue = 0;
        countAll = 0;
        button1.style.display = 'block';
        SkillDescP.remove();
        image_game[0].remove();
        image_game[1].remove();
        Counter.textContent = '';
        Counter.remove();
    };
    button2.addEventListener('click',gameEnd);
};