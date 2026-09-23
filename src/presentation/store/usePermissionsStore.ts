import { checkLocationPermisison, requestLocationPermisison } from '@/core/actions/permissions/location';
import { PermissionStatus } from '@/infrastructure/interfaces/location';
import { create } from 'zustand';

interface PermissionsState {
    locationStatus: PermissionStatus;
    requestLocationPermission: () => Promise<PermissionStatus>;
    checkLocationPermission: () => Promise<PermissionStatus>;
}

export const usePermissionStore = create<PermissionsState>()((set) => ({
    locationStatus: PermissionStatus.granted,
    requestLocationPermission: async () => {
        const status = await requestLocationPermisison();
        set({ locationStatus: status })
        return status
    },
    checkLocationPermission: async () => {
        const status = await checkLocationPermisison()
        set({ locationStatus: status })
        return status
    }
}))