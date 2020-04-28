/**
 * Apply BEM (block-element-modifier) naming to a base CSS class.
 * @param className Base classname
 * @param modifiers Object containing modifiers to apply.
 */
export function bem(className: string, modifiers: object = {}) {
    return Object.entries(modifiers).reduce((acc, entry) => {
        return `${acc} ${acc}--${entry[0]}--${entry[1]}`;
    }, className);
}