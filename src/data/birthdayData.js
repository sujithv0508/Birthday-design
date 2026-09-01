// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE to personalize the entire website.
// Nothing below this file should need to change for basic customization.
// ─────────────────────────────────────────────────────────────

export const birthdayData = {
  sisterName: "Keerthi",
  brotherName: "Aarav",
  creatorName: "Suji na",
  secretCode: "582005",
  birthdayMessage:
    "Twenty years of you, and I still can't believe how lucky I am to call you my sister.",
  favoriteColor: "Purple",
  favoriteFood: "Biryani",
  favoriteMovie: "3 Idiots",
};

// ─────────────────────────────────────────────────────────────
// PHOTOS — replace the files in /public/photos with real images
// (jpg or png both work) and update the `image` path here.
// Keep the same aspect ratio (square-ish) for the cleanest look.
// ─────────────────────────────────────────────────────────────

export const memories = [
  {
    image: "/photos/photo1.svg",
    title: "Our Beautiful Memory",
    caption: "A memory I'll always keep close to my heart.",
    category: "childhood",
  },
  {
    image: "/photos/photo2.svg",
    title: "That Day ❤️",
    caption: "One of those moments that became unforgettable.",
    category: "trips",
  },
  {
    image: "/photos/photo3.svg",
    title: "Always Together",
    caption: "No matter how much we grow, this bond stays.",
    category: "random",
  },
  {
    image: "/photos/photo4.svg",
    title: "Biggest Supporter ❤️",
    caption: "No matter what, you've always been there for me.",
    category: "random",
  },
  {
    image: "/photos/photo5.svg",
    title: "Chaos Mode: On",
    caption: "The trip where absolutely nothing went to plan.",
    category: "trips",
  },
  {
    image: "/photos/photo6.svg",
    title: "Can't Stop Laughing",
    caption: "I still don't know what was so funny. Still funny though.",
    category: "funny",
  },
  {
    image: "/photos/photo7.svg",
    title: "Tiny Troublemakers",
    caption: "Exhibit A of why our parents have grey hair.",
    category: "childhood",
  },
  {
    image: "/photos/photo8.svg",
    title: "Just Us",
    caption: "No occasion, no reason. Just us being us.",
    category: "funny",
  },
];

export const memoryCategories = ["All", "Funny", "Trips", "Childhood", "Random"];

// ─────────────────────────────────────────────────────────────
// SCENE 5 — Fun sibling quiz. No "correct" answers here, it's
// just for laughs — each option has its own witty reaction.
// ─────────────────────────────────────────────────────────────

