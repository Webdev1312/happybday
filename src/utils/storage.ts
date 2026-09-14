const STORAGE_KEY = 'birthday-experience:state:v1';

export interface PersistedState {
  sceneIndex: number;
  musicStarted: boolean;
  candlesBlownOut: boolean;
}

const defaultState: PersistedState = {
  sceneIndex: 0,
  musicStarted: false,
  candlesBlownOut: false,
};

export function loadState(): PersistedState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed };
  } catch (err) {
    console.warn('Could not read saved progress, starting fresh.', err);
    return defaultState;
  }
}

export function saveState(state: Partial<PersistedState>): void {
  if (typeof window === 'undefined') return;
  try {
    const current = loadState();
    const next = { ...current, ...state };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (err) {
    console.warn('Could not save progress.', err);
  }
}

export function clearState(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Could not clear saved progress.', err);
  }
}
