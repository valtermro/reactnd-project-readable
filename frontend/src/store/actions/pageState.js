export const START_WAITING =  'START_WAITING';
export const STOP_WAITING =  'STOP_WAITING';

export function startWaiting() {
  return { type: START_WAITING };
}

export function stopWaiting() {
  return { type: STOP_WAITING };
}
