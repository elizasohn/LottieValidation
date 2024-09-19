import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import lottieSchema from '../refs/lottie-meta-schema.json';

const ajv = new Ajv2020({
    strict: false,
    allErrors: true,
    validateFormats: true,
});
addFormats(ajv);

// Load the Lottie schema
const validate = ajv.compile(lottieSchema);

export function validateLottieJson(jsonData: unknown): { isValid: boolean; error?: string } {
    const isValid = validate(jsonData);

    if (isValid) {
        return { isValid: true };
    } else {
        return { 
        isValid: false, 
        error: ajv.errorsText(validate.errors)
        };
    }
}