export const siblingQuiz = [
  {
    question: "Who is more annoying?",
    options: ["Me 😎", "You 😂", "Both of us 🤣", "Obviously nobody 😇"],
    reactions: [
      "Bold claim, and also incorrect.",
      "Finally, some honesty.",
      "Fair and balanced.",
      "That's cute. Anyway...",
    ],
  },
  {
    question: "Who is more likely to steal the food?",
    options: ["Me", "You", "Both", "Depends on the food 😂"],
    reactions: [
      "The audacity to say this.",
      "We both know this is true.",
      "No comment.",
      "The most honest answer here.",
    ],
  },
  {
    question: "Who says sorry first?",
    options: ["Me", "You", "Nobody", "Mom makes us 😂"],
    reactions: [
      "Growth. I love that for you.",
      "It me, unfortunately.",
      "Two stubborn people, one house.",
      "Every single time.",
    ],
  },
  {
    question: "Who is more dramatic?",
    options: ["Me", "You", "Both", "This question is dangerous 😭"],
    reactions: [
      "The Oscar goes to...",
      "Just say it's you.",
      "A perfectly matched pair.",
      "Wise choice, avoiding this one.",
    ],
  },
  {
    question: "Who knows the other person better?",
    options: ["Me", "You", "Equal", "We need a rematch"],
    reactions: [
      "I'll allow this.",
      "As it should be.",
      "The correct answer, honestly.",
      "Challenge accepted, some day.",
    ],
  },
  {
    question: "Who would survive longer in a zombie apocalypse?",
    options: ["Me", "You", "Neither 😂", "Mom would save us"],
    reactions: [
      "Confidence. I respect it.",
      "Finally, we agree.",
      "Realistic assessment.",
      "The only true answer.",
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// SCENE 6 — "All About Suji Na" quiz. No right/wrong answers here,
// just her picking whichever fits — the result screen shows what
// she chose rather than a score.
// ─────────────────────────────────────────────────────────────

export const sujiNaQuiz = [
  {
    question: "How do you see our relationship? ❤️",
    options: [
      "Like an own brother & sister 🥹",
      "Cousin brother & sister ❤️",
      "Best friends 😎",
      "Both A & C ❤️",
    ],
  },
  {
    question: "What is the best thing about me?",
    options: ["I care about you ❤️", "I make you laugh 😂", "I help you when you need me", "All of the above"],
  },
  {
    question: "What do you think is my biggest weakness? 😂",
    options: ["Overthinking", "Getting angry", "Being too lazy sometimes 😴", "Caring too much"],
  },
];

// ─────────────────────────────────────────────────────────────
// SCENE 11/12 — Secret messages. Edit freely, add or remove.
// ─────────────────────────────────────────────────────────────

export function getSecretMessages(data) {
  return [
    {
      id: 1,
      label: "A Memory",
      color: "from-pink-300 to-rose-400",
      title: "One I'll Never Forget ❤️",
      body: `Remember the time we laughed so hard we couldn't breathe over something completely stupid? I still think about that. Growing up with you gave me a hundred moments like that.`,
    },
    {
      id: 2,
      label: "A Secret",
      color: "from-purple-300 to-violet-400",
      title: "Just Between Us 🤫",
      body: `I've told people you're the toughest person I know. I don't say it to your face enough, but I mean it every time.`,
    },
    {
      id: 3,
      label: "A Thank You",
      color: "from-amber-200 to-orange-300",
      title: "Thank You ❤️",
      body: `Thank you for putting up with me, for the advice I didn't ask for but needed, and for always picking up the phone. It matters more than you know.`,
    },
    {
      id: 4,
      label: "A Funny One",
      color: "from-sky-200 to-cyan-300",
      title: "This One's a Joke 😂",
      body: `You're getting older, which officially makes you the "old one" in this sibling group now. I don't make the rules, ${data.sisterName}.`,
    },
    {
      id: 5,
      label: "A Wish",
      color: "from-emerald-200 to-teal-300",
      title: "My Wish For You ✨",
      body: `I hope this year gives you everything you're working toward, and a few soft, easy days in between. You deserve both.`,
    },
    {
      id: 6,
      label: "From My Heart",
      color: "from-rose-300 to-pink-400",
      title: "From My Heart ❤️",
      body: `No matter where life takes either of us, you will always be one of my favorite people. Happy birthday, ${data.sisterName}. — ${data.brotherName}`,
    },
  ];
}

// ─────────────────────────────────────────────────────────────
// SCENE 9 — Heart-catching mini game tuning.
// ─────────────────────────────────────────────────────────────

export const gameConfig = {
  durationSeconds: 10,
  heartPoints: 10,
  goldHeartPoints: 25,
  bombPenalty: 10,
  spawnIntervalMs: 650,
  goldChance: 0.12,
  bombChance: 0.18,
};

// Small unlockable one-liners sprinkled through the experience.
export const easterEggLines = [
  "You found a little piece of love ❤️",
  "Secret sparkle unlocked ✨",
  "Okay, that one was just for fun 😄",
  "Keep going, it gets better 👀",
];

// ─────────────────────────────────────────────────────────────
// SCENE 13 — "Three Little Gifts For You". Replace the three
// placeholder images in /public/gifts (gift1.svg, gift2.svg,
// gift3.svg) with real photos — same filenames, any image format
// works as long as you update the `image` path below to match.
// ─────────────────────────────────────────────────────────────

export const gifts = [
  {
    id: 1,
    theme: "rose",
    title: "A Little Memory ❤️",
    image: "/gifts/gift1.png",
    imageFit: "contain", // product photo on white — don't crop it like a face/scene photo
    message: [
      "One day this won't just be a photo... it'll be yours! 😂❤️",
      "A little memory for now... and maybe a real gift in the future 😂❤️",
      `If ${birthdayData.creatorName} gets placed in a good package, I promise I'll buy this for you! ✨`,
      "So please pray for my placement 🙏😂 — your future gift is literally depending on it! 🎁😌",
    ],
    signature: `— Love, ${birthdayData.creatorName} ❤️`,
    easterEgg: "So... please pray harder 😂🙏",
    continueLabel: "Open the Next Gift →",
  },
  {
    id: 2,
    theme: "lavender",
    title: "A Little Surprise ✨",
    image: "/gifts/gift2.png",
    imageFit: "contain", // product collage on white — don't crop it
    message: [
      "I'll be honest... I don't know anything about makeup 😂💄",
      "So this little surprise is completely in your hands! ❤️",
      "Pick whatever you want, or whichever one you need, tell me your choice, and I'll buy it for you. 🎁✨",
      "Your choice, my responsibility! 😂💸",
      "So choose something you really love... because this surprise is specially for you! 🥹❤️",
    ],
    signature: `— Love, ${birthdayData.creatorName} ❤️`,
    continueLabel: "Open the Last Gift →",
  },
  {
    id: 3,
    theme: "gold",
    title: "A Little Something Special 💗",
    image: "/gifts/gift3.png",
    imageFit: "contain",
    photoCaption: "Your Anna ❤️",
    message: [
      { text: "And finally... the most priceless gift! 🎁😂❤️", delay: 500 },
      { text: "Yes, Keerthi... it's ME! Your Anna! 😌", delay: 450 },
      {
        text: "Unfortunately, I come with no return policy, no replacement, and absolutely no expiry date. 🤣",
        delay: 500,
        effect: "funny",
      },
      { text: "You're stuck with me for life! ❤️", delay: 450 },
      {
        text: "Jokes apart, growing up with you has given me some of the best memories of my life. 🥹",
        delay: 600,
        effect: "emotional",
      },
      {
        text: "No matter how much we grow, you'll always be my little sister. ❤️",
        delay: 600,
        effect: "heartglow",
      },
      { text: "Happy Birthday, Keerthi! 🎂✨", delay: 700, effect: "finale" },
    ],
    signature: "— Your Anna ❤️",
    continueLabel: "Continue to Your Final Surprise →",
  },
];
