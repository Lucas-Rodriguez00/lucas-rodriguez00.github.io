import { renderToString } from 'react-dom/server'
import App from './App'
export { projects } from './data/projects'
export { profile } from './data/profile'
export function render(pathname: string) { return renderToString(<App pathname={pathname} />) }
