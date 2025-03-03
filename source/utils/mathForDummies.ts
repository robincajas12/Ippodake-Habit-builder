export function trunc(x: number, posiciones = 0): number {
    if(x == 0) return 0
    if(!Number.isFinite(x)) return 0
    if (!Number.isFinite(x) || !Number.isInteger(posiciones) || posiciones < 0) {
      throw new Error("Entrada no válida");
    }
    
    const factor = 10 ** posiciones;
    return Math.trunc(x * factor) / factor;
  }