
import { describe, it, expect, vi } from 'vitest';
import { isDotLottie, isLottieJSON, isLottie, validateFile } from './lottieValidator';
import { LOTTIE_JSON_MANDATORY_FIELDS, ZIP_SIGNATURE } from '../constants/constants';
import exampleLottieJson from '../data/exampleLottie.json';

describe('Lottie validator functions', () => {
    describe('isDotLottie', () => {
        it('should return true for valid .lottie file data', () => {
            const validData = new ArrayBuffer(ZIP_SIGNATURE.length);
            const view = new Uint8Array(validData);
            ZIP_SIGNATURE.forEach((byte, index) => {
                view[index] = byte;
            });
            expect(isDotLottie(validData)).toBe(true);
        });

        it('should return false for invalid .lottie file data', () => {
            const invalidData = new ArrayBuffer(4);
            expect(isDotLottie(invalidData)).toBe(false);
        });

        it('should return false for data shorter than 4 bytes', () => {
            const shortData = new ArrayBuffer(3);
            expect(isDotLottie(shortData)).toBe(false);
        });
    });

    describe('isLottieJSON', () => {
        it('should return true for valid Lottie JSON', () => {
            const validJSON = LOTTIE_JSON_MANDATORY_FIELDS.reduce((obj, field) => {
                obj[field] = 'mock field data';
                return obj;
            }, {} as Record<string, unknown>);
            expect(isLottieJSON(validJSON)).toBe(true);
        });

        it('should return false for invalid Lottie JSON', () => {
            const invalidJSON = { someField: 'value' };
            expect(isLottieJSON(invalidJSON)).toBe(false);
        });
    });

    describe('isLottie', () => {
        it('should return true for valid Lottie JSON string', () => {
            const validJSON = JSON.stringify(LOTTIE_JSON_MANDATORY_FIELDS.reduce((obj, field) => {
                obj[field] = 'mock field data';
                return obj;
            }, {} as Record<string, unknown>));
            expect(isLottie(validJSON)).toBe(true);
        });

        it('should return false for invalid Lottie JSON string', () => {
            const invalidJSON = JSON.stringify({ someField: 'value' });
            expect(isLottie(invalidJSON)).toBe(false);
        });

        it('should return true for valid Lottie JSON object', () => {
            const validJSON = LOTTIE_JSON_MANDATORY_FIELDS.reduce((obj, field) => {
                obj[field] = 'mock field data';
                return obj;
            }, {} as Record<string, unknown>);
            expect(isLottie(validJSON)).toBe(true);
        });

        it('should return false for invalid Lottie JSON object', () => {
            const invalidJSON = { someField: 'value' };
            expect(isLottie(invalidJSON)).toBe(false);
        });

        it('should return false and log error for invalid JSON string', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            expect(isLottie('invalid json')).toBe(false);
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });

    describe('validateFile', () => {
        it('should return true for valid .lottie file data', () => {
            const validData = new ArrayBuffer(ZIP_SIGNATURE.length);
            const view = new Uint8Array(validData);
            ZIP_SIGNATURE.forEach((byte, index) => {
                view[index] = byte;
            });
            expect(validateFile(validData)).toBe(true);
        });

        it('should return false for invalid .lottie file data', () => {
            const invalidData = new ArrayBuffer(4);
            expect(validateFile(invalidData)).toBe(false);
        });

        it('should return true for valid Lottie JSON string', () => {
            const validJSON = JSON.stringify(LOTTIE_JSON_MANDATORY_FIELDS.reduce((obj, field) => {
                obj[field] = 'mock field data';
                return obj;
            }, {} as Record<string, unknown>));
            expect(validateFile(validJSON)).toBe(true);
        });

        it('should return false for invalid Lottie JSON string', () => {
            const invalidJSON = JSON.stringify({ someField: 'value' });
            expect(validateFile(invalidJSON)).toBe(false);
        });

        it('should return true for valid Lottie JSON object', () => {
            const validJSON = LOTTIE_JSON_MANDATORY_FIELDS.reduce((obj, field) => {
                obj[field] = 'mock field data';
                return obj;
            }, {} as Record<string, unknown>);
            expect(validateFile(validJSON)).toBe(true);
        });

        it('should return false for invalid Lottie JSON object', () => {
            const invalidJSON = { someField: 'value' };
            expect(validateFile(invalidJSON)).toBe(false);
        });

        it('should return false and log error for unexpected input type', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(validateFile(123 as any)).toBe(false);
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });
    describe('validateExampleLottieJson', () => {
        it('should return true for valid .json example file data', () => {
            const validData = exampleLottieJson;
            expect(validateFile(validData)).toBe(true);
        });
    });
});