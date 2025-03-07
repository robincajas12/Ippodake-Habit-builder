import { ChatData } from "./chatypes";

export const chatDataEn: ChatData = {
  start: {
    bot: "Hello! My name is Ippo, and I'm a turtle 🐢",
    options: [
      { text: "Hello, Ippo!", next: "good_response" }
    ]
  },
  good_response: {
    bot: "I'll get straight to the point! Do you know the story of the tortoise and the hare? 🐢🐇",
    options: [
      { text: "Yes! It's very popular", next: "have_you_tried_habit" },
      { text: "No, I've never heard of it. 🤔", next: "turtle_and_rabbit_story" }
    ]
  },
  turtle_and_rabbit_story: {
    bot: "The hare mocked the tortoise for being slow. 🐢 The tortoise challenged it to a race. Confident, the hare ran and took a nap. 😴 Meanwhile, the tortoise kept moving forward. ⏳ When the hare woke up, the tortoise was already near the finish line. 🏁 The hare ran, but too late: the tortoise won! 🎉 Moral: Slow and steady wins the race. 🏆",
    options: [
      { text: "That story is great! 🐢💪", next: "have_you_tried_habit" },
      { text: "I remember now, thanks! 😊", next: "have_you_tried_habit" }
    ]
  },
  have_you_tried_habit: {
    bot: "Yes it is!,I like that the moral of the story is persistence more than efficiency! Have you tried building a habit?",
    options: [
      { text: "Yes, that's why I'm here. I always fail. 😞", next: "maybe_i_can_help_with_that" },
      { text: "No, I haven't tried yet. 🤔", next: "maybe_i_can_help_with_that" }
    ]
  },
  maybe_i_can_help_with_that: {
    bot: "Maybe I can help with that! You know, this story and building habits have a lot in common. Basically, to build a habit and maintain consistency, you need to start with small steps every day and gradually increase. 📈",
    options: [
      { text: "That sounds doable! How do I start? 🚀", next: "ippodake_intro" }
    ]
  },
  ippodake_intro: {
    bot: "Ippodake is here to help with that! It's designed to help you maintain consistency by setting a minimum goal every day. 🌱 Whether it's a small task or a big goal, we'll take it step by step, just like the tortoise! 🐢 But here's the key: let's focus on just one habit at a time. Trying to build too many habits at once can be overwhelming, so we'll start with something small and manageable...",
    options: [
      { text: "Continue  please...😄", next: "ippodake_explanation" }
    ]
  },
  ippodake_explanation: {
    bot: "Well, Remember is all about taking small consistent steps every day to build lasting habits. You don't need to rush; just like the tortoise, steady progress is key. Every day, we'll set a small goal, and you'll gradually see your progress grow. 🐢 The more consistent you are, the closer you'll get to your big goal!",
    options: [
      { text: "Got it! Let's get started! 🚀", next: "enable_notifications" }
    ]
  },
  enable_notifications: {
    bot: "For Ippodake to work properly and for you to track your progress consistently, notifications need to be enabled. Don't forget to turn them on! 🔔",
    options: [
      { text: "Okay!", next: "start_tracking" }
    ]
  },
  start_tracking: {
    bot: "Great! Let's start setting up your first goal. 🌟",
    options: []
  }
};