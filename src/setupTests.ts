import matchers from '@testing-library/jest-dom/matchers';
import { afterAll, beforeAll, expect, vi } from 'vitest';

expect.extend(matchers);

beforeAll(() => {
  (window.scrollTo as NonNullable<unknown>) = vi.fn();
  window.HTMLMediaElement.prototype.load = vi.fn();
});

afterAll(() => {
  vi.resetAllMocks();
});
