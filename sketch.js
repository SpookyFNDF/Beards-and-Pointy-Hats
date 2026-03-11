//Soundtrack source: https://www.looperman.com/loops/detail/406626/chiptune-melody-loop-agrrx-128bpm-free-128bpm-8bit-chiptune-synth-loop

//Holds the last choice the player made as a string.
let currentChoice = " ";

let playCount = 0;

let lightOpacity = 255;
//Loads the font and song used throughout the game
function preload()
{
  buttonPress = loadSound("button_press.mp3");
  hurtSound = loadSound("hurt-sound.mp3");
  wizardGroan = loadSound("wizard-groan.mp3");
  soundtrack = loadSound("ost.wav");
  lightSpellSound = loadSound("light-spell.mp3");
  dialogueFont = loadFont("dogica.ttf");
}

//Make the button class which controls the behaviors of buttons.
class Button
  {
    //Buttons contain which choice they make as a string, their position as a string,
    // the position has three possible options, "top", "right", and "left", and   
    // their status as active being true or false.
    constructor(choice,pos)
    {
      this.choice = choice;
      this.pos = pos;
      this.active = false;
    }
    
    //sets the button to active, makes a rounded rectangle with text containing the choice
    //the position of the button is set depending on if pos = "top", "right", "left"
    show()
    {
      this.active = true;
      fill(255);
      rectMode(CENTER);
      textAlign(CENTER);
      textSize(10);
      textFont(dialogueFont);
      if(this.pos == "top" && (
            (mouseX < width/2 + 125) && (mouseX > width/2 - 125) &&
            (mouseY < height-height/4 + 20) && (mouseY > height-height/4 - 20)
            ))
        {
          fill(220);
          rect(width/2,height-height/4,275,75,20);
          fill(0);
          text(this.choice,width/2,(height-height/4) + 3);
        }
      else if(this.pos == "top")
        {
           rect(width/2,height-height/4,250,50,20);
          fill(0);
          text(this.choice,width/2,(height-height/4) + 3);
        }
      else if(this.pos == "right" && (mouseX < width/2 + (width/4) + 125) && 
              (mouseX > width/2 + (width/4) - 125) &&
            (mouseY < height-height/6 + 20) && (mouseY > height-height/6 - 20))
        {
          fill(220);
          rect(width/2 + (width/4),height-height/6,275,75,20);
          fill(0);
          text(this.choice,width/2 + (width/4),(height-height/6) + 3);
        }
      else if(this.pos == "right")
        {
          rect(width/2 + (width/4),height-height/6,250,50,20);
          fill(0);
          text(this.choice,width/2 + (width/4),(height-height/6) + 3);
        }
      else if(this.pos == "left" && (mouseX < width/2 - (width/4) + 125) && 
        (mouseX > width/2 - (width/4) - 125) && 
        (mouseY < height-height/6 + 20) && (mouseY > height-height/6 - 20))
        {
          fill(220);
          rect(width/2 - (width/4),height-height/6,275,75,20);
          fill(0);
          text(this.choice,width/2 - (width/4),(height-height/6) + 3);
        }
      else if(this.pos == "left")
        {
          rect(width/2 - (width/4),height-height/6,250,50,20);
          fill(0);
          text(this.choice,width/2 - (width/4),(height-height/6) + 3);
        }
    }
    
    //Sets the buttons active state to false so that they cannot be clicked while hidden
    hide()
    {
      this.active = false;
    }
    
    //Controls what happens after the mouse is clicked, checks the buttons position and if its
    //active, if the button is active and the mouse is within bounds, then currentChoice
    // becomes the choice written on the button.
    click()
    {
      if(this.pos == "top" && this.active == true)
        {
          if (
            (mouseX < width/2 + 125) && (mouseX > width/2 - 125) &&
            (mouseY < height-height/4 + 20) && (mouseY > height-height/4 - 20)
            )
            {
              buttonPress.play();
              currentChoice = this.choice;
              playCount = 0;
              lightOpacity = 220;

            }
        }
      else if(this.pos == "right" && this.active == true)
        {
          if
            (
              (mouseX < width/2 + (width/4) + 125) && (mouseX > width/2 + (width/4) - 125) &&
            (mouseY < height-height/6 + 20) && (mouseY > height-height/6 - 20)
            )
            {
              buttonPress.play();
              currentChoice = this.choice;
              playCount = 0;
              lightOpacity = 220;

            }
        }
      else if(this.pos == "left" && this.active == true)
        {
          if
            (
            (mouseX < width/2 - (width/4) + 125) && (mouseX > width/2 - (width/4) - 125) &&
            (mouseY < height-height/6 + 20) && (mouseY > height-height/6 - 20)
            )
            {
              buttonPress.play();
              currentChoice = this.choice;
              playCount = 0;
              lightOpacity = 220;
            }
        }
      }
    }
       
    
      
  
