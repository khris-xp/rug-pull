import { useState } from 'react';

export interface ValidationField {
  value: string | File | string[] | number | undefined;
  errorSetter: React.Dispatch<React.SetStateAction<ValidationErrors>>;
  valueRef?: string;
  errorMessage: string;
}

export interface ValidationFields {
  [key: string]: ValidationField;
}

export interface ValidationErrors {
  [key: string]: string | null;
}

export const useValidate = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = (fields: ValidationFields): boolean => {
    let isValid = true;
    const newErrors: ValidationErrors = {};

    for (const fieldName in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, fieldName)) {
        const { value, errorMessage } = fields[fieldName];
        if (!value) {
          newErrors[fieldName] = errorMessage;
          isValid = false;
        } else {
          newErrors[fieldName] = null;
        }
      }

      const fieldValue = fields[fieldName].value;
      if (Array.isArray(fieldValue)) {
        if (fieldValue.length === 0) {
          newErrors[fieldName] = fields[fieldName].errorMessage;
          isValid = false;
        }
      }

      if (fields[fieldName].value instanceof File) {
        if ((fields[fieldName].value as File).size === 0) {
          newErrors[fieldName] = fields[fieldName].errorMessage;
          isValid = false;
        }
      }

      if (fields[fieldName] && Array.isArray(fields[fieldName].value)) {
        if ((fields[fieldName].value as string[]).length === 0) {
          newErrors[fieldName] = 'Value cannot be empty';
          isValid = false;
        }
      }

      if (typeof fields[fieldName].value === 'number') {
        const numericValue = Number(fields[fieldName].value);
        if (!isNaN(numericValue)) {
          if (numericValue < 0) {
            newErrors[fieldName] = 'Value must be greater than 0';
            isValid = false;
          }
        } else {
          newErrors[fieldName] = 'Value must be a valid number';
          isValid = false;
        }
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  return {
    errors,
    validateField,
    setErrors,
  };
};
