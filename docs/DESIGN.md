# Idea 1

## Mechanics
- inspiration https://www.youtube.com/watch?v=FUQhNGEu2KA
- inspiration endoparisitic (doors, research facility)
- player flips a lightswitch - monster advances (sometimes)
- when monster is within a certain distance, it jumps & kills the player
- when monster is advancing, play a sound effect of footsteps running (change depending on how far the creature moves?)
- player needs to find the exit (why?)
- some terrain is only visible when it is either light or dark
  - e.g. door
- could give the player a flashlight/negalight midway through
  - could include environmental versions that flip automatically; these would effectively put a 'timed' force on the player
- could include puzzles that require the player to lure the monster
  - for example, move down a hall, flip the switch to get it to move into the hall, then run around it in a square pattern to get to the door behind it
- creature can only move when they're in the light - they're only visible when they're in the dark

## Visuals
- dither effect at edges to black
- very light parallax effect on walls with dithering near the top
- doors need to look different
- death effect is the player dithering out
- audio effect & indicator when the creature is moving
- could do 3d doom-style view
  - maybe more of a stretch goal

## twists
- could borrow from D&D's shadow creatures - maybe there's multiple creatures lurking about
  - requires reversing it (they're only visible in the light & move when they're in the dark)
  - player starts with a torch (circular light effect just big enough to stumble into the creatures)
  - gives a good framing, kind of like Amnesia Rebirth's initial scenes finding the lost expedition
    > the journey so far has been wrought with peril; a descent down a cave a hundred fathoms deep, into the implacable darkness
    > you've brought with you a torch, your sole source of light - until you broke ground into the buried temple of shadow
    > this is your destination - you need to find the archmage's tomb and retrieve the artifact from within
  - offer up a path to return to the surface right away
  - multiple endings:
    - leave early; coward/strategist ending
    - death
    - escape without the artifact & with the door open; despair ending
    - escape without the artifact & with the door closed; pauper ending
    - escape with the artifact & with the door open; conquest ending
    - escape with the artifact & with the door closed; king ending
- lightswitch requires _time_ to switch to safe mode (represented by a small progress dial)
