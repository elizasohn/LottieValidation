/* exported render */
import { LOTTIE_JSON_MANDATORY_FIELDS, ZIP_SIGNATURE } from '../constants/constants';

export function isDotLottie(fileData: ArrayBuffer): boolean {
  if (fileData.byteLength < 4) {
    return false;
  }

  const fileSignature = new Uint8Array(fileData.slice(0, ZIP_SIGNATURE.byteLength));

  for (let i = 0; i < ZIP_SIGNATURE.length; i += 1) {
    if (ZIP_SIGNATURE[i] !== fileSignature[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Returns whether the given object looks like a valid Lottie JSON structure.
 */
export function isLottieJSON(json: Record<string, unknown>): boolean {
  return LOTTIE_JSON_MANDATORY_FIELDS.every((field) => Object.prototype.hasOwnProperty.call(json, field));
}

export function isLottie(fileData: string | Record<string, unknown>): boolean {
  if (typeof fileData === 'string') {
    try {
        return isLottieJSON(JSON.parse(fileData));
    } catch (e) {
        console.error(e);
        return false;
    }
  } else {
    return isLottieJSON(fileData);
  }
}

export function validateFile(fileData: string | Record<string, unknown> | ArrayBuffer): boolean {
    if (fileData instanceof ArrayBuffer) {
        try {
            return isDotLottie(fileData);
        } catch (e) {
            console.error(e);
            return false;
        }
    } else if (typeof fileData === 'string' || typeof fileData === 'object') {
        try {
            return isLottie(fileData);
        } catch (e) {
            console.error(e);
            return false;
        }
    } else {
        console.error('Invalid input type');
        return false;
    }
}