import Launcher from '@common/launcher';

import event1 from './cashe-initial-value';
import event2 from './submit-age';

((PLUGIN_ID) => new Launcher(PLUGIN_ID).launch([event1, event2]))(kintone.$PLUGIN_ID);
