import type { Role } from '@/types/models'

const ROLE_PERMISSIONS: Record<Role, string[]> = {
  admin: ['users.read', 'users.create', 'users.update', 'users.delete', 'dashboard.view', 'settings.manage'],
  manager: ['users.read', 'users.create', 'users.update', 'dashboard.view'],
  user: ['users.read', 'dashboard.view'],
}

export function getRolePermissions(role: Role): string[] {
  return ROLE_PERMISSIONS[role] ?? []
}
