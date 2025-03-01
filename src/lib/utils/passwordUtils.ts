
export function isPasswordValid(password: any) {
    let valid = true;
    let error = null;
    if (typeof password !== 'string' || password.trim().length === 0) {
        valid = false;
        error = 'Password is required'
    } else {
        if (!isPasswordLengthValid(password)) {
            valid = false;
            error = 'Password must be at least 8 characters long'
        }
        if (!hasSpecialChar(password)) {
            valid = false;
            error = 'Password must contain at least one special character'
        }
        if (!hasUppercaseChar(password)) {
            valid = false;
            error = 'Password must contain at least one uppercase letter'
        }
    }

    return {valid, error}
}

export function isPasswordLengthValid(password: string) {
    return password.length >= 8
}

export function hasSpecialChar(password: string) {
    const regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?/|\\]/;
    return regex.test(password);
}

export function hasUppercaseChar(password: string) {
    return /[A-Z]/.test(password);
}