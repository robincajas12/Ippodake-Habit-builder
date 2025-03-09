import { ChatData } from "./chatypes";
export const chatDataEs: ChatData = {
  start: {
    bot: "¡Hola! Mi nombre es Ippo, y soy una tortuga 🐢",
    options: [
      { text: "¡Hola, Ippo!", next: "good_response" }
    ]
  },
  good_response: {
    bot: "¡Voy directo al grano! ¿Conoces la historia de la tortuga y la liebre? 🐢🐇",
    options: [
      { text: "¡Sí! Es muy popular", next: "have_you_tried_habit" },
      { text: "No, no la conozco. 🤔", next: "turtle_and_rabbit_story" }
    ]
  },
  turtle_and_rabbit_story: {
    bot: "La liebre se burló de la tortuga por ser lenta. 🐢 La tortuga la desafió a una carrera. Confiada, la liebre corrió y se echó una siesta. 😴 Mientras tanto, la tortuga siguió avanzando. ⏳ Cuando la liebre despertó, la tortuga ya estaba cerca de la meta. 🏁 La liebre corrió, pero demasiado tarde: ¡la tortuga ganó! 🎉 Moraleja: La constancia es más importante que la velocidad. 🏆",
    options: [
      { text: "¡Esa historia es genial! 🐢💪", next: "have_you_tried_habit" },
      { text: "¡Ya lo recuerdo, gracias! 😊", next: "have_you_tried_habit" }
    ]
  },
  have_you_tried_habit: {
    bot: "Lo que me gusta de la historia es su enseñanza: la constancia es más importante que la velocidad. ¿Has intentado crear un hábito?",
    options: [
      { text: "Sí, por eso estoy aquí. Siempre fracaso. 😞", next: "maybe_i_can_help_with_that" },
      { text: "No, no lo he intentado aún. 🤔", next: "maybe_i_can_help_with_that" }
    ]
  },
  maybe_i_can_help_with_that: {
    bot: "¡Tal vez pueda ayudarte con eso! Sabes, esta historia y crear hábitos tienen mucho en común. Básicamente, para construir un hábito y mantener la constancia, necesitas empezar con pequeños pasos todos los días y aumentar poco a poco. 📈",
    options: [
      { text: "¡Eso suena como el enfoque correcto! ¿Cómo empiezo? 🚀", next: "ippodake_intro" }
    ]
  },
  ippodake_intro: {
    bot: "¡Ippodake está aquí para ayudarte con eso! Está diseñado para ayudarte a mantener la constancia estableciendo una meta mínima cada día. 🌱 Ya sea una tarea pequeña o un gran objetivo, lo tomaremos paso a paso, ¡como la tortuga! 🐢.",
    options: [
      { text: "Continúa, por favor... 😄", next: "ippodake_explanation" }
    ]
  },
  ippodake_explanation: {
    bot: "No necesitas apresurarte; al igual que la tortuga, el progreso constante es la clave. Todos los días, estableceremos una pequeña meta, y gradualmente verás cómo tu progreso crece. 🐢 ¡Cuanto más constante seas, más cerca estarás de tu gran objetivo!",
    options: [
      { text: "¡Entendido! Vamos a comenzar. 🚀", next: "enable_notifications" }
    ]
  },
  enable_notifications: {
    bot: "Okey, una cosa más... Para que Ippodake funcione correctamente y puedas seguir tu progreso de manera constante, es necesario habilitar las notificaciones. ¡No olvides activarlas! 🔔 tranquilo, no soy el pájaro verde, espero que no esté escuchando...",
    options: [
      { text: "¡Está bien!", next: "start_tracking" },
      { text: "Más tarde...", next: "start_tracking" }
    ]
  },
  start_tracking: {
    bot: "¡Genial! Comencemos a configurar tu primera meta. 🌟",
    options: []
  }
};

