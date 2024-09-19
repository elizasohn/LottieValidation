import { describe, it, expect } from 'vitest';
import { validateLottieJson } from './lottieValidator'; // Adjust the import path as necessary
import exampleLottieJson from '../data/exampleLottie.json';

describe('validateLottieJson', () => {
  it('should validate a correct minimal Lottie JSON', () => {
    const validLottieJson = {
      v: "5.5.2",
      fr: 30,
      ip: 0,
      op: 60,
      w: 512,
      h: 512,
      nm: "Test Animation",
      ddd: 0,
      assets: [],
      layers: []
    };
    const result = validateLottieJson(validLottieJson);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should invalidate an incorrect Lottie JSON missing required properties', () => {
    const invalidLottieJson = {
      v: "5.5.2",
      fr: 30,
      ip: 0,
      op: 60,
      // missing w and h
      nm: "Test Animation",
      ddd: 0,
      assets: [],
      layers: []
    };
    const result = validateLottieJson(invalidLottieJson);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain("must have required property 'w'");
    expect(result.error).toContain("must have required property 'h'");
  });

  it('should invalidate a Lottie JSON with incorrect property types', () => {
    const invalidLottieJson = {
      v: "5.5.2",
      fr: "30", // should be number
      ip: 0,
      op: 60,
      w: 512,
      h: 512,
      nm: "Test Animation",
      ddd: 0,
      assets: [],
      layers: []
    };
    const result = validateLottieJson(invalidLottieJson);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain("must be number");
  });

  it('should validate a Lottie JSON with additional properties', () => {
    const validLottieJson = {
      v: "5.5.2",
      fr: 30,
      ip: 0,
      op: 60,
      w: 512,
      h: 512,
      nm: "Test Animation",
      ddd: 0,
      assets: [],
      layers: [],
      extraProp: "This is allowed"
    };
    const result = validateLottieJson(validLottieJson);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should invalidate a non-object input', () => {
    const invalidInput = "not an object";
    const result = validateLottieJson(invalidInput);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain("must be object");
  });

  it('should validate a complex Lottie JSON with nested properties', () => {
    const complexLottieJson = exampleLottieJson;
    const result = validateLottieJson(complexLottieJson);
    console.log('Validation Result:', result);
    if (!result.isValid) {
      console.log('Validation Errors:', JSON.stringify(result.error, null, 2));
    }
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });
});