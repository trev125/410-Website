# Choose your own adventure game - Domain Driven Design
## Define Events
- User logged in
- User created a character (added stats, names, etc.)
- User made decision
- User made decision that upgrades stats
- User picked up item
- Uploaded an image

## Define Commands
- Login/Create an account
- Ctreate a character
- Make decision
- Obtains item
- Changes characters image

## Define Entities
- User 
    id (number)
    email (string)
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
    
- Questions
    id (number)
    question (string)
    
- Answers
    id (number)
    answer (string)
    question (number)


## Define Value Objects
