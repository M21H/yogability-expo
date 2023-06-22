import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export const Main = () => {
  const insets = useSafeAreaInsets();

  return (
    <WebView
      source={{ uri: 'https://yogabills.herokuapp.com/' }}
      startInLoadingState={true}
      style={{ marginTop: insets.top }}
    />
  )
}