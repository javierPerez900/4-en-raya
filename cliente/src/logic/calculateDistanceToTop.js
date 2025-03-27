export const calculateDistanceToTop = (index) => {
  // Ajusta el valor de la distancia según el índice y las filas completas
  return -60 * (Math.floor(index / 7) + 1);
}