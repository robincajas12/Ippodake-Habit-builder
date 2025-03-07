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
      { text: "Cuéntame la historia. 🤔", next: "turtle_and_rabbit_story" }
    ]
  },
  turtle_and_rabbit_story: {
    bot: "La liebre se burló de la tortuga por ser lenta. 🐢 La tortuga la desafió a una carrera. Confiada, la liebre corrió y se echó una siesta. 😴 Mientras tanto, la tortuga siguió avanzando. ⏳ Cuando la liebre despertó, la tortuga ya estaba cerca de la meta. 🏁 La liebre corrió, pero demasiado tarde: ¡la tortuga ganó! 🎉 Moraleja: Quien persevera, alcanza. 🏆",
    options: [
      { text: "¡Esa historia es genial! 🐢💪", next: "have_you_tried_habit" },
      { text: "¡Ya lo recuerdo, gracias! 😊", next: "have_you_tried_habit" }
    ]
  },
  have_you_tried_habit: {
    bot: "Lo que me gusta de la historia es su enseñanza, la moraleja de la historia es que la constancia es mejor que la eficiencia! ¿Has intentado crear un hábito?",
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
    bot: "¡Ippodake está aquí para ayudarte con eso! Está diseñado para ayudarte a mantener la constancia estableciendo una meta mínima cada día. 🌱 Ya sea una tarea pequeña o un gran objetivo, lo tomaremos paso a paso, ¡como la tortuga! 🐢 Pero aquí está la clave: enfoquémonos en solo un hábito a la vez. Intentar construir demasiados hábitos a la vez puede ser abrumador, así que vamos a mantenerlo simple y hacerlo bien. Comencemos con algo pequeño y manejable...",
    options: [
      { text: "Continua 😄", next: "ippodake_explanation" }
    ]
  },
  ippodake_explanation: {
    bot: "Bueno, Todo se trata de dar pequeños pasos consistentes todos los días para construir hábitos duraderos. No necesitas apresurarte; al igual que la tortuga, el progreso constante es la clave. Comenzaremos con solo 3 minutos, y con el tiempo, a medida que mantengas la constancia, tu meta aumentará gradualmente. 📈 ¡Eventualmente, alcanzarás tu gran objetivo!",
    options: [
      { text: "¡Entendido! Vamos a comenzar. 🚀", next: "enable_notifications" }
    ]
  },
  enable_notifications: {
    bot: "Para que Ippodake funcione correctamente y puedas seguir tu progreso de manera constante, es necesario habilitar las notificaciones. ¡No olvides activarlas! 🔔",
    options: [
      { text: "¡Está bien!", next: "start_tracking" }
    ]
  },
  start_tracking: {
    bot: "¡Genial! Comencemos a configurar tu primera meta. 🌟",
    options: []
  }
};