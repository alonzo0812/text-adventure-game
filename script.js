const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const inventoryElement = document.getElementById('inventory')
const healthElement = document.getElementById('health')
const imageElement = document.getElementById('image-container')

let inventory = {}//Practically your inventory
let playerHealth = 0;

function startGame() {
  inventory = {}
  playerHealth = 100//Math.floor((Math.random()*20 + 100))
  showTextNode(1)
}

function typeWriter(textNode,x) {
    if (x < textNode.length){//try while?
      console.log(textNode)
      textElement.innerHTML += textNode.charAt(x);
      x++;
      setTimeout(function(){typeWriter(textNode,x);}, 15)
    }
  };
  

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  ////////////////////////////////////
  var x = 0;
  textElement.innerText = '';
  typeWriter(textNode.text,x)
  ////////////////////////////////////////////////
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredInventory == null || option.requiredInventory(inventory)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  inventory = Object.assign(inventory, option.setInventory)
  if (option.removeInventory){
    deleteItem(option.removeInventory)
  }
  inventoryElement.innerText = 'Inventory: ' + JSON.stringify(inventory)
  healthElement.innerText = 'Health: ' + playerHealth

  showTextNode(nextTextNodeId)
}

function deleteItem(prop){
  delete inventory[prop]
}

//BASE FORMAT -----
  // {
  //   id: //Number,
  //   text: ``, USE BACKTICKS FOR MULTILINE STRINGS
  //   options: [{
  //     text: '',
  //     setInventory: {item: true},
  //     removeInventory: 'item',
  //     nextText: ///NextNum
  //   },
  //   {
  //     text: ``,
  //     setInventory: {item: true},
  //     nextText: ///NextNum
  //   },
  //   ]
  // }
//-----

const textNodes = [
  {
    id: 1,
    text: 'Welcome to "Vengeance of the Sun"! The story of a knight named Curlone, set in the medieval era. I hope you\'ll enjoy playing this game ;P',
    options: [
      {
        text: 'Start the Adventure!',
        nextText: 2
      },
      {
        text: 'Start the Adventure!',
        nextText: 2,
      },
    ]
  },
  {
    id: 2,
    text: `In the main lands of Schole lies the Kingdom of Destice. A kingdom filled with horrid men reeking of carnal desires and the stench of corruption.
            Though Destice is a place that rivals hell, some still harbour goodwill in their heart. A cliche isn't it? Now one may ask, in a place where one must be good or bad, does there lie hope for an outcast to exist? A man whose only shade is gray? 
Surprisingly, there is. And that is you, the mighty knight that balances the opposing forces that eternally clash in the everyday of Destice, the knight named Curlone.
  And you are standing now atop the castle tower looking below at the wide scenery of madness in front of you, Destice. Knowing that the King wishes to meet you soon for a Quest, you then wore your armor and went on to prepare the best weapon you can yield….
`,
    options: [{
      text: 'a Sword',
      nextText: 3,
      setInventory: {Sword: true, Swordsman: true}
    },
    {
      text: 'a Bow',
      nextText: 4,
      setInventory: {Bow: true, Archer: true}
    },
    {
      text: 'Twin Daggers',
      nextText: 5,
      setInventory: {Daggers: true, Assassin: true}
    },
    {
      text: 'a Spear',
      nextText: 6,
      setInventory: {Spear: true, Spearman: true}
    },
    ]
  },
  {
    id: 3,
    text: ``,
    options: [{
      text: 'Continue',
      nextText: 7
    },
    {
      text: `Continue`,
      nextText: 7
    },
    ]
  },
  {
    id: 4,
    text: ``,
    options: [{
      text: 'Continue',
      nextText: 7
    },
    {
      text: `Continue`,
      nextText: 7
    },
    ]
  },
  {
    id: 5,
    text: ``,
    options: [{
      text: 'Continue',
      nextText: 7
    },
    {
      text: `Continue`,
      nextText: 7
    },
    ]
  },
  {
    id: 6,
    text: ``,
    options: [{
      text: 'Continue',
      nextText: 7
    },
    {
      text: `Continue`,
      nextText: 7
    },
    ]
  },
  {
    id: 7,
    text: `With your arms in hand, you felt well-prepared to meet the King....
You enter his chamber and as you walk you heard the noise of a few soldiers
chattering in a distance.

???: "Ah.. the King has yet ordered for another prey"
??: "Pitiful lad.. I hope he not hear the voice of angels too soon"
???: "Bah! Serves him right! He's a knight of no welcome to any side of Destice"`,
    options: [{
      text: 'Proceed to talk to the King',
      nextText: 8
    },
    {
      text: `Kill the solder who disrespected you`,
      nextText: 8
    },
    ]
  }
]

startGame()