import { useState } from 'react';
import { sanitizeHtmlInput } from '../utils/sanitizer';
interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export function useAuthValidation() {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return false;
    }
    return emailRegex.test(email);
  };

  const validatePasswordLength = (password: string): boolean => {
    return password.length >= 8;
  };
  const validatePasswordComplexity = (password: string): boolean => {
    const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return complexityRegex.test(password);
  };
  const validateRequired = (value: string): boolean => {
    return value.trim() !== '';
  };

  const validateInput = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const newErrors: ValidationErrors = {};
    const signupRoute = window.location.pathname === '/auth/signup';

    if (name === 'email' && value.length && !validateEmail(value)) {
        newErrors.email = 'Email must be a valid email';
    }else if(name === 'email' && value.length && validateRequired(value)){
        newErrors.email = '';
    }

    if (name === 'password' && !value.length && !validateRequired(value)) {
        newErrors.password = 'Password is required';
    }else if(name === 'password' && value.length && validateRequired(value)){
        newErrors.password = '';
    }

    if (name === 'confirmPassword' && !value.length && !validateRequired(value) && signupRoute) {
        newErrors.confirmPassword = 'Confirm Password is required';
    }else if(name === 'confirmPassword' && value.length && validateRequired(value) && signupRoute && value !== formData.password){
        newErrors.confirmPassword = 'Passwords do not match';
    }else if(name === 'confirmPassword' && value.length && validateRequired(value) && signupRoute && value === formData.password){
        newErrors.confirmPassword = '';
    }

    const sanitizedValue = sanitizeHtmlInput(value);
    setFormData({ ...formData, [name]: sanitizedValue });
    setErrors(newErrors);
  };
 
  const validate = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const newErrors: ValidationErrors = {};
    const signupRoute = window.location.pathname === '/auth/signup';
    if (!formData.email.length) {
      newErrors.email = 'Email is required!';
    }else if(formData.email.length > 0 && !validateEmail(formData.email)){
      newErrors.email = 'Please enter a valid email address';
    }

    if(!formData.password.length){
      newErrors.password = 'Password is required!';
    }else if(formData.password.length > 0 && !validatePasswordLength(formData.password) && signupRoute){
      newErrors.password = 'Password must be at least 8 characters!';
    }else if(formData.password.length > 0 && !validatePasswordComplexity(formData.password) && signupRoute){
      newErrors.password = 'Password must include special characters!';
    }

    if (formData.password !== formData.confirmPassword && signupRoute) {
      newErrors.confirmPassword = 'Passwords do not match';
    } 

    setErrors(newErrors);
  };

  return {
    errors,
    validateInput,
    validate,
    formData
  };
}