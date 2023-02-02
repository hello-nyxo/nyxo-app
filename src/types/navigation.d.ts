import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TabStack} from '../navigation/TabStack';

export declare type TabScreenProps<RouteName extends keyof TabStack = string> =
  NativeStackScreenProps<TabStack, RouteName>;
