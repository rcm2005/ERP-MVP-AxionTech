export interface LockoutState {
  failedAttempts: number;
  lockedUntil?: string;
  backoffSeconds: number;
}

export function createLockoutState(
  failedAttempts: number,
  backoffSeconds: number,
  lockedUntil?: string,
): LockoutState {
  return {
    failedAttempts,
    backoffSeconds,
    lockedUntil,
  };
}

export function nextBackoffSeconds(failedAttempts: number): number {
  if (failedAttempts <= 0) {
    return 0;
  }

  return Math.min(60 * 30, 2 ** Math.max(0, failedAttempts - 1) * 15);
}
