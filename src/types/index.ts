
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Certificate {
  id: string;
  title: string;
  recipientName: string;
  recipientEmail: string;
  issueDate: string;
  expiryDate?: string;
  issuerName: string;
  description: string;
  hash?: string;
  transactionId?: string;
  verified?: boolean;
  qrCodeId: string;
  template: 'standard' | 'professional' | 'academic';
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}
