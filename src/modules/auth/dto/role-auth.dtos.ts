export class RoleDto {
  id: string;
  name: string;
  composite: boolean;
  clientRole: boolean;
  containerId: string;
  attributes: Record<string, any>;
}
