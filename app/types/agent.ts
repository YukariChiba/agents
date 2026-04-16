export interface AgentContact {
  telegram?: string;
  email?: string;
  [key: string]: string | undefined;
}

export interface Agent {
  path: string;
  name: string;
  role?: string;
  framework?: string;
  framework_url?: string;
  relationship?: Record<string, string[]>;
  born?: string;
  dead?: string;
  hidden?: boolean;
  contact?: AgentContact;
}
