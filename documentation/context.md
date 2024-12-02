### .context system explained.

The context system is built to solve an incredibly difficult problem.
how do child components share state (and change that state) synchronously (so on first render)
without using hooks (useState, useEffect etc) because that would disable react server components.

These are the two challenges:
1. How do children share data on first render (and are allowed to change it) without hooks
   i.e how does childa pass childb a variable.
2. How does <Graph> pass data to children without createContext.

The .context system solves these two problems via.

- Children can share data by setting  .context on their component instance which is a function
  that gives them the current context, and they can update it. That data is then 'lifted up' by <Graph> looping
  over each child and running it's .context in sequence.
- The resulting context is then passed down by cloning each element and injecting a prop called "context"

I.E

// Graph.tsx
```tsx
// run each childs .context method essentially lifting whatever data they set there into the parent.
const context = React.Children.toArray(children).reduce((ctx, c) => {
	// run c.type.context spread result into ctx
}, startingcontext)

return (
    <div>
		{/* Inject context as a prop into every child */}
		{React.Children.toArray(children).map((child) => cloneElement(child, {context: ctx}))}
    </div>
)
```

This means if a child component was to do this.

```tsx
const ChildA = ({context: GraphContext}) => {
	console.log(context) // {...ctx as normal, hello: "world"}
    return <div>child a</div>;
}

ChildA.context = (ctx: GraphContext) => {
    return {...ctx, hello: "world"}
}
```
but that data would also be accessible here.

```tsx
const ChildB = ({context: GraphContext}) => {
	console.log(context) // {...ctx as normal, hello: "world"}
    return <div>child b</div>;
}
```
T










