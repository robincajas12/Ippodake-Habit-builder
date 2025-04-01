import { ChatData } from "./chatypes";
export const chatDataEs: ChatData = {
  start: {
    bot: "¡Hola! Me llamo Ippo y soy una tortuga muy determinada 🐢",
    options: [
      { text: "¡Hola, Ippo!", next: "good_response" }
    ]
  },
  good_response: {
    bot: "Déjame preguntarte algo... ¿Conoces la historia de la liebre y la tortuga? 🏁",
    options: [
      { text: "¡Sí! Es un clásico", next: "have_you_tried_habit" },
      { text: "No estoy seguro, cuéntame más 🤔", next: "turtle_and_rabbit_story" }
    ]
  },
  turtle_and_rabbit_story: {
    bot: "Había una vez una liebre veloz que se burlaba de una tortuga por ser lenta. 🐢 Pero la tortuga la desafió a una carrera. La liebre, confiada, corrió rápido pero se distrajo y decidió tomar una siesta. 😴 Mientras tanto, la tortuga siguió avanzando, paso a paso. ⏳ Cuando la liebre despertó, la tortuga estaba a punto de cruzar la meta... ¡y ganó! 🎉 ¿La lección? La constancia supera la velocidad. 🏆",
    options: [
      { text: "¡Esa historia me inspira! 🐢💪", next: "have_you_tried_habit" },
      { text: "Oh, ya la recuerdo. ¡Gracias! 😊", next: "have_you_tried_habit" }
    ]
  },
  have_you_tried_habit: {
    bot: "Me gusta su mensaje... 'El secreto no es la velocidad, sino la constancia'. ¿Alguna vez has intentado crear un hábito, como leer todos los días o aprender algo nuevo?",
    options: [
      { text: "Sí, pero siempre me cuesta mantenerlo. 😞", next: "maybe_i_can_help_with_that" },
      { text: "No, pero me gustaría intentarlo. 🤔", next: "maybe_i_can_help_with_that" },
      { text: "Sí", next: "i_can_make_it_more_easy" }
    ]
  },
  i_can_make_it_more_easy: {
    bot: "¡Puedo hacer que esta tarea sea mucho más fácil para ti! El truco no es exigirte demasiado, sino dar pequeños pasos constantes. Con Ippodake, establecerás metas simples y alcanzables cada día, haciendo que el progreso se sienta natural y motivador. 🐢✨ ¿Listo para intentarlo?",
    options: [
      { text: "¡Suena genial! ¡Vamos allá! 🚀", next: "ippodake_intro" }
    ]
  },
  maybe_i_can_help_with_that: {
    bot: "¡Ahí es donde entro yo! Construir hábitos es como la historia de la tortuga: no se trata de ir rápido, sino de dar pequeños pasos todos los días. 📈",
    options: [
      { text: "Tiene sentido, ¿cómo empiezo? 🚀", next: "ippodake_intro" }
    ]
  },
  ippodake_intro: {
    bot: "¡Bienvenido a Ippodake! 🐢 Esta app está diseñada para ayudarte a ser constante con lo que amas, ya sea leer, aprender un idioma o cualquier pasatiempo que te haga feliz. La clave está en fijar un objetivo pequeño cada día. 🌱",
    options: [
      { text: "¡Suena genial! ¡Cuéntame más! 😄", next: "ippodake_explanation" }
    ]
  },
  ippodake_explanation: {
    bot: "Los grandes objetivos pueden ser abrumadores, pero ¿qué tal si solo te enfocas en un pequeño paso a la vez? Con Ippodake, harás un seguimiento de tus avances diarios y verás cómo crecen con el tiempo. La clave no es la perfección, es la constancia. 🏆",
    options: [
      { text: "¡Entendido! ¡Empecemos! 🚀", next: "enable_notifications" }
    ]
  },
  enable_notifications: {
    bot: "¡Una última cosa! Para mantenerte en el camino, Ippodake te enviará recordatorios amigables. No te preocupes, no te voy a molestar demasiado, solo quiero ayudarte. 🔔",
    options: [
      { text: "¡De acuerdo, activémoslas!", next: "start_tracking" },
      { text: "Las activaré más tarde...", next: "start_tracking" }
    ]
  },
  start_tracking: {
    bot: "¡Genial! Vamos a configurar tu primer objetivo y dar juntos el primer paso. 🐢✨",
    options: []
  }
};