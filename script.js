const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const inventoryElement = document.getElementById('inventory')

let inventory = {}//Practically your inventory

function startGame() {
  inventory = {}
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
  showTextNode(nextTextNodeId)
}

function deleteItem(prop){
  delete inventory[prop]
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in a strange place and you see a jar of blue goo near you.',
    options: [
      {
        text: 'Take the goo',
        setInventory: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Leave the goo',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Hello this is a test!',
    options: [{
      text: 'Get a sword',
      setInventory: {sword: true},
      removeInventory: 'blueGoo',
      nextText: 1///Change
    },
    {
      text: 'Get a shield',
      setInventory: {shield: true},
      nextText: 1///Change
    },
    ]
  }
]

startGame()