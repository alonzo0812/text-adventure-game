const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const inventoryElement = document.getElementById('inventory')
const healthElement = document.getElementById('health')

let inventory = {}//Practically your inventory
let playerHealth = 0;

function startGame() {
  inventory = {}
  playerHealth = Math.floor((Math.random()*20 + 100))
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
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
    text: 'Welcome to "Vengeance of the Sun"! I hope you\'ll enjoy playing this game ;P',
    options: [
      {
        text: 'Start the Adventure!',
        nextText: 2
      },
      {
        text: 'Start the Adventure!',
        nextText: 2
      },
    ]
  },
  {
    id: 2,
    text: `asdfasdfasdfadfasfasdfasdfasdfasdfa`,
    options: [{
      text: 'Continue',
      nextText: 3///Change
    },
    {
      text: 'Continue',
      nextText: 3///Change
    },
    ]
  },
]

startGame()