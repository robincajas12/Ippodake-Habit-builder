export default class ChronometerController {
  private chronometers: { [id: number]: number } = {}; // Almacena los cronómetros en memoria

  createChronometer(time: number): number {
    const now = Date.now();
    const endTime = now + time * 60 * 1000;
    const id = now; // Usamos el timestamp como ID
    this.chronometers[id] = endTime;
    return id;
  }

  getChronometerTimeRemaining(id: number): number {
    const now = Date.now();
    const endTime = this.chronometers[id] || 0;
    return Math.max(0, endTime - now);
  }
}
