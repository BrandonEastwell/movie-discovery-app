
export function isPasswordValid(password: any) {
    if (typeof password !== 'string' || password.trim().length === 0) {
        throw new Error('Password is required')
    } else {
        if (isPasswordLengthValid(password)) throw new Error('Password must be at least 8 characters long')
        if (hasSpecialChar(password)) throw new Error('Password must contain at least one special character')
        if (hasUppercaseChar(password)) throw new Error('Password must contain at least one uppercase letter')
    }
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