// Makes the scene class which controls which scene is displayed, each scene is made up
// of the text it contains, and up to 3 buttons.
class Scene
{
  constructor(dialogue,button1,button2,button3)
  {
  this.dialogue = dialogue;
  this.button1 = button1;
  this.button2 = button2;
  this.button3 = button3;
  }
  
  //Shows the dialogue text with the appropriate font and makes the test move using sin
  // and checks the number of buttons and shows the buttons in the current scene.
  show() 
  {
    fill(255);
    textSize(20);
    textAlign(CENTER);
    textFont(dialogueFont);
    background(0);
    text(this.dialogue,width/2,height/8 + 10 * sin(frameCount*0.05),width);
    if(this.button3 != undefined)
      {
    this.button1.show();
    this.button2.show();
    this.button3.show();
      }
    else if(this.button2 != undefined)
      {
    this.button1.show();
    this.button2.show();
      }
    else if(this.button1 != undefined)
      {
    this.button1.show();
      }
  }
  
  
  //Removes the on screen text and also hides and deactivates buttons.
  hide()
  {
    if(this.button3 != undefined)
      {
    this.button1.hide();
    this.button2.hide();
    this.button3.hide();
      }
    else if(this.button2 != undefined)
      {
    this.button1.hide();
    this.button2.hide();
      }
    else if(this.button1 != undefined)
      {
    this.button1.hide();
      } 
  }
  
}

