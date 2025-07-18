export interface TrackedEmail {
  id: string;
  subject: string;
  recipient: string;
  createdAt: string;
  _count: {
    opens: number;
  };
}
