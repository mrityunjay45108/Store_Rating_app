export const validateName = (val) => 
    val.length < 20 || val.length > 60 ? 'Name must be between 20-60 characters' : null;

export const validatePassword = (val) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,16})/;
    return !regex.test(val) 
        ? '8-16 chars, 1 Uppercase, 1 Special character required' 
        : null;
};

export const validateAddress = (val) => 
    val.length > 400 ? 'Address must be less than 400 characters' : null;