import { useAppSelector } from './useAppSelector'

export function usePermission(permission: string): boolean {
  const permissions = useAppSelector((state) => state.auth.permissions)
  return permissions.includes(permission)
}
