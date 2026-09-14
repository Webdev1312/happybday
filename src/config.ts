/**
 * ─────────────────────────────────────────────────────────────
 *  BIRTHDAY EXPERIENCE — MASTER CONFIG
 *  Everything you're likely to want to personalize lives here.
 *  No other file needs to change for basic customization.
 * ─────────────────────────────────────────────────────────────
 */

export interface GalleryItem {
  id: string;
  src: string; // path under /public/assets/images
  caption: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

export const config = {
  /** ── People ─────────────────────────────────────────────── */
  people: {
    from: 'SA', // shown on the credits screen
    to: 'Forever', // shown on the credits screen
  },

  /** ── The big day ────────────────────────────────────────── */
  // ISO date of the birthday. Only the month/day matter for the
  // "target = 11:59 PM local time" logic in the Waiting Room.
  birthdayDate: '2026-09-16',

  /**
   * ── TEST MODE ──────────────────────────────────────────────
   * Flip this to `true` (or open the app with ?test=1 in the URL)
   * to bypass the real midnight wait while you're testing:
   *  - Scene 8 shows a "Skip to Celebration" button immediately,
   *    regardless of what time it actually is.
   *  - The final countdown (Scene 9) runs from a short test length
   *    instead of always starting at 10, so you can test faster.
   * Turn this back to `false` before you send the real link.
   */
  /**
   * ── Waiting Room threshold ──────────────────────────────────
   * When 10 minutes or less remain until 11:59 PM, Scene 8 switches
   * from a live countdown clock to "It's almost midnight ❤️" with
   * the Celebrate Now button. Adjust the number below to change
   * how early that switch happens.
   */
  almostMidnightThresholdMinutes: 15,

  testMode: true,
  testCountdownSeconds: 10,

  /** ── Scene 1: Splash ────────────────────────────────────── */
  splash: {
    tagline: 'Shveta, a special surprise is waiting for you',
  },

  /** ── Scene 3: Romantic quotes ───────────────────────────── */
  quotes: [
    'I am incredibly lucky to have found someone like you.',
    'You make ordinary days feel magical.',
    'My favourite place has always been beside you.',
    'Every heartbeat of mine whispers your name.',
    'No matter how many birthdays come, I will always choose you.',
  ],

  /** ── Scene 4: Typewriter love letter ────────────────────── */
  loveLetter: {
    salutation: 'My dearest love,',
    // ~400 words. Edit freely — this is the "handwritten" letter.
    body: `I've started this letter more times than I can count, because
no matter how I begin it, it still feels too small for everything
I want to say to you. So let me just start simply: thank you for
being you.

From the very first conversation, there was something about you
that felt like coming home. Not the excitement of something new,
but the quiet relief of finding a person the rest of my life had
been waiting for. You have this way of making the ordinary feel
extraordinary — a Dandeli afternoon, a slow drive with the windows
down, a bad joke that somehow still makes me laugh every time.
That's not a small thing. That's rare.

I think about all the small moments most people would forget —
the way you laugh with your whole body, the way you get quietly
determined about things you care about, the way you show up for
people even when it costs you something. I notice these things
because they're the reason I fell for you, and they're the reason
I keep falling, a little more, every single day.

There have been hard days too, and I want you to know I see those
just as clearly. I've watched you carry more than you should have
had to, and still find room to take care of the people around
you. If I could hand you back every ounce of that weight, I would.
What I can do is promise you this: whatever year is ahead of us,
you don't have to carry it alone.

Today isn't about grand gestures — it's about all the small
ones, stacked up into a life. It's about choosing you again, on
an ordinary day, for no reason except that I want to. Happy
birthday to the person who made my ordinary days magical, one at
a time, without even trying.

I love you more than this page can hold.

Always yours.`,
  },

  /** ── Scene 5: Our Story timeline ────────────────────────── */
  timeline: [
    {
      id: 'meeting',
      year: 'Chapter 1',
      title: 'The Day We Met',
      description:
        'A completely ordinary day that quietly became the beginning of everything. (Admissions)',
    },
    {
      id: 'friendship',
      year: 'Chapter 2',
      title: 'Just Friends (For a While)',
      description:
        'Late-night talks, inside jokes, and a friendship that slowly became something neither of us expected.',
    },
    {
      id: 'love',
      year: 'Chapter 3',
      title: 'Falling',
      description:
        'The moment it stopped being "just" anything, and started being us.',
    },
    {
      id: 'memories',
      year: 'Chapter 4',
      title: 'Everything In Between',
      description:
        'A thousand small memories — trips, dinners, arguments we laugh about now, and everyday moments that became our favorites.',
    },
    {
      id: 'future',
      year: 'Chapter 5',
      title: 'Everything Ahead',
      description:
        'This is only the story so far. The best chapters are still unwritten — and I want to write every one with you.',
    },
  ] as TimelineItem[],

  /** ── Scene 6: Memory Gallery ────────────────────────────── */
  // Drop your own photos in /public/assets/images and update the
  // paths + captions below. Aim for 10 for the full effect.
  gallery: [
    { id: 'g1', src: '/assets/images/memory-01.jpeg', caption: 'To many more like this' },
    { id: 'g2', src: '/assets/images/memory-02.jpeg', caption: 'To many more like this' },
    { id: 'g3', src: '/assets/images/memory-03.jpeg', caption: 'To many more like this' },
    { id: 'g4', src: '/assets/images/memory-04.jpeg', caption: 'To many more like this' },
    { id: 'g5', src: '/assets/images/memory-05.jpeg', caption: 'To many more like this' },
    { id: 'g6', src: '/assets/images/memory-06.jpeg', caption: 'To many more like this' },
    { id: 'g7', src: '/assets/images/memory-07.jpeg', caption: 'To many more like this' },
    { id: 'g8', src: '/assets/images/memory-08.jpeg', caption: 'To many more like this' },
    { id: 'g9', src: '/assets/images/memory-09.jpeg', caption: 'To many more like this' },
    { id: 'g10', src: '/assets/images/memory-10.jpeg', caption: 'To many more like this' },
    { id: 'g11', src: '/assets/images/memory-11.jpeg', caption: 'To many more like this' },
    { id: 'g12', src: '/assets/images/memory-12.jpeg', caption: 'To many more like this' },
    { id: 'g13', src: '/assets/images/memory-13.jpeg', caption: 'To many more like this' },
  ] as GalleryItem[],

  /**
   * ── Scene 7: Reasons I Love You ─────────────────────────────
   * The brief asks for 100 — add as many as you like, the UI
   * paginates/scrolls automatically. Here's a real, curated set
   * to start from; duplicate the pattern to reach 100.
   */
  reasons: [
    "The way you say my name when you're about to tell me something exciting.",
    "How you remember tiny details about my day that I mentioned once.",
    "Your laugh — the real one, not the polite one.",
    "How you make every room feel warmer just by being in it.",
    "The way you fight for the people you love.",
    "How you're unapologetically yourself, even when it's hard.",
    "The way you make plans just to make me smile.",
    "How safe I feel telling you anything.",
    "Your terrible jokes that somehow always land.",
    "The way you dance when you think no one's watching.",
    "How you never let me settle for less than I deserve.",
    'The way you say "we" instead of "you" when things get hard.',
    "How you notice when I'm quiet and just... sit with me.",
    "Your ridiculous competitive streak over board games.",
    "How you still get excited to see me.",
    "The way you hum without realizing it.",
    "How you turn bad days into inside jokes later.",
    "The way you hold my hand like it's a habit, not a decision.",
    "How you remember how I take my coffee.",
    "Your patience with the people who test mine.",
    'The way you say "come here" when I need it most.',
    "How you make ordinary Tuesdays feel like something worth remembering.",
    "The way you look at me like I'm the only person in the room.",
    "How you never make me feel small for feeling too much.",
    "Your ability to make me laugh at 2am when I should be asleep.",
    "How you show up, every single time, without being asked.",
    "The way you say my name like it means something.",
    "How you make me want to be a better person, without ever asking me to be.",
    "The way home feels like wherever you are.",
    "How, after all this time, you're still my favorite person to talk to.",
  ],

  /** ── Scene 13: Voice message ─────────────────────────────── */
  voiceMessage: {
    src: '/assets/audio/voice.ogg',
    label: 'A little something, in my own voice.',
  },

  /** ── Scene 14: Final letter ──────────────────────────────── */
  finalLetter: {
    // ~300 words
    body: `If you've made it this far, thank you for letting me love you
out loud for once, instead of just in the everyday, quiet ways.

Tonight isn't really about a countdown or a candle or any of the
little surprises I put together. It's about wanting you to know,
in a way you can't scroll past or forget, exactly how much you
mean to me.

You've spent so much of this year taking care of everyone else —
answering the late-night calls, showing up when it was
inconvenient, holding things together that would've fallen apart
without you. I hope tonight felt like a small return on all of
that. You deserve so much more than a small return, but I wanted
to start somewhere.

I don't know what this next year holds for either of us. I don't
think anyone really does. But I know that whatever it is, I want
to be there for it — the good parts and the hard parts, the plans
that work out and the ones that don't. I want another year of
your laugh, your terrible taste in something you love and defend
anyway, and every ordinary evening that somehow doesn't feel
ordinary because you're in it.

So happy birthday, love. Here's to another year of choosing each
other on purpose, on the easy days and the hard ones.

Thank you for being exactly who you are. I wouldn't want anyone
else.

Forever yours.`,
  },

  /** ── Scene 15: Final surprise ────────────────────────────── */
  finalSurprise: {
    lines: ['I Love You Shveta', 'More', 'Every', 'Single', 'Day'],
  },

  /** ── Audio ────────────────────────────────────────────────
   * Place your own files at these paths under /public.
   */
  /**
   * ── Audio ──────────────────────────────────────────────────
   * Place your own files at these paths under /public. The
   * experience moves through three music "chapters" automatically:
   *
   *  1. `background`     loops from the volume-check screen through
   *                      the final countdown.
   *  2. `happyBirthdaySong` crossfades in right as the fireworks go
   *                      off at midnight, plays once through the
   *                      cake + wish scenes.
   *  3. `backgroundAfter`  automatically crossfades in the moment the
   *                      Happy Birthday song finishes, and loops for
   *                      the rest of the experience (voice message,
   *                      final letter, final surprise, credits).
   *
   * You don't need to wire any of that up yourself — just drop your
   * files in and the scenes below already call the right one.
   */
  audio: {
    background: '/assets/audio/background.mp3',
    backgroundAfter: '/assets/audio/background-after.mp3',
    happyBirthdaySong: '/assets/audio/happy-birthday-song.mp3',
    heartbeat: '/assets/audio/heartbeat.mp3',
    countdownTick: '/assets/audio/countdown-tick.mp3',
    countdownVoice: '/assets/audio/countdown-voice.mp3',
    crackers: '/assets/audio/crackers.mp3',
    candleBlow: '/assets/audio/candle-blow.mp3',
    voice: '/assets/audio/voice.mp3',
  },
};

export type AppConfig = typeof config;
