import jss, { Classes, StyleSheet } from "jss";

const cache = new Map<object, StyleSheet<any>>();

export const useStyles = <T extends object>(styles: T): Classes<keyof T> => {
    if (!cache.has(styles)) {
        cache.set(styles, jss.createStyleSheet<keyof T>(styles).attach());
    }

    return cache.get(styles)!.classes;
}