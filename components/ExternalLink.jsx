import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { Platform } from 'react-native';

export function ExternalLink({ href, onPress, ...rest }) {
  const handlePress = async (event) => {
    if (Platform.OS !== 'web') {
      event.preventDefault();
      await openBrowserAsync(href);
    } else if (onPress) {
      onPress(event);
    }
  };

  return (
    <Link
      href={href}
      {...rest}
      onPress={handlePress}
    />
  );
}
