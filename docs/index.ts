import jss from "jss";
import jssDefaultPreset from 'jss-preset-default';
import jssPluginNested from 'jss-plugin-nested';
import { App } from "./components/App";
import { render } from "uland";

jss.setup(jssDefaultPreset());
jss.use(jssPluginNested());

render(
    document.getElementById('root')!,
    App
);
