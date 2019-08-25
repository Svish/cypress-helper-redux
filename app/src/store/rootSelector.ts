// Import application selectors
import { select as items } from '../components/Items/items.ducks';

// Gather them in a single object
const selectors = { items };
export default selectors;

// Export its type
// TODO: Somehow connect this type to Selectors type of helper
export type Selectors = typeof selectors;
