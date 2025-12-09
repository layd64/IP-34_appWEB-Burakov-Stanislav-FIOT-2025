// Authentication System using localStorage

class AuthSystem {
    constructor() {
        this.usersKey = 'bookstore_users';
        this.currentUserKey = 'bookstore_current_user';
        this.init();
    }

    init() {
        // Initialize users array if it doesn't exist
        if (!localStorage.getItem(this.usersKey)) {
            localStorage.setItem(this.usersKey, JSON.stringify([]));
        }
    }

    // Register a new user
    register(userData) {
        const users = this.getUsers();
        
        // Check if email already exists
        if (users.find(user => user.email === userData.email)) {
            return { success: false, message: 'Користувач з таким email вже існує' };
        }

        // Validate password length
        if (userData.password.length < 6) {
            return { success: false, message: 'Пароль повинен містити мінімум 6 символів' };
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            email: userData.email,
            password: userData.password, // In real app, this should be hashed
            fullName: userData.fullName,
            phone: userData.phone || '',
            address: userData.address || '',
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(this.usersKey, JSON.stringify(users));

        // Auto-login after registration
        this.login(userData.email, userData.password);

        return { success: true, message: 'Реєстрація успішна!', user: newUser };
    }

    // Login user
    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, message: 'Невірний email або пароль' };
        }

        // Store current user (without password)
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;
        localStorage.setItem(this.currentUserKey, JSON.stringify(userWithoutPassword));

        return { success: true, message: 'Вхід успішний!', user: userWithoutPassword };
    }

    // Logout user
    logout() {
        localStorage.removeItem(this.currentUserKey);
        return { success: true, message: 'Вихід успішний!' };
    }

    // Get current user
    getCurrentUser() {
        const userJson = localStorage.getItem(this.currentUserKey);
        return userJson ? JSON.parse(userJson) : null;
    }

    // Check if user is logged in
    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }

    // Get all users (for admin purposes, if needed)
    getUsers() {
        const usersJson = localStorage.getItem(this.usersKey);
        return usersJson ? JSON.parse(usersJson) : [];
    }

    // Update user profile
    updateProfile(updatedData) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) {
            return { success: false, message: 'Користувач не автентифікований' };
        }

        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === currentUser.id);

        if (userIndex === -1) {
            return { success: false, message: 'Користувач не знайдений' };
        }

        // Update user data (don't update password unless provided)
        if (updatedData.password && updatedData.password.length > 0) {
            if (updatedData.password.length < 6) {
                return { success: false, message: 'Пароль повинен містити мінімум 6 символів' };
            }
            users[userIndex].password = updatedData.password;
        }

        users[userIndex].fullName = updatedData.fullName || users[userIndex].fullName;
        users[userIndex].phone = updatedData.phone || users[userIndex].phone;
        users[userIndex].address = updatedData.address || users[userIndex].address;

        localStorage.setItem(this.usersKey, JSON.stringify(users));

        // Update current user session
        const updatedUser = { ...users[userIndex] };
        delete updatedUser.password;
        localStorage.setItem(this.currentUserKey, JSON.stringify(updatedUser));

        return { success: true, message: 'Профіль оновлено!', user: updatedUser };
    }

    // Change password
    changePassword(oldPassword, newPassword) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) {
            return { success: false, message: 'Користувач не автентифікований' };
        }

        const users = this.getUsers();
        const user = users.find(u => u.id === currentUser.id);

        if (!user || user.password !== oldPassword) {
            return { success: false, message: 'Невірний поточний пароль' };
        }

        if (newPassword.length < 6) {
            return { success: false, message: 'Новий пароль повинен містити мінімум 6 символів' };
        }

        user.password = newPassword;
        localStorage.setItem(this.usersKey, JSON.stringify(users));

        return { success: true, message: 'Пароль змінено!' };
    }
}

// Create global instance
const authSystem = new AuthSystem();

