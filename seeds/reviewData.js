const { Review } = require('../models');

const reviewdata = [
    {
        review: "This bathroom is so fancy; I half expected a red carpet to roll out as I walked in. The toilet paper was softer than my dreams, and the hand dryer had more power than my last relationship. If I could, I'd move in and call it 'Home Sweet Throne.",
        rating: 5,
        user_id: 1,
    },
    {
        review: "I'm not saying this restroom is haunted, but the automatic flush scared the you-know-what out of me. As soon as I stood up, it thought I was done, and I swear I heard it laugh. Spooky, but clean!",
        rating: 3,
        user_id: 2,
    },
    {
        review: "The hand dryer in this bathroom must be a prototype for a NASA rocket engine. It's so loud I think it just violated several noise ordinances. On the plus side, it dried my hands, my hair, and my soul in under 3 seconds.",
        rating: 3,
        user_id: 3,
    },
    {
        review: "I'd rather use a porta-potty at a chili-eating contest than ever set foot in this bathroom again. The graffiti on the walls looked like the work of aspiring abstract artists on a caffeine high. And the soap dispenser? Well, let's just say I went in with dirty hands and left with dirty hands.",
        rating: 1,
        user_id: 4,
    },
    {
        review: "To call this bathroom 'out of order' would be an understatement. It's not just out of order; it's out of hope, out of toilet paper, and out of any intention to maintain a shred of dignity. Avoid at all costs unless you're a method actor preparing for a horror film.",
        rating: 2,
        user_id: 5,
    },
]