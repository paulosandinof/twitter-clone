import { createAppContainer, createStackNavigator } from 'react-navigation';

import Login from './pages/Login';
import Timeline from './pages/Timeline';
import New from './pages/New';

const AppNavigator = createStackNavigator({
  Login,
  Timeline,
  New,
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
