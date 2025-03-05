export const firstUserChat: any= {
    start: {
      bot: "Hello! How's your day?",
      options: [
        { text: "Good!", next: "good_response" },
        { text: "Not so great.", next: "bad_response" },
      ],
    },
    good_response: {
      bot: "That's great to hear! What are you up to?",
      options: [
        { text: "Working.", next: "working_response" },
        { text: "Just relaxing.", next: "relaxing_response" },
      ],
    },
    bad_response: {
      bot: "Oh no, what happened?",
      options: [
        { text: "Just a rough day.", next: "rough_day_response" },
        { text: "Nothing much.", next: "nothing_response" },
      ],
    },
    working_response: { bot: "Work hard! Hope it goes well.", options: [] },
    relaxing_response: { bot: "Enjoy your time! You deserve it.", options: [] },
    rough_day_response: { bot: "I hope tomorrow is better for you!", options: [] },
    nothing_response: { bot: "I see. Hope things get better!", options: [] },
  };