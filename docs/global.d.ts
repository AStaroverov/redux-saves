declare module "uland" {
    export function Component<FunctionalComponent>(fn: FunctionalComponent): FunctionalComponent;
    export function html(strings: TemplateStringsArray, ...values: unknown[]): any
    export function useCallback<Fn extends Function>(fn: Fn): Fn
    export function useEffect<Fn extends Function>(fn: Fn, deps: unknown[]): VoidFunction
    export function useState<Value>(init: Value): [Value, (newValue: Value) => void]
    export function render<FunctionalComponent>(root: HTMLElement, component: FunctionalComponent): void
}
