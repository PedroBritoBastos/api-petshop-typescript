import { describe, test, expect } from "@jest/globals";

function somar(a: number, b: number): number {
  return a + b;
}

describe("somar", () => {
  test("should return sum", () => {
    expect(somar(2, 4)).toBe(4);
  });
});
