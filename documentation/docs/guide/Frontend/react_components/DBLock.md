# DBLock Component

The `DBLock` component is a functional component that manages database row locking and editing functionality.

## Props

- `handleDbLock`: A function to handle database row locking.
- `removeLock`: A function to remove the lock from a database row.
- `query`: An object containing query data. The exact type is temporary (`any`) and will be fixed when upgraded to ReactQuery V4.
- `handleFormType`: A function to handle the form type (`read`, `edit`, `new`).

## Usage

```jsx
<DBLock
  handleDbLock={handleDbLock}
  removeLock={removeLock}
  query={query}
  handleFormType={handleFormType}
/>
