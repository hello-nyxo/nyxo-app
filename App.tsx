/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppLinking, Navigation} from './src/navigation/RootStack';
import {ThemeProvider} from 'styled-components/native';
import {TamaguiProvider} from 'tamagui';
import {config} from './tamagui.config';

const queryClient = new QueryClient();

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['nyxo://'],
  config: {
    screens: AppLinking,
  },
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <TamaguiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={{mode: 'light'}}>
          <NavigationContainer linking={linking}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <Navigation />
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </TamaguiProvider>
  );
};

export default App;
