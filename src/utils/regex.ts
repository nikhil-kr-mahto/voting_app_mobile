const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const phoneRegex = /^[2-9]\d{2}[2-9]\d{6}$/;

export { emailRegex, passwordRegex, nameRegex, phoneRegex };
