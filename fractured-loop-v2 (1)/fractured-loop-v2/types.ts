export interface Workflow {
  id: string;
  name: string;
  description: string;
  builds?: BuildType[];
}

export interface BuildType {
  id: string;
  name: string;
  description: string;
}

export interface BuildContext {
  [key: string]: {
    seeds: Seed[];
  };
}

export interface Seed {
  id: string;
  content: string;
  tags: string[];
}
