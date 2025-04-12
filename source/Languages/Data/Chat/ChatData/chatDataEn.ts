import { ChatData } from "./chatypes";


export const chatDataEn: ChatData = {
  start: {
    bot: "Hello! My name is Ippo, and I'm a determined little turtle 🐢",
    options: [
      { text: "Hello, Ippo!", next: "good_response" }
    ]
  },
  good_response: {
    bot: "Let me ask you something... Do you know the story of the tortoise and the hare? 🏁",
    options: [
      { text: "Yes! It's a classic!", next: "have_you_tried_habit" },
      { text: "Not really, tell me more! 🤔", next: "turtle_and_rabbit_story" }
    ]
  },
  turtle_and_rabbit_story: {
    bot: "Once upon a time, a swift hare laughed at a slow-moving tortoise. 🐢 But the tortoise challenged the hare to a race. Overconfident, the hare dashed ahead but got distracted and took a nap. Meanwhile, the tortoise kept going—step by step, never stopping. ⏳ By the time the hare woke up, the tortoise was about to cross the finish line... and won! 🎉 The lesson? Slow and steady wins the race. 🏆",
    options: [
      { text: "That story is inspiring! 🐢💪", next: "have_you_tried_habit" },
      { text: "Oh yeah, I remember now! 😊", next: "have_you_tried_habit" }
    ]
  },
  have_you_tried_habit: {
    bot: "I like the message, 'The secret isn’t speed—it’s consistency'. Have you ever tried building a habit, like reading every day or learning a new skill?",
    options: [
      { text: "Yes, but I always struggle to keep going. 😞", next: "maybe_i_can_help_with_that" },
      { text: "Not really, but I'd love to start! 🤔", next: "maybe_i_can_help_with_that" },
      { text: "Yes", next: "i_can_make_it_more_easy" }

    ]
  },
  i_can_make_it_more_easy: {
    bot: "I can make this task much easier for you! The trick isn't to push yourself too hard but to take small, consistent steps. With Ippodake, you'll set simple, achievable goals every day, making progress feel effortless. 🐢✨ Ready to give it a try?",
    options: [
      { text: "Sounds great! Let’s do it! 🚀", next: "ippodake_intro" }
    ]
  },  
  maybe_i_can_help_with_that: {
    bot: "That’s where I come in! Just like the tortoise, building habits is about taking small steps every day. No rush, no pressure—just steady progress! 📈",
    options: [
      { text: "That actually makes sense! How do I start? 🚀", next: "ippodake_intro" }
    ]
  },
  ippodake_intro: {
    bot: "Welcome to Ippodake! 🐢 This app is designed to help you stick to the things you love—whether it's reading, practicing a language, or any hobby that makes you happy. The trick? A simple, achievable goal every day! 🌱",
    options: [
      { text: "Sounds great! Tell me more! 😄", next: "ippodake_explanation" }
    ]
  },
  ippodake_explanation: {
    bot: "Big goals can feel overwhelming, but what if you just focused on one step at a time? With Ippodake, you'll track small wins daily and watch them grow. The key isn't perfection—it's showing up. 🏆",
    options: [
      { text: "Got it! Let’s get started! 🚀", next: "enable_notifications" }
    ]
  },
  enable_notifications: {
    bot: "One last thing! To stay on track, Ippodake will send you friendly reminders. Don’t worry, I won’t spam you—I’m just here to help! 🔔",
    options: [
      { text: "Alright, let’s do this!", next: "start_tracking" },
      { text: "I’ll turn them on later...", next: "start_tracking" }
    ]
  },
  start_tracking: {
    bot: "Awesome! Let’s set up your first goal and take the first step together. 🐢✨",
    options: []
  }
};
