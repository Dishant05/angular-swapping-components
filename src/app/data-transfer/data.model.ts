export type teamType = 'A' | 'B';

export interface DataModel {
  id: string;
  name: string;
  emails: string[];
  selected: boolean;
  team: teamType;
}
