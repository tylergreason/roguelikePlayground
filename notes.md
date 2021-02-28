## Monsters Class: 
- What's used for all monsters in the game 
- Properties: 
  - team: used to differentiate between friends and enemies 
  - hp & total hp: used to tell what the current and max hp are
    - Make a method to return the percent, too 
  - move: how far they can move in a turn 
  - damage: how much damage their attack does. Use only one attack for now to keep things simple. 
  - attack range: a value used to determine if something this monster wants to attack is within range.
  - logic: this is run when the monster's turn comes up. It's the decision tree for the monster. 
    - This will be very basic to begin with. 
    - May end up being a switch statement that asks which *profile* the monster has (aggressive, defensive, whatever) that can be used to quickly give a monsters a peronality. 


## Level Tile Schema 
- tile: numerical value that determines if it's walkable or not. 
- occupants: list of the monsters occupying the tile. 