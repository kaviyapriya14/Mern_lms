
export const validateForm = (formData) => {
    const errors = {};

    Object.keys(formData).forEach(key => {
        if (formData[key] === '') {
            errors[key] = 'This field is required';
        }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
        errors['email'] = 'Invalid email format';
    }

    if (formData.password.length < 8) {
        errors['password'] = 'Password must be at least 8 characters long';
    }

    if (formData.phone_number.length !== 10) {
        errors['phone_number'] = 'Phone number must be 10 digits';
    }

    return errors;
};
