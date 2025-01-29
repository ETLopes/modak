import { PermissionsAndroid } from 'react-native';

export async function requestCalendarPermissions(): Promise<boolean> {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
      PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
    ]);

    return (
      granted['android.permission.READ_CALENDAR'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.WRITE_CALENDAR'] === PermissionsAndroid.RESULTS.GRANTED
    );
  } catch (err) {
    console.warn(err);
    return false;
  }
}