function setup() 
{
  //loops the soundtrack
  soundtrack.setVolume(0.4);
  soundtrack.loop();
  //Builds a canvas to the dimensions of the current window.
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  //Creates all the buttons and scenes in the game, the story is currently not
  //fully implemented due to time constraints and an unforseen illness.
  button1 = new Button("Start","top");
  button2 = new Button("Continue", "top");
  button3 = new Button("Look Around", "top");
  button4 = new Button("Explore the Forest", "top");
  button5 = new Button("Explore the Cave", "right");
  button6 = new Button("Explore the River", "left");
  button7 = new Button("Try another path?", "top");
  button8 = new Button("Use a Light Spell", "top");
  button9 = new Button("Continue Wandering", "right");
  button10 = new Button("Use a Nose Spell", "left");
  button11 = new Button("Maybe use a spell?", "top");
  button12 = new Button("Use the Nose Spell", "top");
  button13 = new Button("Leg it", "right");
  button14 = new Button("Use the Growth Spell", "left");
  button15 = new Button("The bats are faster", "top");
  button16 = new Button("Smell does not kill bats", "top");
  button17 = new Button("Proceed through the cave", "top");
  button18 = new Button("Follow your nose", "right");
  button19 = new Button("Use a Light Spell", "left");
  button20 = new Button("Thanks for playing!", "top");
  scene1 = new Scene("Beards and Pointy Hats",button1);
  scene2 = new Scene("It is the morning on this fantastical world, you had set up camp the night before. You are a mystical wizard, as old as dirt, your powers come from your mystical spell book. A possesion every wizard must safely guard with their life, for it contains world destroying capabilities.",button2);
  scene3 = new Scene("Your spell book has been robbed from your camp while you slept you old fool, a tattered shawl contains the insignia of the League of Bandits, a dastardly congretation of plunderers.",button3);
  scene4 = new Scene("Looking around you can see three deadly paths, a grim pathway through the forest, a dimly lit cave entrance, and a rickety canoe on the river bed.",button4,button5,button6);
  scene5 = new Scene("You cautiously wander into the forest, suddenly your foot is caught in a rope and up you go, caught in a trap, bandits spring out from all directions and slice you to shreds.",button7);
  scene6 = new Scene("You lift your feet into the canoe and begin riding the quick sprinting river, only a few minutes into your ride a waterfall opens up ahead and swallows you and your canoe.",button7);
  scene7 = new Scene("You duck your head down to enter the cave, shortly after stepping in, you spot torn pages from your spell book. Picking up the pages and heading deeper into the cave even a modicom of light is absent. Echoes grow louder and louder signaling that the once narrow path has opened into a large open chamber.",button8,button9,button10);
  scene8 = new Scene("You continue wandering in the darkness, hours become days, days become weeks, weeks become months, and eventually you starve to death in the darkness.",button11);
  scene9 = new Scene("You use the light spell. With a blinding flash, the cave instantly becomes as bright as the midday sun. On the ceiling of the cave, a flock of giant cave bats is sent into a murderous rage by the light. The bats sense you and the entire flock charges you while screeching deafeningly loud.",button12,button13,button14);
  scene10 = new Scene("You run as fast as your old legs can muster. Unfortunately the bats are faster and you are torn to shreds before arriving to safety.", button15);
  scene11 = new Scene("You use the nose spell. Your sense of smell greatly improves and you can distinctly identify all the sorrounding scents. Unfortunately this does nothing to stop the approaching swarm of bats and you are torn to shreds.",button16);
  scene12 = new Scene("You use the growth spell, your hand grows to the size of a mountain and you strike the entire swarm with your giant palm, instantly disintegrating the swarm of bats.",button17)
  scene13 = new Scene("You use the nose spell. Your sense of smell greatly improves and you can distinctly identify all the sorrounding scents. In the utter darkness, you can smell roasting meat further into the cave.",button18,button19);
scene14 = new Scene("You locate a small passage leading away from the large open chamber, curiously, this passage smells strongly of roasting meat. The journey for the spell book must continue, but for now the wizard behind this adventure must put down his own beard and pointy hat",button20)
}
// uses if statements and the value of currentChoice to control which scene is on screen.
function draw() 
{
  if(currentChoice == " " || currentChoice == "Thanks for playing!")
    {
      scene14.hide();
      scene1.show();
    }
  if(currentChoice == "Start")
    {
      scene1.hide();
      scene2.show();
    }
  if(currentChoice == "Continue")
    {
      scene2.hide();
      scene3.show();
    }
  if(currentChoice == "Look Around")
    {
      scene3.hide();
      scene4.show();
    }
  if(currentChoice == "Explore the Forest")
    {
      scene4.hide();
      scene5.show();
       defeat();
    }
  if(currentChoice == "Explore the River")
    {
      scene4.hide();
      scene6.show();
      defeat();
    }
  if(currentChoice == "Try another path?")
    {
      scene5.hide();
      scene6.hide();
      scene4.show();
    }
  if(currentChoice == "Explore the Cave")
    {
      scene4.hide();
      scene7.show();
    }
  if(currentChoice == "Continue Wandering")
    {
      scene7.hide();
      scene8.show();
      defeat();
    }
  if(currentChoice == "Maybe use a spell?")
    {
      scene8.hide();
      scene7.show();
    }
  if(currentChoice == "Use a Light Spell")
    {
      scene13.hide();
      scene7.hide();
      scene9.show();
      lightSpell();
    }
  if(currentChoice == "Leg it")
    {
      scene9.hide();
      scene10.show();
      defeat();
    }
  if(currentChoice == "The bats are faster")
    {
      scene10.hide();
      scene9.show();
    }
  if(currentChoice == "Use the Nose Spell")
    {
      scene9.hide();
      scene11.show();
      defeat();
    }
  if(currentChoice == "Smell does not kill bats")
    {
      scene11.hide();
      scene9.show();
    }
  if(currentChoice == "Use the Growth Spell")
    {
      scene9.hide();
      scene12.show();
    }
  if(currentChoice == "Use a Nose Spell")
    {
      scene7.hide();
      scene13.show();
    }
  if(currentChoice == "Proceed through the cave" || currentChoice == "Follow your nose")
    {
      scene12.hide();
      scene13.hide();
      scene14.show();
    }
  
}

//checks every button to see if it is being clicked when the mouse is pressed.
function mousePressed()
{
  button1.click();
  button2.click();
  button3.click();
  button4.click();
  button5.click();
  button6.click();
  button7.click();
  button8.click();
  button9.click();
  button10.click();
  button11.click();
  button12.click();
  button13.click();
  button14.click();
  button15.click();
  button16.click();
  button17.click();
  button18.click();
  button19.click();
  button20.click();
}

//Makes sure that the defeat or "wrong choice" sound is only played once and does not infinitely loop and controls the visuals for the defeat effect.
function defeat()
{
  if(playCount == 0)
    {
  hurtSound.play();
  wizardGroan.play();
  fill(255,0,0);
  rect(width/2,height/2,width,height);
  playCount = 1;
    }
}

//controls the visuals for the light spell effect
function lightSpell()
{
  if(playCount == 0)
    {
      lightSpellSound.play();
      playCount = 1;
    }
      fill(255,200,200,lightOpacity);
      rect(width/2,height/2,width,height);
  if(lightOpacity > 0)
    {
      lightOpacity --;
    }
  else
    {
      lightOpacity = 0;
    }
}


// function growthSpell()
// {
//   fill(200,255,255,lightOpacity);
//   rect(width/2,height/2,width/10,height/10);
// }

