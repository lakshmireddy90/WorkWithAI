import type {
  User,
  LoginCredentials,
  SignupCredentials,
  AuthResponse,
} from "../types/auth.types";

const USERS_KEY = "saas_users";
const SESSION_KEY = "saas_session";

interface StoredUser extends User {
  password: string;
}

const DEMO_USER: StoredUser = {
  id: "1",
  name: "Admin User",
  email: "admin@example.com",
  password: "Password@123",
};

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getUsers = (): StoredUser[] => {
  const stored = localStorage.getItem(USERS_KEY);

  if (!stored) {
    return [DEMO_USER];
  }

  try {
    const users: StoredUser[] = JSON.parse(stored) as StoredUser[];

    return users.some((user) => user.email === DEMO_USER.email)
      ? users
      : [DEMO_USER, ...users];
  } catch {
    return [DEMO_USER];
  }
};

const saveUsers = (users: StoredUser[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const authService = {
  async login(
    credentials: LoginCredentials
  ): Promise<AuthResponse> {
    await delay(800);

    const users = getUsers();

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === credentials.email.toLowerCase() &&
        item.password === credentials.password
    );

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const { password: _password, ...safeUser } = user;

    const response: AuthResponse = {
      user: safeUser,
      token: `mock-jwt-${user.id}-${Date.now()}`,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(response));

    return response;
  },

  async signup(
    credentials: SignupCredentials
  ): Promise<AuthResponse> {
    await delay(800);

    const users = getUsers();

    const existingUser = users.find(
      (item) =>
        item.email.toLowerCase() === credentials.email.toLowerCase()
    );

    if (existingUser) {
      throw new Error("An account with this email already exists.");
    }

    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    };

    saveUsers([...users, newUser]);

    const { password: _password, ...safeUser } = newUser;

    const response: AuthResponse = {
      user: safeUser,
      token: `mock-jwt-${newUser.id}-${Date.now()}`,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(response));

    return response;
  },

  async logout(): Promise<void> {
    await delay(300);
    localStorage.removeItem(SESSION_KEY);
  },

  getSession(): AuthResponse | null {
    const session = localStorage.getItem(SESSION_KEY);

    if (!session) return null;

    try {
      return JSON.parse(session) as AuthResponse;
    } catch {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  },
};