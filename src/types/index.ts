export interface EmailOpenEvent {
  id: string;
  userAgent: string | null;
  ipAddress: string | null;
  createdAt: string;
}

export interface TrackedEmailWithDetails {
  id: string;
  subject: string;
  recipient: string;
  createdAt: string;
  userId: string;
  opens: EmailOpenEvent[];
}

export interface TrackedEmail {
  id: string;
  subject: string;
  recipient: string;
  createdAt: string;
  _count: {
    opens: number;
  };
}
