export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  // Burkina Faso phone: +226 followed by 8 digits
  return /^(\+226|00226)?[0-9]{8}$/.test(phone.replace(/\s/g, ''));
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function formatPhone(phone: string): string {
  const clean = phone.replace(/\D/g, '');
  if (clean.startsWith('226')) {
    const num = clean.slice(3);
    return `+226 ${num.slice(0, 2)} ${num.slice(2, 4)} ${num.slice(4, 6)} ${num.slice(6, 8)}`;
  }
  return `+226 ${clean.slice(0, 2)} ${clean.slice(2, 4)} ${clean.slice(4, 6)} ${clean.slice(6, 8)}`;
}
