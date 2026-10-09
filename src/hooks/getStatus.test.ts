import { describe, it, expect } from "vitest";
import { getStatus } from "./useProducts";

describe("getStatus", () => {
  it("returns critical when stock is below the minimum", () => {
    expect(getStatus(5, 20)).toBe("critical");
  });

  it("returns low when stock is between min and 1.5x min", () => {
    expect(getStatus(20, 20)).toBe("low");
    expect(getStatus(30, 20)).toBe("low");
  });

  it("returns healthy when stock is above 1.5x min", () => {
    expect(getStatus(31, 20)).toBe("healthy");
  });
});