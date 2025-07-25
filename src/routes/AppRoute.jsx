import { useRoutes } from 'react-router-dom';
import { appRoutes } from './Routes'; // update path accordingly

const AppRoute = () => {
  const routes = useRoutes(appRoutes);
  return routes;
};

export default AppRoute;