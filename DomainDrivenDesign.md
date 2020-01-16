# Choose your own adventure game - Domain Driven Design
## Define Events
- User logged in
- User created a character (added stats, names, etc.)
- User made decision
- User made decision that upgrades stats
- User picked up item

## Define Commands
- Login/Create an account
- Ctreate a character
- Make decision
- Obtains item

## Define Entities
- User 
    id (number)
    email (string)
    password (string)
    name (string)
    currentQuestion (number)
    character (number)
    
- Character
    name (string)
    strength (number)
    dex (number)
    speech (number)
    intel (number)
    otherAttrb (number)
    
- Bag
    id (number)
    characterID (number)
    itemID (number)
    
- Questions
    id (number)
    question (string)
    
- Answers
    id (number)
    answer (string)
    question (number)

- Items 
    id (number)
    item (string)
    question (number)

## Define Value Objects
Not sure I have any?