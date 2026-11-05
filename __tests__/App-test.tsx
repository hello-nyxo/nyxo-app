/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';

// TanStack Query schedules retry/GC timers that would keep Jest alive.
jest.useFakeTimers();

it('renders correctly', async () => {
  let tree: renderer.ReactTestRenderer | undefined;
  await act(async () => {
    tree = renderer.create(<App />);
  });
  expect(tree!.toJSON()).toBeTruthy();
  act(() => tree!.unmount());
});
