// local storage getters & setters
import { Preferences } from '@capacitor/preferences';

export async function set(key, value) {
  await Preferences.set({
    key: key,
    value: JSON.stringify(value),
  });

  return true
}

export async function get(key) {

  console.log(key)

  const item  = await Preferences.get({key: key});
  if (item.value != null){
    return JSON.parse(item.value);
  } else {
    return ;
  }
}

export async function remove(key) {

  await Preferences.remove({
    key: key,
  });
}
