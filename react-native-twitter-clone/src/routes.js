import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

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
